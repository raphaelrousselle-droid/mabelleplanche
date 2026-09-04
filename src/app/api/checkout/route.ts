import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";

import { toCents } from "@/lib/format";
import { getProductById, getSiteSettings } from "@/lib/store";
import { assertStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        essenceSlug: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(20),
});

export async function POST(request: Request) {
  let stripe;
  try {
    stripe = assertStripe();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Stripe non configuré." },
      { status: 503 },
    );
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Panier invalide." }, { status: 400 });
  }

  const settings = await getSiteSettings();
  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  // Source de vérité : on recharge chaque produit et sa déclinaison (essence) côté serveur.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let merchandiseTotal = 0;

  for (const entry of parsed.data.items) {
    const product = await getProductById(entry.productId);
    if (!product) {
      return NextResponse.json(
        { error: "Une planche de votre panier n'est plus disponible." },
        { status: 409 },
      );
    }

    const variant = product.variants.find((v) => v.essenceSlug === entry.essenceSlug);
    if (!variant) {
      return NextResponse.json(
        { error: `« ${product.title} » n'est plus disponible dans cette essence.` },
        { status: 409 },
      );
    }
    if (!variant.inStock) {
      return NextResponse.json(
        {
          error: `« ${product.title} » (${variant.essenceName}) est épuisée. Retirez-la du panier pour continuer.`,
        },
        { status: 409 },
      );
    }

    const image = variant.images[0]?.url ?? product.images[0]?.url;
    const absoluteImage = image?.startsWith("http") ? image : image ? `${origin}${image}` : undefined;

    lineItems.push({
      quantity: entry.quantity,
      price_data: {
        currency: "eur",
        unit_amount: toCents(variant.price),
        product_data: {
          name: `${product.title} — ${variant.essenceName}`,
          images: absoluteImage ? [absoluteImage] : undefined,
          metadata: { productId: product.id, essenceSlug: variant.essenceSlug },
        },
      },
    });
    merchandiseTotal += variant.price * entry.quantity;
  }

  const { shipping } = settings;
  const shippingIsFree =
    typeof shipping.freeThreshold === "number" &&
    merchandiseTotal >= shipping.freeThreshold;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      locale: "fr",
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: ["FR"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: shippingIsFree
              ? "Livraison offerte"
              : shipping.label,
            fixed_amount: {
              amount: shippingIsFree ? 0 : toCents(shipping.amount),
              currency: "eur",
            },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      success_url: `${origin}/commande/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
      metadata: {
        cart: parsed.data.items
          .map((i) => `${i.productId}/${i.essenceSlug}x${i.quantity}`)
          .join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe error", err);
    return NextResponse.json(
      { error: "La création du paiement a échoué. Réessayez dans un instant." },
      { status: 502 },
    );
  }
}

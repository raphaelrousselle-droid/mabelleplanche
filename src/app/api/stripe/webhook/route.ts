import { NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  FROM_EMAIL,
  NOTIFICATION_EMAIL,
  resend,
} from "@/lib/email/resend";
import { OrderConfirmationEmail } from "@/lib/email/OrderConfirmationEmail";
import { formatEuros } from "@/lib/format";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook Stripe non configuré (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET)." },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature ?? "", webhookSecret);
  } catch (err) {
    console.error("[webhook] Signature invalide", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await handleCompletedCheckout(session.id);
    } catch (err) {
      console.error("[webhook] Traitement de la commande échoué", err);
      // On renvoie 200 : Stripe ne doit pas réessayer indéfiniment pour un
      // échec d'email. L'erreur est journalisée pour suivi manuel.
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCompletedCheckout(sessionId: string) {
  if (!stripe) return;

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name ?? undefined;
  const orderRef = session.id.replace("cs_", "").slice(0, 10).toUpperCase();

  const productLines =
    session.line_items?.data
      .filter((li) => (li.description ?? "").toLowerCase() !== "livraison")
      .map((li) => ({
        description: li.description ?? "Planche",
        quantity: li.quantity ?? 1,
        amount: formatEuros((li.amount_total ?? 0) / 100),
      })) ?? [];

  const shippingCost = session.shipping_cost?.amount_total;
  const shippingLabel =
    typeof shippingCost === "number"
      ? shippingCost === 0
        ? "offerte"
        : formatEuros(shippingCost / 100)
      : undefined;

  const addr = session.customer_details?.address;
  const shippingAddress = addr
    ? [
        customerName,
        addr.line1,
        addr.line2,
        [addr.postal_code, addr.city].filter(Boolean).join(" "),
        addr.country,
      ].filter((v): v is string => Boolean(v))
    : undefined;

  const total = formatEuros((session.amount_total ?? 0) / 100);

  if (!resend) {
    console.warn("[webhook] RESEND_API_KEY absente : email de confirmation non envoyé.");
    return;
  }

  // Email client
  if (customerEmail) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Votre commande Ma belle planche (${orderRef})`,
      react: OrderConfirmationEmail({
        customerName,
        orderRef,
        lines: productLines,
        shipping: shippingLabel,
        total,
        shippingAddress,
      }),
    });
  }

  // Notification artisan
  if (NOTIFICATION_EMAIL) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      replyTo: customerEmail || undefined,
      subject: `Nouvelle commande ${orderRef} — ${total}`,
      text: [
        `Commande : ${orderRef}`,
        `Client : ${customerName ?? "—"} (${customerEmail ?? "email inconnu"})`,
        `Total : ${total} (livraison ${shippingLabel ?? "—"})`,
        "",
        "Articles :",
        ...productLines.map((l) => `- ${l.description} × ${l.quantity} — ${l.amount}`),
        "",
        "Adresse de livraison :",
        ...(shippingAddress ?? ["—"]),
      ].join("\n"),
    });
  }
}

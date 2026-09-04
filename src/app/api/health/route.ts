import { NextResponse } from "next/server";

import { FROM_EMAIL, NOTIFICATION_EMAIL, resend } from "@/lib/email/resend";
import { getProducts } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnostic de configuration (sans secret). Indique quelles variables
 * d'environnement sont présentes et quelle source de données est active.
 *
 * GET /api/health              -> état de la configuration
 * GET /api/health?sendTest=1   -> envoie un email de test via Resend à
 *                                 ORDER_NOTIFICATION_EMAIL et renvoie le
 *                                 résultat brut (pour isoler un souci d'email).
 */
export async function GET(request: Request) {
  const env = {
    siteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    sanityProjectId: Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET || null,
    stripePublishableKey: Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeSecretKeyMode: process.env.STRIPE_SECRET_KEY?.startsWith("sk_live")
      ? "live"
      : process.env.STRIPE_SECRET_KEY?.startsWith("sk_test")
        ? "test"
        : null,
    stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    resendApiKey: Boolean(process.env.RESEND_API_KEY),
    resendFromEmail: process.env.RESEND_FROM_EMAIL || null,
    orderNotificationEmail: Boolean(process.env.ORDER_NOTIFICATION_EMAIL),
  };

  const url = new URL(request.url);
  if (url.searchParams.get("sendTest")) {
    if (!resend) {
      return NextResponse.json({ emailTest: "RESEND_API_KEY absente" }, { status: 200 });
    }
    if (!NOTIFICATION_EMAIL) {
      return NextResponse.json(
        { emailTest: "ORDER_NOTIFICATION_EMAIL absente" },
        { status: 200 },
      );
    }
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: "Test Ma belle planche — configuration email",
      text: "Si vous recevez cet email, Resend est correctement configuré.",
    });
    return NextResponse.json(
      { emailTest: error ? { error } : { sent: true, id: data?.id }, from: FROM_EMAIL, to: NOTIFICATION_EMAIL },
      { status: 200 },
    );
  }

  let productCount = 0;
  let dataSource: "sanity" | "demo" = env.sanityProjectId ? "sanity" : "demo";
  try {
    const products = await getProducts();
    productCount = products.length;
    if (env.sanityProjectId && products[0]?.images[0]?.url.startsWith("/placeholders")) {
      dataSource = "demo";
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, env, error: (err as Error).message },
      { status: 200 },
    );
  }

  return NextResponse.json({
    ok: true,
    dataSource,
    productCount,
    env,
    ts: new Date().toISOString(),
  });
}

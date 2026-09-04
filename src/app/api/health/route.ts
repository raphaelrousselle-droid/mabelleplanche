import { NextResponse } from "next/server";

import { getProducts } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnostic de configuration (sans secret). Indique quelles variables
 * d'environnement sont présentes et quelle source de données est active.
 * Utile après un déploiement pour vérifier que tout est branché.
 */
export async function GET() {
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
    resendFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
    orderNotificationEmail: Boolean(process.env.ORDER_NOTIFICATION_EMAIL),
  };

  let productCount = 0;
  let dataSource: "sanity" | "demo" = env.sanityProjectId ? "sanity" : "demo";
  try {
    const products = await getProducts();
    productCount = products.length;
    // Si Sanity est configuré mais renvoie du contenu de démo (repli), on le voit
    // au fait que les images pointent vers /placeholders.
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

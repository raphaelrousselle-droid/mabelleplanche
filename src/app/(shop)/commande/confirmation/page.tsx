import type { Metadata } from "next";
import Link from "next/link";

import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";
import { formatEuros } from "@/lib/format";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Merci pour votre commande",
  robots: { index: false },
};

type SearchParams = { session_id?: string };

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { session_id: sessionId } = await searchParams;

  let email: string | null = null;
  let total: number | null = null;
  let lineItems: Array<{ description: string; quantity: number; amount: number }> = [];
  let paid = false;

  if (sessionId && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? null;
      total = typeof session.amount_total === "number" ? session.amount_total / 100 : null;
      lineItems =
        session.line_items?.data.map((li) => ({
          description: li.description ?? "Article",
          quantity: li.quantity ?? 1,
          amount: (li.amount_total ?? 0) / 100,
        })) ?? [];
    } catch {
      /* session introuvable : on affiche un message générique */
    }
  }

  return (
    <div className="wrap-tight py-20">
      <ClearCartOnMount />

      <div className="rounded-2xl border border-bordure bg-white p-8 text-center sm:p-12">
        <p className="eyebrow">Commande confirmée</p>
        <h1 className="headline mt-4">Merci pour votre commande</h1>
        <p className="mt-4 text-brou">
          {paid
            ? "Votre paiement a bien été reçu."
            : "Votre commande a été enregistrée."}{" "}
          {email
            ? `Un email de confirmation part vers ${email}.`
            : "Un email de confirmation vous a été envoyé."}
        </p>
        <p className="mt-2 text-sm text-brou">
          Chaque planche étant fabriquée à la main, un court délai de préparation
          peut s&apos;ajouter avant l&apos;expédition. Nous vous tiendrons informé.
        </p>

        {lineItems.length > 0 && (
          <div className="mt-10 text-left">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brou">
              Récapitulatif
            </h2>
            <ul className="mt-3 divide-y divide-bordure border-y border-bordure">
              {lineItems.map((li, i) => (
                <li key={i} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-ecorce">
                    {li.description}
                    {li.quantity > 1 ? ` × ${li.quantity}` : ""}
                  </span>
                  <span className="tabular-nums text-ecorce">
                    {formatEuros(li.amount)}
                  </span>
                </li>
              ))}
            </ul>
            {total !== null && (
              <div className="mt-3 flex justify-between font-serif text-lg text-ecorce">
                <span>Total</span>
                <span className="tabular-nums">{formatEuros(total)}</span>
              </div>
            )}
          </div>
        )}

        <Link href="/catalogue" className="btn btn-primary mt-10">
          Retour au catalogue
        </Link>
      </div>
    </div>
  );
}

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
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <ClearCartOnMount />

      <div className="rounded-xl border border-bordure bg-white p-8 text-center">
        <p className="text-4xl" aria-hidden>
          🌿
        </p>
        <h1 className="mt-4 text-3xl text-ecorce">Merci pour votre commande</h1>
        <p className="mt-3 text-brou">
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
          <div className="mt-8 text-left">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brou">
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

        <Link
          href="/catalogue"
          className="mt-8 inline-block rounded-lg bg-chene px-6 py-3 font-medium text-white hover:bg-chene-fonce"
        >
          Retour au catalogue
        </Link>
      </div>
    </div>
  );
}

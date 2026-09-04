"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { formatEuros } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, ready, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            essenceSlug: i.essenceSlug,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Le paiement est momentanément indisponible.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <div className="wrap-tight py-20">
        <p className="text-brou">Chargement du panier…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="wrap-tight py-24 text-center">
        <p className="eyebrow">Panier</p>
        <h1 className="headline mt-3">Votre panier est vide</h1>
        <p className="mt-4 text-brou">
          Découvrez les planches disponibles au catalogue.
        </p>
        <Link href="/catalogue" className="btn btn-primary mt-8">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap py-14 lg:py-20">
      <p className="eyebrow">Panier</p>
      <h1 className="display mt-4">Votre commande</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-bordure border-y border-bordure">
          {items.map((item) => (
            <li key={`${item.productId}::${item.essenceSlug}`} className="flex gap-5 py-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-creme">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/planches/${item.slug}`}
                      className="font-serif text-lg text-ecorce link-underline"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-brou">{item.essenceName}</p>
                  </div>
                  <span className="font-serif tabular-nums text-ecorce">
                    {formatEuros(item.price * item.quantity)}
                  </span>
                </div>
                <span className="mt-0.5 text-sm text-brou">
                  {formatEuros(item.price)} l&apos;unité
                </span>

                <div className="mt-auto flex items-center gap-4 pt-3">
                  <div className="inline-flex items-center rounded-full border border-bordure">
                    <button
                      type="button"
                      aria-label="Diminuer la quantité"
                      onClick={() =>
                        updateQuantity(item.productId, item.essenceSlug, item.quantity - 1)
                      }
                      className="h-9 w-9 text-lg text-brou transition-colors hover:text-ecorce"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Augmenter la quantité"
                      onClick={() =>
                        updateQuantity(item.productId, item.essenceSlug, item.quantity + 1)
                      }
                      className="h-9 w-9 text-lg text-brou transition-colors hover:text-ecorce"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.essenceSlug)}
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brou link-underline"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-2xl border border-bordure bg-creme p-6">
            <h2 className="font-serif text-xl text-ecorce">Récapitulatif</h2>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-brou">Sous-total</span>
              <span className="font-serif tabular-nums text-ecorce">
                {formatEuros(subtotal)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-brou">Livraison</span>
              <span className="text-brou">calculée au paiement</span>
            </div>

            {error && (
              <p className="mt-4 rounded-xl bg-chene/10 px-4 py-3 text-sm text-chene-fonce">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={checkout}
              disabled={loading}
              className="btn btn-primary mt-6 w-full disabled:opacity-60"
            >
              {loading ? "Redirection…" : "Passer au paiement"}
            </button>
            <p className="mt-3 text-center text-xs text-brou">
              Paiement sécurisé Stripe · Livraison France métropolitaine
            </p>
          </div>

          <Link
            href="/catalogue"
            className="mt-5 block text-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-chene link-underline"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}

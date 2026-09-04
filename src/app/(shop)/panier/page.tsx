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
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
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
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-brou">Chargement du panier…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl text-ecorce">Votre panier est vide</h1>
        <p className="mt-3 text-brou">
          Découvrez les planches disponibles au catalogue.
        </p>
        <Link
          href="/catalogue"
          className="mt-6 inline-block rounded-lg bg-chene px-6 py-3 font-medium text-white hover:bg-chene-fonce"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl text-ecorce">Votre panier</h1>

      <ul className="mt-8 divide-y divide-bordure border-y border-bordure">
        {items.map((item) => (
          <li key={item.productId} className="flex gap-4 py-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-bordure bg-creme">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col">
              <Link
                href={`/planches/${item.slug}`}
                className="font-serif text-ecorce hover:text-chene"
              >
                {item.title}
              </Link>
              <span className="text-sm text-brou">{formatEuros(item.price)}</span>

              <div className="mt-auto flex items-center gap-3 pt-2">
                <label className="text-xs text-brou" htmlFor={`qty-${item.productId}`}>
                  Qté
                </label>
                <input
                  id={`qty-${item.productId}`}
                  type="number"
                  min={1}
                  max={20}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.productId, Number(e.target.value))
                  }
                  className="w-16 rounded-md border border-bordure bg-white px-2 py-1 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-sm text-brou underline hover:text-chene-fonce"
                >
                  Retirer
                </button>
              </div>
            </div>

            <div className="font-serif tabular-nums text-ecorce">
              {formatEuros(item.price * item.quantity)}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between text-lg">
        <span className="text-brou">Sous-total</span>
        <span className="font-serif tabular-nums text-ecorce">
          {formatEuros(subtotal)}
        </span>
      </div>
      <p className="mt-1 text-right text-sm text-brou">
        Frais de livraison calculés à l&apos;étape suivante.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-chene/10 px-4 py-3 text-sm text-chene-fonce">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={checkout}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-chene px-6 py-3.5 font-medium text-white transition-colors hover:bg-chene-fonce disabled:opacity-60"
      >
        {loading ? "Redirection vers le paiement…" : "Passer au paiement"}
      </button>

      <p className="mt-3 text-center text-xs text-brou">
        Paiement sécurisé par carte bancaire via Stripe. Livraison en France
        métropolitaine.
      </p>

      <div className="mt-6 text-center">
        <Link href="/catalogue" className="text-sm text-chene hover:underline">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}

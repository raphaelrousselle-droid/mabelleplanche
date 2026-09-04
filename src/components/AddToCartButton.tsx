"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-lg bg-ecorce/10 px-6 py-3 text-center font-medium text-brou"
      >
        Épuisé pour le moment
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => {
          addItem({
            productId: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.images[0]?.url,
          });
          setAdded(true);
          window.setTimeout(() => setAdded(false), 2000);
        }}
        className="flex-1 rounded-lg bg-chene px-6 py-3 font-medium text-white transition-colors hover:bg-chene-fonce"
      >
        {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
      </button>
      <button
        type="button"
        onClick={() => {
          addItem({
            productId: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.images[0]?.url,
          });
          router.push("/panier");
        }}
        className="rounded-lg border border-chene px-6 py-3 font-medium text-chene transition-colors hover:bg-chene/10"
      >
        Commander
      </button>
    </div>
  );
}

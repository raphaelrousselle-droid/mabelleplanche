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
        className="btn w-full cursor-not-allowed bg-creme text-brou"
      >
        Épuisé pour le moment
      </button>
    );
  }

  const payload = {
    productId: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    image: product.images[0]?.url,
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => {
          addItem(payload);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 2000);
        }}
        className="btn btn-primary flex-1"
      >
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </button>
      <button
        type="button"
        onClick={() => {
          addItem(payload);
          router.push("/panier");
        }}
        className="btn btn-ghost"
      >
        Commander
      </button>
    </div>
  );
}

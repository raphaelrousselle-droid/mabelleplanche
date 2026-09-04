"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CartItem } from "@/components/cart/CartProvider";
import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({
  item,
  inStock,
}: {
  item: Omit<CartItem, "quantity">;
  inStock: boolean;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  if (!inStock) {
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

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => {
          addItem(item);
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
          addItem(item);
          router.push("/panier");
        }}
        className="btn btn-ghost"
      >
        Commander
      </button>
    </div>
  );
}

"use client";

import { useEffect } from "react";

import { useCart } from "@/components/cart/CartProvider";

/** Vide le panier une fois la commande confirmée. */
export function ClearCartOnMount() {
  const { clear, ready } = useCart();
  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);
  return null;
}

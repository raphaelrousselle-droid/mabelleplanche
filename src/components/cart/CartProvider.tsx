"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "mbp-cart-v2";

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  essenceSlug: string;
  essenceName: string;
  price: number;
  image?: string;
  quantity: number;
};

/** Identifiant de ligne : un même modèle dans deux essences = deux lignes distinctes. */
function lineId(productId: string, essenceSlug: string) {
  return `${productId}::${essenceSlug}`;
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, essenceSlug: string) => void;
  updateQuantity: (productId: string, essenceSlug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const MAX_QTY = 20;

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (i): i is CartItem =>
          i &&
          typeof i.productId === "string" &&
          typeof i.essenceSlug === "string" &&
          typeof i.price === "number" &&
          typeof i.quantity === "number",
      )
      .map((i) => ({ ...i, quantity: Math.min(Math.max(1, i.quantity), MAX_QTY) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* stockage indisponible : on ignore */
    }
  }, [items, ready]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const id = lineId(item.productId, item.essenceSlug);
        const existing = prev.find((i) => lineId(i.productId, i.essenceSlug) === id);
        if (existing) {
          return prev.map((i) =>
            lineId(i.productId, i.essenceSlug) === id
              ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QTY) }
              : i,
          );
        }
        return [...prev, { ...item, quantity: Math.min(quantity, MAX_QTY) }];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string, essenceSlug: string) => {
    const id = lineId(productId, essenceSlug);
    setItems((prev) => prev.filter((i) => lineId(i.productId, i.essenceSlug) !== id));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, essenceSlug: string, quantity: number) => {
      const id = lineId(productId, essenceSlug);
      setItems((prev) =>
        prev.flatMap((i) => {
          if (lineId(i.productId, i.essenceSlug) !== id) return [i];
          const q = Math.min(Math.max(1, Math.round(quantity)), MAX_QTY);
          return [{ ...i, quantity: q }];
        }),
      );
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
    return { items, count, subtotal, ready, addItem, removeItem, updateQuantity, clear };
  }, [items, ready, addItem, removeItem, updateQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}

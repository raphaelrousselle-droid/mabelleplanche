"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count, ready } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-sable/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-chene ${
                pathname.startsWith(item.href) ? "text-chene" : "text-brou"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <CartLink count={ready ? count : 0} />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <CartLink count={ready ? count : 0} />
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ecorce hover:bg-creme"
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-bordure bg-sable px-4 py-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-2 py-3 text-base text-ecorce hover:bg-creme"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function CartLink({ count }: { count: number }) {
  return (
    <Link
      href="/panier"
      className="relative inline-flex h-11 items-center gap-2 rounded-lg px-3 text-sm text-ecorce hover:bg-creme"
      aria-label={`Panier${count > 0 ? ` (${count} article${count > 1 ? "s" : ""})` : " (vide)"}`}
    >
      <span aria-hidden>🧺</span>
      <span className="hidden sm:inline">Panier</span>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-chene px-1 text-xs font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

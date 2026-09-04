"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/essences", label: "Les essences" },
  { href: "/a-propos", label: "L'atelier" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count, ready } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-bordure bg-sable/85 backdrop-blur-md"
          : "border-transparent bg-sable"
      }`}
    >
      <div className="wrap flex items-center justify-between gap-4 py-4">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active ? "text-chene" : "text-brou hover:text-ecorce"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <CartLink count={ready ? count : 0} />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <CartLink count={ready ? count : 0} />
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ecorce transition-colors hover:bg-creme"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        className={`grid overflow-hidden border-t border-bordure bg-sable transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <div className="min-h-0">
          <div className="wrap py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-bordure/60 py-3.5 font-serif text-lg text-ecorce last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

function CartLink({ count }: { count: number }) {
  return (
    <Link
      href="/panier"
      className="relative inline-flex h-10 items-center gap-2 rounded-full border border-bordure px-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ecorce transition-colors hover:border-ecorce hover:bg-white"
      aria-label={`Panier${count > 0 ? ` (${count} article${count > 1 ? "s" : ""})` : " (vide)"}`}
    >
      Panier
      <span className="tabular-nums text-brou">
        {count > 0 ? `(${count})` : ""}
      </span>
    </Link>
  );
}

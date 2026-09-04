"use client";

import Link from "next/link";

import type { ProductVariant } from "@/lib/types";

export function EssencePicker({
  variants,
  selected,
  onSelect,
}: {
  variants: ProductVariant[];
  selected: ProductVariant;
  onSelect: (essenceSlug: string) => void;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brou">
          Essence
        </span>
        <span className="text-sm text-ecorce">{selected.essenceName}</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {variants.map((v) => {
          const active = v.essenceSlug === selected.essenceSlug;
          return (
            <button
              key={v.essenceSlug}
              type="button"
              onClick={() => onSelect(v.essenceSlug)}
              aria-pressed={active}
              aria-label={`${v.essenceName}${v.inStock ? "" : " (épuisé)"}`}
              title={`${v.essenceName}${v.inStock ? "" : " — épuisé"}`}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                active
                  ? "border-ecorce"
                  : "border-transparent hover:border-bordure"
              }`}
            >
              <span
                className="h-8 w-8 rounded-full border border-black/10 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: v.swatch }}
              />
              {!v.inStock && (
                <span
                  aria-hidden
                  className="absolute inset-0 m-auto h-[1.5px] w-9 -rotate-45 bg-sable"
                  style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {!selected.inStock && (
        <p className="mt-2.5 text-sm text-brou">
          Épuisé en {selected.essenceName.toLowerCase()} pour le moment.
        </p>
      )}

      <Link
        href={`/essences#${selected.essenceSlug}`}
        className="link-underline mt-3 inline-block text-xs text-chene"
      >
        En savoir plus sur le {selected.essenceName.toLowerCase()} →
      </Link>
    </div>
  );
}

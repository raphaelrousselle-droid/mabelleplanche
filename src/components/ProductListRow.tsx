import Image from "next/image";
import Link from "next/link";

import { PriceTag } from "@/components/PriceTag";
import type { Product } from "@/lib/types";

export function ProductListRow({
  product,
  index,
}: {
  product: Product;
  index?: number;
}) {
  const cover = product.variants[0]?.images[0] ?? product.images[0];
  const inStock = product.variants.some((v) => v.inStock);
  const prices = product.variants.map((v) => v.price);
  const minPrice = Math.min(...prices, product.basePrice);
  const varies = new Set(prices).size > 1;

  return (
    <Link
      href={`/planches/${product.slug}`}
      className="group reveal hover-lift flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:gap-10"
    >
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-2xl bg-creme sm:aspect-square sm:w-56 lg:w-64">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt || product.title}
            fill
            sizes="(max-width: 640px) 90vw, 256px"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-serif text-brou/50">
            {product.title}
          </span>
        )}

        {typeof index === "number" && (
          <span className="absolute left-4 top-4 font-serif text-sm text-ecorce/45">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        {!inStock && (
          <span className="absolute right-4 top-4 rounded-full bg-sable/95 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brou">
            Épuisé
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="font-serif text-2xl text-ecorce">{product.title}</h3>
          <PriceTag
            amount={minPrice}
            prefix={varies ? "dès " : undefined}
            className="text-lg text-brou"
          />
        </div>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-brou/85">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          {product.dimensions && (
            <span className="text-xs uppercase tracking-[0.1em] text-brou/70">
              {product.dimensions}
            </span>
          )}

          {product.variants.length > 1 && (
            <div className="flex gap-1.5" aria-hidden>
              {product.variants.map((v) => (
                <span
                  key={v.essenceSlug}
                  className="h-2.5 w-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: v.swatch, opacity: v.inStock ? 1 : 0.3 }}
                />
              ))}
            </div>
          )}

          <span className="link-underline text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-chene opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Voir la planche
          </span>
        </div>
      </div>
    </Link>
  );
}

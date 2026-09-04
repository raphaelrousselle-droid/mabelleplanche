import Image from "next/image";
import Link from "next/link";

import { PriceTag } from "@/components/PriceTag";
import type { Product } from "@/lib/types";

export function ProductCard({
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
      className="group reveal hover-lift flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-creme">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt || product.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
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

        <span className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 items-center justify-center rounded-full bg-ecorce/90 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sable opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Voir la planche
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-lg text-ecorce">{product.title}</h3>
        <PriceTag
          amount={minPrice}
          prefix={varies ? "dès " : undefined}
          className="text-base text-brou"
        />
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-brou/85">
        {product.shortDescription}
      </p>

      {product.variants.length > 1 && (
        <div className="mt-2 flex gap-1.5" aria-hidden>
          {product.variants.map((v) => (
            <span
              key={v.essenceSlug}
              className="h-2.5 w-2.5 rounded-full border border-black/10"
              style={{ backgroundColor: v.swatch, opacity: v.inStock ? 1 : 0.3 }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}

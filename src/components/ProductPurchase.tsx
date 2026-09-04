"use client";

import { useMemo, useState } from "react";

import { AddToCartButton } from "@/components/AddToCartButton";
import { EssencePicker } from "@/components/EssencePicker";
import { PriceTag } from "@/components/PriceTag";
import { ProductGallery } from "@/components/ProductGallery";
import { RichText } from "@/components/RichText";
import { StockBadge } from "@/components/StockBadge";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const firstInStock = product.variants.find((v) => v.inStock) ?? product.variants[0];
  const [selectedSlug, setSelectedSlug] = useState(firstInStock.essenceSlug);

  const selected =
    product.variants.find((v) => v.essenceSlug === selectedSlug) ?? firstInStock;

  const images = useMemo(
    () => (selected.images.length > 0 ? selected.images : product.images),
    [selected, product.images],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={images} title={`${product.title} — ${selected.essenceName}`} />

      <div className="lg:pt-4">
        <div className="lg:sticky lg:top-28">
          <StockBadge inStock={selected.inStock} />
          <h1 className="mt-4 text-3xl text-ecorce sm:text-4xl">{product.title}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <PriceTag amount={selected.price} className="text-2xl text-ecorce" />
            <span className="text-xs uppercase tracking-[0.14em] text-brou/70">
              TTC · port en sus
            </span>
          </div>

          <p className="mt-6 text-brou">{product.shortDescription}</p>

          {product.variants.length > 1 && (
            <div className="mt-7 border-y border-bordure py-6">
              <EssencePicker
                variants={product.variants}
                selected={selected}
                onSelect={setSelectedSlug}
              />
            </div>
          )}

          <div className="mt-7">
            <AddToCartButton
              inStock={selected.inStock}
              item={{
                productId: product.id,
                slug: product.slug,
                title: product.title,
                essenceSlug: selected.essenceSlug,
                essenceName: selected.essenceName,
                price: selected.price,
                image: images[0]?.url,
              }}
            />
          </div>

          <dl className="mt-9 space-y-0 border-t border-bordure text-sm">
            <div className="flex justify-between gap-4 border-b border-bordure py-3.5">
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brou">
                Dimensions
              </dt>
              <dd className="text-right text-ecorce">{product.dimensions}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-bordure py-3.5">
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brou">
                Essence
              </dt>
              <dd className="text-right text-ecorce">{selected.essenceName}</dd>
            </div>
          </dl>

          {product.description.length > 0 && (
            <div className="mt-8">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brou">
                Description
              </h2>
              <div className="mt-3">
                <RichText blocks={product.description} />
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brou">
              Entretien
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brou">{product.care}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

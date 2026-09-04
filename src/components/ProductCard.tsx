import Image from "next/image";
import Link from "next/link";

import { PriceTag } from "@/components/PriceTag";
import { StockBadge } from "@/components/StockBadge";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <Link
      href={`/planches/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-bordure bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-creme">
        {cover && (
          <Image
            src={cover.url}
            alt={cover.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
        {!product.inStock && (
          <span className="absolute left-3 top-3">
            <StockBadge inStock={false} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-lg text-ecorce">{product.title}</h3>
        <p className="line-clamp-2 flex-1 text-sm text-brou">
          {product.shortDescription}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <PriceTag amount={product.price} className="text-lg text-ecorce" />
          <span className="text-sm text-chene group-hover:underline">Voir</span>
        </div>
      </div>
    </Link>
  );
}

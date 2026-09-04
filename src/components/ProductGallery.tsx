"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductImage } from "@/lib/types";

export function ProductGallery({
  images,
  title,
}: {
  images: ProductImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-bordure bg-creme">
        {current && (
          <Image
            src={current.url}
            alt={current.alt || title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>

      {images.length > 1 && (
        <ul className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <li key={img.url + i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir l'image ${i + 1}`}
                aria-current={i === active}
                className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 bg-creme transition-colors sm:h-20 sm:w-20 ${
                  i === active ? "border-chene" : "border-bordure hover:border-brou"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${title} — miniature ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
    <div className="flex flex-col gap-4 sm:flex-row-reverse">
      <div className="group relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-creme">
        {current && (
          <Image
            src={current.url}
            alt={current.alt || title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="motion-img object-cover"
          />
        )}
      </div>

      {images.length > 1 && (
        <ul className="flex gap-3 sm:flex-col">
          {images.map((img, i) => (
            <li key={img.url + i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir l'image ${i + 1}`}
                aria-current={i === active}
                className={`relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-xl bg-creme transition-all duration-200 hover:-translate-y-0.5 sm:h-20 sm:w-20 ${
                  i === active
                    ? "ring-2 ring-ecorce ring-offset-2 ring-offset-sable"
                    : "opacity-60 hover:opacity-100"
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

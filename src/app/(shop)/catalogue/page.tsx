import type { Metadata } from "next";

import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Toutes les planches à découper Ma belle planche disponibles : chêne, noyer, merisier, olivier, hêtre. Bois massif, fabrication artisanale.",
};

export default async function CataloguePage() {
  const products = await getProducts();
  const available = products.filter((p) => p.inStock);
  const soldOut = products.filter((p) => !p.inStock);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl text-ecorce sm:text-4xl">Le catalogue</h1>
        <p className="mt-3 text-brou">
          Chaque planche est fabriquée à la main, en série limitée. Les teintes et
          le veinage varient d&apos;une pièce à l&apos;autre : c&apos;est le propre
          du bois massif.
        </p>
      </header>

      {products.length === 0 ? (
        <p className="mt-10 text-brou">Aucune planche disponible pour le moment.</p>
      ) : (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {soldOut.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl text-ecorce">Momentanément épuisées</h2>
              <p className="mt-1 text-sm text-brou">
                Ces modèles reviennent régulièrement. Écrivez-nous pour être prévenu.
              </p>
              <div className="mt-5 grid gap-5 opacity-80 sm:grid-cols-2 lg:grid-cols-3">
                {soldOut.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

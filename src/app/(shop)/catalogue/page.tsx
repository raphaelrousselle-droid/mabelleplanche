import type { Metadata } from "next";

import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Toutes les planches à découper Ma belle planche : chêne, noyer, châtaignier, hêtre. Bois massif, fabrication artisanale.",
};

export default async function CataloguePage() {
  const products = await getProducts();
  const inStock = (p: (typeof products)[number]) => p.variants.some((v) => v.inStock);
  const available = products.filter(inStock);
  const soldOut = products.filter((p) => !inStock(p));

  return (
    <div className="wrap py-14 lg:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">Le catalogue</p>
        <h1 className="display mt-4">Les planches</h1>
        <p className="mt-5 text-lg text-brou">
          Chaque planche est fabriquée à la main, en série limitée. Les teintes
          et le veinage varient d&apos;une pièce à l&apos;autre — c&apos;est le
          propre du bois massif.
        </p>
      </header>

      {products.length === 0 ? (
        <p className="mt-12 text-brou">Aucune planche disponible pour le moment.</p>
      ) : (
        <>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {soldOut.length > 0 && (
            <section className="mt-20">
              <div className="border-t border-bordure pt-8">
                <h2 className="headline">Momentanément épuisées</h2>
                <p className="mt-2 max-w-md text-brou">
                  Ces modèles reviennent régulièrement. Écrivez-nous pour être
                  prévenu du prochain lot.
                </p>
              </div>
              <div className="mt-10 grid gap-x-6 gap-y-12 opacity-70 sm:grid-cols-2 lg:grid-cols-3">
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

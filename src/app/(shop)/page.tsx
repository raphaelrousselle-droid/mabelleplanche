import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, getSiteSettings } from "@/lib/store";

export default async function HomePage() {
  const [featured, settings] = await Promise.all([
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-chene">
              Fait main en France
            </p>
            <h1 className="mt-3 text-4xl leading-tight text-ecorce sm:text-5xl">
              Des planches à découper qui traversent les années
            </h1>
            <p className="mt-4 max-w-md text-lg text-brou">
              Bois massif choisi un à un, taillé, poncé et huilé à la main dans
              l&apos;atelier. Chaque planche est unique.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/catalogue"
                className="rounded-lg bg-chene px-6 py-3 font-medium text-white transition-colors hover:bg-chene-fonce"
              >
                Voir le catalogue
              </Link>
              <Link
                href="/a-propos"
                className="rounded-lg border border-bordure px-6 py-3 font-medium text-ecorce transition-colors hover:bg-creme"
              >
                L&apos;atelier
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-bordure bg-creme">
            {settings.workshopImageUrl && (
              <Image
                src={settings.workshopImageUrl}
                alt="L'atelier Ma belle planche"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Planches phares */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl text-ecorce sm:text-3xl">Nos planches phares</h2>
          <Link href="/catalogue" className="text-sm text-chene hover:underline">
            Tout voir
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-brou">
            Le catalogue arrive très bientôt.
          </p>
        )}
      </section>

      {/* Démarche */}
      <section className="border-y border-bordure bg-creme">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3 sm:px-6">
          {[
            {
              title: "Bois massif",
              text: "Aucun placage ni contreplaqué. Des essences choisies pour leur fil et leur densité.",
            },
            {
              title: "Finition alimentaire",
              text: "Ponçage en cinq grains puis plusieurs couches d'huile de qualité alimentaire.",
            },
            {
              title: "Entièrement fait main",
              text: "Chaque planche passe une dizaine de fois entre les mains de l'artisan.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-lg text-ecorce">{item.title}</h3>
              <p className="mt-2 text-sm text-brou">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

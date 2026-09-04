import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, getSiteSettings } from "@/lib/store";

const STEPS = [
  {
    title: "Choisir le bois",
    text: "Des grumes sélectionnées pour leur fil et leur densité, en privilégiant les essences françaises.",
  },
  {
    title: "Façonner à la main",
    text: "Débit, collage, rabotage, puis ponçage en cinq grains successifs. Une dizaine de passages entre les mains.",
  },
  {
    title: "Nourrir le bois",
    text: "Plusieurs couches d'huile de qualité alimentaire, pour une planche qui se patine et se transmet.",
  },
];

export default async function HomePage() {
  const [featured, settings] = await Promise.all([
    getFeaturedProducts(),
    getSiteSettings(),
  ]);

  const essences = Array.from(
    new Set(featured.map((p) => p.woodEssence.split(" ")[0])),
  );

  return (
    <div>
      {/* Hero */}
      <section className="wrap grid items-center gap-10 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
        <div>
          <p className="eyebrow">Atelier · Fait main en France</p>
          <h1 className="display mt-5">
            Des planches à découper qui{" "}
            <span className="serif-italic text-chene">traversent</span> les
            années
          </h1>
          <p className="mt-6 max-w-md text-lg text-brou">
            Bois massif choisi un à un, taillé, poncé et huilé à la main dans
            l&apos;atelier. Chaque pièce est unique.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalogue" className="btn btn-primary">
              Voir le catalogue
            </Link>
            <Link href="/a-propos" className="btn btn-ghost">
              Découvrir l&apos;atelier
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brou/70">
            <li>Bois massif</li>
            <li>Finition alimentaire</li>
            <li>Pièces uniques</li>
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-creme">
            {settings.workshopImageUrl && (
              <Image
                src={settings.workshopImageUrl}
                alt="L'atelier Ma belle planche"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-bordure bg-sable px-5 py-4 sm:block">
            <p className="font-serif text-2xl text-ecorce">100%</p>
            <p className="text-xs uppercase tracking-[0.14em] text-brou">
              fait main
            </p>
          </div>
        </div>
      </section>

      {/* Sélection */}
      <section className="wrap py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">La sélection</p>
            <h2 className="headline mt-3">Le choix de l&apos;atelier</h2>
          </div>
          <Link
            href="/catalogue"
            className="link-underline text-sm font-semibold uppercase tracking-[0.14em] text-chene"
          >
            Tout le catalogue
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-brou">Le catalogue arrive très bientôt.</p>
        )}
      </section>

      {/* Démarche — bandeau sombre */}
      <section className="bg-foret text-foret-clair">
        <div className="wrap py-20 lg:py-28">
          <p className="eyebrow text-chene">La démarche</p>
          <h2 className="headline mt-3 max-w-2xl text-foret-clair">
            Trois gestes, plusieurs jours, une planche pour la vie
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="reveal border-t border-foret-clair/20 pt-5">
                <span className="font-serif text-3xl text-foret-clair/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl text-foret-clair">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foret-clair/70">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {essences.length > 0 && (
            <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-foret-clair/15 pt-8 text-foret-clair/80">
              <span className="mr-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foret-clair/50">
                Essences travaillées
              </span>
              {essences.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-foret-clair/25 px-3.5 py-1 text-sm"
                >
                  {e}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="wrap py-20 text-center lg:py-28">
        <p className="eyebrow">La boutique</p>
        <h2 className="headline mx-auto mt-3 max-w-xl">
          Chaque planche est fabriquée en série limitée
        </h2>
        <p className="mx-auto mt-4 max-w-md text-brou">
          Les teintes et le veinage varient d&apos;une pièce à l&apos;autre :
          c&apos;est le propre du bois massif.
        </p>
        <Link href="/catalogue" className="btn btn-primary mt-8">
          Parcourir les planches
        </Link>
      </section>
    </div>
  );
}

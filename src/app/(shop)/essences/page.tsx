import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RichText } from "@/components/RichText";
import { getEssences } from "@/lib/store";

export const metadata: Metadata = {
  title: "Les essences",
  description:
    "Chêne, noyer, châtaignier, érable : les essences de bois travaillées par l'atelier Ma belle planche, et ce qu'elles apportent à chaque planche.",
};

export default async function EssencesPage() {
  const essences = await getEssences();

  return (
    <div>
      <section className="wrap grid items-end gap-10 pt-12 pb-14 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <p className="eyebrow">Le bois</p>
          <h1 className="display mt-4">Les essences</h1>
          <p className="mt-6 max-w-lg text-lg text-brou">
            Chaque modèle de planche est proposé dans une ou plusieurs
            essences. Ni meilleure ni moins bonne l&apos;une que l&apos;autre :
            un choix de teinte, de caractère et de densité.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-creme">
          <Image
            src="/photos/detail-gravure.jpg"
            alt="Détail de la marque Ma belle planche gravée sur une planche"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="wrap divide-y divide-bordure border-t border-bordure pb-8">
        {essences.map((essence, i) => (
          <article
            key={essence.slug}
            id={essence.slug}
            className="reveal grid scroll-mt-28 gap-8 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
              style={{ backgroundColor: essence.image ? undefined : essence.swatch }}
            >
              {essence.image ? (
                <Image
                  src={essence.image.url}
                  alt={essence.image.alt || essence.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center font-serif text-xl text-ecorce/60">
                  {essence.name}
                </span>
              )}
            </div>

            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full border border-black/10"
                  style={{ backgroundColor: essence.swatch }}
                  aria-hidden
                />
                <h2 className="font-serif text-2xl text-ecorce sm:text-3xl">
                  {essence.name}
                </h2>
              </div>
              <p className="mt-4 text-lg text-brou">{essence.shortDescription}</p>
              {essence.description.length > 0 && (
                <div className="mt-4">
                  <RichText blocks={essence.description} />
                </div>
              )}
              <Link
                href="/catalogue"
                className="link-underline mt-2 inline-block text-sm font-semibold uppercase tracking-[0.12em] text-chene"
              >
                Voir les planches en {essence.name.toLowerCase()} →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-foret text-foret-clair">
        <div className="wrap py-20 text-center lg:py-24">
          <h2 className="headline mx-auto max-w-xl text-foret-clair">
            Une essence en tête ? Découvre les modèles disponibles
          </h2>
          <Link href="/catalogue" className="btn btn-light mt-8">
            Voir le catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}

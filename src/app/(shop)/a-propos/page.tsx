import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RichText } from "@/components/RichText";
import { getAboutContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "L'atelier",
  description:
    "L'histoire de l'atelier Ma belle planche : le choix des bois, le geste artisanal et des objets faits pour durer.",
};

function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
    if (u.hostname.includes("vimeo.com"))
      return `https://player.vimeo.com/video/${u.pathname.replace("/", "")}`;
    return null;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const about = await getAboutContent();
  const embed = about.videoUrl ? toEmbedUrl(about.videoUrl) : null;

  return (
    <div>
      <section className="wrap grid items-end gap-10 pt-12 pb-14 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <p className="eyebrow">L&apos;atelier</p>
          <h1 className="display mt-4">{about.title}</h1>
          <p className="mt-6 max-w-lg text-lg text-brou">{about.intro}</p>
        </div>
        {about.images[0] && (
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-creme">
            <Image
              src={about.images[0].url}
              alt={about.images[0].alt || about.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="motion-img object-cover"
            />
          </div>
        )}
      </section>

      <section className="wrap-tight pb-8">
        <RichText blocks={about.body} />
      </section>

      {embed && (
        <section className="wrap pb-8">
          <div className="aspect-video overflow-hidden rounded-2xl border border-bordure">
            <iframe
              src={embed}
              title="Présentation de l'atelier"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </section>
      )}

      {about.images[1] && (
        <section className="wrap pb-4">
          <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-creme">
            <Image
              src={about.images[1].url}
              alt={about.images[1].alt || about.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="motion-img object-cover"
            />
          </div>
        </section>
      )}

      <section className="bg-foret text-foret-clair">
        <div className="wrap py-20 text-center lg:py-24">
          <h2 className="headline mx-auto max-w-xl text-foret-clair">
            Envie de voir les planches disponibles ?
          </h2>
          <Link href="/catalogue" className="btn btn-light mt-8">
            Découvrir le catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}

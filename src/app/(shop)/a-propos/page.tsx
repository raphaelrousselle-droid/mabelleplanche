import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RichText } from "@/components/RichText";
import { getAboutContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "À propos",
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
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      return `https://player.vimeo.com/video/${u.pathname.replace("/", "")}`;
    }
    return null;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const about = await getAboutContent();
  const embed = about.videoUrl ? toEmbedUrl(about.videoUrl) : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl text-ecorce sm:text-4xl">{about.title}</h1>
      <p className="mt-4 text-lg text-brou">{about.intro}</p>

      {about.images[0] && (
        <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-xl border border-bordure bg-creme">
          <Image
            src={about.images[0].url}
            alt={about.images[0].alt || about.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10">
        <RichText blocks={about.body} />
      </div>

      {embed && (
        <div className="mt-10 aspect-video overflow-hidden rounded-xl border border-bordure">
          <iframe
            src={embed}
            title="Présentation de l'atelier"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      )}

      {about.images[1] && (
        <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-xl border border-bordure bg-creme">
          <Image
            src={about.images[1].url}
            alt={about.images[1].alt || about.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-12 rounded-xl border border-bordure bg-creme p-6 text-center">
        <p className="font-serif text-lg text-ecorce">
          Envie de voir les planches disponibles ?
        </p>
        <Link
          href="/catalogue"
          className="mt-4 inline-block rounded-lg bg-chene px-6 py-3 font-medium text-white hover:bg-chene-fonce"
        >
          Découvrir le catalogue
        </Link>
      </div>
    </div>
  );
}

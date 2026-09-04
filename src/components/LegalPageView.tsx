import { notFound } from "next/navigation";

import { RichText } from "@/components/RichText";
import { getLegalPage } from "@/lib/store";
import type { LegalPageSlug } from "@/lib/types";

export async function LegalPageView({ slug }: { slug: LegalPageSlug }) {
  const page = await getLegalPage(slug);
  if (!page) notFound();

  const updated = new Date(page.updatedAt);
  const updatedLabel = Number.isNaN(updated.getTime())
    ? null
    : updated.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl text-ecorce sm:text-4xl">{page.title}</h1>
      {updatedLabel && (
        <p className="mt-2 text-sm text-brou">Dernière mise à jour : {updatedLabel}</p>
      )}
      <div className="mt-8">
        <RichText blocks={page.body} />
      </div>
    </div>
  );
}

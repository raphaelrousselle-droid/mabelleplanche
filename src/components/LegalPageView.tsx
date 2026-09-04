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
    <div className="wrap-tight py-14 lg:py-20">
      <p className="eyebrow">Informations</p>
      <h1 className="headline mt-4">{page.title}</h1>
      {updatedLabel && (
        <p className="mt-3 text-sm text-brou">
          Dernière mise à jour : {updatedLabel}
        </p>
      )}
      <div className="mt-10">
        <RichText blocks={page.body} />
      </div>
    </div>
  );
}

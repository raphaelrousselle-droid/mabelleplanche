import type { StructureResolver } from "sanity/structure";

/** Place les documents « uniques » (réglages, à propos) comme des entrées fixes. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Planches")
        .child(S.documentTypeList("product").title("Planches")),
      S.divider(),
      S.listItem()
        .title("Réglages du site")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Page « À propos »")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Pages légales")
        .child(S.documentTypeList("legalPage").title("Pages légales")),
    ]);

import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Page légale",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifiant d'URL",
      type: "slug",
      description:
        "Doit valoir exactement : mentions-legales, cgv ou confidentialite.",
      options: { source: "title" },
      validation: (rule) =>
        rule.required().custom((value) => {
          const allowed = ["mentions-legales", "cgv", "confidentialite"];
          return !value?.current || allowed.includes(value.current)
            ? true
            : "Identifiant attendu : mentions-legales, cgv ou confidentialite";
        }),
    }),
    defineField({ name: "updatedAt", title: "Date de mise à jour", type: "date" }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Titre", value: "h2" },
            { title: "Sous-titre", value: "h3" },
          ],
          lists: [{ title: "Puces", value: "bullet" }],
        },
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});

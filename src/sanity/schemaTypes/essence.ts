import { defineField, defineType } from "sanity";

export const essence = defineType({
  name: "essence",
  title: "Essence de bois",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifiant d'URL",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "swatch",
      title: "Couleur indicative",
      type: "string",
      description: "Code couleur hexadécimal utilisé pour la puce de sélection (ex. #b0794f).",
      validation: (rule) =>
        rule.required().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
          name: "hexadécimal",
        }),
    }),
    defineField({
      name: "shortDescription",
      title: "Description courte",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Description détaillée",
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
    defineField({
      name: "image",
      title: "Photo représentative",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texte alternatif", type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", media: "image", subtitle: "shortDescription" },
  },
});

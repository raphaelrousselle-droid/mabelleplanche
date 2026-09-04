import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Planche",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom du modèle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifiant d'URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "basePrice",
      title: "Prix de base (€ TTC)",
      type: "number",
      description: "Utilisé pour les essences qui n'ont pas de prix propre.",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "images",
      title: "Photos générales du modèle",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texte alternatif", type: "string" }],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "variants",
      title: "Essences disponibles",
      type: "array",
      of: [{ type: "productVariant" }],
      validation: (rule) => rule.min(1).error("Au moins une essence doit être proposée."),
    }),
    defineField({
      name: "shortDescription",
      title: "Description courte",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(220),
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
          marks: { decorators: [] },
        },
      ],
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: "Ex. : 40 × 25 × 3 cm",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "care",
      title: "Entretien",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Mise en avant sur l'accueil",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "orderRank",
      title: "Ordre d'affichage",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "title", media: "images.0", price: "basePrice", variants: "variants" },
    prepare({ title, media, price, variants }) {
      const count = Array.isArray(variants) ? variants.length : 0;
      return {
        title,
        subtitle: `${price ? `à partir de ${price} €` : "—"} · ${count} essence${count > 1 ? "s" : ""}`,
        media,
      };
    },
  },
});

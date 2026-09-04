import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Planche",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom",
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
      name: "price",
      title: "Prix (€ TTC)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "images",
      title: "Photos (plusieurs angles)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              description: "Description de l'image pour l'accessibilité et le SEO.",
            },
          ],
        },
      ],
      validation: (rule) => rule.min(1),
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
      of: [{ type: "block", styles: [
        { title: "Normal", value: "normal" },
        { title: "Titre", value: "h2" },
        { title: "Sous-titre", value: "h3" },
      ], lists: [{ title: "Puces", value: "bullet" }], marks: { decorators: [] } }],
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: "Ex. : 40 × 25 × 3 cm",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "woodEssence",
      title: "Essence de bois",
      type: "string",
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
      name: "inStock",
      title: "En stock",
      type: "boolean",
      description: "Décochez pour afficher « Épuisé » et empêcher l'ajout au panier.",
      initialValue: true,
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
    select: { title: "title", media: "images.0", price: "price", inStock: "inStock" },
    prepare({ title, media, price, inStock }) {
      return {
        title,
        subtitle: `${price ? `${price} €` : "—"}${inStock === false ? " · Épuisé" : ""}`,
        media,
      };
    },
  },
});

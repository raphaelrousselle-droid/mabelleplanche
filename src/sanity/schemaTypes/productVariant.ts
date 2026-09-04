import { defineField, defineType } from "sanity";

/**
 * Déclinaison d'un modèle de planche dans une essence donnée : une planche
 * peut exister en plusieurs essences, chacune avec son propre stock et,
 * si besoin, son propre prix et ses propres photos.
 */
export const productVariant = defineType({
  name: "productVariant",
  title: "Déclinaison (essence)",
  type: "object",
  fields: [
    defineField({
      name: "essence",
      title: "Essence",
      type: "reference",
      to: [{ type: "essence" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceOverride",
      title: "Prix pour cette essence (€)",
      type: "number",
      description: "Laisser vide pour reprendre le prix de base du modèle.",
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: "inStock",
      title: "En stock",
      type: "boolean",
      description: "Décochez pour afficher « Épuisé » sur cette essence précisément.",
      initialValue: true,
    }),
    defineField({
      name: "images",
      title: "Photos propres à cette essence",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texte alternatif", type: "string" }],
        },
      ],
      description: "Facultatif : à défaut, les photos générales du modèle sont utilisées.",
    }),
  ],
  preview: {
    select: { title: "essence.name", price: "priceOverride", inStock: "inStock" },
    prepare({ title, price, inStock }) {
      return {
        title: title || "Essence non choisie",
        subtitle: `${price ? `${price} €` : "prix du modèle"}${inStock === false ? " · Épuisé" : ""}`,
      };
    },
  },
});

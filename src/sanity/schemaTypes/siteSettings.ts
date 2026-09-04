import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Nom commercial", type: "string" }),
    defineField({
      name: "legalStatus",
      title: "Statut juridique",
      type: "string",
      description: "Ex. : Entreprise individuelle (auto-entrepreneur)",
    }),
    defineField({ name: "siret", title: "SIRET", type: "string" }),
    defineField({ name: "address", title: "Adresse", type: "string" }),
    defineField({
      name: "hostingInfo",
      title: "Hébergeur (mentions légales)",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "contactEmail", title: "Email de contact public", type: "string" }),
    defineField({
      name: "notificationEmail",
      title: "Email de réception des commandes",
      type: "string",
    }),
    defineField({ name: "instagramUrl", title: "Lien Instagram", type: "url" }),
    defineField({ name: "tiktokUrl", title: "Lien TikTok", type: "url" }),
    defineField({
      name: "shippingLabel",
      title: "Libellé de livraison",
      type: "string",
      description: "Ex. : Livraison France (Colissimo suivi)",
    }),
    defineField({
      name: "shippingAmount",
      title: "Frais de port (€)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "shippingFreeThreshold",
      title: "Livraison offerte à partir de (€)",
      type: "number",
      description: "Laisser vide pour ne jamais offrir la livraison.",
    }),
    defineField({
      name: "workshopImage",
      title: "Photo de l'atelier (accueil)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "workshopVideoUrl",
      title: "Vidéo de l'atelier (URL YouTube/Vimeo)",
      type: "url",
    }),
  ],
  preview: { prepare: () => ({ title: "Réglages du site" }) },
});

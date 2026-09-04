import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Page « À propos »",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
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
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texte alternatif", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Vidéo (URL YouTube/Vimeo)",
      type: "url",
    }),
  ],
  preview: { prepare: () => ({ title: "Page « À propos »" }) },
});

export type ProductImage = {
  url: string;
  alt: string;
};

export type RichBlock =
  | { style: "h2" | "h3" | "normal"; text: string }
  | { style: "bullets"; items: string[] };

/** Une essence de bois (chêne, noyer, châtaignier, érable...) — page dédiée + choix à la commande. */
export type Essence = {
  id: string;
  slug: string;
  name: string;
  /** Couleur indicative pour les puces de sélection (hex, ex. "#a9744f") */
  swatch: string;
  shortDescription: string;
  description: RichBlock[];
  image?: ProductImage;
};

/** Déclinaison d'un modèle de planche dans une essence donnée. */
export type ProductVariant = {
  essenceSlug: string;
  essenceName: string;
  swatch: string;
  /** Prix TTC en euros pour cette essence (par défaut = basePrice du modèle) */
  price: number;
  inStock: boolean;
  /** Photos propres à cette essence ; à défaut on affiche les photos du modèle. */
  images: ProductImage[];
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  /** Prix TTC en euros par défaut, utilisé quand une essence n'a pas de prix propre. */
  basePrice: number;
  /** Photos par défaut du modèle (affichées avant sélection d'une essence, ou si l'essence n'a pas de photo dédiée). */
  images: ProductImage[];
  shortDescription: string;
  description: RichBlock[];
  dimensions: string;
  care: string;
  featured: boolean;
  variants: ProductVariant[];
};

export type ShippingRate = {
  label: string;
  /** Montant en euros */
  amount: number;
  /** Livraison offerte à partir de ce total d'articles en euros (optionnel) */
  freeThreshold?: number;
};

export type SiteSettings = {
  companyName: string;
  legalStatus: string;
  siret: string;
  address: string;
  hostingInfo: string;
  contactEmail: string;
  notificationEmail: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  shipping: ShippingRate;
  workshopImageUrl?: string;
  workshopVideoUrl?: string;
};

export type AboutContent = {
  title: string;
  intro: string;
  body: RichBlock[];
  images: ProductImage[];
  videoUrl?: string;
};

export type LegalPageSlug = "mentions-legales" | "cgv" | "confidentialite";

export type LegalPage = {
  slug: LegalPageSlug;
  title: string;
  updatedAt: string;
  body: RichBlock[];
};

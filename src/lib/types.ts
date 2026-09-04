export type ProductImage = {
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  /** Prix TTC en euros (ex. 74.9) */
  price: number;
  images: ProductImage[];
  shortDescription: string;
  description: RichBlock[];
  dimensions: string;
  woodEssence: string;
  care: string;
  inStock: boolean;
  featured: boolean;
};

export type RichBlock =
  | { style: "h2" | "h3" | "normal"; text: string }
  | { style: "bullets"; items: string[] };

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

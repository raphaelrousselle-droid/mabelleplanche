import "server-only";

import {
  placeholderAbout,
  placeholderEssences,
  placeholderLegalPages,
  placeholderProducts,
  placeholderSettings,
} from "./placeholder-data";
import { sanityClient } from "./sanity/client";
import { isSanityConfigured } from "./sanity/env";
import { portableTextToRichBlocks } from "./sanity/portable-text";
import {
  aboutQuery,
  allEssencesQuery,
  allProductsQuery,
  featuredProductsQuery,
  legalPageQuery,
  productByIdQuery,
  productBySlugQuery,
  siteSettingsQuery,
} from "./sanity/queries";
import type {
  AboutContent,
  Essence,
  LegalPage,
  LegalPageSlug,
  Product,
  SiteSettings,
} from "./types";

const REVALIDATE_SECONDS = 60;

type RawProduct = Omit<Product, "description"> & { description?: unknown };
type RawEssence = Omit<Essence, "description"> & { description?: unknown };

function normalizeProduct(raw: RawProduct): Product {
  return {
    ...raw,
    images: (raw.images ?? []).filter((img) => Boolean(img?.url)),
    variants: (raw.variants ?? []).map((v) => ({
      ...v,
      images: (v.images ?? []).filter((img) => Boolean(img?.url)),
    })),
    description: Array.isArray(raw.description)
      ? // Vient du CMS (Portable Text) ou déjà au bon format (démo)
        raw.description.some((b) => b && typeof b === "object" && "_type" in b)
        ? portableTextToRichBlocks(raw.description)
        : (raw.description as Product["description"])
      : [],
  };
}

function normalizeEssence(raw: RawEssence): Essence {
  return {
    ...raw,
    description: Array.isArray(raw.description)
      ? raw.description.some((b) => b && typeof b === "object" && "_type" in b)
        ? portableTextToRichBlocks(raw.description)
        : (raw.description as Essence["description"])
      : [],
  };
}

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

/**
 * Sécurité : si Sanity est configuré mais qu'aucun contenu n'a encore été
 * publié (dataset pas encore alimenté par `npm run seed` ou par le Studio),
 * on retombe sur les données de démonstration au lieu d'afficher une boutique
 * vide. Un avertissement est journalisé pour ne pas masquer un vrai problème.
 */
function fallbackIfEmpty<T>(data: T[] | null | undefined, fallback: T[], label: string): T[] {
  if (!data || data.length === 0) {
    if (isSanityConfigured) {
      console.warn(
        `[store] Sanity ne renvoie aucun résultat pour « ${label} » : utilisation des données de démonstration. Lancez « npm run seed » ou ajoutez du contenu dans le Studio (studio-mabelleplanche/).`,
      );
    }
    return fallback;
  }
  return data;
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return placeholderProducts;
  const data = await sanityFetch<RawProduct[]>(allProductsQuery);
  return fallbackIfEmpty(data?.map(normalizeProduct), placeholderProducts, "catalogue");
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const featuredPlaceholders = placeholderProducts.filter((p) => p.featured);
  if (!isSanityConfigured) return featuredPlaceholders;
  const data = await sanityFetch<RawProduct[]>(featuredProductsQuery);
  return fallbackIfEmpty(
    data?.map(normalizeProduct),
    featuredPlaceholders,
    "planches phares",
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return placeholderProducts.find((p) => p.slug === slug) ?? null;
  }
  const data = await sanityFetch<RawProduct | null>(productBySlugQuery, { slug });
  if (data) return normalizeProduct(data);
  return placeholderProducts.find((p) => p.slug === slug) ?? null;
}

/**
 * Utilisé au checkout : la source de vérité pour le prix et le stock.
 * Pas de repli sur les données de démo ici — on préfère refuser une commande
 * plutôt que de facturer un produit fantôme.
 */
export async function getProductById(id: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return placeholderProducts.find((p) => p.id === id) ?? null;
  }
  const data = await sanityFetch<RawProduct | null>(productByIdQuery, { id });
  return data ? normalizeProduct(data) : null;
}

export async function getEssences(): Promise<Essence[]> {
  if (!isSanityConfigured) return placeholderEssences;
  const data = await sanityFetch<RawEssence[]>(allEssencesQuery);
  return fallbackIfEmpty(data?.map(normalizeEssence), placeholderEssences, "essences");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return placeholderSettings;
  const data = await sanityFetch<Partial<SiteSettings> | null>(siteSettingsQuery);
  if (!data) return placeholderSettings;
  return {
    ...placeholderSettings,
    ...data,
    shipping: {
      ...placeholderSettings.shipping,
      ...(data.shipping ?? {}),
    },
  };
}

export async function getAboutContent(): Promise<AboutContent> {
  if (!isSanityConfigured) return placeholderAbout;
  const data = await sanityFetch<
    (Omit<AboutContent, "body"> & { body?: unknown }) | null
  >(aboutQuery);
  if (!data) return placeholderAbout;
  return {
    title: data.title ?? placeholderAbout.title,
    intro: data.intro ?? placeholderAbout.intro,
    body: Array.isArray(data.body)
      ? portableTextToRichBlocks(data.body)
      : placeholderAbout.body,
    images: (data.images ?? placeholderAbout.images).filter((img) => Boolean(img?.url)),
    videoUrl: data.videoUrl,
  };
}

export async function getLegalPage(slug: LegalPageSlug): Promise<LegalPage | null> {
  if (!isSanityConfigured) {
    return placeholderLegalPages.find((p) => p.slug === slug) ?? null;
  }
  const data = await sanityFetch<
    (Omit<LegalPage, "body"> & { body?: unknown }) | null
  >(legalPageQuery, { slug });
  if (!data) return placeholderLegalPages.find((p) => p.slug === slug) ?? null;
  return {
    slug,
    title: data.title,
    updatedAt: data.updatedAt,
    body: Array.isArray(data.body) ? portableTextToRichBlocks(data.body) : [],
  };
}

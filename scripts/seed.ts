/**
 * Remplit un dataset Sanity avec les données de démonstration : 4 essences de
 * bois, 6 modèles de planches (avec leurs déclinaisons par essence), réglages
 * du site, page « À propos » et 3 pages légales.
 *
 *   npm run seed          # lit .env.local
 *
 * Les photos de démonstration (SVG dans /public/placeholders, photos réelles
 * de l'atelier dans /public/photos) sont importées pour que la boutique soit
 * présentable immédiatement. Remplacez-les depuis le Studio (/studio).
 * Relancer le script met à jour les documents de démo (mêmes _id) sans
 * toucher à ce que vous avez ajouté à la main.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

import { createClient } from "@sanity/client";

import {
  placeholderAbout,
  placeholderEssences,
  placeholderLegalPages,
  placeholderProducts,
  placeholderSettings,
} from "../src/lib/placeholder-data";
import type { RichBlock } from "../src/lib/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Variables manquantes : NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_API_WRITE_TOKEN sont requis.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function toPortableText(blocks: RichBlock[]) {
  const out: unknown[] = [];
  for (const block of blocks) {
    if (block.style === "bullets") {
      for (const item of block.items) {
        out.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: key(), text: item, marks: [] }],
        });
      }
      continue;
    }
    out.push({
      _type: "block",
      _key: key(),
      style: block.style,
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: block.text, marks: [] }],
    });
  }
  return out;
}

const assetCache = new Map<string, string>();

/** Importe une image de /public une seule fois, renvoie l'_id de l'asset. */
async function uploadPublicImage(publicPath: string): Promise<string | null> {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath)!;
  try {
    const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const buffer = await readFile(filePath);
    const filename = path.basename(publicPath);
    const contentType = filename.endsWith(".svg")
      ? "image/svg+xml"
      : filename.endsWith(".png")
        ? "image/png"
        : "image/jpeg";
    const asset = await client.assets.upload("image", buffer, { filename, contentType });
    assetCache.set(publicPath, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`  image ignorée (${publicPath}) :`, (err as Error).message);
    return null;
  }
}

async function imageArray(images: { url: string; alt: string }[]) {
  const out = [];
  for (const img of images) {
    const assetId = await uploadPublicImage(img.url);
    if (!assetId) continue;
    out.push({
      _type: "image",
      _key: key(),
      alt: img.alt,
      asset: { _type: "reference", _ref: assetId },
    });
  }
  return out;
}

/** Une image de démonstration par essence, pour illustrer la page /essences. */
const essencePlaceholderImage: Record<string, string> = {
  chene: "/placeholders/board-oak.svg",
  noyer: "/placeholders/board-walnut.svg",
  chataignier: "/placeholders/board-chestnut.svg",
  hetre: "/placeholders/board-beech.svg",
};

async function run() {
  console.log("Import des images de démonstration…");

  // --- Essences (créées d'abord : les modèles les référencent) ---
  const essenceDocs = [];
  for (const e of placeholderEssences) {
    const imgPath = essencePlaceholderImage[e.slug];
    const assetId = imgPath ? await uploadPublicImage(imgPath) : null;
    essenceDocs.push({
      // NB : un _id Sanity ne doit pas contenir de point.
      _id: e.id,
      _type: "essence",
      name: e.name,
      slug: { _type: "slug", current: e.slug },
      swatch: e.swatch,
      shortDescription: e.shortDescription,
      description: toPortableText(e.description),
      ...(assetId
        ? { image: { _type: "image", asset: { _type: "reference", _ref: assetId } } }
        : {}),
    });
  }

  // --- Modèles de planches ---
  const productDocs = [];
  for (let i = 0; i < placeholderProducts.length; i++) {
    const p = placeholderProducts[i];
    const variants = [];
    for (const v of p.variants) {
      variants.push({
        _type: "productVariant",
        _key: key(),
        essence: { _type: "reference", _ref: `essence-${v.essenceSlug}` },
        ...(v.price !== p.basePrice ? { priceOverride: v.price } : {}),
        inStock: v.inStock,
        images: await imageArray(v.images),
      });
    }
    productDocs.push({
      _id: p.id,
      _type: "product",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      basePrice: p.basePrice,
      images: await imageArray(p.images),
      variants,
      shortDescription: p.shortDescription,
      description: toPortableText(p.description),
      dimensions: p.dimensions,
      care: p.care,
      featured: p.featured,
      orderRank: String(i).padStart(4, "0"),
    });
  }

  const workshopAsset = placeholderSettings.workshopImageUrl
    ? await uploadPublicImage(placeholderSettings.workshopImageUrl)
    : null;

  const aboutImages = await imageArray(placeholderAbout.images);

  const tx = client.transaction();

  // Essences renommées/retirées au fil des corrections : on nettoie l'ancien
  // document pour ne pas laisser une entrée fantôme dans le Studio.
  // (essence-erable -> renommée essence-hetre le 2026-09-04)
  const LEGACY_ESSENCE_IDS = ["essence-erable"];
  LEGACY_ESSENCE_IDS.forEach((id) => tx.delete(id));

  essenceDocs.forEach((doc) => tx.createOrReplace(doc));
  productDocs.forEach((doc) => tx.createOrReplace(doc));

  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: placeholderSettings.companyName,
    legalStatus: placeholderSettings.legalStatus,
    siret: placeholderSettings.siret,
    address: placeholderSettings.address,
    hostingInfo: placeholderSettings.hostingInfo,
    contactEmail: placeholderSettings.contactEmail,
    notificationEmail: placeholderSettings.notificationEmail,
    instagramUrl: placeholderSettings.instagramUrl,
    tiktokUrl: placeholderSettings.tiktokUrl,
    shippingLabel: placeholderSettings.shipping.label,
    shippingAmount: placeholderSettings.shipping.amount,
    shippingFreeThreshold: placeholderSettings.shipping.freeThreshold,
    ...(workshopAsset
      ? {
          workshopImage: {
            _type: "image",
            asset: { _type: "reference", _ref: workshopAsset },
          },
        }
      : {}),
  });

  tx.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    title: placeholderAbout.title,
    intro: placeholderAbout.intro,
    body: toPortableText(placeholderAbout.body),
    images: aboutImages,
    videoUrl: placeholderAbout.videoUrl,
  });

  placeholderLegalPages.forEach((page) => {
    tx.createOrReplace({
      _id: `legal-${page.slug}`,
      _type: "legalPage",
      title: page.title,
      slug: { _type: "slug", current: page.slug },
      updatedAt: page.updatedAt,
      body: toPortableText(page.body),
    });
  });

  const result = await tx.commit();
  const count = "results" in result ? result.results.length : 0;
  console.log(
    `Seed terminé : ${count} documents créés/mis à jour dans « ${dataset} ».`,
  );
  console.log("→ Ouvrez /studio pour remplacer les images et textes de démonstration.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

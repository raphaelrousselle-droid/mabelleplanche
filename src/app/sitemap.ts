import type { MetadataRoute } from "next";

import { getProducts } from "@/lib/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const products = await getProducts();

  const staticRoutes = [
    "",
    "/catalogue",
    "/a-propos",
    "/contact",
    "/cgv",
    "/mentions-legales",
    "/confidentialite",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/planches/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}

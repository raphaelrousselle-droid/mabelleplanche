import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductPurchase } from "@/components/ProductPurchase";
import { getProductBySlug, getProducts } from "@/lib/store";

type Params = { slug: string };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Planche introuvable" };
  const cover = product.variants[0]?.images[0]?.url ?? product.images[0]?.url;
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="wrap py-8 sm:py-12">
      <nav className="mb-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brou">
        <Link href="/catalogue" className="link-underline">
          ← Catalogue
        </Link>
      </nav>

      <ProductPurchase product={product} />
    </div>
  );
}

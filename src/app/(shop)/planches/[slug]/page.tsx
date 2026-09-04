import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/AddToCartButton";
import { PriceTag } from "@/components/PriceTag";
import { ProductGallery } from "@/components/ProductGallery";
import { RichText } from "@/components/RichText";
import { StockBadge } from "@/components/StockBadge";
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
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: product.images[0]?.url ? [product.images[0].url] : undefined,
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-brou">
        <Link href="/catalogue" className="hover:text-chene">
          ← Retour au catalogue
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} title={product.title} />

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl text-ecorce sm:text-4xl">{product.title}</h1>
            <StockBadge inStock={product.inStock} />
          </div>

          <PriceTag
            amount={product.price}
            className="mt-4 block text-2xl text-ecorce"
          />
          <p className="mt-1 text-xs text-brou">
            Prix TTC · Livraison en France en supplément
          </p>

          <p className="mt-6 text-brou">{product.shortDescription}</p>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          <dl className="mt-8 divide-y divide-bordure border-y border-bordure text-sm">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-brou">Dimensions</dt>
              <dd className="text-right text-ecorce">{product.dimensions}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-brou">Essence de bois</dt>
              <dd className="text-right text-ecorce">{product.woodEssence}</dd>
            </div>
          </dl>

          {product.description.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg text-ecorce">Description</h2>
              <div className="mt-2">
                <RichText blocks={product.description} />
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-lg text-ecorce">Entretien</h2>
            <p className="mt-2 text-sm leading-relaxed text-brou">{product.care}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

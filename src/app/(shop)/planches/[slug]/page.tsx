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
    <div className="wrap py-8 sm:py-12">
      <nav className="mb-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brou">
        <Link href="/catalogue" className="link-underline">
          ← Catalogue
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} title={product.title} />

        <div className="lg:pt-4">
          <div className="lg:sticky lg:top-28">
            <StockBadge inStock={product.inStock} />
            <h1 className="mt-4 text-3xl text-ecorce sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <PriceTag amount={product.price} className="text-2xl text-ecorce" />
              <span className="text-xs uppercase tracking-[0.14em] text-brou/70">
                TTC · port en sus
              </span>
            </div>

            <p className="mt-6 text-brou">{product.shortDescription}</p>

            <div className="mt-7">
              <AddToCartButton product={product} />
            </div>

            <dl className="mt-9 space-y-0 border-t border-bordure text-sm">
              <div className="flex justify-between gap-4 border-b border-bordure py-3.5">
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brou">
                  Dimensions
                </dt>
                <dd className="text-right text-ecorce">{product.dimensions}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-bordure py-3.5">
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brou">
                  Essence
                </dt>
                <dd className="text-right text-ecorce">{product.woodEssence}</dd>
              </div>
            </dl>

            {product.description.length > 0 && (
              <div className="mt-8">
                <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brou">
                  Description
                </h2>
                <div className="mt-3">
                  <RichText blocks={product.description} />
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brou">
                Entretien
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brou">
                {product.care}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

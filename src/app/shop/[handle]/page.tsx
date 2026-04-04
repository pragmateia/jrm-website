import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import ProductDetailClient from "@/components/shop/ProductDetailClient";

interface Props {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ color?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };

  const description = `Shop ${product.title} from Jesus Rules Ministries. Every purchase supports the mission.`;
  const image = product.images.edges[0]?.node;
  const url = `https://jesusrules.co/shop/${handle}`;

  return {
    title: product.title,
    description,
    alternates: {
      canonical: `/shop/${handle}`,
    },
    openGraph: {
      title: product.title,
      description,
      type: "website",
      url,
      siteName: "Jesus Rules Ministries",
      images: image
        ? [{ url: image.url, width: 1200, height: 630, alt: product.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { color } = await searchParams;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.edges.map((e: { node: { url: string } }) => e.node.url),
    brand: {
      "@type": "Brand",
      name: "Jesus Rules Ministries",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      availability: "https://schema.org/InStock",
      url: `https://jesusrules.co/shop/${handle}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} initialColor={color} />
    </>
  );
}

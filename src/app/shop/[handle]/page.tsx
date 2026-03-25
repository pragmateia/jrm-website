import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import ProductDetailClient from "@/components/shop/ProductDetailClient";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };

  const image = product.images.edges[0]?.node;
  return {
    title: product.title,
    description: `Shop ${product.title} from Jesus Rules Ministries. Every purchase supports the mission.`,
    openGraph: {
      title: product.title,
      images: image ? [{ url: image.url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}

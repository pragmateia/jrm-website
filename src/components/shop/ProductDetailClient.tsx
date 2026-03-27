"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ShopifyProductDetail } from "@/lib/shopify";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";

export default function ProductDetailClient({
  product,
}: {
  product: ShopifyProductDetail;
}) {
  const variants = product.variants.edges.map((e) => e.node);
  const images = product.images.edges.map((e) => e.node);

  // Initialize selected options — prefer Large size, then first available variant
  const initialVariant =
    variants.find(
      (v) =>
        v.availableForSale &&
        v.selectedOptions.some(
          (so) => so.name.toLowerCase() === "size" && so.value.toUpperCase() === "L"
        )
    ) ||
    variants.find((v) => v.availableForSale) ||
    variants[0];

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    const opts: Record<string, string> = {};
    for (const so of initialVariant.selectedOptions) {
      opts[so.name] = so.value;
    }
    return opts;
  });

  // Find the variant matching current selection
  const selectedVariant = useMemo(() => {
    return variants.find((v) =>
      v.selectedOptions.every(
        (so) => selectedOptions[so.name] === so.value
      )
    );
  }, [variants, selectedOptions]);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const price = selectedVariant
    ? parseFloat(selectedVariant.price.amount).toFixed(2)
    : parseFloat(variants[0].price.amount).toFixed(2);

  // Build a set of all variant front image URLs
  const variantImageUrls = useMemo(() => {
    const urls = new Set<string>();
    for (const v of variants) {
      if (v.image?.url) urls.add(v.image.url);
    }
    return urls;
  }, [variants]);

  // Find the back image for the selected variant's color
  const backImage = useMemo(() => {
    const frontUrl = selectedVariant?.image?.url;
    if (!frontUrl) return null;
    const frontIdx = images.findIndex((img) => img.url === frontUrl);
    if (frontIdx === -1 || frontIdx + 1 >= images.length) return null;
    const nextImg = images[frontIdx + 1];
    // Only treat as "back" if it's not another variant's front image
    if (variantImageUrls.has(nextImg.url)) return null;
    return nextImg;
  }, [selectedVariant, images, variantImageUrls]);

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-[11px] text-white/30 font-body tracking-wide">
            <li>
              <Link href="/shop" className="hover:text-white/60 transition-colors">
                Shop
              </Link>
            </li>
            <li>/</li>
            <li className="text-white/50 truncate">{product.title}</li>
          </ol>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Gallery */}
          <ProductGallery
            images={images}
            selectedImage={selectedVariant?.image?.url}
            backImage={backImage}
          />

          {/* Right — Product info */}
          <div className="flex flex-col">
            <h1 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">
              {product.title}
            </h1>

            <p className="text-lg text-white/60 font-body mb-6">${price}</p>

            {/* Variant selectors */}
            <div className="mb-8">
              <VariantSelector
                options={product.options}
                variants={variants}
                selectedOptions={selectedOptions}
                onOptionChange={handleOptionChange}
              />
            </div>

            {/* Add to cart */}
            <AddToCartButton
              variantId={selectedVariant?.id || ""}
              availableForSale={selectedVariant?.availableForSale ?? false}
            />

            {/* Description */}
            {product.descriptionHtml && (
              <div
                className="mt-10 pt-8 border-t border-white/10 prose prose-invert prose-sm max-w-none text-white/50 [&_a]:text-gold [&_a:hover]:text-gold-light"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

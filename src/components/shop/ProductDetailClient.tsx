"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ShopifyProductDetail } from "@/lib/shopify";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";

export default function ProductDetailClient({
  product,
  initialColor,
}: {
  product: ShopifyProductDetail;
  initialColor?: string;
}) {
  const variants = product.variants.edges.map((e) => e.node);
  const images = product.images.edges.map((e) => e.node);

  // Initialize selected options:
  // 1. If initialColor is provided (from ?color= query param), prefer that color in size L
  // 2. Otherwise prefer size L, then first available variant
  const initialVariant = (() => {
    if (initialColor) {
      // Try: matching color + size L + available
      const colorAndSizeL = variants.find(
        (v) =>
          v.availableForSale &&
          v.selectedOptions.some(
            (so) => so.name.toLowerCase() === "color" && so.value === initialColor
          ) &&
          v.selectedOptions.some(
            (so) => so.name.toLowerCase() === "size" && so.value.toUpperCase() === "L"
          )
      );
      if (colorAndSizeL) return colorAndSizeL;
      // Fallback: matching color + available (any size)
      const colorOnly = variants.find(
        (v) =>
          v.availableForSale &&
          v.selectedOptions.some(
            (so) => so.name.toLowerCase() === "color" && so.value === initialColor
          )
      );
      if (colorOnly) return colorOnly;
    }
    // Default: size L + available, then any available, then first
    return (
      variants.find(
        (v) =>
          v.availableForSale &&
          v.selectedOptions.some(
            (so) => so.name.toLowerCase() === "size" && so.value.toUpperCase() === "L"
          )
      ) ||
      variants.find((v) => v.availableForSale) ||
      variants[0]
    );
  })();

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

  // Find the actual color option name (could be "Color", "Colour", etc.)
  const colorOptionName = useMemo(() => {
    const opt = product.options.find(
      (o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour"
    );
    return opt?.name ?? null;
  }, [product.options]);

  // Map image URL → color name for thumbnail click → color selection
  // Uses filename matching first (Printify names contain color + front/back),
  // falls back to proximity-based matching for images with numeric filenames
  const imageToColor = useMemo(() => {
    const map = new Map<string, string>();
    if (!colorOptionName) return map;
    // First pass: map all variant front images to their color and indices
    const frontIndices: { idx: number; color: string }[] = [];
    const colorSet = new Set<string>();
    for (const v of variants) {
      const color = v.selectedOptions.find(
        (so) => so.name === colorOptionName
      )?.value;
      if (!v.image?.url || !color) continue;
      colorSet.add(color);
      if (!map.has(v.image.url)) {
        map.set(v.image.url, color);
        const idx = images.findIndex((img) => img.url === v.image!.url);
        if (idx !== -1) frontIndices.push({ idx, color });
      }
    }
    frontIndices.sort((a, b) => a.idx - b.idx);
    // Second pass: try filename matching for non-variant images
    const colorsWithBack = new Set<string>();
    const stillUnassigned: { i: number; url: string }[] = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (map.has(img.url) || variantImageUrls.has(img.url)) continue;
      // Extract filename and check for color name + "back"
      const filename = img.url.split("/").pop()?.split("?")[0]?.toLowerCase() ?? "";
      let matched = false;
      if (filename.includes("back")) {
        for (const color of colorSet) {
          const slug = color.toLowerCase().replace(/\s+/g, "-");
          if (filename.includes(slug) && !colorsWithBack.has(color)) {
            map.set(img.url, color);
            colorsWithBack.add(color);
            matched = true;
            break;
          }
        }
      }
      if (!matched) stillUnassigned.push({ i, url: img.url });
    }
    // Third pass: proximity fallback for remaining unassigned images
    const withDist = stillUnassigned.map((u) => {
      let bestDist = Infinity;
      let bestColor = "";
      for (const f of frontIndices) {
        const d = Math.abs(u.i - f.idx);
        if (d < bestDist) { bestDist = d; bestColor = f.color; }
      }
      return { ...u, bestDist, bestColor };
    });
    withDist.sort((a, b) => a.bestDist - b.bestDist);
    for (const item of withDist) {
      const sorted = frontIndices
        .map((f) => ({ ...f, dist: Math.abs(item.i - f.idx) }))
        .sort((a, b) => a.dist - b.dist);
      let assigned = false;
      for (const f of sorted) {
        if (!colorsWithBack.has(f.color)) {
          map.set(item.url, f.color);
          colorsWithBack.add(f.color);
          assigned = true;
          break;
        }
      }
      if (!assigned && sorted.length > 0) {
        map.set(item.url, sorted[0].color);
      }
    }
    return map;
  }, [variants, images, variantImageUrls, colorOptionName]);

  // Find the back image for the selected variant's color
  // Matches by color mapping instead of relying on image array position
  const backImage = useMemo(() => {
    const frontUrl = selectedVariant?.image?.url;
    if (!frontUrl || !colorOptionName) return null;
    const selectedColor = selectedVariant?.selectedOptions.find(
      (so) => so.name === colorOptionName
    )?.value;
    if (!selectedColor) return null;
    for (const img of images) {
      if (img.url === frontUrl) continue;
      if (variantImageUrls.has(img.url)) continue;
      if (imageToColor.get(img.url) === selectedColor) return img;
    }
    return null;
  }, [selectedVariant, images, variantImageUrls, imageToColor, colorOptionName]);


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

        {/* Mobile-only title above gallery */}
        <h1 className="md:hidden font-heading text-3xl text-white tracking-tight mb-4">
          {product.title}
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Gallery */}
          <ProductGallery
            images={images}
            selectedImage={selectedVariant?.image?.url}
            backImage={backImage}
            variantImageUrls={variantImageUrls}
            onImageSelect={(url) => {
              const color = imageToColor.get(url);
              if (color && colorOptionName) handleOptionChange(colorOptionName, color);
            }}
          />

          {/* Right — Product info */}
          <div className="flex flex-col">
            <h1 className="hidden md:block font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">
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

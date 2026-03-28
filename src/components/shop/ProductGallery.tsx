"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

interface GalleryImage {
  url: string;
  altText: string | null;
}

export default function ProductGallery({
  images,
  selectedImage,
  backImage,
  variantImageUrls,
  onImageSelect,
}: {
  images: GalleryImage[];
  selectedImage?: string | null;
  backImage?: GalleryImage | null;
  variantImageUrls?: Set<string>;
  onImageSelect?: (url: string) => void;
}) {
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  // Sidebar thumbnails: show only variant front images (one per color).
  // This prevents back images and duplicate-color images from cluttering the sidebar.
  const sidebarImages = useMemo(() => {
    if (!variantImageUrls || variantImageUrls.size === 0) return images;
    // Preserve Shopify image order but filter to only variant front images
    return images.filter((img) => variantImageUrls.has(img.url));
  }, [images, variantImageUrls]);

  // Reset to front side when the selected color changes
  useEffect(() => {
    setActiveSide("front");
  }, [selectedImage]);

  // Determine what to show in the main display
  const showBack = activeSide === "back" && backImage;
  const frontImage = selectedImage
    ? images.find((img) => img.url === selectedImage) || images[0]
    : images[0];
  const mainImage = showBack ? backImage : frontImage;

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-white/5 flex items-center justify-center">
        <span className="text-white/20 text-sm">No image</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Thumbnails — only variant front images (one per color) */}
      {sidebarImages.length > 1 && (
        <div className="absolute left-0 top-0 bottom-0 w-16 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-2">
          {sidebarImages.map((img) => (
            <button
              key={img.url}
              onClick={() => {
                setActiveSide("front");
                onImageSelect?.(img.url);
              }}
              className={`flex-shrink-0 w-16 h-20 relative overflow-hidden bg-[#e8e8e8] border transition-colors ${
                img.url === selectedImage && activeSide === "front"
                  ? "border-gold"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || "Color variant"}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
          </div>
        </div>
      )}

      {/* Main image + front/back toggle */}
      <div className={`flex flex-col gap-3 ${sidebarImages.length > 1 ? "ml-[76px]" : ""}`}>
        {/* Main image */}
        <div className="aspect-square max-h-[70vh] relative bg-[#e8e8e8] overflow-hidden">
          {mainImage && (
            <Image
              src={mainImage.url}
              alt={mainImage.altText || "Product image"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        {/* Front/Back toggle — only shown when a back image is available */}
        {backImage && frontImage && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setActiveSide("front")}
              className={`w-20 h-24 relative overflow-hidden bg-[#e8e8e8] border-2 transition-colors ${
                activeSide === "front"
                  ? "border-gold"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image
                src={frontImage.url}
                alt="Front"
                fill
                className="object-cover"
                sizes="80px"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[10px] text-white/90 text-center py-0.5 font-body tracking-wide">
                Front
              </span>
            </button>
            <button
              onClick={() => setActiveSide("back")}
              className={`w-20 h-24 relative overflow-hidden bg-[#e8e8e8] border-2 transition-colors ${
                activeSide === "back"
                  ? "border-gold"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image
                src={backImage.url}
                alt="Back"
                fill
                className="object-cover"
                sizes="80px"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[10px] text-white/90 text-center py-0.5 font-body tracking-wide">
                Back
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

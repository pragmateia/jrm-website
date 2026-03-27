"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface GalleryImage {
  url: string;
  altText: string | null;
}

export default function ProductGallery({
  images,
  selectedImage,
  backImage,
}: {
  images: GalleryImage[];
  selectedImage?: string | null;
  backImage?: GalleryImage | null;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  // When variant changes (new color), jump to the front image and reset to front side
  useEffect(() => {
    if (selectedImage) {
      const idx = images.findIndex((img) => img.url === selectedImage);
      if (idx !== -1) setActiveIndex(idx);
    }
    setActiveSide("front");
  }, [selectedImage, images]);

  // Determine what to show in the main display
  const showBack = activeSide === "back" && backImage;
  const mainImage = showBack ? backImage : images[activeIndex];

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-white/5 flex items-center justify-center">
        <span className="text-white/20 text-sm">No image</span>
      </div>
    );
  }

  return (
    <div className={images.length > 1 ? "flex flex-col-reverse gap-3 sm:grid sm:grid-cols-[auto_1fr]" : ""}>
      {/* Thumbnails — horizontal scroll on mobile, vertical on left (grid-constrained) on desktop */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-x-visible sm:overflow-y-auto sm:min-h-0 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => {
                setActiveIndex(i);
                setActiveSide("front");
              }}
              className={`flex-shrink-0 w-16 h-20 relative overflow-hidden bg-[#e8e8e8] border transition-colors ${
                i === activeIndex && activeSide === "front"
                  ? "border-gold"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || `Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image + front/back toggle */}
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="aspect-square max-h-[70vh] relative bg-[#e8e8e8] overflow-hidden">
          <Image
            src={mainImage.url}
            alt={mainImage.altText || "Product image"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Front/Back toggle — only shown when a back image is available */}
        {backImage && selectedImage && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setActiveSide("front");
                if (selectedImage) {
                  const idx = images.findIndex((img) => img.url === selectedImage);
                  if (idx !== -1) setActiveIndex(idx);
                }
              }}
              className={`w-20 h-24 relative overflow-hidden bg-[#e8e8e8] border-2 transition-colors ${
                activeSide === "front"
                  ? "border-gold"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image
                src={selectedImage}
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

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
}: {
  images: GalleryImage[];
  selectedImage?: string | null;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // When variant changes (new color/size), jump to that image
  useEffect(() => {
    if (selectedImage) {
      const idx = images.findIndex((img) => img.url === selectedImage);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [selectedImage, images]);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-white/5 flex items-center justify-center">
        <span className="text-white/20 text-sm">No image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px] scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-20 relative overflow-hidden bg-[#e8e8e8] border transition-colors ${
                i === activeIndex
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

      {/* Main image */}
      <div className="flex-1 aspect-square max-h-[70vh] relative bg-[#e8e8e8] overflow-hidden">
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].altText || "Product image"}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}

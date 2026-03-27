"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // When the variant changes (new color/size), jump to that variant's image
  useEffect(() => {
    if (selectedImage) {
      const idx = images.findIndex((img) => img.url === selectedImage);
      if (idx !== -1) {
        setActiveIndex(idx);
        setIsFlipped(false);
      }
    }
  }, [selectedImage, images]);

  const hasNextImage = activeIndex + 1 < images.length;

  const handleFlip = useCallback(() => {
    if (isAnimating || !hasNextImage) return;
    setIsAnimating(true);
    setIsFlipped((prev) => !prev);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, hasNextImage]);

  const handleThumbnailClick = (i: number) => {
    setActiveIndex(i);
    setIsFlipped(false);
  };

  // The front image is the active one, the back is the next one
  const frontImage = images[activeIndex];
  const backImage = hasNextImage ? images[activeIndex + 1] : null;

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
              onClick={() => handleThumbnailClick(i)}
              className={`flex-shrink-0 w-16 h-20 relative overflow-hidden bg-[#e8e8e8] border transition-colors ${
                i === activeIndex || (isFlipped && i === activeIndex + 1)
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

      {/* Main image area */}
      <div className="flex-1 flex flex-col gap-3">
        {/* 3D Flip Card */}
        <div
          className="aspect-square max-h-[70vh] relative cursor-pointer"
          style={{ perspective: "1200px" }}
          onClick={handleFlip}
        >
          <div
            className="w-full h-full relative transition-transform duration-500 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 bg-[#e8e8e8] overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Image
                src={frontImage.url}
                alt={frontImage.altText || "Product front"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Back face */}
            {backImage && (
              <div
                className="absolute inset-0 bg-[#e8e8e8] overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Image
                  src={backImage.url}
                  alt={backImage.altText || "Product back"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* Flip indicator */}
          {backImage && (
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-body tracking-wider uppercase px-3 py-1.5 rounded-full pointer-events-none">
              {isFlipped ? "Front" : "Back"} →
            </div>
          )}
        </div>

        {/* Secondary image thumbnail (the other side) */}
        {backImage && (
          <button
            onClick={handleFlip}
            className={`w-20 h-24 relative overflow-hidden bg-[#e8e8e8] border transition-all ${
              isFlipped
                ? "border-white/10 hover:border-white/30"
                : "border-white/10 hover:border-gold/50"
            }`}
          >
            <Image
              src={isFlipped ? frontImage.url : backImage.url}
              alt={isFlipped ? "View front" : "View back"}
              fill
              className="object-cover"
              sizes="80px"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="text-white text-[9px] font-body tracking-wider uppercase">
                {isFlipped ? "Front" : "Back"}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

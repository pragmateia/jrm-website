"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface ShopProduct {
  handle: string;
  title: string;
  category: string;
  variants: {
    id: string;
    title: string;
    price: string;
    image: { url: string; altText: string | null } | null;
    productHandle: string;
    productTitle: string;
  }[];
}

/** Pre-resolved style card data passed from the server */
export interface StyleCardData {
  label: string;
  subtitle: string;
  handles: string[];
  coverImage: string | null;
  variantCount: number;
}

const ALL_LABEL = "All";

export default function ShopProductGrid({
  products,
  styleCards,
}: {
  products: ShopProduct[];
  styleCards: StyleCardData[];
}) {
  // Derive unique categories from the product list, preserving a stable order
  const categoryOrder = ["T-Shirts", "Hoodies", "Hats", "Other"];
  const categories = Array.from(new Set(products.map((p) => p.category)));
  categories.sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);

  // Only show filter tabs if there are at least 2 categories
  const showFilter = categories.length >= 2;

  const filtered =
    activeCategory === ALL_LABEL
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Whether we're showing style cards (All tab)
  const showingStyleCards = activeCategory === ALL_LABEL;

  return (
    <div>
      {/* Filter tabs */}
      {showFilter && (
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-10 mb-10">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[ALL_LABEL, ...categories].map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === ALL_LABEL
                  ? products.length
                  : products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    text-[11px] sm:text-[12px] font-body font-semibold tracking-[0.15em] uppercase
                    px-4 sm:px-5 py-2 sm:py-2.5 border transition-all duration-200
                    ${
                      isActive
                        ? "border-gold/60 text-gold bg-gold/[0.08]"
                        : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/25"
                    }
                  `}
                >
                  {cat}
                  <span
                    className={`ml-1.5 text-[10px] ${
                      isActive ? "text-gold/60" : "text-white/20"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Style Cards — shown when "All" is active and no style is drilled into */}
      {showingStyleCards && (
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {styleCards.map((card) => (
              <Link
                key={card.label}
                href={`/shop/${card.handles[0]}`}
                className="group relative aspect-[3/4] overflow-hidden text-left border border-white/[0.06] bg-white/[0.03]"
              >
                {/* Background image */}
                {card.coverImage ? (
                  <Image
                    src={card.coverImage}
                    alt={`${card.label} ${card.subtitle}`}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, 300px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-dark-light" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <p className="text-[10px] sm:text-[11px] font-body font-semibold text-gold tracking-[0.2em] uppercase mb-1.5">
                    {card.subtitle}
                  </p>
                  <h3 className="font-heading text-lg sm:text-xl lg:text-2xl text-white tracking-tight leading-tight mb-2">
                    {card.label}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-body text-white/40">
                    {card.variantCount}{" "}
                    {card.variantCount === 1 ? "colorway" : "colorways"}
                  </p>
                </div>

                {/* Hover border accent */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-300 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Product rows — shown for category tabs or drilled-into styles */}
      {!showingStyleCards && (
        <div className="space-y-12">
          {filtered.map((product) => (
            <div key={product.handle}>
              <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-10 mb-4">
                <h3 className="text-sm font-body font-medium text-white/70 tracking-wide">
                  {product.title}
                </h3>
              </div>
              <div className="overflow-x-auto scrollbar-hide">
                <div
                  className="flex gap-3 pl-8 sm:pl-12 lg:pl-10 pr-8 pb-2"
                  style={{ minWidth: "max-content" }}
                >
                  {product.variants.map((v) => {
                    const color = v.title.includes(" / ")
                      ? v.title.split(" / ")[0]
                      : v.title;
                    return (
                      <Link
                        key={v.id}
                        href={`/shop/${v.productHandle}?color=${encodeURIComponent(color)}`}
                        className="group flex-shrink-0 w-[200px] sm:w-[220px]"
                      >
                        <div className="aspect-[3/4] relative bg-white/[0.06] border border-white/[0.06] overflow-hidden mb-2">
                          {v.image ? (
                            <Image
                              src={v.image.url}
                              alt={
                                v.image.altText ||
                                `${v.productTitle} — ${v.title}`
                              }
                              fill
                              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                              sizes="160px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Image
                                src="/images/logo-white.png"
                                alt={v.productTitle}
                                width={40}
                                height={40}
                                className="opacity-10"
                              />
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-white/50 line-clamp-1">
                          {v.title}
                        </p>
                        <p className="text-[11px] text-white/40">
                          ${parseFloat(v.price).toFixed(2)}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/30 text-sm">
                No products in this category yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

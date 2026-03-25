import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/shopify";

const placeholderProducts = [
  { id: "1", title: "Jesus Rules Classic Tee", handle: "jesus-rules-classic-tee", price: "35.00", image: "/images/logo-white.png" },
  { id: "2", title: "Crown Logo Hoodie", handle: "crown-logo-hoodie", price: "65.00", image: "/images/crown-logo.png" },
  { id: "3", title: "Beach Volleyball Tee", handle: "beach-volleyball-tee", price: "35.00", image: "/images/logo-white.png" },
  { id: "4", title: "Jesus Rules Hat", handle: "jesus-rules-hat", price: "30.00", image: "/images/crown-logo.png" },
];

export default async function FeaturedMerch() {
  const shopifyProducts = await getFeaturedProducts();
  const hasShopify = shopifyProducts.length > 0;

  return (
    <section className="py-12 sm:py-16 bg-background">
      {/* Header */}
      <div className="px-8 sm:px-12 lg:px-20 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] sm:text-[13px] font-body font-semibold tracking-[0.3em] uppercase text-white/50 mb-3">
              Merchandise
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white">
              Rep the Mission
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[12px] font-body font-semibold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors link-underline hidden sm:block"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Horizontal scroll carousel */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-8 sm:px-12 lg:px-20 pb-4" style={{ minWidth: "min-content" }}>
          {hasShopify
            ? shopifyProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.handle}`}
                  className="group relative flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[30vw] overflow-hidden"
                >
                  <div className="aspect-[3/4] relative bg-white/5">
                    {product.images.edges[0] ? (
                      <Image
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 30vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image src="/images/logo-white.png" alt={product.title} width={80} height={80} className="opacity-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-[11px] font-body font-semibold tracking-[0.25em] uppercase text-white/60 mb-2">
                      Jesus Rules Ministries
                    </p>
                    <h3 className="font-heading text-xl sm:text-2xl text-white mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-white/50 text-sm font-body mb-4">
                      ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                    <span className="text-[11px] sm:text-[12px] font-body font-semibold tracking-[0.15em] uppercase text-white border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                      Shop Now
                    </span>
                  </div>
                </Link>
              ))
            : placeholderProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.handle}`}
                  className="group relative flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[30vw] overflow-hidden"
                >
                  <div className="aspect-[3/4] relative bg-white/5 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-[11px] font-body font-semibold tracking-[0.25em] uppercase text-white/60 mb-2">
                      Jesus Rules Ministries
                    </p>
                    <h3 className="font-heading text-xl sm:text-2xl text-white mb-1">
                      {product.title}
                    </h3>
                    <p className="text-white/50 text-sm font-body mb-4">
                      ${product.price}
                    </p>
                    <span className="text-[11px] sm:text-[12px] font-body font-semibold tracking-[0.15em] uppercase text-white border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                      Shop Now
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      {/* Mobile "View All" */}
      <div className="px-8 sm:hidden mt-8 text-center">
        <Link
          href="/shop"
          className="text-[12px] font-body font-semibold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors link-underline"
        >
          View All
        </Link>
      </div>
    </section>
  );
}

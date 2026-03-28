import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts, getProductVariants } from "@/lib/shopify";
import type { ProductImages } from "@/lib/shopify";
import ProductMarquee from "@/components/ProductMarquee";
import ShopProductGrid, {
  type ShopProduct,
  type StyleCardData,
} from "@/components/shop/ShopProductGrid";
import { inferCategory, STYLE_CARDS, getActiveHandles } from "@/lib/product-categories";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Jesus Rules Ministries merchandise. Every purchase supports tournament travel, discipleship training, and Gospel outreach.",
};

const placeholderProducts = [
  { id: "1", title: "Jesus Rules Classic Tee — White", handle: "jesus-rules-classic-tee-white", price: "35.00", image: "/images/logo-white.png" },
  { id: "2", title: "Jesus Rules Classic Tee — Black", handle: "jesus-rules-classic-tee-black", price: "35.00", image: "/images/logo-white.png" },
  { id: "3", title: "Crown Logo Hoodie — White", handle: "crown-logo-hoodie-white", price: "65.00", image: "/images/crown-logo.png" },
  { id: "4", title: "Crown Logo Hoodie — Black", handle: "crown-logo-hoodie-black", price: "65.00", image: "/images/crown-logo.png" },
  { id: "5", title: "Beach Design Tee", handle: "beach-design-tee", price: "35.00", image: "/images/logo-white.png" },
  { id: "6", title: "Jesus Rules Hat", handle: "jesus-rules-hat", price: "30.00", image: "/images/crown-logo.png" },
];

/** Fisher-Yates shuffle — mutates array in place */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default async function ShopPage() {
  const shopifyProducts = await getProducts(20);
  const { variants, productImages } = await getProductVariants();
  const hasShopify = shopifyProducts.length > 0;

  // Group variants by product for the Shop All rows
  const variantsByProduct: ShopProduct[] = [];
  const seenHandles = new Set<string>();
  for (const v of variants) {
    if (!seenHandles.has(v.product.handle)) {
      seenHandles.add(v.product.handle);
      variantsByProduct.push({
        handle: v.product.handle,
        title: v.product.title,
        category: inferCategory(v.product.productType, v.product.title),
        variants: [],
      });
    }
    variantsByProduct
      .find((p) => p.handle === v.product.handle)!
      .variants.push({
        id: v.id,
        title: v.title,
        price: v.price,
        image: v.image,
        productHandle: v.product.handle,
        productTitle: v.product.title,
      });
  }

  // Only include products that belong to a defined style card
  const activeHandles = getActiveHandles();
  const curatedProducts = variantsByProduct.filter((p) => activeHandles.has(p.handle));

  // Randomize product order — reshuffles each revalidation cycle
  shuffle(curatedProducts);

  // Helper: find the back image for a variant front image using the same
  // logic as ProductDetailClient — the next image in the product's image list
  // that isn't another variant's front image.
  function findBackImage(
    frontUrl: string,
    prodImgs: ProductImages
  ): { url: string; altText: string | null } | null {
    const frontIdx = prodImgs.images.findIndex((img) => img.url === frontUrl);
    if (frontIdx === -1 || frontIdx + 1 >= prodImgs.images.length) return null;
    const nextImg = prodImgs.images[frontIdx + 1];
    // Only treat as "back" if it's not another variant's front image
    if (prodImgs.variantImageUrls.has(nextImg.url)) return null;
    return nextImg;
  }

  // Build a lookup from product handle to ProductImages
  const productImagesMap = new Map<string, ProductImages>();
  for (const pi of productImages) {
    productImagesMap.set(pi.handle, pi);
  }

  // Build style card data — resolve cover images and variant counts from
  // productImages (which includes ALL products from the API, not just the
  // L-size-filtered variants).  This ensures style cards always have images
  // even if their products' variants were filtered out by the size gate.
  const styleCardData: StyleCardData[] = STYLE_CARDS.map((card) => {
    let coverImage: string | null = null;
    let variantCount = 0;

    for (const handle of card.handles) {
      const pi = productImagesMap.get(handle);
      if (pi) {
        // Use the first product-level image as cover (front image of first color)
        if (!coverImage && pi.images.length > 0) {
          coverImage = pi.images[0].url;
        }
        // Count unique color variants (from the variantsByProduct list if available,
        // otherwise fall back to variantImageUrls which has one per color+size combo)
        const product = curatedProducts.find((p) => p.handle === handle);
        if (product) {
          variantCount += product.variants.length;
        } else {
          // Product exists in Shopify but didn't make it through the L-size filter.
          // Count unique variant front images as a proxy for colorway count.
          variantCount += pi.variantImageUrls.size;
        }
      }
    }

    return {
      label: card.label,
      subtitle: card.subtitle,
      handles: card.handles,
      coverImage,
      variantCount,
    };
  });

  // Build marquee items — front + back image for each color variant (shuffled)
  // Extract color from variant title (e.g. "Navy / L" → "Navy", or just "Navy" if no size)
  // Only include curated products in the marquee
  const curatedVariants = variants.filter((v) => activeHandles.has(v.product.handle));
  const marqueeItems = curatedVariants.length > 0
    ? shuffle(curatedVariants.flatMap((v) => {
        const frontUrl = v.image?.url || "/images/logo-white.png";
        const color = v.title.includes(" / ") ? v.title.split(" / ")[0] : v.title;
        const colorParam = `?color=${encodeURIComponent(color)}`;
        const items = [
          {
            id: v.id,
            title: `${v.product.title} — ${v.title}`,
            image: frontUrl,
            href: `/shop/${v.product.handle}${colorParam}`,
          },
        ];
        // Add back image if available (not a size chart)
        const prodImgs = productImagesMap.get(v.product.handle);
        if (prodImgs && v.image?.url) {
          const back = findBackImage(v.image.url, prodImgs);
          if (back) {
            items.push({
              id: `${v.id}-back`,
              title: `${v.product.title} — ${v.title} (Back)`,
              image: back.url,
              href: `/shop/${v.product.handle}${colorParam}`,
            });
          }
        }
        return items;
      }))
    : placeholderProducts.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.image,
        href: `/shop/${p.handle}`,
      }));

  return (
    <div>
      {/* Hero — full viewport, editorial */}
      <section className="relative h-screen min-h-[600px] flex items-end">
        <Image
          src="/images/editorial/prayer-circle.png"
          alt="Team in prayer wearing Jesus Rules merch"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 sm:px-12 lg:px-10 pb-20 sm:pb-28">
          <p className="text-[11px] sm:text-[12px] font-body font-semibold text-white/70 tracking-[0.3em] uppercase mb-4">
            Jesus Rules Ministries
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-white tracking-tight mb-4">
            The Collection
          </h1>
          <p className="font-heading text-white/60 text-lg sm:text-xl italic max-w-md mb-8">
            Wear the mission. Start conversations. Support the Gospel.
          </p>
          <a
            href="#products"
            className="text-[12px] font-body font-semibold tracking-[0.2em] uppercase text-white border-b border-white/40 pb-1 hover:border-white transition-colors"
          >
            Shop Now
          </a>
        </div>
        {/* Product marquee — horizontal on mobile, vertical right side on desktop */}
        <div className="absolute z-20 bottom-[45%] left-0 right-0 sm:bottom-0 sm:top-0 sm:left-auto sm:right-6 lg:right-10 sm:w-[150px] sm:py-12">
          <ProductMarquee items={marqueeItems} />
        </div>
      </section>

      {/* Product Carousel */}
      <section id="products" className="py-20 sm:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-10 mb-12">
          <div className="text-center">
            <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
              Merchandise
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              Shop All
            </h2>
          </div>
        </div>

        {hasShopify ? (
          <ShopProductGrid products={curatedProducts} styleCards={styleCardData} />
        ) : (
          <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {placeholderProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.handle}`}
                  className="group"
                >
                  <div className="aspect-[3/4] relative bg-white/[0.06] flex items-center justify-center overflow-hidden mb-3">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                    />
                  </div>
                  <h3 className="text-xs font-body font-medium text-white mb-0.5 group-hover:text-gold transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-white/40">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!hasShopify && (
          <div className="mt-12 text-center">
            <p className="text-white/25 text-xs mb-6">
              Products load automatically once the Shopify Storefront API is connected.
            </p>
            <a
              href="https://jesusrules.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-body font-semibold tracking-[0.2em] uppercase text-white/50 border-b border-white/20 pb-1 hover:text-white hover:border-white/40 transition-colors"
            >
              Visit Current Shop
            </a>
          </div>
        )}
      </section>

      {/* Editorial split — two portrait panels */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-black">
        {[
          {
            src: "/images/editorial/diego-merch-back.jpg",
            alt: "Diego in Jesus Rules tee holding volleyball",
            label: "Competition Tees",
            heading: "On the Sand",
          },
          {
            src: "/images/editorial/fans-boardwalk.jpg",
            alt: "Fans wearing Jesus Rules merch at AVP tournament",
            label: "Supporters",
            heading: "In the Stands",
          },
        ].map((panel) => (
          <div key={panel.label} className="relative h-[80vh] sm:h-screen overflow-hidden group">
            <Image
              src={panel.src}
              alt={panel.alt}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 sm:p-10">
              <p className="text-[10px] sm:text-[11px] font-body font-semibold text-white/60 tracking-[0.25em] uppercase mb-3">
                {panel.label}
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight">
                {panel.heading}
              </h2>
            </div>
          </div>
        ))}
      </section>

      {/* Full-width editorial banner */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <Image
          src="/images/editorial/diego-fans.jpg"
          alt="Diego celebrating with fans at AVP tournament"
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-8">
          <div>
            <p className="font-heading text-white/70 text-lg sm:text-xl italic max-w-lg mx-auto mb-6">
              &ldquo;When people see the shirt, they ask about it. That&apos;s the whole point.&rdquo;
            </p>
            <p className="text-[11px] font-body font-semibold text-white/40 tracking-[0.25em] uppercase">
              Diego Perez
            </p>
          </div>
        </div>
      </section>

      {/* Worn on Tour */}
      <section className="bg-background py-20 sm:py-28">
        <div className="px-3">
          <div className="text-center mb-20">
            <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
              Worn on Tour
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-3">
              More Than Merch
            </h2>
            <p className="font-heading text-white/40 text-base italic">
              From the AVP tour to churches across the country.
            </p>
          </div>

          {/* Two-row masonry — large images, no overlap */}
          <div className="grid grid-cols-2 gap-3">
            {/* Top row — tall left, shorter right */}
            <div className="aspect-[2/3] relative overflow-hidden group">
              <Image
                src="/images/editorial/diego-serving-back.jpg"
                alt="Diego serving in Jesus Rules tee"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                sizes="50vw"
              />
            </div>
            <div className="aspect-[2/3] relative overflow-hidden group">
              <Image
                src="/images/editorial/michael-courtside.jpg"
                alt="Michael courtside in navy Jesus Rules tee"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                sizes="50vw"
              />
            </div>
            {/* Bottom row */}
            <div className="aspect-[2/3] relative overflow-hidden group">
              <Image
                src="/images/editorial/diego-highfive-crowd.jpg"
                alt="Diego high-fiving fans"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                sizes="50vw"
              />
            </div>
            <div className="aspect-[2/3] relative overflow-hidden group">
              <Image
                src="/images/editorial/michael-watching.jpg"
                alt="Michael watching match in Jesus Rules shirt"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 sm:py-24 bg-background border-t border-white/5">
        <div className="max-w-lg mx-auto px-8 text-center">
          <p className="text-[11px] font-body font-semibold text-white/40 tracking-[0.25em] uppercase mb-4">
            Every Purchase Supports the Mission
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight mb-6">
            100% of proceeds fund the ministry.
          </h2>
          <Link
            href="/donate"
            className="text-[12px] font-body font-semibold tracking-[0.2em] uppercase text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}

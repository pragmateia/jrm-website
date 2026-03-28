const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  onlineStoreUrl: string | null;
}

export async function shopifyFetch(query: string, variables?: Record<string, unknown>) {
  if (!domain || !storefrontAccessToken) {
    return null;
  }

  const url = `https://${domain}/api/2024-01/graphql.json`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    console.error("Shopify API error:", response.statusText);
    return null;
  }

  return response.json();
}

export async function getProducts(
  first: number = 12
): Promise<ShopifyProduct[]> {
  const query = `
    {
      products(first: ${first}, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            onlineStoreUrl
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);
  if (!data?.data?.products?.edges) return [];

  return data.data.products.edges.map(
    (edge: { node: ShopifyProduct }) => edge.node
  );
}

export async function getFeaturedProducts(): Promise<ShopifyProduct[]> {
  return getProducts(4);
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  image: { url: string; altText: string | null } | null;
  product: { handle: string; title: string; productType: string };
}

/** Product-level images returned alongside variants for back-image detection */
export interface ProductImages {
  handle: string;
  title: string;
  productType: string;
  images: { url: string; altText: string | null }[];
  variantImageUrls: Set<string>;
}

export async function getProductVariants(): Promise<{
  variants: ShopifyVariant[];
  productImages: ProductImages[];
}> {
  const query = `
    {
      products(first: 20, sortKey: BEST_SELLING) {
        edges {
          node {
            handle
            title
            productType
            images(first: 100) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);
  if (!data?.data?.products?.edges) return { variants: [], productImages: [] };

  const variants: ShopifyVariant[] = [];
  const productImages: ProductImages[] = [];

  for (const productEdge of data.data.products.edges) {
    const product = productEdge.node;

    // Collect all variant image URLs for this product
    const variantImageUrls = new Set<string>();
    for (const variantEdge of product.variants.edges) {
      const v = variantEdge.node;
      if (v.image?.url) variantImageUrls.add(v.image.url);
    }

    // Store product-level images for back-image detection
    productImages.push({
      handle: product.handle,
      title: product.title,
      productType: product.productType || "",
      images: product.images.edges.map(
        (e: { node: { url: string; altText: string | null } }) => e.node
      ),
      variantImageUrls,
    });

    for (const variantEdge of product.variants.edges) {
      const v = variantEdge.node;
      if (!v.image) continue;
      const sizeOption = v.selectedOptions?.find(
        (o: { name: string; value: string }) => o.name.toLowerCase() === "size"
      );
      // Only include Large variants, or variants with no size option
      if (sizeOption && sizeOption.value.toLowerCase() !== "l") continue;
      variants.push({
        id: v.id,
        title: v.title,
        price: v.price?.amount || "0",
        image: v.image,
        product: { handle: product.handle, title: product.title, productType: product.productType || "" },
      });
    }
  }
  return { variants, productImages };
}

export function getProductUrl(handle: string): string {
  if (domain) {
    return `https://${domain}/products/${handle}`;
  }
  return `https://jesusrules.co/products/${handle}`;
}

export interface ShopifyProductDetail {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        selectedOptions: { name: string; value: string }[];
        image: { url: string; altText: string | null } | null;
      };
    }[];
  };
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProductDetail | null> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        images(first: 100) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          id
          name
          values
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, { handle });
  return data?.data?.product || null;
}

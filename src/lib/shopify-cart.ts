const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";

async function cartFetch(query: string, variables?: Record<string, unknown>) {
  const url = `https://${domain}/api/2024-01/graphql.json`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify cart API error: ${response.statusText}`);
  }

  return response.json();
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              product {
                title
                handle
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    image: { url: string; altText: string | null } | null;
    product: { title: string; handle: string };
    selectedOptions: { name: string; value: string }[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: CartLine[];
}

function parseCart(cart: Record<string, unknown>): ShopifyCart {
  const c = cart as {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: ShopifyCart["cost"];
    lines: {
      edges: { node: CartLine }[];
    };
  };
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    cost: c.cost,
    lines: c.lines.edges.map((e) => e.node),
  };
}

export async function createCart(
  variantId: string,
  quantity: number
): Promise<ShopifyCart> {
  const query = `
    mutation createCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await cartFetch(query, {
    lines: [{ merchandiseId: variantId, quantity }],
  });

  if (data.data.cartCreate.userErrors?.length > 0) {
    throw new Error(data.data.cartCreate.userErrors[0].message);
  }

  return parseCart(data.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<ShopifyCart> {
  const query = `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await cartFetch(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });

  if (data.data.cartLinesAdd.userErrors?.length > 0) {
    throw new Error(data.data.cartLinesAdd.userErrors[0].message);
  }

  return parseCart(data.data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const query = `
    mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await cartFetch(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  if (data.data.cartLinesUpdate.userErrors?.length > 0) {
    throw new Error(data.data.cartLinesUpdate.userErrors[0].message);
  }

  return parseCart(data.data.cartLinesUpdate.cart);
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const query = `
    mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await cartFetch(query, { cartId, lineIds });

  if (data.data.cartLinesRemove.userErrors?.length > 0) {
    throw new Error(data.data.cartLinesRemove.userErrors[0].message);
  }

  return parseCart(data.data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await cartFetch(query, { cartId });
  if (!data?.data?.cart) return null;
  return parseCart(data.data.cart);
}

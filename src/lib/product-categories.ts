/**
 * Infer a display category from the Shopify productType or product title.
 * Returns a normalized label like "T-Shirts" or "Hoodies".
 *
 * This file is intentionally NOT a client component so it can be imported
 * from both server and client code.
 */
export function inferCategory(productType: string, title: string): string {
  const type = productType.toLowerCase().trim();
  const t = title.toLowerCase();

  // Check productType first (Shopify admin field)
  if (type.includes("hoodie") || type.includes("sweatshirt")) return "Hoodies";
  if (type.includes("t-shirt") || type.includes("tee") || type.includes("shirt")) return "T-Shirts";
  if (type.includes("hat") || type.includes("cap")) return "Hats";

  // Fallback: infer from product title
  if (t.includes("hoodie")) return "Hoodies";
  if (t.includes("tee") || t.includes("t-shirt") || t.includes("t\u2011shirt")) return "T-Shirts";
  if (t.includes("hat") || t.includes("cap")) return "Hats";

  return "Other";
}

/* ------------------------------------------------------------------ */
/*  Style cards — groups of products shown on the "All" view          */
/* ------------------------------------------------------------------ */

export interface StyleCard {
  /** Display name shown on the card */
  label: string;
  /** Subtitle line beneath the label */
  subtitle: string;
  /** Product handles that belong to this style group */
  handles: string[];
}

/**
 * Ordered list of style cards displayed when the "All" tab is active.
 * Each card maps to one or more Shopify product handles.
 */
/** Set of all product handles included in style cards — used to filter
 *  category tabs so only curated products appear on the shop page. */
export function getActiveHandles(): Set<string> {
  const handles = new Set<string>();
  for (const card of STYLE_CARDS) {
    for (const h of card.handles) handles.add(h);
  }
  return handles;
}

export const STYLE_CARDS: StyleCard[] = [
  {
    label: "Original",
    subtitle: "T-Shirt",
    handles: ["christian-faith-unisex-cotton-crew-tee-jesus-rules-cross-design"],
  },
  {
    label: "Classic",
    subtitle: "T-Shirt",
    handles: ["classic-dark-jesus-rules-t-shirt", "classic-light-jesus-rules-t-shirt"],
  },
  {
    label: "Street",
    subtitle: "T-Shirt",
    handles: ["street-tee-dark-comfort-colors"],
  },
  {
    label: "Light",
    subtitle: "Hoodie",
    handles: ["beach-volleyball-hoodie", "beach-volleyball-hoodie-light"],
  },
  {
    label: "Dark",
    subtitle: "Hoodie",
    handles: ["beach-volleyball-hoodie-dark", "beach-volleyball-hoodie-dark-1"],
  },
];

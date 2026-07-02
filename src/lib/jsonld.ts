/**
 * Serialize structured data for a <script type="application/ld+json"> tag.
 *
 * JSON.stringify alone is not safe inside a <script> element: if any string
 * in the data contains "</script>" (e.g. a Shopify product description or
 * blog frontmatter), the browser terminates the script tag early and the
 * remainder is parsed as HTML — an XSS vector. Escaping "<" as the JSON
 * unicode escape (backslash-u003c) is valid JSON and neutralizes it.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

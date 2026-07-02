import type { NextConfig } from "next";

// Baseline security headers. Content-Security-Policy is intentionally NOT set
// here — the Donorbox widget, Shopify checkout redirects, and Google Fonts
// would each need verified allowlists first (see repo security notes).
const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disallow other sites from framing this site (clickjacking). This does NOT
  // affect the Donorbox iframe/widget, which is embedded INTO our pages.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Send full referrer only to same-origin; origin-only cross-origin over HTTPS
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // This site never needs these browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "*.shopify.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

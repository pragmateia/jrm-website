import type { NextConfig } from "next";

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
  async rewrites() {
    return [
      {
        source: "/cart/c/:path*",
        destination: "https://a0qgk8-te.myshopify.com/cart/c/:path*",
      },
    ];
  },
};

export default nextConfig;

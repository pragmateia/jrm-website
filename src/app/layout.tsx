import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jesusrules.co"),
  title: {
    default: "Jesus Rules Ministries | Athletic Excellence for the Gospel",
    template: "%s | Jesus Rules Ministries",
  },
  description:
    "A faith-driven ministry using professional beach volleyball excellence to spread the Gospel worldwide. Supporting athletes, outreach events, and discipleship training.",
  keywords: [
    "Jesus Rules Ministries",
    "beach volleyball ministry",
    "faith and sports",
    "Christian athletes",
    "Gospel outreach",
    "AVP volleyball",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jesusrules.co",
    siteName: "Jesus Rules Ministries",
    title: "Jesus Rules Ministries | Athletic Excellence for the Gospel",
    description:
      "A faith-driven ministry using professional beach volleyball excellence to spread the Gospel worldwide.",
    images: [
      {
        url: "/images/laguna-hero.png",
        width: 1200,
        height: 630,
        alt: "Jesus Rules Ministries - Beach Volleyball",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Rules Ministries",
    description:
      "Athletic excellence for the Gospel. Professional beach volleyball ministry.",
    images: ["/images/laguna-hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jesusrules.co"),
  title: {
    default: "Jesus Rules Ministries | Athletic Excellence for the Gospel",
    template: "%s | Jesus Rules Ministries",
  },
  description:
    "A 501(c)(3) nonprofit using professional beach volleyball to spread the Gospel. Supporting athletes, outreach events, and discipleship worldwide.",
  keywords: [
    "Jesus Rules Ministries",
    "beach volleyball ministry",
    "faith and sports",
    "Christian athletes",
    "Gospel outreach",
    "AVP volleyball",
  ],
  alternates: {
    canonical: "/",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "NonprofitOrganization"],
              name: "Jesus Rules Ministries",
              url: "https://jesusrules.co",
              logo: "https://jesusrules.co/images/logo-white.png",
              description:
                "A 501(c)(3) nonprofit ministry using professional beach volleyball excellence to spread the Gospel worldwide.",
              foundingDate: "2021",
              taxID: "33-3630279",
              nonprofitStatus: "501(c)(3)",
              sameAs: [
                "https://www.instagram.com/jesusrules.co/",
                "https://youtube.com/@jesusrulesministries",
                "https://www.instagram.com/diegonickperez/",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "8605 Santa Monica Blvd #216891",
                addressLocality: "West Hollywood",
                addressRegion: "CA",
                postalCode: "90069",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@jesusrules.co",
                contactType: "general",
              },
              founder: [
                {
                  "@type": "Person",
                  name: "Diego Perez",
                  jobTitle: "President",
                },
                {
                  "@type": "Person",
                  name: "Michael Clark",
                  jobTitle: "Head Coach & Director",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Jesus Rules Ministries",
              url: "https://jesusrules.co",
            }),
          }}
        />
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

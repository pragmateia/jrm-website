import Hero from "@/components/home/Hero";
import EditorialSplit from "@/components/home/EditorialSplit";
import CinematicBanner from "@/components/home/CinematicBanner";
import DonateBanner from "@/components/home/DonateBanner";
import FeaturedMerch from "@/components/home/FeaturedMerch";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      {/* 1. Full-viewport video hero */}
      <Hero />

      {/* 2. Featured merchandise — horizontal scroll carousel */}
      <FeaturedMerch />

      {/* spacer */}
      <div className="h-6 bg-background" />

      {/* 3. Two-column editorial split — Competition | Outreach */}
      <EditorialSplit />

      {/* spacer */}
      <div className="h-6 bg-background" />

      {/* 4. Full-width cinematic — our story */}
      <CinematicBanner
        image="/images/editorial/beach-walk.jpg"
        alt="Diego and team walking on the beach with Jesus Rules shirts"
        label="Jesus Rules Ministries"
        title="From the Sand to the Soul"
        subtitle="Every tournament is an opportunity. Every conversation matters. We compete with purpose."
        href="/about"
        cta="Our Story"
        height="tall"
      />

      {/* 5. Full-width donate CTA */}
      <DonateBanner />

      {/* 6. Newsletter signup */}
      <Newsletter />
    </>
  );
}

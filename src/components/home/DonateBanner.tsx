import Image from "next/image";
import Link from "next/link";

export default function DonateBanner() {
  return (
    <section className="relative h-[70vh] sm:h-[80vh]">
      {/* Image layer */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/editorial/community-gathering.jpg"
          alt="Community gathering at Jesus Rules tournament"
          fill
          className="object-cover"
          style={{ objectPosition: "center 80%" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Text layer — starts at 45% of section, pins near viewport bottom */}
      <div className="relative z-10 h-full">
        <div className="h-[20%]" />
        <div className="sticky top-[calc(100vh-26rem)] text-center px-8 pb-20 sm:pb-28 max-w-2xl mx-auto">
          <p className="text-[12px] sm:text-[13px] font-body font-semibold tracking-[0.3em] uppercase text-white/80 mb-5">
            Partner With Us
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Join the Mission
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto font-body">
            Your generosity sends us to tournaments worldwide, funds discipleship,
            and brings the Gospel to communities everywhere.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center justify-center px-12 py-4 bg-white text-black font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all hover:bg-white/90"
          >
            Give Today
          </Link>
          <p className="mt-8 text-[11px] text-white/60 tracking-wide font-body">
            501(c)(3) Tax-Exempt &middot; EIN 33-3630279
          </p>
        </div>
      </div>
    </section>
  );
}

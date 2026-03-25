import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/editorial/beach-walk.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-sermon.mp4" type="video/mp4" />
        <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content — bottom-left */}
      <div className="relative z-10 w-full px-8 sm:px-12 lg:px-20 pb-20 sm:pb-28">
        <p className="text-[12px] sm:text-[13px] font-body font-semibold tracking-[0.3em] uppercase text-white/80 mb-5">
          Jesus Rules Ministries
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6 max-w-4xl">
          Using the Gifts God Gave Us
          <br />
          <em className="text-gold-light" style={{ textShadow: "0 0 40px rgba(201, 168, 125, 0.55)" }}>to Preach the Gospel</em>
        </h1>
        <p className="text-base sm:text-lg text-white/70 mb-10 max-w-lg leading-relaxed font-body">
          Professional beach volleyball ministry competing worldwide
          and proclaiming Christ at every tournament.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all hover:bg-white/90"
          >
            Shop
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/50 text-white font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all hover:border-white hover:bg-white/10"
          >
            Donate
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/30" />
      </div>
    </section>
  );
}

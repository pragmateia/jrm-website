import Link from "next/link";

export default function StatementSection() {
  return (
    <section className="py-24 sm:py-36 bg-background">
      <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-20 text-center">
        <p className="text-[11px] sm:text-[13px] font-body font-semibold tracking-[0.3em] uppercase text-gold/80 mb-8">
          Our Conviction
        </p>
        <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.2] mb-12">
          Christians should be the best at what they do — not to hide from the world, but to step into it with
          excellence that earns credibility and opens doors for the Gospel.
        </blockquote>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-10 py-3.5 border-2 border-white/30 text-white font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all hover:border-white/60 hover:bg-white/5"
          >
            About the Ministry
          </Link>
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center px-10 py-3.5 border-2 border-white/30 text-white font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all hover:border-white/60 hover:bg-white/5"
          >
            2026 Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}

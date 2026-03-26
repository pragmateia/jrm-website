import Image from "next/image";

const donationPaths = [
  {
    title: "Give Now",
    description: "Make a one-time or recurring gift to support the ministry.",
    href: "#donate-form",
  },
  {
    title: "Give by Category",
    description: "Direct your donation toward travel, equipment, or content production.",
    href: "#categories",
  },
  {
    title: "Support the Team",
    description: "Partner directly with Diego or Michael's individual ministry.",
    href: "#team",
  },
];

export default function DonateHero() {
  return (
    <section className="relative flex flex-col items-end justify-end min-h-screen pt-24">
      <Image
        src="/images/great-park-team.png"
        alt="Team at the Great Park"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 sm:px-12 lg:px-10 text-center pb-16 sm:pb-20">
        <p className="text-[12px] sm:text-[13px] font-body font-semibold text-gold-light tracking-[0.25em] uppercase mb-5">
          Support the Mission
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
          Partner With Us
        </h1>
        <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed italic mb-1">
          &ldquo;Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
        </p>
        <p className="text-white/40 text-sm mb-12">
          2 Corinthians 9:7
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {donationPaths.map((path) => (
            <a
              key={path.title}
              href={path.href}
              className="group p-6 bg-black/50 backdrop-blur-sm border border-white/15 hover:bg-black/60 hover:border-gold/40 transition-all duration-200 text-left"
            >
              <h3 className="text-white font-body font-bold text-2xl mb-2 group-hover:text-gold transition-colors">
                {path.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {path.description}
              </p>
              <span className="inline-block mt-3 text-sm font-body font-medium text-gold/70 group-hover:text-gold transition-colors">
                Learn more →
              </span>
            </a>
          ))}
        </div>

        <p className="text-white/50 text-xs mt-8">
          EIN 33-3630279 · 501(c)(3) · All gifts are tax-deductible.
        </p>
      </div>

    </section>
  );
}

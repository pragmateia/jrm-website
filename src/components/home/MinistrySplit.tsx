import Image from "next/image";
import Link from "next/link";

export default function MinistrySplit() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background">
      {/* Left — Baptism */}
      <Link href="/about" className="group relative block overflow-hidden">
        <div className="aspect-[3/4] sm:aspect-[4/5] relative">
          <Image
            src="/images/editorial/baptism.jpg"
            alt="Baptism at tournament"
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] sm:text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-white/70 mb-3">
            Discipleship
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white mb-3 leading-tight">
            New Life
          </h2>
          <p className="text-white/70 text-sm sm:text-base mb-5 max-w-sm leading-relaxed font-body hidden sm:block">
            Witnessing God move — baptisms, conversions, and transformed lives at tournament stops nationwide.
          </p>
          <span className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.15em] uppercase transition-all group-hover:bg-white/90">
            Learn More
          </span>
        </div>
      </Link>

      {/* Right — Prayer on Beach */}
      <div className="relative block overflow-hidden">
        <div className="aspect-[3/4] sm:aspect-[4/5] relative">
          <Image
            src="/images/editorial/prayer-beach.jpg"
            alt="Prayer circle on the beach"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] sm:text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-white/70 mb-3">
            Community
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white mb-3 leading-tight">
            In Every Moment
          </h2>
          <p className="text-white/70 text-sm sm:text-base mb-4 max-w-sm leading-relaxed font-body hidden sm:block">
            Before every match, in every timeout — prayer anchors everything we do.
          </p>
        </div>
      </div>
    </section>
  );
}

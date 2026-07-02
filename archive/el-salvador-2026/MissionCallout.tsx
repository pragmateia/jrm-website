import Image from "next/image";
import Link from "next/link";

export default function MissionCallout() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-10">
        <Link
          href="/missions/el-salvador-2026"
          className="group block relative overflow-hidden border border-gold/25 hover:border-gold/60 transition-colors"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
              <Image
                src="/images/el-salvador/clinic-with-kids.jpg"
                alt="Diego at a beach volleyball clinic with Salvadoran youth"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: "center 30%" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/0" />
            </div>

            {/* Copy */}
            <div className="bg-dark p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <p className="text-[11px] font-body font-semibold text-gold tracking-[0.3em] uppercase mb-4">
                Mission Trip · May 25 to June 1
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-5 leading-[1.1]">
                Take the Gospel to El Salvador
              </h2>
              <p className="text-white/65 text-base leading-relaxed mb-7 font-body max-w-md">
                Six missionaries. One week. Three exhibition matches, volleyball clinics, and the Gospel preached after every event. Help us get there.
              </p>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 px-7 py-3 bg-gold group-hover:bg-gold-light text-black font-body text-sm font-semibold tracking-wide transition-colors">
                  Fund This Trip
                  <span className="text-base">→</span>
                </span>
                <span className="text-white/40 text-xs tracking-wide font-body">
                  Goal: $7,000
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

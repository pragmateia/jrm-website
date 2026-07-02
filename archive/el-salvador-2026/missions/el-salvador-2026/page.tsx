import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DonorboxEmbed from "@/components/DonorboxEmbed";

export const metadata: Metadata = {
  title: "El Salvador Mission Trip 2026",
  description:
    "May 25 to June 1. Diego, Coach Michael Clark, and his family travel to El Salvador for exhibition matches, volleyball clinics, and Gospel preaching alongside Salvadoran pro David Vargas. $7,000 goal. Tax-deductible.",
  alternates: {
    canonical: "/missions/el-salvador-2026",
  },
  openGraph: {
    title: "El Salvador Mission Trip 2026",
    description:
      "Help send 6 missionaries to El Salvador for clinics, exhibition matches, and Gospel outreach. May 25 to June 1.",
    images: ["/images/el-salvador/clinic-with-kids.jpg"],
  },
};

const CAMPAIGN_SLUG = "el-salvador-2026";

const tripFacts = [
  { label: "Dates", value: "May 25 to June 1, 2026" },
  { label: "Team", value: "6 missionaries" },
  { label: "Location", value: "El Salvador" },
  { label: "Goal", value: "$7,000" },
];

const team = [
  { name: "Diego Perez", role: "Athlete & Operations" },
  { name: "Michael Clark", role: "Head Coach & Ministry Leader" },
  { name: "Abby Clark", role: "Family Ministry" },
  { name: "Kate, Savannah, Bailey, Caleb", role: "The Clark Kids" },
];

const covers = [
  { title: "Round-Trip Flights", detail: "LAX to San Salvador for 6 missionaries." },
  { title: "Lodging", detail: "Seven nights of housing near the outreach site." },
  { title: "Food", detail: "Meals for the team during the week." },
  { title: "Local Transportation", detail: "Daily travel to clinics, matches, and church visits." },
  { title: "100 Giveaway T-Shirts", detail: "One Jesus Rules tee for every kid we meet." },
  { title: "Buffer", detail: "Mission trips always need it." },
];

export default function ElSalvador2026Page() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pt-24">
        <Image
          src="/images/el-salvador/clinic-with-kids.jpg"
          alt="Diego speaking with Salvadoran youth at a beach volleyball clinic"
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 sm:px-12 lg:px-10 pb-20 sm:pb-28">
          <p className="text-[11px] sm:text-[13px] font-body font-semibold text-gold-light tracking-[0.3em] uppercase mb-5">
            Mission Trip · May 25 to June 1, 2026
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-5 leading-[1.05]">
            Take the Gospel to El Salvador
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-body">
            Six of us. One week. Three exhibition matches, volleyball clinics for Salvadoran kids, and the Gospel preached after every event. Help us get there.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#donate"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-body text-sm font-semibold tracking-wide transition-colors"
            >
              Fund This Trip
              <span className="text-base">→</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white font-body text-sm font-semibold tracking-wide transition-colors"
            >
              Read the Story
            </a>
          </div>
        </div>
      </section>

      {/* Quick facts strip */}
      <section className="bg-dark border-y border-gold/15">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-10 py-10 sm:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 text-center sm:text-left">
            {tripFacts.map((fact) => (
              <div key={fact.label}>
                <p className="text-[10px] sm:text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-2">
                  {fact.label}
                </p>
                <p className="text-white font-heading text-xl sm:text-2xl tracking-tight">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Story */}
      <section id="about" className="py-20 sm:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10">
          <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-5">
            The Trip
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-8 leading-[1.1]">
            Six missionaries. One week of clinics, matches, and Gospel preaching.
          </h2>
          <div className="space-y-5 text-white/75 text-base sm:text-lg leading-relaxed font-body">
            <p>
              From May 25 to June 1, Diego is traveling to El Salvador with our coach Michael Clark and his entire family. Our partner on the ground is David &ldquo;Pepe&rdquo; Vargas, a Salvadoran pro beach volleyball player we&rsquo;ve been building a relationship with for the past two years.
            </p>
            <p>
              Pepe is setting up roughly three exhibition matches and a series of clinics for Salvadoran youth. Diego competes on the court. After every match and every clinic, Michael and the team preach the Gospel to the crowd of kids and parents who came to watch.
            </p>
            <p>
              We&rsquo;re bringing 100 Jesus Rules t-shirts to give away. We&rsquo;re bringing the Clark family because Diego will be busy competing, and the ministry side of the trip needs hands. Abby and the kids will run kids&rsquo; ministry, build family-to-family relationships with Pepe&rsquo;s community, and free Diego up to use the volleyball platform without dropping the Gospel work.
            </p>
            <p>
              We need $7,000 to make it happen. Your gift is tax-deductible.
            </p>
          </div>
        </div>
      </section>

      {/* Photo break */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/el-salvador/team-meal.jpg"
          alt="Team meal with Pepe and his community in El Salvador"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </section>

      {/* Team going */}
      <section className="py-20 sm:py-28 bg-dark border-t border-white/5">
        <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-10">
          <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-5 text-center">
            Who&rsquo;s Going
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-12 text-center leading-tight">
            The Team on the Ground
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-6 bg-white/[0.04] border border-white/[0.06]"
              >
                <p className="text-gold text-xs tracking-wide uppercase mb-1.5">
                  {member.role}
                </p>
                <h3 className="text-white font-body font-medium text-lg">
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm leading-relaxed mt-8 max-w-2xl mx-auto text-center font-body">
            Plus Diego&rsquo;s mom Gloria, if her passport arrives in time. And on the ground: Pepe Vargas and the Salvadoran volleyball community he&rsquo;s built around the Gospel.
          </p>
        </div>
      </section>

      {/* What donations cover */}
      <section className="py-20 sm:py-28 bg-background border-t border-white/5">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-10">
          <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-5 text-center">
            Where Your Gift Goes
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-12 text-center leading-tight">
            What $7,000 Covers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {covers.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white/[0.04] border border-white/[0.06]"
              >
                <h3 className="text-white font-body font-medium text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate */}
      <section id="donate" className="py-20 sm:py-28 bg-dark border-t border-gold/20">
        <div className="max-w-lg mx-auto px-8 sm:px-12 lg:px-10 text-center">
          <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-5">
            Send Us
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-3 leading-tight">
            Fund This Trip
          </h2>
          <p className="text-white/55 text-sm mb-10">
            One-time or monthly. All gifts are tax-deductible.
          </p>
          <div className="flex justify-center">
            <DonorboxEmbed campaign={CAMPAIGN_SLUG} />
          </div>
          <p className="text-white/40 text-xs mt-10">
            EIN 33-3630279 · 501(c)(3) · Jesus Rules Ministries
          </p>
        </div>
      </section>

      {/* Share / final CTA */}
      <section className="py-16 sm:py-20 bg-background border-t border-white/5">
        <div className="max-w-2xl mx-auto px-8 sm:px-12 lg:px-10 text-center">
          <h2 className="font-body text-xl sm:text-2xl font-semibold text-white mb-4">
            Can&rsquo;t give? Share.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Send this page to one person who would care. Every share moves this trip closer to fully funded.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-body font-medium tracking-wide transition-colors"
          >
            Other ways to give
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind Jesus Rules Ministries — a 501(c)(3) nonprofit using professional beach volleyball to open doors for the Gospel. Founded in Irvine, CA.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero with overlapping interview videos */}
      <section className="relative pb-20 sm:pb-28">
        <Image
          src="/images/editorial/beach-walk.jpg"
          alt="About the Ministry"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 w-full mx-auto px-6 sm:px-10 lg:px-20 pt-28 sm:pt-32">
          <p className="text-[12px] sm:text-[13px] font-body font-semibold text-gold-light tracking-[0.25em] uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6 sm:mb-8">
            About Jesus Rules Ministries
          </h1>

          {/* Interview videos — large, inside the hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-12 sm:mb-16">
            <div className="relative">
              <div className="aspect-video overflow-hidden shadow-2xl border border-white/10">
                <video
                  controls
                  preload="metadata"
                  poster="/images/posters/michael-interview-poster.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/michael-interview.mp4#t=3.5" type="video/mp4" />
                </video>
              </div>
              <div className="mt-3 flex items-center justify-center gap-4">
                <p className="text-[11px] font-body font-semibold text-white/60 tracking-[0.2em] uppercase">
                  Michael Clark
                </p>
                <span className="text-white/20">|</span>
                <a href="#michael" className="text-[10px] font-body font-semibold text-white/50 tracking-[0.15em] uppercase hover:text-white transition-colors">
                  Bio
                </a>
                <a href="https://meigiving.org/donate/michaelandabby" target="_blank" rel="noopener noreferrer" className="text-[10px] font-body font-semibold text-gold/70 tracking-[0.15em] uppercase hover:text-gold transition-colors">
                  Support
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden shadow-2xl border border-white/10">
                <video
                  controls
                  preload="metadata"
                  poster="/images/posters/diego-interview-poster.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/diego-interview.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="mt-3 flex items-center justify-center gap-4">
                <p className="text-[11px] font-body font-semibold text-white/60 tracking-[0.2em] uppercase">
                  Diego Perez
                </p>
                <span className="text-white/20">|</span>
                <a href="#diego" className="text-[10px] font-body font-semibold text-white/50 tracking-[0.15em] uppercase hover:text-white transition-colors">
                  Bio
                </a>
                <a href="https://donorbox.org/support-diego-perez" target="_blank" rel="noopener noreferrer" className="text-[10px] font-body font-semibold text-gold/70 tracking-[0.15em] uppercase hover:text-gold transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-24 sm:py-32 bg-cream">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Section header */}
          <div className="max-w-2xl mb-16 sm:mb-20">
            <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
              Our Mission
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-6">
              Excellence That Opens Doors
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Jesus Rules Ministries exists to spread the Gospel through
              professional athletic excellence. We believe Christians are called
              to be <span className="text-text-primary font-medium">in</span> the
              world — not hiding from it, but competing at the highest level,
              earning credibility, and using that platform to share the truth of
              Christ.
            </p>
          </div>

          {/* Two-column: story + scripture */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            <div className="lg:col-span-3 space-y-6 text-text-secondary leading-[1.85]">
              <p>
                Jesus didn&apos;t call us to retreat from the world — He sent us
                into it. For us, that means competing at the highest level of
                professional beach volleyball, building genuine relationships with
                players and fans, and sharing the good news of Christ wherever the
                tour takes us.
              </p>
              <p>
                When you compete at the top, people listen. They want to know what
                drives you. And when they ask, you don&apos;t need a megaphone —
                you just need the truth.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <blockquote className="border-l-2 border-gold/40 pl-5">
                <p className="text-text-primary/80 italic leading-relaxed text-sm">
                  &ldquo;You are the light of the world. A city set on a hill cannot be hidden.&rdquo;
                </p>
                <cite className="text-gold text-xs not-italic mt-2 block">
                  — Matthew 5:14
                </cite>
              </blockquote>
              <blockquote className="border-l-2 border-gold/40 pl-5">
                <p className="text-text-primary/80 italic leading-relaxed text-sm">
                  &ldquo;Go therefore and make disciples of all nations.&rdquo;
                </p>
                <cite className="text-gold text-xs not-italic mt-2 block">
                  — Matthew 28:19
                </cite>
              </blockquote>
              <blockquote className="border-l-2 border-gold/40 pl-5">
                <p className="text-text-primary/80 italic leading-relaxed text-sm">
                  &ldquo;Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.&rdquo;
                </p>
                <cite className="text-gold text-xs not-italic mt-2 block">
                  — 1 Peter 3:15
                </cite>
              </blockquote>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 sm:mt-24 grid grid-cols-3 border border-white/5">
            {[
              { stat: "~20", label: "Pro tournaments per year" },
              { stat: "2–3x", label: "Weekly discipleship sessions" },
              { stat: "6+", label: "Countries reached" },
            ].map((item, i) => (
              <div
                key={item.stat}
                className={`py-8 px-6 text-center ${i > 0 ? "border-l border-white/5" : ""}`}
              >
                <p className="text-gold font-heading text-2xl sm:text-3xl mb-2">
                  {item.stat}
                </p>
                <p className="text-text-secondary text-xs sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width editorial image */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/editorial/great-park-bible-study.png"
          alt="Diego leading Bible study at Great Park"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </section>

      {/* Michael Bio */}
      <section id="michael" className="py-20 sm:py-28 bg-cream scroll-mt-20">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <div>
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src="/images/editorial/michael-courtside.jpg"
                  alt="Michael Clark courtside at AVP tournament"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:pt-8">
              <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
                Head Coach &amp; Director
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-8">
                Michael Clark
              </h2>
              <div className="space-y-5 text-text-secondary leading-[1.85]">
                <p>
                  In 2020, while the world was shutting down, Michael felt God
                  calling him back to Southern California with a specific vision:
                  start a discipleship group that trains guys to be great at the
                  game <em>and</em> great in the Word. Not just put a Jesus
                  sticker on volleyball — actually develop complete players.
                </p>
                <p>
                  He and his family moved to Irvine, and when he discovered the
                  Great Park volleyball courts, he knew. Before any group existed,
                  Michael and his son Caleb would run around those courts and pray
                  over them. In the fall of 2021, he sent a text to every
                  competitive player he knew: show up if you want to be serious
                  about the game and serious about the Bible.
                </p>
                <p>
                  What started with just a few faithful guys has grown to 12–16.
                  Michael sets the vision, leads discipleship, coaches the team,
                  and travels to every tournament. He&apos;s the one people come
                  to — players, refs, strangers on the beach — because he meets
                  everyone where they are. When it comes to where this ministry
                  goes and how it gets there, Michael is the one steering the
                  ship.
                </p>
              </div>

              <blockquote className="mt-8 border-l-2 border-gold/40 pl-5">
                <p className="text-text-primary/80 italic leading-relaxed">
                  &ldquo;Iron sharpens iron, and one man sharpens another.&rdquo;
                </p>
                <cite className="text-gold text-sm not-italic mt-2 block">
                  — Proverbs 27:17
                </cite>
              </blockquote>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://meigiving.org/donate/michaelandabby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2.5 bg-gold text-background text-[11px] font-body font-semibold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors"
                >
                  Support Michael
                </a>
                <Link
                  href="/donate"
                  className="inline-flex items-center px-6 py-2.5 border border-text-primary/20 text-text-secondary text-[11px] font-body font-semibold tracking-[0.15em] uppercase hover:text-text-primary hover:border-text-primary/40 transition-colors"
                >
                  All Giving Options
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Diego Bio */}
      <section id="diego" className="py-20 sm:py-28 bg-background scroll-mt-20">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <div className="lg:order-2">
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src="/images/editorial/diego-highfive.jpg"
                  alt="Diego Perez high-fiving fans"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:order-1 lg:pt-8">
              <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
                Athlete &amp; President
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-8">
                Diego Perez
              </h2>
              <div className="space-y-5 text-text-secondary leading-[1.85]">
                <p>
                  A year or two out of high school, Diego wanted to play
                  professional beach volleyball but had no direction. Then he got
                  a random text from a guy named Mike: &ldquo;I&apos;m doing a
                  discipleship training group — show up at the Great
                  Park.&rdquo; He showed up. That decision changed everything.
                </p>
                <p>
                  Under Michael&apos;s coaching, Diego qualified for the AVP his
                  first year and finished ninth in Denver. But somewhere along
                  the way, he printed a batch of shirts — big cross on the front,
                  &ldquo;Jesus Rules&rdquo; in bold on the back — and what
                  started as a simple statement became a ministry.
                </p>
                <p>
                  Today Diego is a nationally ranked professional competing on
                  the AVP and FIVB tours with his sights set on the 2028 LA
                  Olympics. Off the court, he&apos;s the one who builds and runs
                  everything behind the scenes — the website, merchandise, content
                  production, finances, and day-to-day operations. Michael points
                  the direction; Diego makes sure there&apos;s a road to get
                  there.
                </p>
              </div>

              <blockquote className="mt-8 border-l-2 border-gold/40 pl-5">
                <p className="text-text-primary/80 italic leading-relaxed">
                  &ldquo;Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.&rdquo;
                </p>
                <cite className="text-gold text-sm not-italic mt-2 block">
                  — Colossians 3:23
                </cite>
              </blockquote>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://donorbox.org/support-diego-perez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2.5 bg-gold text-background text-[11px] font-body font-semibold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors"
                >
                  Support Diego
                </a>
                <a
                  href="https://instagram.com/diegonickperez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2.5 border border-white/20 text-white/70 text-[11px] font-body font-semibold tracking-[0.15em] uppercase hover:text-white hover:border-white/40 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@diegonickperez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2.5 border border-white/20 text-white/70 text-[11px] font-body font-semibold tracking-[0.15em] uppercase hover:text-white hover:border-white/40 transition-colors"
                >
                  YouTube
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Full-width editorial image */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/editorial/great-park-team-huddle.png"
          alt="Team huddle at Great Park"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </section>

      {/* Board & Governance */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10">
          <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
            Governance
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-6">
            Board &amp; Transparency
          </h2>
          <p className="text-text-secondary leading-relaxed mb-12">
            Jesus Rules Ministries is a registered 501(c)(3) nonprofit
            organization, committed to transparency and accountability.
          </p>

          <div className="grid grid-cols-2 border border-white/5 mb-16">
            <div className="p-6 sm:p-8">
              <p className="text-[11px] text-text-muted tracking-wider uppercase mb-2">EIN</p>
              <p className="text-text-primary font-heading text-lg">33-3630279</p>
            </div>
            <div className="p-6 sm:p-8 border-l border-white/5">
              <p className="text-[11px] text-text-muted tracking-wider uppercase mb-2">Status</p>
              <p className="text-text-primary font-heading text-lg">501(c)(3) Tax-Exempt</p>
            </div>
          </div>

          <h3 className="text-[11px] font-body font-semibold text-text-muted tracking-[0.2em] uppercase mb-6">
            Board of Directors
          </h3>
          <div className="divide-y divide-white/5">
            {[
              { name: "Diego Perez", role: "President" },
              { name: "Michael Clark", role: "Treasurer" },
              { name: "Gloria Perez", role: "Secretary" },
            ].map((member) => (
              <div key={member.name} className="flex items-center justify-between py-5">
                <span className="text-text-primary font-medium">{member.name}</span>
                <span className="text-text-secondary text-sm">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

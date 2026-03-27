import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Jesus Rules Ministries — our mission, our team, and why we believe athletic excellence opens doors for the Gospel.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero with overlapping interview videos */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-0">
        <Image
          src="/images/editorial/beach-walk.jpg"
          alt="About the Ministry"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 sm:px-12 lg:px-10 pb-0">
          <p className="text-[12px] sm:text-[13px] font-body font-semibold text-gold-light tracking-[0.25em] uppercase mb-5">
            Our Story
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-10">
            About the Ministry
          </h1>

          {/* Interview videos — overlap into content section below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 translate-y-1/2">
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
              <p className="mt-3 text-center text-[11px] font-body font-semibold text-white/60 tracking-[0.2em] uppercase">
                Diego Perez
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden shadow-2xl border border-white/10">
                <video
                  controls
                  preload="metadata"
                  poster="/images/posters/michael-interview-poster.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/michael-interview.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="mt-3 text-center text-[11px] font-body font-semibold text-white/60 tracking-[0.2em] uppercase">
                Michael Clark
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for the overlapping videos */}
      <div className="h-[60vw] sm:h-[16vh] bg-background" />

      {/* Mission & Story */}
      <section className="pb-20 sm:pb-28 bg-background">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="space-y-6 text-text-secondary leading-[1.85]">
            <p className="text-lg">
              Jesus Rules Ministries exists to spread the Gospel through
              professional athletic excellence. We believe Christians are called
              to be <span className="text-text-primary font-medium">in</span> the
              world — not hiding from it, but stepping into it with excellence
              that earns credibility and opens doors for the Gospel.
            </p>
            <blockquote className="border-l-2 border-gold/40 pl-5 my-2">
              <p className="text-text-primary/80 italic leading-relaxed text-sm">
                &ldquo;You are the light of the world. A city set on a hill cannot be hidden.&rdquo;
              </p>
              <cite className="text-gold text-xs not-italic mt-1 block">
                — Matthew 5:14
              </cite>
            </blockquote>
            <p>
              Too often, the church tells believers to separate from secular
              spaces. But Jesus said the opposite. He said to go into all
              nations. For us, that means competing at the highest level of
              professional beach volleyball, building genuine relationships with
              players and fans, and sharing the good news of Christ wherever the
              tour takes us.
            </p>
            <blockquote className="border-l-2 border-gold/40 pl-5 my-2">
              <p className="text-text-primary/80 italic leading-relaxed text-sm">
                &ldquo;Go therefore and make disciples of all nations.&rdquo;
              </p>
              <cite className="text-gold text-xs not-italic mt-1 block">
                — Matthew 28:19
              </cite>
            </blockquote>
            <p>
              When you compete at the top, people listen. They want to know what
              drives you. And when they ask, you don&apos;t need a megaphone —
              you just need the truth.
            </p>
            <blockquote className="border-l-2 border-gold/40 pl-5 my-2">
              <p className="text-text-primary/80 italic leading-relaxed text-sm">
                &ldquo;Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.&rdquo;
              </p>
              <cite className="text-gold text-xs not-italic mt-1 block">
                — 1 Peter 3:15
              </cite>
            </blockquote>
          </div>

          <div className="mt-16 grid grid-cols-3 border border-white/5">
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

      {/* Diego Bio */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <div>
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src="/images/editorial/diego-highfive.jpg"
                  alt="Diego Perez high-fiving fans"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:pt-8">
              <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
                Professional Athlete
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-8">
                Diego Perez
              </h2>
              <div className="space-y-5 text-text-secondary leading-[1.85]">
                <p>
                  Diego is a professionally ranked beach volleyball player
                  currently ranked in the top 40 nationally and top 20 as a team
                  with partner Dave Wieczorek. Together, they&apos;re pursuing
                  qualification for the 2028 LA Olympics.
                </p>
                <p>
                  But competition was never just about winning. Diego founded
                  Jesus Rules Ministries because he saw a gap: athletes with a
                  platform but no intentional Gospel presence. At every tournament
                  — from the AVP tour across the U.S. to FIVB events
                  internationally — Diego leads team gatherings, shares the Gospel
                  with fellow competitors and fans, and models what it looks like
                  to pursue excellence for God&apos;s glory.
                </p>
                <p>
                  Off the court, Diego leads weekly discipleship training in
                  Orange County, coordinates outreach events for churches and
                  organizations, and oversees all ministry operations.
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

            </div>
          </div>

        </div>
      </section>

      {/* Michael Bio */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <div className="lg:order-2">
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src="/images/editorial/michael-courtside.jpg"
                  alt="Michael Clark courtside at AVP tournament"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:order-1 lg:pt-8">
              <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
                Head Coach
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-8">
                Michael Clark
              </h2>
              <div className="space-y-5 text-text-secondary leading-[1.85]">
                <p>
                  Michael serves as the head coach for Jesus Rules Ministries,
                  traveling with the team to every tournament and training
                  session. He plays a critical role in both the athletic and
                  operational sides of the ministry.
                </p>
                <p>
                  Michael&apos;s coaching goes beyond volleyball strategy. He
                  helps develop athletes who compete with integrity and purpose,
                  ensuring that the ministry&apos;s mission is lived out both on
                  and off the sand.
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
              { name: "Diego Perez", role: "Athlete" },
              { name: "Michael Clark", role: "Coach" },
              { name: "Gloria Perez", role: "Director" },
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

import type { Metadata } from "next";
import Image from "next/image";
import DonateHero from "@/components/DonateHero";
import DonorboxEmbed from "@/components/DonorboxEmbed";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Jesus Rules Ministries. Your tax-deductible donation funds tournament travel, discipleship training, and Gospel outreach worldwide.",
  alternates: {
    canonical: "/donate",
  },
};

// ── Featured Trip Fund ──────────────────────────────────────────────
// Set to null when there's no active trip fund.
// To activate, fill in the details and create a matching Donorbox campaign.
const featuredFund: {
  title: string;
  subtitle: string;
  description: string;
  campaign: string;
  goal?: number;
} | null = null;
// Example:
// const featuredFund = {
//   title: "AVP Manhattan Beach Open",
//   subtitle: "August 15–18, 2026 · Manhattan Beach, CA",
//   description: "Help us get to the biggest AVP tournament of the year. Covers flights, housing, entry fees, and film crew for 5 people.",
//   campaign: "avp-manhattan-beach-2026",
//   goal: 5000,
// };

const mainCampaign = process.env.NEXT_PUBLIC_DONORBOX_MAIN_CAMPAIGN || "jesus-rules-ministries";
const diegoCampaign = process.env.NEXT_PUBLIC_DONORBOX_DIEGO_CAMPAIGN || "support-diego-perez";

const categories = [
  { name: "General Fund", campaign: mainCampaign, image: "/images/editorial/community-gathering.jpg" },
  { name: "Flights", campaign: "jrm-travel", image: "/images/London.jpg" },
  { name: "Housing", campaign: "jrm-travel", image: "/images/housing.jpg" },
  { name: "Tournament Fees", campaign: "jrm-tournament-fees", image: "/images/Australia.jpg" },
  { name: "Equipment & Gear", campaign: "jrm-equipment-and-gear", image: "/images/editorial/net-action.png" },
  { name: "Content Production", campaign: "jrm-content-production", image: "/images/editorial/behind-camera.jpg" },
];

const teamMembers = [
  {
    name: "Diego Perez",
    role: "Athlete & Operations",
    description:
      "Nationally ranked beach volleyball player pursuing the 2028 Olympics. Runs the business side of the ministry — website, merchandise, content, and operations.",
    image: "/images/editorial/diego-signing.jpg",
    href: `https://donorbox.org/${diegoCampaign}`,
  },
  {
    name: "Michael Clark",
    role: "Head Coach & Ministry Leader",
    description:
      "Started the discipleship group that became Jesus Rules Ministries. The relational and directional leader — casts vision, coaches the team, and travels to every tournament.",
    image: "/images/editorial/solomon-conversation.jpg",
    href: "https://meigiving.org/donate/michaelandabby",
  },
];

export default function DonatePage() {
  return (
    <div>
      {/* Hero — full-height with donation path cards */}
      <DonateHero />

      {/* Featured Trip Fund — only renders when featuredFund is set */}
      {featuredFund && (
        <section className="bg-background border-t border-gold/20">
          <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10 py-12 sm:py-16">
            <div className="relative border border-gold/30 bg-gold/[0.04] p-8 sm:p-10">
              <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
                Featured Fund
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight mb-2">
                {featuredFund.title}
              </h2>
              <p className="text-white/50 text-sm mb-4">
                {featuredFund.subtitle}
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-xl">
                {featuredFund.description}
              </p>
              {featuredFund.goal && (
                <p className="text-white/30 text-xs uppercase tracking-wide mb-6">
                  Goal: ${featuredFund.goal.toLocaleString()}
                </p>
              )}
              <a
                href={`https://donorbox.org/${featuredFund.campaign}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-body text-sm font-semibold tracking-wide transition-colors"
              >
                Fund This Trip
                <span className="text-base">→</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Meet the Team Video */}
      <section className="py-16 sm:py-24 bg-background border-t border-white/5">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="text-center mb-10">
            <h2 className="font-body text-2xl sm:text-3xl font-semibold text-white mb-3">
              Meet Diego &amp; Michael
            </h2>
            <p className="text-white/40 text-sm">
              Hear the heart behind Jesus Rules Ministries.
            </p>
          </div>
          <div className="aspect-video relative overflow-hidden">
            <video
              controls
              preload="metadata"
              poster="/images/posters/diego-michael-interview-poster.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/videos/diego-michael-interview.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Give by Category */}
      <section id="categories" className="py-16 sm:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="font-body text-2xl sm:text-3xl font-semibold text-white mb-3">
              Give by Category
            </h2>
            <p className="text-white/40 text-sm">
              Select a category or give to the general fund.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={`https://donorbox.org/${cat.campaign}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 group-hover:from-black/80 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="text-white font-body font-medium text-sm sm:text-base tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width image break */}
      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <Image
          src="/images/editorial/michael-speaking.png"
          alt="Michael speaking to group at tournament"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </section>

      {/* Give by Person */}
      <section id="team" className="py-16 sm:py-24 bg-dark border-t border-white/5">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="font-body text-2xl sm:text-3xl font-semibold text-white mb-3">
              Support a Team Member
            </h2>
            <p className="text-white/40 text-sm">
              Give directly to support Diego or Michael.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <a
                key={member.name}
                href={member.href}
                {...(member.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group bg-white/[0.04] border border-white/[0.06] hover:border-gold/30 transition-all duration-200 overflow-hidden"
              >
                <div className="aspect-[4/3] relative bg-white/[0.02] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gold text-xs tracking-wide uppercase mb-1">
                    {member.role}
                  </p>
                  <h3 className="text-white font-body font-medium text-lg mb-2">
                    {member.name}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">
                    {member.description}
                  </p>
                  <span className="text-sm font-body font-medium text-white/50 group-hover:text-gold transition-colors">
                    Support {member.name.split(" ")[0]} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form — Embedded Donorbox */}
      <section id="donate-form" className="py-16 sm:py-24 bg-background border-t border-white/5">
        <div className="max-w-lg mx-auto px-8 sm:px-12 lg:px-10 text-center">
          <h2 className="font-body text-2xl sm:text-3xl font-semibold text-white mb-2">
            Make a Gift
          </h2>
          <p className="text-white/40 text-sm mb-10">
            One-time or monthly. All donations are tax-deductible.
          </p>

          <div className="flex justify-center">
            <DonorboxEmbed campaign={mainCampaign} />
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 sm:py-24 bg-dark border-t border-white/5">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10">
          <h2 className="font-body text-2xl sm:text-3xl font-semibold text-white mb-10">
            Other Ways to Give
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Zelle",
                text: (
                  <>Send directly to <span className="text-gold">jesusrules.co@gmail.com</span></>
                ),
              },
              {
                title: "Check",
                text: <>Make payable to &quot;Jesus Rules Ministries&quot; — email <span className="text-gold">info@jesusrules.co</span> for our mailing address.</>,
              },
              {
                title: "Church Partnership",
                text: (
                  <>
                    Your church can become a partner.{" "}
                    <a href="mailto:info@jesusrules.co" className="text-gold hover:text-gold-light transition-colors">
                      Reach out
                    </a>
                  </>
                ),
              },
              {
                title: "Tax Information",
                text: <>EIN 33-3630279 · 501(c)(3) · All gifts are tax-deductible.</>,
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white/[0.04] border border-white/[0.06]">
                <h3 className="text-white font-body font-medium mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

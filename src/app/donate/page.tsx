import type { Metadata } from "next";
import Image from "next/image";
import DonateHero from "@/components/DonateHero";
import DonorboxEmbed from "@/components/DonorboxEmbed";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Jesus Rules Ministries. Your tax-deductible donation funds tournament travel, discipleship training, and Gospel outreach worldwide.",
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
  { name: "General Fund", campaign: mainCampaign, description: "Wherever it's needed most. Keeps the ministry running day to day.", icon: "✦" },
  { name: "Travel", campaign: "jrm-travel", description: "Flights and housing so we can get to tournaments across the country and world.", icon: "✦" },
  { name: "Tournament Fees", campaign: "jrm-tournament-fees", description: "Entry fees for AVP and FIVB Beach Pro Tour events.", icon: "✦" },
  { name: "Equipment & Gear", campaign: "jrm-equipment-and-gear", description: "Volleyball, training, and video production equipment.", icon: "✦" },
  { name: "Content Production", campaign: "jrm-content-production", description: "Documentary filming, YouTube, and media that shares the story.", icon: "✦" },
];

const teamMembers = [
  {
    name: "Diego Perez",
    role: "Professional Athlete",
    description:
      "Nationally ranked beach volleyball player pursuing the 2028 Olympics. Leads all ministry operations, discipleship training, and Gospel outreach at every tournament.",
    image: "/images/editorial/diego-signing.jpg",
    href: `https://donorbox.org/${diegoCampaign}`,
  },
  {
    name: "Michael Clark",
    role: "Head Coach",
    description:
      "Head coach who travels with the team to every tournament. Plays a critical role in athlete development and ministry operations.",
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
              className="w-full h-full object-cover"
            >
              <source src="/videos/diego-michael-interview.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Give by Category */}
      <section id="categories" className="py-16 sm:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="font-body text-2xl sm:text-3xl font-semibold text-white mb-3">
              Choose Where Your Gift Goes
            </h2>
            <p className="text-white/40 text-sm">
              Select a category or give to the general fund.
            </p>
          </div>

          <div className="space-y-3">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={`https://donorbox.org/${cat.campaign}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 p-6 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-gold/30 transition-all duration-200"
              >
                <div className="flex-1">
                  <h3 className="text-white font-body font-medium text-base mb-1 group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <span className="text-white/20 group-hover:text-gold transition-colors text-lg">
                  →
                </span>
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

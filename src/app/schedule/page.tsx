import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "2026 professional beach volleyball schedule for Jesus Rules Ministries — AVP League, Heritage Majors, Heritage Contenders, and Beach Pro Tour events.",
  alternates: {
    canonical: "/schedule",
  },
};

interface Tournament {
  name: string;
  dates: string;
  location: string;
}

const heritageContenders: Tournament[] = [
  { name: "AVP Austin Open", dates: "April 17–19", location: "Austin, TX" },
  { name: "AVP Pompano Open", dates: "May 23–24", location: "Pompano, FL" },
  { name: "AVP Virginia Beach Open", dates: "June 13–14", location: "Virginia Beach, VA" },
  { name: "AVP Denver Open", dates: "July 3–5", location: "Denver, CO" },
  { name: "AVP Waupaca Open", dates: "July 8–10", location: "Oshkosh, WI" },
  { name: "AVP Mother Lode", dates: "September 5–7", location: "Aspen, CO" },
  { name: "AVP Midwest Open", dates: "September 25–27", location: "Edwardsville, IL" },
];

const heritageMajors: Tournament[] = [
  { name: "AVP Huntington Beach Open", dates: "May 15–17", location: "Huntington Beach, CA" },
  { name: "AVP Manhattan Beach Open", dates: "August 14–16", location: "Manhattan Beach, CA" },
  { name: "AVP Laguna Open", dates: "September 18–20", location: "Laguna Beach, CA" },
];

const avpLeague: Tournament[] = [
  { name: "Week 1", dates: "June 6–7", location: "Aspen, CO" },
  { name: "Week 2", dates: "June 12–13", location: "Miami, FL" },
  { name: "Week 3", dates: "June 19–20", location: "Las Vegas, NV" },
  { name: "Week 4", dates: "June 27–28", location: "Belmar, NJ" },
  { name: "Week 5", dates: "July 11–12", location: "Los Angeles, CA" },
  { name: "Week 6", dates: "July 18–19", location: "New York, NY" },
  { name: "Week 7", dates: "August 1–2", location: "East Hampton, NY" },
  { name: "Week 8", dates: "August 7–8", location: "Dallas, TX" },
  { name: "Championships", dates: "September 5–6", location: "Chicago, IL" },
];

const otherEvents: Tournament[] = [
  { name: "Seaside Beach Volleyball Tournament", dates: "August 5–9", location: "Seaside, OR" },
];

/** Parse a date string like "April 17–19" into an ISO start date for 2026. */
function parseTournamentStartDate(dates: string): string {
  const match = dates.match(/^(\w+)\s+(\d+)/);
  if (!match) return "2026-01-01";
  const [, month, day] = match;
  const d = new Date(`${month} ${day}, 2026`);
  if (isNaN(d.getTime())) return "2026-01-01";
  return d.toISOString().split("T")[0];
}

/** Parse a location like "Austin, TX" into city and state. */
function parseLocation(location: string): { city: string; state: string } {
  const parts = location.split(", ");
  return { city: parts[0] || location, state: parts[1] || "" };
}

/** Build SportsEvent JSON-LD entries from all tournament arrays. */
function buildSportsEventsJsonLd() {
  const allTournaments = [
    ...heritageContenders,
    ...heritageMajors,
    ...avpLeague.map((t) => ({
      ...t,
      name: t.name === "Championships" ? "AVP League Championships" : `AVP League ${t.name}`,
    })),
    ...otherEvents,
  ];

  return allTournaments.map((t) => {
    const { city, state } = parseLocation(t.location);
    return {
      "@type": "SportsEvent",
      name: t.name,
      startDate: parseTournamentStartDate(t.dates),
      location: {
        "@type": "Place",
        name: t.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: state,
          addressCountry: "US",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Jesus Rules Ministries",
      },
    };
  });
}

function TournamentSection({
  label,
  title,
  tournaments,
}: {
  label: string;
  title: string;
  tournaments: Tournament[];
}) {
  return (
    <div className="mb-12">
      <div className="border-l-2 border-gold/40 pl-5 mb-6">
        <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-1.5">
          {label}
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary tracking-tight">
          {title}
        </h2>
      </div>
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* Column headers */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="col-span-5">
            <span className="text-[10px] font-body font-semibold text-text-muted tracking-[0.15em] uppercase">
              Event
            </span>
          </div>
          <div className="col-span-3">
            <span className="text-[10px] font-body font-semibold text-text-muted tracking-[0.15em] uppercase">
              Dates
            </span>
          </div>
          <div className="col-span-4">
            <span className="text-[10px] font-body font-semibold text-text-muted tracking-[0.15em] uppercase">
              Location
            </span>
          </div>
        </div>
        {tournaments.map((t, i) => (
          <div
            key={i}
            className={`px-5 py-4 transition-colors hover:bg-white/[0.04] ${
              i !== tournaments.length - 1 ? "border-b border-white/[0.05]" : ""
            }`}
          >
            {/* Desktop */}
            <div className="hidden sm:grid grid-cols-12 gap-4 items-baseline">
              <div className="col-span-5">
                <span className="text-text-primary text-sm font-medium">{t.name}</span>
              </div>
              <div className="col-span-3">
                <span className="text-text-secondary text-sm">{t.dates}</span>
              </div>
              <div className="col-span-4">
                <span className="text-text-secondary text-sm">{t.location}</span>
              </div>
            </div>
            {/* Mobile */}
            <div className="sm:hidden">
              <p className="text-text-primary text-sm font-medium mb-1.5">{t.name}</p>
              <div className="flex items-center gap-3 text-text-secondary text-xs">
                <span>{t.dates}</span>
                <span className="text-white/20">·</span>
                <span>{t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const sportsEventsJsonLd = {
    "@context": "https://schema.org",
    "@graph": buildSportsEventsJsonLd(),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventsJsonLd) }}
      />

      <PageHero
        image="/images/editorial/chicago-competition.jpg"
        label="2026 Season"
        title="Tournament Schedule"
        description="Follow us across the country as we compete on the AVP tour and bring the Gospel to every city we visit."
      />

      {/* Schedule */}
      <section className="pb-20 sm:pb-28 bg-cream">
        <div className="max-w-3xl mx-auto px-6 sm:px-12 lg:px-10 pt-16 sm:pt-20">
          <TournamentSection
            label="Contender Series"
            title="Heritage Contender Events"
            tournaments={heritageContenders}
          />
          <TournamentSection
            label="Major Series"
            title="Heritage Majors"
            tournaments={heritageMajors}
          />
          <TournamentSection
            label="Pro League"
            title="AVP League"
            tournaments={avpLeague}
          />
          <TournamentSection
            label="Other Events"
            title="Other"
            tournaments={otherEvents}
          />

          <div className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-5 py-4">
            <p className="text-text-muted text-xs leading-relaxed">
              FIVB Beach Pro Tour international events will be added as confirmed.
              Schedule subject to change. Follow{" "}
              <a
                href="https://instagram.com/diegonickperez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
              >
                @diegonickperez
              </a>{" "}
              for real-time updates.
            </p>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/editorial/net-action.png"
          alt="Players at the net during beach volleyball match"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>
    </div>
  );
}

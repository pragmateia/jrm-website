import Image from "next/image";
import Link from "next/link";

interface PanelProps {
  image: string;
  alt: string;
  label: string;
  title: string;
  description?: string;
  href: string;
  cta: string;
}

function Panel({ image, alt, label, title, description, href, cta }: PanelProps) {
  return (
    <Link href={href} className="group relative block">
      {/* Image layer — overflow-hidden isolated here for hover scale */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Text layer — starts at 45% of panel, pins near viewport bottom */}
      <div className="relative z-10 aspect-[3/4] sm:aspect-[4/5]">
        <div className="h-[20%]" />
        <div className="sticky top-[calc(100vh-21rem)] p-6 sm:p-8 lg:p-12">
          <p className="text-[11px] sm:text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-white/70 mb-3">
            {label}
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white mb-3 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-white/70 text-sm sm:text-base mb-5 max-w-sm leading-relaxed font-body hidden sm:block">
              {description}
            </p>
          )}
          <span className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.15em] uppercase transition-all group-hover:bg-white/90">
            {cta}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function EditorialSplit() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background">
      <Panel
        image="/images/editorial/chicago-competition.jpg"
        alt="Diego competing at AVP Chicago"
        label="Competition"
        title="Built to Compete"
        description="Nationally ranked and pursuing the 2028 LA Olympics while representing Christ on every court."
        href="/about"
        cta="Meet the Team"
      />
      <Panel
        image="/images/editorial/outreach-group.jpg"
        alt="Ministry outreach at tournament"
        label="Outreach"
        title="Called to Serve"
        description="Gospel conversations, prayer, and community at every tournament stop across the country."
        href="/outreach"
        cta="Host an Event"
      />
    </section>
  );
}

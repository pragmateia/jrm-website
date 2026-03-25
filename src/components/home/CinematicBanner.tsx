import Image from "next/image";
import Link from "next/link";

interface CinematicBannerProps {
  image: string;
  alt: string;
  label: string;
  title: string;
  subtitle?: string;
  href?: string;
  cta?: string;
  align?: "left" | "center";
  height?: "tall" | "medium";
}

export default function CinematicBanner({
  image,
  alt,
  label,
  title,
  subtitle,
  href,
  cta,
  align = "left",
  height = "tall",
}: CinematicBannerProps) {
  const heightClass = height === "tall" ? "h-[80vh] sm:h-[90vh]" : "h-[60vh] sm:h-[70vh]";
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <section className={`relative ${heightClass}`}>
      {/* Image layer */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20" />
      </div>

      {/* Text layer — starts at 45% of section, pins near viewport bottom */}
      <div className="relative z-10 h-full">
        <div className="h-[20%]" />
        <div
          className={`sticky top-[calc(100vh-24rem)] px-8 sm:px-12 lg:px-20 pb-20 sm:pb-28 flex flex-col ${alignClass}`}
        >
          <p className="text-[11px] sm:text-[13px] font-body font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            {label}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 max-w-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/70 text-base sm:text-lg max-w-lg leading-relaxed mb-8 font-body">
              {subtitle}
            </p>
          )}
          {href && cta && (
            <Link
              href={href}
              className="inline-flex items-center justify-center px-10 py-3.5 bg-white text-black font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all hover:bg-white/90"
            >
              {cta}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

interface PageHeroProps {
  image: string;
  label: string;
  title: string;
  description?: string;
}

export default function PageHero({ image, label, title, description }: PageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[420px] flex items-end">
      <Image
        src={image}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-12 lg:px-10 pb-16 w-full">
        <p className="text-[12px] sm:text-[13px] font-body font-semibold text-gold-light tracking-[0.25em] uppercase mb-5">
          {label}
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-white/80 text-base sm:text-lg max-w-lg mt-6 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

const items = [
  {
    image: "/images/editorial/diego-signing.jpg",
    alt: "Diego signing autographs for young fans",
    label: "Community",
    title: "Every Conversation Matters",
    href: "/about",
  },
  {
    image: "/images/editorial/kids-shirts.jpg",
    alt: "Kids wearing Jesus Rules shirts",
    label: "Next Generation",
    title: "Start Them Young",
    href: "/shop",
  },
  {
    image: "/images/editorial/michael-child.jpg",
    alt: "Michael Clark mentoring a child at AVP",
    label: "Mentorship",
    title: "One at a Time",
    href: "/about",
  },
];

export default function EditorialGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-background">
      {items.map((item) => (
        <Link key={item.title} href={item.href} className="group relative block overflow-hidden">
          <div className="aspect-[3/4] relative">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-[11px] sm:text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-white/70 mb-2">
              {item.label}
            </p>
            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl text-white leading-tight">
              {item.title}
            </h3>
          </div>
        </Link>
      ))}
    </section>
  );
}

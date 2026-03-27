import Image from "next/image";
import Link from "next/link";

export default function AboutExcerpt() {
  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image — large, prominent */}
          <div>
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src="/images/ministry/prayer-circle.png"
                alt="Jesus Rules Ministries team in prayer"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-6">
              About the Ministry
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-8 leading-tight">
              Excel in Your Gifts.
              <br />
              Glorify God.
            </h2>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                Jesus Rules Ministries was founded on a simple conviction:
                Christians should be the best at what they do — and bring the
                Gospel with them wherever they go.
              </p>
              <p>
                What started as a small discipleship group at the Great Park in
                Irvine has grown into a ministry that reaches players and fans at
                AVP and FIVB tournaments worldwide. Led by nationally ranked
                athlete Diego Perez and head coach Michael Clark, JRM trains
                athletes to compete with excellence and share the truth of Christ
                at every stop.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-block mt-8 text-[12px] font-body font-medium tracking-[0.12em] uppercase text-text-secondary hover:text-text-primary transition-colors link-underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

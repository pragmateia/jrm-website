import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";

const outreachFAQs = [
  {
    question:
      "How do I book a volleyball clinic with Jesus Rules Ministries?",
    answer:
      "Contact us at info@jesusrules.co or through our website. We bring professional-level volleyball instruction combined with Gospel preaching to churches, schools, and community organizations.",
  },
  {
    question: "What does a Jesus Rules outreach event include?",
    answer:
      "A professional beach volleyball clinic or exhibition, a Gospel message, and opportunities for prayer and discipleship. Events can be customized for your organization\u2019s needs.",
  },
  {
    question: "How much does it cost to host an outreach event?",
    answer:
      "We work with each organization individually. Many events are funded through our ministry\u2019s budget and donor support. Contact us to discuss your specific situation.",
  },
  {
    question:
      "Where can Jesus Rules Ministries hold outreach events?",
    answer:
      "Anywhere! We\u2019ve done events at churches, schools, community centers, and beach venues. We travel nationally for outreach opportunities.",
  },
  {
    question: "Can Jesus Rules come to my church?",
    answer:
      "Absolutely. We love partnering with local churches for volleyball clinics, worship services, and outreach events. Reach out at info@jesusrules.co to start the conversation.",
  },
];

const outreachFAQJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: outreachFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: "Outreach",
  description:
    "Invite Jesus Rules Ministries to your church, school, or community for professional beach volleyball clinics paired with Gospel preaching and discipleship.",
  alternates: {
    canonical: "/outreach",
  },
};

export default function OutreachPage() {
  return (
    <div>
      <PageHero
        image="/images/editorial/beach-group.jpg"
        label="Partner With Us"
        title="Outreach Events"
        description="Bring Jesus Rules Ministries to your church, school, or organization. Volleyball clinics paired with Gospel preaching."
      />

      {/* What We Offer */}
      <section className="pb-20 sm:pb-28 bg-cream">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10 pt-20">
          <p className="text-text-secondary leading-[1.85] mb-12">
            Jesus Rules Ministries comes to your community for 3–5 day
            engagements that combine high-level volleyball instruction with
            powerful Gospel preaching. Our team includes a nationally ranked
            professional beach volleyball player, a head coach, and
            videographers capturing the ministry in action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                title: "Volleyball Clinics",
                description:
                  "Professional-level instruction for all ages and skill levels. Learn from athletes competing at the highest level.",
              },
              {
                title: "Gospel Preaching",
                description:
                  "Clear, bold proclamation of the Gospel. Diego shares his testimony and the message of Christ with authenticity.",
              },
              {
                title: "Documentary Content",
                description:
                  "Our videography team captures the event, giving your organization exposure to our audience.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-background p-8">
                <h3 className="text-text-primary font-medium mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width image — community gathering */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/editorial/bible-study-bleachers.png"
          alt="Michael leading Bible study on bleachers"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </section>

      {/* What We Ask */}
      <section className="py-20 sm:py-28 bg-background border-t border-white/5">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10">
          <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
            Requirements
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary tracking-tight mb-12">
            What We Ask
          </h2>

          <div className="space-y-0 divide-y divide-white/5">
            {[
              {
                num: "01",
                title: "Cover Travel & Lodging",
                description:
                  "The host organization covers flights and accommodations for our team (typically 2–3 people).",
              },
              {
                num: "02",
                title: "A Donation to the Ministry",
                description:
                  "We do not charge a fee. A donation to Jesus Rules Ministries is expected but there is no minimum amount.",
              },
              {
                num: "03",
                title: "A Venue & Audience",
                description:
                  "Provide a space for the clinic (beach or indoor court) and gather your community. We'll take care of the rest.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-8 py-8">
                <span className="text-gold/40 font-heading text-sm font-semibold pt-0.5">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-text-primary font-medium mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 sm:py-28 bg-cream border-t border-white/5">
        <div className="max-w-lg mx-auto px-8 sm:px-12 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary tracking-tight">
              Host an Event
            </h2>
          </div>
          <ContactForm type="outreach" />
        </div>
      </section>

      {/* Ambassador Section */}
      <section className="py-20 sm:py-28 bg-background border-t border-white/5">
        <div className="max-w-lg mx-auto px-8 sm:px-12 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
              Join Us
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary tracking-tight mb-4">
              Become an Ambassador
            </h2>
            <p className="text-text-secondary text-sm leading-[1.85]">
              Represent Jesus Rules Ministries in your area. Help with local
              outreach, events, and fundraising.
            </p>
          </div>
          <ContactForm type="ambassador" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-cream border-t border-white/5">
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-10">
          <FAQSection
            items={outreachFAQs}
            label="Outreach FAQ"
            heading="Common Questions"
          />
        </div>
      </section>

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(outreachFAQJsonLd) }}
      />
    </div>
  );
}

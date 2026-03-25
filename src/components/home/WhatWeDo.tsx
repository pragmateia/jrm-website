import Image from "next/image";

const activities = [
  {
    title: "Weekly Discipleship",
    description:
      "2-3 times per week in Orange County. Bible teaching paired with volleyball training — building disciples who compete with excellence.",
    image: "/images/ministry/bible-study-group.png",
  },
  {
    title: "Tournament Ministry",
    description:
      "Competing at ~20 professional tournaments per year across the AVP and FIVB tours. Gospel conversations at every stop.",
    image: "/images/ministry/beach-drills.png",
  },
  {
    title: "Outreach Events",
    description:
      "Churches and organizations host us for 3-5 day engagements combining volleyball clinics with Gospel preaching.",
    image: "/images/ministry/coaching-on-sand.png",
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
            The Ministry
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-text-primary">
            What We Do
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {activities.map((activity) => (
            <div key={activity.title}>
              <div className="aspect-[4/3] relative overflow-hidden mb-6">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-4 text-center">
                {activity.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed text-center">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

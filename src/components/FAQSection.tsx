"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  label?: string;
  heading?: string;
}

export default function FAQSection({
  items,
  label = "FAQ",
  heading = "Frequently Asked Questions",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
        {label}
      </p>
      <h2 className="font-heading text-3xl sm:text-4xl text-text-primary tracking-tight mb-12">
        {heading}
      </h2>

      <div className="divide-y divide-white/5">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left group cursor-pointer"
              aria-expanded={openIndex === index}
            >
              <span className="text-text-primary font-medium leading-relaxed group-hover:text-gold transition-colors">
                {item.question}
              </span>
              <span
                className={`text-gold/60 text-xl leading-none mt-0.5 shrink-0 transition-transform duration-300 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-96 opacity-100 pb-6"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-text-secondary text-sm leading-[1.85] pr-12">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

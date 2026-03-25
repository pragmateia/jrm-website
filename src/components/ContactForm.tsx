"use client";

import { useState } from "react";

interface ContactFormProps {
  type: "outreach" | "ambassador";
}

export default function ContactForm({ type }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", organization: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-12 text-center">
        <p className="text-gold font-heading font-semibold mb-2">
          Message Sent
        </p>
        <p className="text-text-secondary text-sm">
          Thanks for reaching out. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor={`${type}-name`}
          className="block text-[11px] font-body font-semibold text-text-muted tracking-[0.15em] uppercase mb-2"
        >
          Name
        </label>
        <input
          id={`${type}-name`}
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors text-sm"
        />
      </div>
      <div>
        <label
          htmlFor={`${type}-email`}
          className="block text-[11px] font-body font-semibold text-text-muted tracking-[0.15em] uppercase mb-2"
        >
          Email
        </label>
        <input
          id={`${type}-email`}
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors text-sm"
        />
      </div>
      <div>
        <label
          htmlFor={`${type}-org`}
          className="block text-[11px] font-body font-semibold text-text-muted tracking-[0.15em] uppercase mb-2"
        >
          {type === "outreach" ? "Church / Organization" : "Location / Affiliation"}
        </label>
        <input
          id={`${type}-org`}
          type="text"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors text-sm"
        />
      </div>
      <div>
        <label
          htmlFor={`${type}-message`}
          className="block text-[11px] font-body font-semibold text-text-muted tracking-[0.15em] uppercase mb-2"
        >
          Message
        </label>
        <textarea
          id={`${type}-message`}
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={
            type === "outreach"
              ? "Tell us about your organization and what you have in mind..."
              : "Tell us about yourself and why you'd like to represent JRM..."
          }
          className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors text-sm resize-none"
        />
      </div>
      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-10 py-3.5 bg-gold text-black font-body text-[12px] font-semibold tracking-[0.15em] uppercase transition-all hover:bg-gold-light disabled:opacity-50"
        >
          {status === "loading"
            ? "Sending..."
            : type === "outreach"
              ? "Submit Inquiry"
              : "Apply"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs">
          Something went wrong. Please try again or email diego@jesusrules.co directly.
        </p>
      )}
    </form>
  );
}

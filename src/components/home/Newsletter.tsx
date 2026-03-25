"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="newsletter" className="py-24 sm:py-32 bg-background">
      <div className="max-w-xl mx-auto px-8 sm:px-12 text-center">
        <p className="text-[10px] sm:text-[11px] font-body font-medium tracking-[0.3em] uppercase text-white/60 mb-4">
          Stay Connected
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl text-white mb-4">
          From the Road
        </h2>
        <p className="text-white/60 text-sm mb-10 font-body leading-relaxed">
          Tournament updates, ministry stories, and news from the field.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            aria-label="Email address"
            required
            className="flex-1 px-5 py-3.5 bg-transparent border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors text-sm font-body"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 py-3.5 bg-white text-black font-body text-[11px] font-semibold tracking-[0.15em] uppercase transition-all hover:bg-white/90 disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-5 text-gold text-sm font-body">Thank you for subscribing.</p>
        )}
        {status === "error" && (
          <p className="mt-5 text-red-400 text-sm font-body">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}

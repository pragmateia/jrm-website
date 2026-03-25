"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** How many pixels the text travels (default 50) */
  distance?: number;
}

export default function ScrollReveal({ children, className = "", distance = 50 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(-distance);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 = element just entered bottom of viewport, 1 = element at top
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);

      // Start at -distance (higher up), end at 0 (natural position)
      setOffset(-distance + progress * distance);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [distance]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

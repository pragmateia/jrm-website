"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const HERO_PARTS = [
  "/videos/hero-part1.mp4",
  "/videos/hero-part2.mp4",
  "/videos/hero-part3.mp4",
  "/videos/hero-part4.mp4",
  "/videos/hero-part5.mp4",
  "/videos/hero-part6.mp4",
  "/videos/hero-part7.mp4",
];

export default function Hero() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const playingRef = useRef(false);
  // Which buffer is currently active: "A" or "B"
  const [activeBuffer, setActiveBuffer] = useState<"A" | "B">("A");

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    let cancelled = false;
    let active: HTMLVideoElement = videoA;
    let standby: HTMLVideoElement = videoB;
    let activeIs: "A" | "B" = "A";
    let nextReady = false;

    // --- Random start part (client-only) ---
    const startIdx = Math.floor(Math.random() * HERO_PARTS.length);
    let currentIdx = startIdx;
    active.src = HERO_PARTS[startIdx];

    // --- Autoplay ---
    const tryPlay = () => {
      if (cancelled) return;
      active.play().then(() => {}).catch(() => {
        if (!cancelled) {
          setAutoplayBlocked(true);
          setVideoReady(true);
        }
      });
    };

    if (active.readyState >= 3) {
      tryPlay();
    } else {
      active.addEventListener("canplay", tryPlay, { once: true });
    }

    // --- First play → reveal video, start preloading next ---
    const onFirstPlaying = () => {
      if (cancelled) return;
      playingRef.current = true;
      setVideoReady(true);
      loadNext();
    };
    active.addEventListener("playing", onFirstPlaying, { once: true });

    // --- Preload the next part into the standby buffer ---
    const loadNext = () => {
      nextReady = false;
      const nextIdx = (currentIdx + 1) % HERO_PARTS.length;
      standby.src = HERO_PARTS[nextIdx];
      standby.load();

      const onLoaded = () => {
        if (!cancelled) nextReady = true;
      };
      if (standby.readyState >= 4) {
        onLoaded();
      } else {
        standby.addEventListener("canplaythrough", onLoaded, { once: true });
      }
    };

    // --- Part transition on ended ---
    const onEnded = () => {
      if (cancelled) return;

      if (nextReady) {
        // Play the standby buffer (already loaded, frame rendered)
        standby.play().then(() => {
          // Swap roles
          const prevActive = active;
          active = standby;
          standby = prevActive;
          activeIs = activeIs === "A" ? "B" : "A";
          currentIdx = (currentIdx + 1) % HERO_PARTS.length;
          setActiveBuffer(activeIs);

          // Attach ended listener to the new active
          active.addEventListener("ended", onEnded, { once: true });

          // Start preloading the next part into the new standby
          loadNext();
        }).catch(() => {
          // Standby failed to play — replay current part
          active.currentTime = 0;
          active.addEventListener("ended", onEnded, { once: true });
          active.play().catch(() => {});
        });
      } else {
        // Next not ready — replay current part from beginning
        active.currentTime = 0;
        active.addEventListener("ended", onEnded, { once: true });
        active.play().catch(() => {});
      }
    };

    active.addEventListener("ended", onEnded, { once: true });

    // --- Fallback: show image if nothing plays within 5s ---
    const fallback = setTimeout(() => {
      if (!cancelled && !playingRef.current) {
        setAutoplayBlocked(true);
        setVideoReady(true);
      }
    }, 5000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      videoA.removeEventListener("playing", onFirstPlaying);
      videoA.removeEventListener("canplay", tryPlay);
      videoA.pause();
      videoB.pause();
    };
  }, []);

  // Tap-to-play if autoplay was blocked
  const handleTap = () => {
    if (!autoplayBlocked) return;
    const video = videoARef.current;
    if (!video) return;
    video.play().then(() => {
      setAutoplayBlocked(false);
    }).catch(() => {});
  };

  return (
    <section
      className="relative min-h-[100dvh] flex items-end overflow-hidden -mt-[env(safe-area-inset-top)] pt-[env(safe-area-inset-top)]"
      onClick={handleTap}
    >
      {/* Fallback image */}
      <img
        src="/images/editorial/beach-walk.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Double-buffered video: two elements swap active/standby roles.
          The standby is fully loaded behind the active, so transitions
          are seamless — no flash of fallback image. */}
      <video
        ref={videoARef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover ${
          autoplayBlocked ? "invisible" : ""
        } ${activeBuffer === "A" ? "z-[1]" : "z-0"}`}
      />
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover ${
          autoplayBlocked ? "invisible" : ""
        } ${activeBuffer === "B" ? "z-[1]" : "z-0"}`}
      />

      {/* Black cover — fades out once video plays or fallback shows */}
      <div
        className={`absolute inset-0 bg-black z-[2] transition-opacity duration-1000 ${
          videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content */}
      <div className="relative z-[4] w-full px-8 sm:px-12 lg:px-20 pb-20 sm:pb-28">
        <p className="text-[12px] sm:text-[13px] font-body font-semibold tracking-[0.3em] uppercase text-white/80 mb-5">
          Jesus Rules Ministries
        </p>
        <h1 className="font-heading text-[clamp(1.75rem,5vw,4.5rem)] text-white leading-[1.1] mb-6">
          <span className="whitespace-nowrap">Using the Gifts God Gave Us</span>
          <br />
          <em className="text-gold-light" style={{ textShadow: "0 0 40px rgba(201, 168, 125, 0.55)" }}>to Preach the Gospel</em>
        </h1>
        <p className="text-base sm:text-lg text-white/70 mb-10 max-w-lg leading-relaxed font-body">
          Professional beach volleyball ministry competing worldwide
          and proclaiming Christ at every tournament.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all hover:bg-white/90"
          >
            Shop
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/50 text-white font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all hover:border-white hover:bg-white/10"
          >
            Donate
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[4]">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/30" />
      </div>
    </section>
  );
}

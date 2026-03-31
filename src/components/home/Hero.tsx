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
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloaderRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const playingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const preloader = preloaderRef.current;
    if (!video || !preloader) return;

    let cancelled = false;

    // --- Random start part (client-only) ---
    const startIdx = Math.floor(Math.random() * HERO_PARTS.length);
    let currentIdx = startIdx;

    // Change src before first play if not part1.
    // iOS allows muted+playsinline videos to autoplay even with
    // programmatic src — the previous failures were from other bugs.
    if (startIdx !== 0) {
      video.src = HERO_PARTS[startIdx];
    }

    // --- Autoplay ---
    const tryPlay = () => {
      if (cancelled) return;
      video.play().then(() => {}).catch(() => {
        if (!cancelled) {
          setAutoplayBlocked(true);
          setVideoReady(true);
        }
      });
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    // --- First play → reveal video, start preloading next ---
    const onPlaying = () => {
      if (cancelled) return;
      playingRef.current = true;
      setVideoReady(true);
      loadNext();
    };
    video.addEventListener("playing", onPlaying, { once: true });

    // --- Preloader: always loads the next part in sequence ---
    let nextReady = false;

    const loadNext = () => {
      nextReady = false;
      const nextIdx = (currentIdx + 1) % HERO_PARTS.length;
      preloader.src = HERO_PARTS[nextIdx];
      preloader.load();

      const onLoaded = () => {
        if (!cancelled) nextReady = true;
      };
      if (preloader.readyState >= 4) {
        onLoaded();
      } else {
        preloader.addEventListener("canplaythrough", onLoaded, { once: true });
      }
    };

    // --- Part transition on ended ---
    const onEnded = () => {
      if (cancelled) return;

      if (nextReady) {
        // Swap to preloaded part
        const prevIdx = currentIdx;
        const prevSrc = video.src;
        currentIdx = (currentIdx + 1) % HERO_PARTS.length;
        video.src = HERO_PARTS[currentIdx];

        video.play().then(() => {
          loadNext();
        }).catch(() => {
          // Swap failed — restore previous part and replay it
          currentIdx = prevIdx;
          video.src = prevSrc;
          video.currentTime = 0;
          video.play().catch(() => {});
        });
      } else {
        // Next not ready — replay current part from beginning
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", onEnded);

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
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", tryPlay);
      video.pause();
      preloader.pause();
    };
  }, []);

  // Tap-to-play if autoplay was blocked
  const handleTap = () => {
    if (!autoplayBlocked) return;
    const video = videoRef.current;
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

      {/* Main video */}
      <video
        ref={videoRef}
        src={HERO_PARTS[0]}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover ${autoplayBlocked ? "invisible" : ""}`}
      />

      {/* Hidden preloader for next part */}
      <video
        ref={preloaderRef}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Black cover — fades out once video plays or fallback shows */}
      <div
        className={`absolute inset-0 bg-black z-[1] transition-opacity duration-1000 ${
          videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full px-8 sm:px-12 lg:px-20 pb-20 sm:pb-28">
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/30" />
      </div>
    </section>
  );
}

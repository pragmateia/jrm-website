"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const HERO_PARTS = [
  "/videos/hero-part1.mp4",
  "/videos/hero-part2.mp4",
  "/videos/hero-part3.mp4",
  "/videos/hero-part4.mp4",
  "/videos/hero-part5.mp4",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const partIndex = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const nextVideo = nextVideoRef.current;
    if (!video || !nextVideo) return;

    let cancelled = false;
    let rafId: number | null = null;

    // Always start with part 0 (matches the src in JSX). Do NOT change
    // video.src here — doing so cancels iOS autoplay.
    partIndex.current = 0;

    // Nudge play in case autoPlay attribute alone isn't enough (some browsers
    // need an explicit play() call). Only do this AFTER canplay so iOS is happy.
    const nudgePlay = () => {
      if (cancelled) return;
      video.play().catch(() => {});
    };
    if (video.readyState >= 3) {
      nudgePlay();
    } else {
      video.addEventListener("canplay", nudgePlay, { once: true });
    }

    const handlePlaying = () => {
      if (!cancelled) {
        setVideoReady(true);
      }
    };
    video.addEventListener("playing", handlePlaying, { once: true });

    // Preload the next part
    nextVideo.src = HERO_PARTS[1];
    nextVideo.load();

    const swapToNext = () => {
      if (cancelled) return;
      partIndex.current = (partIndex.current + 1) % HERO_PARTS.length;
      const upcomingPart = (partIndex.current + 1) % HERO_PARTS.length;

      video.src = nextVideo.src;
      video.load();
      video.play().catch(() => {});

      nextVideo.src = HERO_PARTS[upcomingPart];
      nextVideo.load();
    };

    const handleEnded = () => {
      if (cancelled) return;
      if (nextVideo.readyState < 3) {
        video.currentTime = 0;
        video.play().catch(() => {});
        const checkReady = () => {
          if (cancelled) return;
          if (nextVideo.readyState >= 3) {
            video.pause();
            swapToNext();
          } else {
            rafId = requestAnimationFrame(checkReady);
          }
        };
        rafId = requestAnimationFrame(checkReady);
        return;
      }
      swapToNext();
    };

    video.addEventListener("ended", handleEnded);

    const fallback = setTimeout(() => {
      if (!cancelled) {
        setVideoReady(true);
      }
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      if (rafId !== null) cancelAnimationFrame(rafId);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", nudgePlay);
      video.pause();
      nextVideo.pause();
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden -mt-[env(safe-area-inset-top)] pt-[env(safe-area-inset-top)]">
      {/* Fallback image */}
      <img
        src="/images/editorial/beach-walk.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Main video player — always starts with HERO_PARTS[0] for SSR/client
          match. useEffect swaps to random part after mount. Attributes needed
          for iOS autoplay: autoPlay + muted + playsInline (all three required). */}
      <video
        ref={videoRef}
        src={HERO_PARTS[0]}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Hidden preloader for next part */}
      <video
        ref={nextVideoRef}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Black cover — fades out once video is playing */}
      <div
        className={`absolute inset-0 bg-black z-[1] transition-opacity duration-1000 ${
          videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content — bottom-left */}
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

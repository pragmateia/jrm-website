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
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const partIndex = useRef(0);
  const playingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const nextVideo = nextVideoRef.current;
    if (!video || !nextVideo) return;

    let cancelled = false;
    let rafId: number | null = null;
    partIndex.current = 0;

    const startPlayback = () => {
      if (cancelled) return;
      video.play().then(() => {
        // Autoplay worked — video is playing
      }).catch(() => {
        // Autoplay blocked (Low Power Mode, data saver, etc.)
        // Hide video element so native play button doesn't show,
        // reveal fallback image instead.
        if (!cancelled) {
          setAutoplayBlocked(true);
          setVideoReady(true); // fade out black cover to show fallback image
        }
      });
    };

    if (video.readyState >= 3) {
      startPlayback();
    } else {
      video.addEventListener("canplay", startPlayback, { once: true });
    }

    const handlePlaying = () => {
      if (!cancelled) {
        playingRef.current = true;
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

    // Fallback: if nothing happens after 5s, show the fallback image.
    // Use playingRef (not videoReady state) to avoid stale closure.
    const fallback = setTimeout(() => {
      if (!cancelled && !playingRef.current) {
        setAutoplayBlocked(true);
        setVideoReady(true);
      }
    }, 5000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      if (rafId !== null) cancelAnimationFrame(rafId);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", startPlayback);
      video.pause();
      nextVideo.pause();
    };
  }, []);

  // Tap-to-play: if autoplay was blocked, first user tap starts the video
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
      {/* Fallback image — visible when autoplay is blocked */}
      <img
        src="/images/editorial/beach-walk.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Main video — hidden when autoplay is blocked to prevent native play button */}
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
        ref={nextVideoRef}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Black cover — fades out once video is playing or fallback image should show */}
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

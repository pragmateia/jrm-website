"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Pick the right video file based on viewport width
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setVideoSrc(
      isMobile
        ? "/videos/hero-home-mobile.mp4"
        : "/videos/hero-home-desktop.mp4"
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const handleLoaded = () => {
      if (video.duration) {
        video.currentTime = Math.random() * video.duration;
      }
    };

    const handlePlaying = () => {
      setVideoReady(true);
    };

    if (video.readyState >= 1) {
      handleLoaded();
    } else {
      video.addEventListener("loadedmetadata", handleLoaded, { once: true });
    }

    video.addEventListener("playing", handlePlaying, { once: true });

    // Detect autoplay failure (iOS Low Power Mode, etc.)
    // When autoplay is blocked, hide the video to prevent the native play button overlay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setAutoplayBlocked(true);
        setVideoReady(true); // Reveal the fallback image
      });
    }

    const fallback = setTimeout(() => setVideoReady(true), 4000);

    return () => {
      clearTimeout(fallback);
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [videoSrc]);

  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Fallback image — visible if video fails to load */}
      <Image
        src="/images/editorial/beach-walk.jpg"
        alt="Beach volleyball players on the sand"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      {/* Background Video — sits on top of fallback image.
          Serves desktop (1080p) or mobile (540p) based on viewport.
          Hidden when autoplay is blocked (iOS Low Power Mode) to prevent
          the native play button overlay from appearing. */}
      {videoSrc && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover ${
            autoplayBlocked ? "hidden" : ""
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

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

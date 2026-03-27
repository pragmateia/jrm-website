"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

interface MarqueeItem {
  id: string;
  title: string;
  image: string;
  href: string;
}

function subscribeToMediaQuery(callback: () => void) {
  const mq = window.matchMedia("(min-width: 640px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getIsVertical() {
  return window.matchMedia("(min-width: 640px)").matches;
}

function getServerSnapshot() {
  return false;
}

export default function ProductMarquee({ items }: { items: MarqueeItem[] }) {
  const isVertical = useSyncExternalStore(subscribeToMediaQuery, getIsVertical, getServerSnapshot);

  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const dragScrollStart = useRef(0);
  // Use a ref instead of state so the rAF loop reads it synchronously
  // without needing to restart the effect on every hover/touch change
  const paused = useRef(false);
  // Track momentum after touch release for smooth handoff
  const touchEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync scrollPos from the container's actual position
  const syncScrollPos = useCallback(() => {
    if (containerRef.current) {
      scrollPos.current = isVertical
        ? containerRef.current.scrollTop
        : containerRef.current.scrollLeft;
    }
  }, [isVertical]);

  // Get one set size for infinite loop wrapping
  const getOneSetSize = useCallback(() => {
    if (!innerRef.current) return 0;
    return isVertical
      ? innerRef.current.scrollHeight / 3
      : innerRef.current.scrollWidth / 3;
  }, [isVertical]);

  // Wrap scroll position for infinite loop
  const wrapScrollPos = useCallback(() => {
    const oneSetSize = getOneSetSize();
    if (oneSetSize > 0) {
      // Wrap forward
      while (scrollPos.current >= oneSetSize * 2) {
        scrollPos.current -= oneSetSize;
      }
      // Wrap backward
      while (scrollPos.current < 0) {
        scrollPos.current += oneSetSize;
      }
    }
  }, [getOneSetSize]);

  // Auto-scroll animation loop — runs continuously, checks paused ref each frame
  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (!containerRef.current || !innerRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!paused.current) {
        scrollPos.current += 0.5;
        wrapScrollPos();
        if (isVertical) {
          containerRef.current.scrollTop = scrollPos.current;
        } else {
          containerRef.current.scrollLeft = scrollPos.current;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVertical, wrapScrollPos]);

  // --- Mouse handlers (desktop) ---
  const handleMouseEnter = () => {
    paused.current = true;
    syncScrollPos();
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    syncScrollPos();
    wrapScrollPos();
    paused.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = isVertical ? e.clientY : e.clientX;
    dragScrollStart.current = isVertical
      ? (containerRef.current?.scrollTop || 0)
      : (containerRef.current?.scrollLeft || 0);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const d = isVertical
      ? e.clientY - dragStart.current
      : e.clientX - dragStart.current;
    if (isVertical) {
      containerRef.current.scrollTop = dragScrollStart.current - d;
    } else {
      containerRef.current.scrollLeft = dragScrollStart.current - d;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // --- Touch handlers (mobile) ---
  // On touch, we pause auto-scroll immediately so the browser's native
  // scroll can take over. We manage scrollPos via the onScroll handler
  // so that when we resume auto-scroll, it picks up from where the user left off.
  const handleTouchStart = () => {
    // Clear any pending resume timer from a previous touch
    if (touchEndTimer.current) {
      clearTimeout(touchEndTimer.current);
      touchEndTimer.current = null;
    }
    paused.current = true;
  };

  const handleTouchEnd = () => {
    // After the user lifts their finger, the browser may still be
    // decelerating a momentum scroll. Wait a bit before resuming
    // auto-scroll so we don't fight the momentum.
    touchEndTimer.current = setTimeout(() => {
      syncScrollPos();
      wrapScrollPos();
      // Apply the wrapped position so there's no visual jump
      if (containerRef.current) {
        if (isVertical) {
          containerRef.current.scrollTop = scrollPos.current;
        } else {
          containerRef.current.scrollLeft = scrollPos.current;
        }
      }
      paused.current = false;
      touchEndTimer.current = null;
    }, 800);
  };

  // Fires during both mouse-drag and native touch scroll
  const handleScroll = () => {
    if (paused.current && containerRef.current) {
      scrollPos.current = isVertical
        ? containerRef.current.scrollTop
        : containerRef.current.scrollLeft;
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (touchEndTimer.current) {
        clearTimeout(touchEndTimer.current);
      }
    };
  }, []);

  if (!items || items.length === 0) return null;

  const repeated = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`scrollbar-hide cursor-grab active:cursor-grabbing ${
        isVertical ? "overflow-y-auto h-full" : "overflow-x-auto"
      }`}
      style={{ WebkitOverflowScrolling: "touch" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onScroll={handleScroll}
    >
      <div
        ref={innerRef}
        className={isVertical ? "flex flex-col" : "flex"}
        style={isVertical ? undefined : { width: "max-content" }}
      >
        {repeated.map((item, i) => (
          <Link
            key={`${item.id}-${i}`}
            href={item.href}
            className={`flex-shrink-0 group/item ${
              isVertical ? "w-full my-1.5 mx-auto" : "w-[130px] mx-1.5"
            }`}
            onClick={(e) => {
              if (isDragging.current) e.preventDefault();
            }}
          >
            <div className="aspect-[3/4] relative bg-white/10 backdrop-blur-sm overflow-hidden border border-white/10 group-hover/item:border-gold/40 transition-colors">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                sizes="120px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-6 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                <p className="text-[10px] text-white font-body leading-tight line-clamp-2">
                  {item.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

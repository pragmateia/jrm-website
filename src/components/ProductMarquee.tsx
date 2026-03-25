"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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
  const [hovered, setHovered] = useState(false);
  const scrollPos = useRef(0);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const dragScrollStart = useRef(0);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (!containerRef.current || !innerRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!hovered) {
        scrollPos.current += 0.5;
        const oneSetSize = isVertical
          ? innerRef.current.scrollHeight / 3
          : innerRef.current.scrollWidth / 3;
        if (oneSetSize > 0 && scrollPos.current >= oneSetSize) {
          scrollPos.current -= oneSetSize;
        }
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
  }, [hovered, isVertical]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (containerRef.current) {
      scrollPos.current = isVertical
        ? containerRef.current.scrollTop
        : containerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (containerRef.current) {
      scrollPos.current = isVertical
        ? containerRef.current.scrollTop
        : containerRef.current.scrollLeft;
    }
    setHovered(false);
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

  const handleScroll = () => {
    if (hovered && containerRef.current) {
      scrollPos.current = isVertical
        ? containerRef.current.scrollTop
        : containerRef.current.scrollLeft;
    }
  };

  if (!items || items.length === 0) return null;

  const repeated = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`scrollbar-hide cursor-grab active:cursor-grabbing ${
        isVertical ? "overflow-y-auto h-full" : "overflow-x-auto"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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

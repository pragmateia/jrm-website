"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/schedule", label: "Schedule" },
  { href: "/outreach", label: "Outreach" },
  { href: "/donate", label: "Donate" },
  { href: "/shop", label: "Shop" },
];

// Pages that have a dark hero image behind the navbar
const darkHeroPages = ["/", "/about", "/outreach", "/donate", "/shop"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const { totalQuantity, openCart } = useCart();

  const handleScroll = useCallback(() => {
    // Fade in over 0–150px of scroll
    const progress = Math.min(window.scrollY / 150, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const hasDarkHero = darkHeroPages.includes(pathname) || pathname.startsWith("/blog/");
  const bgOpacity = hasDarkHero ? scrollProgress * 0.97 : 1;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: `rgba(26, 26, 26, ${bgOpacity})`,
        backdropFilter: scrollProgress > 0.1 ? `blur(${scrollProgress * 8}px)` : "none",
        WebkitBackdropFilter: scrollProgress > 0.1 ? `blur(${scrollProgress * 8}px)` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-white.png"
              alt="Jesus Rules Ministries"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <span className="font-body text-[13px] font-semibold tracking-[0.2em] uppercase hidden sm:block text-white">
              Jesus Rules
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.href === "/donate") {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors bg-gold text-background px-4 py-1.5 hover:bg-gold-light"
                  >
                    {link.label}
                  </Link>
                );
              }
              if (link.href === "/shop") {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors border border-white/40 px-4 py-1.5 text-white hover:bg-white hover:text-background"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] font-medium tracking-[0.12em] uppercase transition-colors link-underline text-white/70 hover:text-white"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalQuantity > 9 ? "9+" : totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 transition-colors text-white/70"
              aria-label="Toggle menu"
            >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-white/5">
          <div className="px-6 py-8 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-[12px] font-medium tracking-[0.12em] uppercase transition-colors ${
                  link.href === "/donate"
                    ? "text-gold hover:text-gold-light"
                    : link.href === "/shop"
                      ? "text-white hover:text-white/80"
                      : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <CartDrawer />
    </nav>
  );
}

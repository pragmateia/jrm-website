"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
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

function isDarkHeroPage(path: string) {
  return darkHeroPages.includes(path) || path.startsWith("/blog/");
}

// Suppress useLayoutEffect SSR warning — we only use it for client-side nav
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalQuantity, openCart } = useCart();
  const navRef = useRef<HTMLElement>(null);

  // ------------------------------------------------------------------
  // WHY THIS APPROACH (and why previous fixes didn't stick):
  //
  // The navbar needs to be transparent on dark-hero pages and opaque on
  // others, transitioning to dark on scroll. Every previous attempt used
  // React state (scrollProgress) to compute an inline backgroundColor
  // during render. This breaks in two ways:
  //
  // 1. CLIENT-SIDE NAVIGATION FLASH: When navigating from a non-dark-hero
  //    page (scrollProgress=1) to a dark-hero page, React renders ONE FRAME
  //    with the old scrollProgress before the pathname-change effect can
  //    reset it. That frame shows a dark navbar on a dark-hero page.
  //
  // 2. SSR/ISR STALE CACHE: React hydration does not correct inline style
  //    mismatches in production. If ISR serves stale HTML with a non-zero
  //    opacity, the user sees a dark navbar until useEffect fires.
  //
  // THE FIX: Update the nav element's styles IMPERATIVELY via a DOM ref,
  // bypassing React's render cycle entirely. Specifically:
  //
  // - useLayoutEffect (runs BEFORE browser paint) resets the navbar to
  //   transparent on every pathname change. No stale-state flash possible.
  //
  // - The scroll handler updates styles directly on the DOM element,
  //   not through React state. Zero render-cycle lag.
  //
  // - SSR still outputs the correct initial inline style (transparent for
  //   dark-hero pages, opaque for others) as a fallback before JS runs.
  //
  // - A CSS transition is NOT used on the background-color so that the
  //   transparent→dark→transparent resets are instant (no fade artifacts).
  //   The scroll-linked opacity change is already smooth because scroll
  //   events fire at ~60fps.
  // ------------------------------------------------------------------

  // Imperatively apply navbar background based on scroll progress.
  // Called directly from scroll handler and layout effects — never
  // goes through React state for the visual update.
  const applyNavStyles = useCallback(
    (el: HTMLElement, progress: number, darkHero: boolean) => {
      const opacity = darkHero ? progress * 0.97 : 1;
      el.style.backgroundColor = `rgba(26, 26, 26, ${opacity})`;
      if (progress > 0.1) {
        const blur = `blur(${progress * 8}px)`;
        el.style.backdropFilter = blur;
        el.style.setProperty("-webkit-backdrop-filter", blur);
      } else {
        el.style.backdropFilter = "none";
        el.style.setProperty("-webkit-backdrop-filter", "none");
      }
    },
    [],
  );

  // On pathname change: immediately reset navbar to the correct initial
  // state BEFORE the browser paints. useLayoutEffect is critical here —
  // useEffect runs AFTER paint, which is exactly the one-frame flash
  // that plagued every previous fix.
  useIsomorphicLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const darkHero = isDarkHeroPage(pathname);

    // Instant reset — transparent for dark-hero pages, opaque for others.
    // Because this is useLayoutEffect, the browser has not painted yet,
    // so there is zero visual flash regardless of previous scroll state.
    applyNavStyles(el, 0, darkHero);

    // After the browser finishes its scroll-to-top for the new page,
    // read the actual scroll position and apply it. Double-rAF ensures
    // the scroll reset from Next.js navigation has taken effect.
    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled || !navRef.current) return;
        const progress = Math.min(window.scrollY / 150, 1);
        applyNavStyles(navRef.current, progress, darkHero);
      });
    });

    // Scroll listener — updates styles directly on the DOM element,
    // never through React state. This means zero render-cycle lag.
    const onScroll = () => {
      if (!navRef.current) return;
      const progress = Math.min(window.scrollY / 150, 1);
      applyNavStyles(navRef.current, progress, darkHero);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, applyNavStyles]);

  // Compute initial inline style for SSR. This is the ONLY time React
  // controls the background — after hydration, the layout effect takes
  // over and all further updates are imperative via the ref.
  const hasDarkHero = isDarkHeroPage(pathname);
  const ssrBgOpacity = hasDarkHero ? 0 : 1;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)]"
        style={{
          backgroundColor: `rgba(26, 26, 26, ${ssrBgOpacity})`,
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
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
              <span className="font-body text-[13px] font-semibold tracking-[0.2em] uppercase text-white">
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
      </nav>

      {/* Cart drawer rendered outside <nav> so it isn't trapped in the navbar's
          stacking context. This prevents z-index and overflow issues on mobile
          where the drawer's fixed positioning was being constrained by the
          nav's own fixed positioning and implicit stacking context. */}
      <CartDrawer />
    </>
  );
}

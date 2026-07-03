# JRM Website (jesusrules.co)

Next.js 16 + Tailwind v4 codebase deployed to Vercel at `jesusrules.co`. Source of truth is the code — this file captures only non-obvious lessons that would be missed by reading the repo.

## Stack & Hosting
- **Framework:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript
- **Hosting:** Vercel project `pragmateia/jrm-website` (account/team facts: `~/Documents/Pragmateia LLC/CLAUDE.md` — single home; billing email diego.perez@pragmateia.com)
  - Production URL: `jrm-website-jktu4k3am-pragmateia.vercel.app`
  - Custom domain: `jesusrules.co`
- **GitHub:** `jesusrules-co/jrm-website` (private), account `jesusrules-co` (jesusrules.co@gmail.com)
- **Domain registrar:** WordPress.com / Automattic. Renews 2027-02-17. Privacy on. Nameservers point to Vercel (ns1/ns2.vercel-dns.com).

## Integrations
- **Shopify Headless** sales channel: "Jesus Rules Ministries Headless" — manage/rotate API tokens there. Storefront API for product display.
- **Donorbox** — 6 campaigns: `jesus-rules-ministries`, `support-diego-perez`, `jrm-travel`, `jrm-tournament-fees`, `jrm-equipment-and-gear`, `jrm-content-production`
- **Mailchimp** newsletter signup (account state in `~/Documents/JESUS RULES/.claude-memory/memory.md`)
- **Gmail SMTP** for contact form: `info@jesusrules.co`

## Design
- Dark theme: `#1a1a1a` background, `#B8956A` gold accent
- Fonts: Playfair Display (display) + Inter (body)
- Route-aware navbar (transparent over hero, solid elsewhere)

## Security conventions (audit 2026-07-02)
- **JSON-LD:** always inject via `serializeJsonLd()` from `src/lib/jsonld.ts` (escapes `<`), never raw `JSON.stringify` inside `dangerouslySetInnerHTML`.
- **Form APIs** (`/api/contact`, `/api/newsletter`): validate/trim/length-cap inputs, strip CR/LF from subject-bound fields, and rate-limit via `src/lib/rate-limit.ts` (in-memory, best-effort — resets on redeploy). Keep new endpoints to the same pattern.
- **Blog slugs** are whitelisted to `[a-zA-Z0-9_-]+` in `src/lib/blog.ts` (path-traversal guard).
- **Security headers** live in `next.config.ts` (nosniff, SAMEORIGIN, referrer + permissions policy). No CSP yet — if adding one, start in report-only mode and allowlist Donorbox, Shopify CDN, Google Fonts, and inline JSON-LD first.
- **Open follow-ups:** nodemailer 8→9 is a semver-major upgrade (current advisories don't touch features we use); Mailchimp signup uses `status: "subscribed"` (no double opt-in) — switching to `"pending"` is Diego's call.

## Archive convention
`archive/` at repo root holds retired campaign pages/components (moved, not deleted — see each folder's README for original paths + revival steps). Currently: `archive/el-salvador-2026/` (trip fundraiser banner, home callout, missions page, images). Builds cleanly with the folder included; no tsconfig exclusion needed.

---

## Critical Lessons (DO NOT undo without reading this)

### Navbar transparency — keep imperative DOM updates
**DO NOT refactor the navbar back to React-state-driven `backgroundColor`.** It went through 4 recurring failures before the architectural rewrite (2026-03-30).

Root cause of the original bug: using React state (`scrollProgress`) to compute inline `backgroundColor` during render caused (a) one-frame flashes on client-side navigation due to stale state from the previous page, and (b) hydration mismatches from ISR cache.

The fix: imperative DOM updates via `navRef` + `useLayoutEffect`. Layout effect runs BEFORE browser paint on every pathname change, so there is zero flash window. The scroll handler also writes to the DOM directly, not through React state. SSR still outputs a correct initial inline style as fallback.

### Hero video — single file only
Single `hero-home.mp4` (44MB, 1080p CRF 22, ~3900kbps, 95s). Source 4K at `~/Documents/JESUS RULES/Media/website-hero-home-video.mp4`. Approach: autoPlay, loop, muted, playsInline, random start time via `currentTime = Math.random() * duration`. Black cover fades once playing.

**A multi-part approach was tried and reverted (2026-03-31).** Splitting into 7 parts with preloader transitions caused visible glitching on iOS despite double-buffering, synchronous DOM z-index swaps, and anticipatory timeupdate swaps. iOS clears the video frame before/during the `ended` event, making seamless src swaps impossible. Stick with single file + loop.

**Other iOS autoplay constraints (hard-won, 2026-03, moved from `feedback_ios_video_autoplay` 2026-07-01):**
1. **Low Power Mode blocks ALL autoplay** — even muted + playsInline. Can't override. Detect with `play().catch()` and show a fallback image instead of the native play button.
2. **Don't preload a src in HTML if you'll change it in JS** — the browser wastes bandwidth downloading the HTML src, then discards it when useEffect sets a new one. Omit src from markup and set it entirely in JS.
3. **setTimeout closures capture stale React state** — use a ref (not state) to track whether the video is playing inside timeout callbacks.
4. **Keep the `autoPlay` HTML attribute** — removing it and relying only on programmatic `.play()` broke autoplay on iOS.

These apply to any mobile-first video project, not just this site.

### Product images — front/back pairing
`ProductDetailClient.tsx` uses filename matching (Printify naming) with proximity fallback for numeric-filename images. The gallery sidebar shows ONLY variant front images (one per color); back images are accessible only via the Front/Back toggle.

**Rule for adding new product images:** Keep each color's front and back images near each other in Shopify's media section. Filename matching handles Printify products automatically; the proximity fallback handles the rest.

(Variant image audit completed 2026-03-27 across all 9 products; back-shown-as-front bugs fixed on Classic Light Tee Light Blue, Original Tee Midnight Navy, Original Tee Forest Green. Classic Hoodie had all 5 colors wrong but is discontinued — skipped.)

### Cart drawer mobile
CartDrawer is mounted OUTSIDE the `<nav>` stacking context. Full width on mobile, separate z-indices for backdrop vs drawer. Don't move it back inside `<nav>`.

### Shop carousel — instant auto-scroll resume, no easing
When the shop carousel resumes auto-scroll after a touch/swipe: wait for momentum to fully stop, then snap straight back to full speed. NO gradual ease-in — Diego explicitly rejected the ease-in after seeing it. Don't add easing unless asked.

### Product cards — Ralph Lauren style
Full-bleed image (no card border/background/shadow), 3:4 portrait aspect, clean left-aligned name + price below, color swatches as small filled circles, Quick Add bar on hover. No chunky buttons, no card containers, no variant text labels. Diego's stated reference is Ralph Lauren; cards with borders/padding/pill buttons "didn't look professional." (This preference applies across Diego's e-commerce sites — His Temple already follows it.)

### Fulfillment status — Shopify lies for Printify orders; check the printer directly
Shopify's fulfillment status is NOT reliable for this store. Tracking/status don't always sync back from Printify (real case 2026-04-22: order JR#1205 showed REQUEST_DECLINED + no tracking in Shopify while Printify had already produced and DHL had delivered it 5 days earlier).
- For any order status question, **log into Printify directly** — Shopify is the secondary source, not the primary.
- If Shopify shows REQUEST_DECLINED / unfulfilled / no tracking, do not report the order as stuck until Printify confirms the same.
- Follow any tracking number (even buried in timeline events) through to the carrier before concluding it hasn't shipped.
- Printful orders have a different failure mode (see next lesson); same conclusion — don't trust Shopify status alone.

### Single-variant / no-color products (found 2026-07-02 with Athletic Hat; handled in code 2026-07-02)
Facts that still apply to every new product:
- **`/shop` only lists products whose handles are in `STYLE_CARDS`** (`src/lib/product-categories.ts`) — new products are invisible on the shop grid AND marquee until a style card entry is added and deployed. This is a code allowlist, NOT a Shopify collection.
- The Storefront API returns the product's featured image as the variant image for a "Default Title" single variant.

Handled in code (don't re-break):
- `ProductGallery` has a `showAllThumbnails` mode (passed by `ProductDetailClient` when the product has NO color option): every product image becomes a selectable thumbnail with local selection state, and the Front/Back toggle is skipped. The multi-color Printify front/back pairing path is untouched — the flag defaults to false.
- `ProductDetailClient` hides `VariantSelector` when the only option is Shopify's placeholder "Title: Default Title".
- Shop page marquee + `ShopProductGrid` category rows special-case `v.title === "Default Title"`: plain product title, no variant label, no `?color=` param.

### Shopify admin via Playwright MCP — media upload without a file-chooser tool (2026-07-02)
The admin page CSP (`connect-src https: wss: blob: data:`) blocks fetching from `http://127.0.0.1`. Working pattern: serve files from a localhost HTTP server, `window.open` a sender page on that origin from the admin tab (popup blocking is disabled in Playwright), `postMessage` the ArrayBuffers back, then set `input.files` on the media `<input type="file">` — which lives inside a SHADOW ROOT (pierce with a shadow-DOM walk; `document.querySelectorAll` won't find it). Dispatch ONLY a `change` event: dispatching both `input` and `change` uploads every file twice. The admin file editor (alt text) can leave a stuck FocalPointTool overlay that intercepts clicks — reload the product page between edits.

### Printful CODE 1002 — duplicate Shopify products
If a Printful item fails to fulfill with "No suitable order items found [CODE: 1002]", the cause is duplicate Shopify products: customers bought from an old (Unlisted) product while Printful is mapped to a newer (Active) duplicate with different variant IDs. Fix pattern (applied 2026-04-02 to both Beach Volleyball Hoodies): rename old handles to `-old`, swap the Printful-synced product's handle to the customer-facing one, archive the old duplicates. Consolidate to the single product Printful is mapped to.

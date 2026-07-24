# JRM Website (jesusrules.co)

Next.js 16 + Tailwind v4 codebase deployed to Vercel at `jesusrules.co`. Source of truth is the code — this file captures only non-obvious lessons that would be missed by reading the repo.

## Stack & Hosting
- **Framework:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript
- **Hosting:** Vercel project `pragmateia/jrm-website` (account/team facts: `~/Documents/Pragmateia LLC/CLAUDE.md` — single home; billing email diego.perez@pragmateia.com)
  - Production URL: `jrm-website-jktu4k3am-pragmateia.vercel.app`
  - Custom domain: `jesusrules.co`
- **GitHub:** `pragmateia/jrm-website` (private) — all business repos live in the pragmateia org, pushed as `diegonickperez` (see `reference_mcp_servers.md` in auto-memory)
- **Domain registrar:** WordPress.com / Automattic. Renews 2027-02-17. Privacy on. Nameservers point to Vercel (ns1/ns2.vercel-dns.com).

## Integrations
- **Shopify Headless** sales channel: "Jesus Rules Ministries Headless" — manage/rotate API tokens there. Storefront API for product display.
- **Donorbox** — 6 campaigns: `jesus-rules-ministries`, `support-diego-perez`, `jrm-travel`, `jrm-tournament-fees`, `jrm-equipment-and-gear`, `jrm-content-production`
- **Mailchimp** newsletter signup (account state in `~/Documents/JESUS RULES/.claude-memory/memory.md`)
- **Gmail SMTP** for contact form — sends to `info@jesusrules.co`, which since 2026-07-10 is a DNS catch-all forward (forwardemail.net records in Vercel DNS) delivering to jesusrules.co@gmail.com. There is no info@ mailbox — the Google Workspace was canceled 2026-07-10. If forwarding is ever removed, this form's deliveries silently bounce; either keep the catch-all or change the `to:` in `src/app/api/contact/route.ts`.

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

### Shopify notification template editor via Playwright — CodeMirror 6, no textarea (2026-07-10)
The Settings → Notifications template editor (`/email_templates/<name>/edit`) is CodeMirror 6: no `<textarea>`, no `.CodeMirror` class. Get the editor with `document.querySelector('.cm-content').cmView.view`, read via `view.state.doc.toString()`, and edit via `view.dispatch({changes: {from, to, insert}, userEvent: 'input.type'})` — the `userEvent` makes the admin register the change and show the Save bar. Preview renders the unsaved draft, so preview before saving. Customization applied 2026-07-10: order confirmation email has a made-to-order/2-weeks-to-ship paragraph inserted right after `<p>{{ email_body }}</p>` ("Revert to default" would wipe it).

### Athletic Hat is self-ship — Flow email alert is pinned to its product ID (2026-07-06)
The Athletic Hat (product ID 10397808263490) is the ONLY product Diego ships himself; everything else auto-fulfills via Printify/Printful. A Shopify Flow workflow "Athletic Hat self-ship email alert" (Flow app in the store admin) emails jesusrules.co@gmail.com on Order created when ANY line item's product ID equals `gid://shopify/Product/10397808263490`. Renaming the product is safe (matched by ID, not title), but **deleting and re-creating the product gives it a new ID and silently breaks the alert** — update the Flow condition if the hat is ever re-created, and add the same alert for any future self-ship product. Verified end-to-end 2026-07-06 (test order JR#1314, canceled/restocked/deleted after).

### Printful publishes miss the Headless channel + interleave media (2026-07-12, found with Skateboard Hoodie)
Printful publishes new Shopify products to the **Online Store channel only** — the "Jesus Rules Ministries Headless" channel stays unchecked, so the Storefront API (and therefore the whole website) can't see the product even though it's Active in admin. Fix: product page → Publishing → Manage publishing → check "Jesus Rules Ministries Headless" → Save. Every new Printful product needs this PLUS a STYLE_CARDS entry (see single-variant lesson above).
Printful sync can be confirmed from Shopify alone: variant SKUs use Printful's `{syncProductId}_{catalogVariantId}` format (e.g. `8063389_22958`).
Printful also uploads media with colors interleaved and back images NOT directly after their fronts — the shop page marquee's next-image proximity pairing showed wrong backs. Fixed in code: `buildBackImageMap` in `src/app/shop/page.tsx` filename-matches backs by color slug (longest slug first, so "vintage-black" beats "black"); proximity is now only the fallback. `ProductDetailClient` already had filename matching and needed no change.

### Printify payment declined + expired store connection — the JR#1266 double failure (2026-07-12)
Two independent Printify failure modes found on one order (t-shirt sat unfulfilled 7 weeks while the Printful hoodie in the same order delivered fine):
1. **Payment declined (insufficient funds):** Printify creates the order, the production-cost charge fails, and the order sits **On hold in Printify** indefinitely with NO alert surfaced in Shopify — Shopify just shows Unfulfilled. Fix: Diego funds the card/balance and clicks **Update payment and retry** on the Printify order (money action = Diego's click).
2. **Printify↔Shopify connection expires:** Printify store switcher (top-left) shows "Connection expired" and fulfillment requests from Shopify bounce (request → declined → on hold loop; release-hold alone won't fix it while disconnected). Fix: store switcher → **Reconnect** → approve the "Update data access" grant that opens in Shopify admin. After reconnecting, the release-hold trick works again.
Diagnosis order for a stuck Printify item: Shopify timeline (was a fulfillment request ever sent?) → release hold if held → Printify order page for the REAL status (look for the red payment banner) → store connection state. After any billing hiccup, sweep Printify's "On hold" / "Requires action" tabs for other silently stuck orders.
NOT-stuck caveat: a just-placed order sits "On hold / Prod. starts in 1 day" in Printify for its normal pre-production window and auto-submits — only treat On hold as a problem if it has a red payment banner or is older than a couple of days (confirmed by Diego on JR#1320, 2026-07-12).

### Printify variant republish — renames colors, leaves new variants imageless (2026-07-13, Original tee)
Editing variants in Printify and republishing with only "Colors, sizes, prices, and SKUs" synced (the right choice — it leaves Shopify title/description/media untouched) has two side effects to fix in Shopify admin afterward:
1. **Color option values revert to Printify catalog names** ("Solid Forest Green", "Solid White") even if they were manually renamed in Shopify before. Fix: product page → click the Color option → edit values → Save.
2. **Newly added variants get NO image** (Mockups sync off), so the Storefront API falls back to the product's featured image — which for the Original tee is the Forest Green BACK mockup, i.e. wrong-color images in the gallery/marquee. Fix: variants table → the color group's "Select image" button → pick the correct front mockup (applies to all variants of that color) → Save.
Also: Printify's variant picker is the source of truth — before republishing a product whose variants were slimmed Shopify-side only, first mirror the slimming in Printify (uncheck colors/sizes) or the publish resurrects everything. Publish takes several minutes ("Publishing" status in My Products); the product temporarily drops out of list search while in flight.

### Deleting colors orphans their media — breaks proximity back-matching (2026-07-13)
When variants are slimmed, the deleted colors' mockups STAY in Shopify media and poison every proximity-based image path: card covers showed retired colors (fixed in code — style cards + `getProducts` now prefer a live variant's image over `images[0]`), and the Front/Back toggle + marquee paired live colors with dead-color backs (numeric Printify filenames make filename-matching useless, so proximity is all there is). Data-side fix applied to Original + Classic tees: delete all obsolete-color images, keep exactly [front, back] per live color in that order + size chart last. Media grid tiles use `s-checkbox` web components — click the `input` inside each `shadowRoot` ONE AT A TIME (bulk-clicking only registers one); the bulk "Remove" is an `s-internal-button[accessibilitylabel="Remove"]` (also shadow DOM). Reordering: dnd-kit keyboard sorting works — focus the tile's `span[aria-roledescription="sortable"]`, Space to lift, arrow keys, Space to drop.

### Printful: adding a size back to a synced product (2026-07-24, hoodie S re-add)
To add a size to a Printful-synced Shopify product: add the option value in Shopify admin first (new variant inherits the group price), then in Printful (My products → product → the new variant shows "Choose product") map it. **Gotcha: in the "Choose variant" picker, the "Choose" button on an existing variant card maps your new store variant to THAT EXACT catalog variant — including its size** (the S store variant got mapped to catalog size L). Use the card's **"Edit"** button instead → design editor opens with the print files intact → select the correct size → Continue. Verify via the variant row's accordion ("Size: S"). Also: Shopify option values append at the END (L, XL, S) — reorder with the dnd-kit keyboard pattern (focus `button[aria-roledescription="sortable"]` in the value row, Space/ArrowUp/Space; moves ONE slot per cycle). Bella+Canvas 4719 has no XS.

### Printful CODE 1002 — duplicate Shopify products
If a Printful item fails to fulfill with "No suitable order items found [CODE: 1002]", the cause is duplicate Shopify products: customers bought from an old (Unlisted) product while Printful is mapped to a newer (Active) duplicate with different variant IDs. Fix pattern (applied 2026-04-02 to both Beach Volleyball Hoodies): rename old handles to `-old`, swap the Printful-synced product's handle to the customer-facing one, archive the old duplicates. Consolidate to the single product Printful is mapped to.

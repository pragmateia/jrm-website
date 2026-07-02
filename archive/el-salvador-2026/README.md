# El Salvador Mission Trip 2026 — Fundraiser (archived)

Fundraiser promo for the El Salvador mission trip, May 25 – June 1, 2026
(Diego, Michael Clark + family, partner on the ground: David "Pepe" Vargas).
Goal was $7,000 via Donorbox campaign `el-salvador-2026`.

Archived 2026-07-02 — the trip is over, so all "Fund this trip" promo was
removed from the live site. Kept here (these files were never committed, so
git history would NOT have preserved them) so the page can be revived as a
trip-recap page later.

## Contents and original locations

| File here | Original path |
|-----------|---------------|
| `AnnouncementBar.tsx` | `src/components/AnnouncementBar.tsx` (mounted in `src/app/layout.tsx` above `<Navbar />`; Navbar used `top-9` to sit below the fixed `h-9` bar) |
| `MissionCallout.tsx` | `src/components/home/MissionCallout.tsx` (mounted in `src/app/page.tsx` between FeaturedMerch and EditorialSplit) |
| `missions/el-salvador-2026/page.tsx` | `src/app/missions/el-salvador-2026/page.tsx` (route `/missions/el-salvador-2026`, was listed in `src/app/sitemap.ts`) |
| `images/el-salvador/` | `public/images/el-salvador/` (referenced by the page and MissionCallout as `/images/el-salvador/...`) |

## Also unwired at archive time

- `src/app/donate/page.tsx`: `featuredFund` set back to `null` (the "Featured
  Fund" card + type + rendering logic were left intact for the next trip fund).
- `src/app/sitemap.ts`: `/missions/el-salvador-2026` entry removed.

## To revive as a recap page

Move `missions/` back under `src/app/`, move `images/el-salvador/` back under
`public/images/`, rewrite the copy from "fund this trip" to a recap, and
re-add the sitemap entry.

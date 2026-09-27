# camilocastro — portfolio

The personal site of **Camilo Castro**, full-stack developer from Bucaramanga, Colombia.
Bilingual (English / Spanish), light and dark, and built to load fast.

**Live:** https://camilocastro.vercel.app

---

## The idea: ink & panel

The site reads like a printed manga volume about shipping software. It borrows the
*medium* — paper and ink, panel grids with gutters, screentone dots, focus lines,
chapter pages — and one vermilion seal stamped with **戦え** (*tatakae*, "fight"),
the single word on Camilo's GitHub profile.

- **Paper & ink, one accent.** A warm paper page with near-black ink; the red seal is
  the only color that never changes between themes. Dark mode is the inverted print,
  not an afterthought — every token is redefined for it.
- **Type as the main image.** Archivo's variable width axis (62–125) sets heavy
  condensed headlines; hover states widen type instead of recoloring it. IBM Plex Sans
  and Plex Mono carry text and metadata. Dela Gothic One is subset to the ~20 Japanese
  glyphs used as ornaments (≈4 KB).
- **Projects as manga pages.** Real screenshots sit in bordered panels with gutters;
  one row breaks the grid with a slanted gutter.
- **Motion with a reason.** Screenshots *print in* — halftone dots grow while a soft
  front sweeps across — the name rises line by line, the seal stamps down, and the
  theme switch spreads like ink from the button (View Transitions). Everything is off
  with `prefers-reduced-motion`.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | CSS Modules + a small global design system (custom properties), no UI kit |
| Fonts | `next/font` (Archivo, IBM Plex Sans, IBM Plex Mono) + a local Japanese subset |
| Images | Static imports through `next/image` (AVIF/WebP, blur placeholders) |
| SEO | Per-locale metadata, `hreflang` alternates, JSON-LD, sitemap, robots, generated Open Graph images |
| Hosting | Vercel |

Runtime dependencies: `next`, `react`, `react-dom` — nothing else.

## How it's put together

```
src/
  proxy.ts                  # / → /en or /es (cookie, then Accept-Language, then English)
  app/
    [lang]/                 # every page lives under a locale
      layout.tsx            # fonts, metadata, pre-paint theme script, header/footer
      page.tsx              # home
      work/[slug]/          # five case studies + their Open Graph images
      opengraph-image.tsx   # per-locale social card (rendered at build time)
      not-found.tsx
    sitemap.ts, robots.ts, icon.svg, apple-icon.png
  components/               # site chrome, home sections, panels, diagrams
  content/projects.ts       # all project copy (EN/ES) and image references
  content/work/<slug>/      # optimized screenshots
  i18n/                     # locale config + typed dictionaries (ES must match EN's shape)
  lib/                      # helpers, focus-line geometry, OG fonts
assets/                     # TTF fonts and JPEG covers used only by next/og at build time
```

- **i18n.** Sub-path routing (`/en`, `/es`) with statically generated pages for both
  languages. The switcher keeps the current path and scroll position and stores the
  choice in a cookie so `/` remembers it.
- **Theme.** An inline script sets `data-theme` before first paint only when the
  visitor has chosen one; otherwise CSS follows `prefers-color-scheme`. No flash, no
  hydration mismatch (`useSyncExternalStore` reads the DOM).
- **Client JavaScript** is limited to small islands: theme toggle, language switch,
  mobile menu, scroll-spy, one IntersectionObserver for reveals, pointer parallax,
  copy-to-clipboard.
- **Accessibility.** Semantic landmarks, skip link, visible focus, descriptive `alt`
  text in both languages, decorative art hidden from assistive tech, AA contrast in
  both themes, full keyboard support in the mobile menu.

## About the screenshots

Every image is real work:

- captured from the live deployments (hotellogistico.com, calzadoleons.com, …);
- captured from local runs of private systems **seeded with fictional demo data**
  (the payroll system's employees are invented; no real payroll or personal data
  appears anywhere on the site);
- or taken from each project's own repository (user-manual screenshots, diagrams).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + production build
```

Content lives in `src/content/projects.ts` and `src/i18n/dictionaries/`. To use more
Japanese glyphs, re-download the Dela Gothic One subset with the new characters
(Google Fonts `text=` parameter) into `src/fonts/` and `assets/og-fonts/`.

`NEXT_PUBLIC_SITE_URL` can override the canonical URL; on Vercel it defaults to the
project's production domain.

## Credits

Fonts: Archivo (Omnibus-Type), IBM Plex (IBM), Dela Gothic One (artakana) — all under
the SIL Open Font License. Design and code © Camilo Castro.

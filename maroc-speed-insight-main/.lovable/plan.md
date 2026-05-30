
# NetSpeed Maroc — Production Redesign Plan

The homepage already has most listed sections (hero, live IP widget, tools, features, blog preview, FAQ, CTA, JSON-LD). The real gaps are: visual polish (feels template-y), inner pages (IP Checker is the hero product but underdeveloped), SEO consistency across routes, sitemap base URL, and Open Graph coverage. This plan upgrades the whole product to a funded-startup feel.

## 1. Visual system upgrade (`src/styles.css`, shared components)

- Add refined design tokens: subtle elevation shadows (`--shadow-card`, `--shadow-glow`), refined border (`--border-strong`), and two restrained gradients (`--gradient-hero`, `--gradient-accent`).
- Tighten typography scale: display weight 700, tracking-tight, balanced line-height; body text in `text-[15px]` for denser SaaS feel.
- Reduce vertical whitespace globally: `Section` paddings from `py-16` → `py-12 sm:py-16`.
- Add a soft animated grid / radial glow background behind the hero (CSS only, no perf cost).

## 2. Homepage redesign (`src/routes/index.tsx`)

Goal: dense, balanced, IP-Checker-first.

- **Hero**: tighter 2-col grid. Left = trust pill, H1 with gradient on accent word, subtitle, dual CTA, trust row (no signup / no tracking / instant). Right = upgraded `LiveIpWidget` (see §3).
- **Logo strip**: "Powered by Cloudflare · IPwho.is · Google DNS · ipapi" — adds trust, fills whitespace.
- **Primary product highlight**: full-width "IP Checker" feature band with screenshot-style mock + bullet benefits (ISP, ASN, geolocation, VPN signal).
- **Tools grid**: 6 cards, 3-col on desktop, accent ring on hover, "Most popular" badge on IP Checker.
- **How it works**: 3 steps, connected by dashed line on desktop.
- **Features**: 6 (not 3) — Instant, Privacy-first, Accurate, Mobile-ready, Free forever, SEO-friendly.
- **Stats** moved between Features and Blog for rhythm.
- **Blog preview**: 4 cards, category chip, read time, hover lift.
- **FAQ**: 6 items, two-column.
- **CTA band** with radial glow.

## 3. LiveIpWidget upgrade

- Larger flag, monospace IP, copy-to-clipboard button.
- Real fields: IP, ISP/ASN, City + Country, Timezone, IPv4/IPv6, VPN heuristic ("Not detected" when org doesn't match known VPN keywords).
- Skeleton loader (animated shimmer) while fetching.
- Subtle inner gradient border.

## 4. IP Checker page (`src/routes/ip-checker.tsx`)

Promote to flagship page:
- Hero with current IP shown immediately.
- Detailed table: IP, Version, ISP, ASN, City, Region, Country (+flag), Timezone, Lat/Lon, VPN/Proxy heuristic.
- Map placeholder using OSM static tile via lat/lon (no API key).
- "What is my IP?" SEO long-form section (~400 words) — drives ranking.
- Related tools cards at bottom.
- JSON-LD `TechArticle` + breadcrumbs.

## 5. Other tool pages — quick polish pass

Speed Test, DNS Lookup, Ping, QR, Password Generator: ensure each has:
- H1 + intro paragraph (SEO copy, 80–120 words).
- Working tool UI (already exists — leave logic, restyle container).
- "How it works" + "FAQ" mini-section (3 Q&A each) for AdSense content depth.
- Per-route `head()` with title, description, og:title, og:description, canonical.

## 6. Content pages

- **Blog index** (`/blog`): grid of 4 POSTS with category filter chips (static for now). Each card links to `/blog/$slug`.
- **Blog post route** (`src/routes/blog.$slug.tsx`) — NEW: renders article from a `POSTS_CONTENT` map in `src/lib/tools.ts` with ~600-word body, headings, JSON-LD `Article`. Four real articles seeded.
- **About, Contact, Privacy, Terms**: rewrite with real production copy (no lorem, no placeholder). Contact uses `mailto:` (no backend).

## 7. SEO infrastructure

- `src/routes/__root.tsx`: set sitewide defaults — viewport, charset, theme-color, `og:site_name`, `og:type=website`, Twitter card defaults, Organization JSON-LD. Remove any per-page title from root.
- Every leaf route: own `head()` with title, description, og:title, og:description, og:url, canonical link.
- `src/routes/sitemap[.]xml.ts`: set `BASE_URL = "https://maroc-speed-insight.lovable.app"`, include blog post slugs from `POSTS`.
- `public/robots.txt`: add `Sitemap: https://maroc-speed-insight.lovable.app/sitemap.xml`.
- Add `public/site.webmanifest` + theme-color meta for PWA-ish polish (helps Lighthouse).

## 8. Navbar + Footer

- **Navbar**: condense links, add prominent "Check My IP" CTA button, mobile sheet with grouped sections (Tools / Resources / Company).
- **Footer**: 4-column (Brand + tagline, Tools, Resources, Legal), newsletter-style email input (mailto only), copyright, "Made in Morocco 🇲🇦" badge.

## 9. AdSense readiness

- Ensure each content page ≥ 400 words of original copy (blog posts, IP checker, about, privacy, terms).
- No broken links, no placeholder text, no lorem ipsum.
- Privacy policy mentions cookies/analytics explicitly.
- Reserved ad slot component `<AdSlot />` (renders nothing today, easy to wire later) inserted in blog post layout and below tool results — keeps layout shift = 0 when ads are added.

## 10. Performance & a11y

- Lazy-load Framer Motion sections via `Reveal` (already in place).
- All images `loading="lazy"` + width/height set.
- Semantic landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section aria-labelledby>`.
- Color contrast verified against WCAG AA on `#0F172A` bg.

## Technical notes

- No new dependencies required (Framer Motion, lucide-react, qrcode already installed).
- All translation key strings have been removed in earlier turns; this plan does a final sweep to confirm zero `t("...")` calls remain.
- Sitemap base URL switched from `""` to the project's preview domain so submitted sitemap validates.
- Blog detail route added: requires creating `src/routes/blog.$slug.tsx` — TanStack auto-regenerates `routeTree.gen.ts`.

## Out of scope

- No backend / Lovable Cloud (everything stays client-side).
- No i18n framework (English only, per current state).
- No real analytics wiring (AdSense slot component is a placeholder).

Ready to switch to build mode when you approve.

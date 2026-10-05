# eWorld Innovative — Next.js site

A rebuild of [eworldinnovative.com](https://eworldinnovative.com/) in Next.js 16 (App Router, React 19, TypeScript). It replaces the WordPress site, its theme and its plugins (Slider Revolution, WPBakery, jQuery) with React components and hand-written CSS, in a dark "liquid glass" design: translucent frosted surfaces, rounded corners and smooth transitions.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero slider, the company introduction (links to About Us), and an infinite carousel of service summaries (each links to its full write-up on Services) |
| `/about` | Page banner, the company introduction, and a sticky-scroll timeline: Key Milestones, The Company Values, Future Vision |
| `/services` | Page banner and the full write-up for each of the six services. Each has an anchor (`/services#web-development` etc.) used by the carousel and the footer's Quick Links |

All three are prerendered as static HTML. There's also a 404 page.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

Requires Node.js 20.9 or newer.

## Where things live

| Path | What it holds |
| --- | --- |
| `content/site.ts` | Company details, main menu, footer links, map embed, copyright line |
| `content/home.ts` | Page copy: hero slides, About introduction and timeline, the six services (card summary + full text) |
| `app/` | The routes (`page.tsx`, `about/`, `services/`), root layout, global styles and design tokens |
| `components/layout/` | Header and mobile menu, inner-page banner, footer, back-to-top button, page-load fade-in |
| `components/hero/` | Home hero slider (autoplay, arrows, swipe, "curtain" transition) |
| `components/sections/` | About introduction, sticky-scroll timeline, services carousel, service write-ups |
| `components/ui/` | Scroll-in reveal animation, icons |
| `public/wp-content/uploads/` | The site's images, at their original WordPress paths |
| `public/fonts/` | Self-hosted Figtree and Roboto |

To change text or images, edit the files in `content/`; the components render whatever is there. In the timeline copy, wrapping a phrase in `**double asterisks**` highlights it.

The colours, glass surfaces, corner radii and easing curves are design tokens at the top of `app/globals.css`.

## Fonts

The original site uses **Proxima Nova**, a commercial typeface that came bundled with the WordPress theme. This build uses **Figtree** (SIL Open Font License) instead. If the client holds a Proxima Nova web licence, add `@font-face` rules for the licensed files in `app/globals.css` (without the `size-adjust` used for Figtree) and point `--font-body` at the new family.

The hero slider uses Roboto (Apache 2.0).

## Notes for developers

- **Write only the standard `backdrop-filter`.** The CSS compiler (Lightning CSS) adds the `-webkit-` prefix for Safari itself. Writing both by hand makes it keep only the last one, and if that's the prefixed one, Chrome gets no blur at all.
- **Sticky timeline:** the timeline's left column relies on `height: fit-content` on the sticky element. Without it, Chromium silently treats the grid item as non-sticky. See the comment in `components/sections/AboutScrollSections.module.css`.

## Changes from the original site

- New three-page structure and dark glass design (see above). The old one-page layout with six stacked service rows is gone; the services now appear as a carousel on Home and as full write-ups on Services.
- The hero and footer images actually appear: the original site loads several of them from `infoarcs.com`, which blocks them.
- The original's hidden top bar, WordPress search box and the theme's demo promo banner are gone.

## Content carried over as-is

- The Data Analytics text says "Data Management Services" rather than "eWorld Innovative Solutions".
- Hero slide 2 reads "Bits and Byets".

Both are one-line edits in `content/home.ts`.

## Not included

- About 24 pages of **Information Architects** (infoarcs.com) product content that the WordPress install also serves under `/solution-accelerators/`, `/industry-solutions/` and similar. Nothing on the eWorld site links to them, and they belong to a different company.
- Theme demo leftovers: the WooCommerce shop and products, demo blog posts, archives, "Sample Page" and "Hello world!".

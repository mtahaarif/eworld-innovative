# eWorld Innovative — Next.js rebuild

A rebuild of the [eworldinnovative.com](https://eworldinnovative.com/) homepage in Next.js 16 (App Router, React 19, TypeScript). It replaces the WordPress site, its theme and its plugins (Slider Revolution, WPBakery, jQuery) with React components and hand-written CSS. Most of the page (the About section, the six service rows and the footer) was measured from the live site and matches it to the pixel at 1440, 1100, 800, 600 and 390px wide. The header and hero banner were then deliberately redesigned — see [Differences from the live site](#differences-from-the-live-site).

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (both routes are prerendered as static HTML)
npm run start    # serve the production build
npm run lint
```

Requires Node.js 20.9 or newer.

## Where things live

| Path | What it holds |
| --- | --- |
| `content/site.ts` | Company details, main menu, footer links, map embed, copyright line |
| `content/home.ts` | Homepage copy: hero slides, About section and tabs, the six service rows |
| `components/layout/` | Header and mobile menu, footer, back-to-top button, page-load fade-in |
| `components/hero/` | Hero slider (autoplay, arrows, swipe, "curtain" transition) |
| `components/sections/` | About section and service rows |
| `components/ui/` | Scroll-in reveal animation, tabs, icons |
| `app/globals.css` | Fonts, colour tokens, base styles |
| `public/wp-content/uploads/` | Every image the homepage uses, at its original WordPress path |
| `public/fonts/` | Self-hosted Figtree and Roboto |

To change text or images, edit the files in `content/`; the components render whatever is there.

## Fonts

The live site uses **Proxima Nova**, a commercial typeface that came bundled with the WordPress theme. This rebuild uses **Figtree** (SIL Open Font License) instead, with `size-adjust: 98.2%` so its text widths, and therefore its line breaks, match Proxima's.

If the client holds a Proxima Nova web licence:

1. Put the licensed font files in `public/fonts/` and add `@font-face` rules for them in `app/globals.css`, without `size-adjust`.
2. Point `--font-body` in `app/globals.css` at the new family.
3. Delete the `.panel li { padding-top: 1px; }` rule in `components/ui/Tabs.module.css`. It only exists to mimic a 1px quirk of Proxima's italic and bold faces.

The hero slider uses Roboto (Apache 2.0), as on the live site.

## Differences from the live site

These are deliberate:

- **Redesigned header.** The live site's 160–368px-tall opaque white bar (its height grows a lot between 992–1199px, where the menu wraps onto extra lines) is replaced with a compact (~89px, ~69px once scrolled) translucent "glass" bar: a blurred, semi-transparent background over the hero, nav links as pill-hover chips instead of the underline effect, and the logo in a small rounded badge. It becomes a more opaque frosted panel once the page scrolls. `components/layout/SiteHeader.module.css` has the full styling.
- **Redesigned hero banner.** The live slider's grid is nearly square (1170×1080 at desktop) — full-bleed but very tall. This rebuild uses a shorter, widescreen-proportioned grid (`content/home.ts`: `heroGrid`) with a subtle top-to-bottom gradient for legibility, glass-style circular arrows and rounded bottom corners. Because the banner is a normal-flow element, this also moves every section below it further up the page than on the live site.
- **Liquid-glass mobile menu.** The slide-in mobile menu is a translucent, blurred panel (rather than solid navy) with a rounded outer edge and pill-hover links, and its scrim overlay is lightly blurred too.
- **Hero and footer images now appear.** The live site loads its slider backgrounds and footer texture from `infoarcs.com`, which blocks them, so visitors see flat grey. This build uses the identical copies from eWorld's own media library.
- **No WordPress, jQuery or paid plugins.** The carousels, tabs, animations and menus are reimplemented in React, based on timings and positions measured from the live site.
- **404 page.** Keeps the site header and footer with a short message and a link home. The WordPress search box and the theme's demo promo banner, which linked to the theme vendor's site, are gone.
- **Hidden top bar omitted.** The live site hides its phone/email/address bar with custom CSS, so it isn't rendered here.
- **One line wrap at 1000px.** At exactly that width, one Cyber Security paragraph wraps onto one more line than on the live site because the two fonts' letter shapes differ.

## Content issues carried over from the live site

These are kept so the page matches what visitors see today. Each one is a small edit in `content/home.ts`:

- On tablets and phones (below 992px), the LMS & Tools, Web Development and Cyber Security rows still show older copy that says "Data Management Services" instead of "eWorld Innovative Solutions" (`mobileParagraphs`). Delete those fields to show the desktop copy everywhere.
- The Cyber Security mobile copy reads "Let IData Management Services make you more secure than ever."
- The Data Analytics row says "Data Management Services" at every screen size.
- Slide 2 reads "Bits and Byets".
- Between 992px and 1199px the main menu doesn't fit on one line and wraps, making the header taller. The live site does the same.

## Not included

- The WordPress site also serves about 24 pages of **Information Architects** (infoarcs.com) product content under `/solution-accelerators/`, `/industry-solutions/`, `/management-solutions/` and similar. They aren't linked from anywhere on the eWorld site and belong to a different company, so they were left out.
- Theme demo leftovers: the WooCommerce shop and products, demo blog posts, tag/category/date archives, "Sample Page" and "Hello world!".

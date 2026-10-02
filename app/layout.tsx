import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { images, site } from "@/content/site";
import { PageReveal } from "@/components/layout/PageReveal";
import { ScrollTopButton } from "@/components/layout/ScrollTopButton";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  icons: { icon: { url: images.mark.src, type: "image/png" } },
};

export const viewport: Viewport = {
  themeColor: "#060a13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior: smooth-scroll in-page anchor jumps (see globals.css),
    // but let Next switch it off during route changes so new pages start at the top instantly.
    <html lang="en-US" data-scroll-behavior="smooth">
      <body>
        {/* Without JavaScript, show the page and scroll-in content immediately. */}
        <noscript>
          <style>{"[data-page]{opacity:1!important;animation:none!important}[data-reveal]{visibility:visible!important}"}</style>
        </noscript>
        <PageReveal>
          <SiteHeader />
          {children}
          <SiteFooter />
        </PageReveal>
        <ScrollTopButton />
      </body>
    </html>
  );
}

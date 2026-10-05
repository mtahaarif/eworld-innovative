import type { Metadata } from "next";
import { heroSlides, services } from "@/content/home";
import { site } from "@/content/site";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";

export const metadata: Metadata = {
  title: { absolute: site.title },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <HeroSlider slides={heroSlides} />
      <AboutSection showMoreLink />
      <ServicesCarousel services={services} />
    </main>
  );
}

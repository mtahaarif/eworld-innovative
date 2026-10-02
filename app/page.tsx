import type { Metadata } from "next";
import { heroSlides, services } from "@/content/home";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <HeroSlider slides={heroSlides} />
      <AboutSection />
      <ServicesCarousel services={services} />
    </main>
  );
}

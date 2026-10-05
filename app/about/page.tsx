import type { Metadata } from "next";
import { about } from "@/content/home";
import { PageHero } from "@/components/layout/PageHero";
import { AboutScrollSections } from "@/components/sections/AboutScrollSections";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About Us",
  description: about.paragraphs[0],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Us"
        title="About Us"
        subtitle="Innovative experiences for forward-thinking brands."
        image="/wp-content/uploads/2020/06/banner-01b.jpg"
      />
      <AboutSection />
      <AboutScrollSections tabs={about.tabs} />
    </main>
  );
}

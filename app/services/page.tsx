import type { Metadata } from "next";
import { services } from "@/content/home";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceDetails } from "@/components/sections/ServiceDetails";

export const metadata: Metadata = {
  title: "Services",
  description: "From cyber security to development: LMS & tools, mobile apps, web development, digital marketing, cyber security and data analytics.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="All IT Solutions Under One Roof"
        subtitle="From Cyber Security to Development"
        image="/wp-content/uploads/2020/06/banner-01c.jpg"
      />
      <ServiceDetails services={services} />
    </main>
  );
}

/**
 * Site-wide content: company details, navigation and footer data.
 * Everything here renders in the shared chrome (header, mobile menu, footer).
 */

export const site = {
  name: "eworld Innovative",
  legalName: "eWorld Innovative Solutions",
  url: "https://eworldinnovative.com",
  title:
    "eworld Innovative – Data Management Services – DMS offers full range of document management solutions",
  phone: "561-598-1110",
  email: "info@eworldinnovative.com",
  address: {
    line1: "999 N Main St, Glen Ellyn,",
    line2: "IL 60137, USA",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.8895928574548!2d-88.0655463243952!3d41.895231464342054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e53305833d249%3A0xf8797ecda4e6f08!2s999%20N%20Main%20St%2C%20Glen%20Ellyn%2C%20IL%2060137%2C%20USA!5e0!3m2!1sen!2s!4v1721631659215!5m2!1sen!2s",
  copyright: "© eWorld Innovative Solutions , All rights reserved",
} as const;

export const images = {
  /** Header logo (173×166, displayed at 100px wide). */
  logo: { src: "/wp-content/uploads/2024/07/1.png", width: 173, height: 166 },
  /** Round mark used as favicon and in the mobile menu (346×332). */
  mark: { src: "/wp-content/uploads/2024/07/footer.png", width: 346, height: 332 },
  /** Footer widget image (150×150 crop of the mark). */
  footerMark: { src: "/wp-content/uploads/2024/07/footer-150x150.png", width: 150, height: 150 },
} as const;

export type NavItem = { label: string; href: string };

/** Main menu: one entry per page. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
];

/** Footer "Quick Links" widget: each service's section on the Services page. */
export const quickLinks: NavItem[] = [
  { label: "LMS & Tools", href: "/services#lms-and-tools" },
  { label: "Mobile App Development", href: "/services#mobile-app-development" },
  { label: "Web Development", href: "/services#web-development" },
  { label: "Digital Marketing", href: "/services#digital-marketing" },
  { label: "Cyber Security", href: "/services#cyber-security" },
  { label: "Data Analytics", href: "/services#data-analytics" },
];

export const footerAbout =
  "eWorld Innovative Solutions LLC was founded in 2013 with a vision of providing innovative technology solutions to businesses. The company initially operated as a home-based startup, offering IT consulting services to small businesses in the local area.";

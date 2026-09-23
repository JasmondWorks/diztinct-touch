export interface SiteConfig {
  name: string;
  title: string;
  studioName: string;
  registeredBusinessName?: string;
  registrationNumber?: string;
  accreditations?: string[];
  monogram: string;
  headline: string;
  subheadline: string;
  bio: string;
  coordinates: string;
  location: string;
  registeredOffice?: string;
  territories?: string[];
  email: string;
  pressEmail?: string;
  phone: string;
  status: string;
  services?: string[];
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  socials: {
    name: string;
    url: string;
    label: string;
  }[];
  navLinks: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Femi Thompson",
  title: "Principal Architect & Design Director",
  studioName: "Diztinct Touch Architecture",
  registeredBusinessName: "Diztinct Touch Architecture & Design Ltd",
  registrationNumber: "UK-CO-14289052",
  accreditations: ["RIBA Chartered Practice", "ARB Registered", "AIA International Assoc."],
  monogram: "DT",
  headline: "Designing structures where geometry meets material permanence.",
  subheadline:
    "A registered architectural practice crafting high-performance mass timber, post-tensioned stone, and sustainable masterplans across Europe, Asia, and West Africa.",
  bio: "Founded on the principles of structural clarity, energy efficiency, and modern precision, Diztinct Touch is a registered architectural practice synthesizing smart computational design with proven building craftsmanship. Every project is engineered for long-term property value, low energy costs, and timeless spatial beauty.",
  coordinates: "51°30'26\"N 0°07'39\"W • 47°22'38\"N 8°32'40\"E",
  location: "London • Zurich • Lagos",
  registeredOffice: "24 Clerkenwell Close, London EC1R 0AT, United Kingdom",
  territories: ["United Kingdom", "European Union", "West Africa", "Japan"],
  email: "studio@diztinct-touch.com",
  pressEmail: "press@diztinct-touch.com",
  phone: "+44 (0) 20 7946 0912",
  status: "Available for Design & Masterplanning Commissions",
  services: [
    "Full Architectural Design (RIBA Stages 0–7)",
    "Energy-Efficient Building Design & Passive Envelopes",
    "Mass Timber & Low-Carbon Structural Engineering",
    "Sustainable Urban Masterplanning",
    "BIM Project Management & Construction Delivery",
  ],
  stats: [
    {
      value: "14+",
      label: "Completed Projects",
      subtext: "Across 6 international jurisdictions",
    },
    {
      value: "68,500 m²",
      label: "Delivered Floor Area",
      subtext: "Commercial, residential & civic developments",
    },
    {
      value: "-34%",
      label: "Lower Carbon Footprint",
      subtext: "Surpassing RIBA 2030 Climate targets",
    },
    {
      value: "9",
      label: "Industry Awards",
      subtext: "WAF, AR Emerging & Mies nominations",
    },
  ],
  socials: [
    { name: "LinkedIn (Personal)", url: "https://linkedin.com/in/femithompson", label: "Femi Thompson" },
    { name: "LinkedIn (Company)", url: "https://linkedin.com/company/diztinct-touch", label: "Diztinct Touch Ltd" },
    { name: "Twitter / X", url: "https://twitter.com/diztincttouch", label: "@diztincttouch" },
    { name: "Instagram", url: "https://instagram.com/diztinct.touch", label: "@diztinct.touch" },
    { name: "ArchDaily", url: "https://archdaily.com/office/diztinct-touch", label: "Diztinct Touch" },
    { name: "GitHub", url: "https://github.com/diztinct-touch", label: "Open-BIM Schemas" },
  ],
  navLinks: [
    { label: "Featured", href: "/#featured" },
    { label: "Projects", href: "/#projects" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

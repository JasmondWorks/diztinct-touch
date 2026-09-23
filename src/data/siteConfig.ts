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
  name: "Mayowa",
  title: "Design Lead & Principal Architect",
  studioName: "DIZTINCT TOUCH HOME DESIGN",
  registeredBusinessName: "DIZTINCT TOUCH HOME DESIGN",
  registrationNumber: "Registered Architecture & 3D Visualization Practice",
  accreditations: [
    "Architectural Design & Space Planning",
    "Photorealistic 3D Visualization",
    "2D Working Drawings & Approval Plans",
    "Construction-Stage Site Oversight",
  ],
  monogram: "DT",
  headline: "Remarkable design, long lasting.",
  subheadline:
    "Led by Mayowa, DIZTINCT TOUCH HOME DESIGN crafts functional, comfortable, and aesthetically appealing residential & commercial architecture—from 2D drawings and 3D visualization to active construction oversight.",
  bio: "DIZTINCT TOUCH HOME DESIGN is a registered contemporary architectural design and 3D visualization practice founded and led by Mayowa. Guided by our foundational philosophy—'Remarkable design, long lasting'—we specialize in crafting homes with careful consideration given to the building's form, proportions, spatial arrangement, and external appearance. From precision 2D working drawings and photorealistic 3D renders to on-site construction supervision (as seen in our flagship ARMITY Estate duplex), we bridge the gap between creative design and lasting structural reality.",
  coordinates: "ARMITY Estate, Ejioku Village",
  location: "ARMITY Estate • Ejioku • Oyo State & Lagos, Nigeria",
  registeredOffice: "ARMITY Estate, Ejioku Village, Oyo State",
  territories: ["Nigeria (Nationwide)", "West Africa", "International Diaspora Clients"],
  email: "diztincttouch@gmail.com",
  pressEmail: "diztincttouch@gmail.com",
  phone: "+234 (0) 800 000 0000",
  status: "Available for Architectural Design, 3D Visualization & Construction Commissions",
  services: [
    "Architectural Concept & Spatial Design",
    "2D Working Drawings & Approval Documentation",
    "Photorealistic 3D Modeling & Visualization",
    "Design Development & Exterior Material Detailing",
    "Construction-Stage Architectural Oversight & Supervision",
  ],
  stats: [
    {
      value: "2025",
      label: "Active Build",
      subtext: "ARMITY Estate Duplex currently underway",
    },
    {
      value: "100%",
      label: "Design-to-Build Fidelity",
      subtext: "Exact 3D render translation to physical site",
    },
    {
      value: "Full",
      label: "End-to-End Scope",
      subtext: "From initial sketch to completed decking",
    },
    {
      value: "★",
      label: "Client Commitment",
      subtext: "Remarkable design, long lasting",
    },
  ],
  socials: [
    { name: "WhatsApp", url: "https://wa.me/2348000000000", label: "Direct Consultation" },
    { name: "Instagram", url: "https://instagram.com/diztincttouch", label: "@diztincttouch" },
    { name: "LinkedIn", url: "https://linkedin.com", label: "DIZTINCT TOUCH HOME DESIGN" },
    { name: "Portfolio", url: "#projects", label: "Selected Works" },
  ],
  navLinks: [
    { label: "Featured", href: "/#featured" },
    { label: "Projects", href: "/#projects" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

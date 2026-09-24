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
  ibadanOffice: string;
  lagosOffice: string;
  workingHours: string;
  registeredOffice?: string;
  territories?: string[];
  email: string;
  pressEmail?: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  instagramUrl: string;
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
  registrationNumber: "Registered Architecture & 3D Visualization Studio",
  accreditations: [
    "Architectural Design & Space Planning",
    "Photorealistic 3D Visualization",
    "2D Working Drawings & Approval Plans",
    "Construction-Stage Site Oversight",
  ],
  monogram: "DT",
  headline: "Remarkable design, long lasting.",
  subheadline:
    "Led by Mayowa, DIZTINCT TOUCH HOME DESIGN crafts beautiful, functional, and comfortable contemporary homes—guiding your project from 2D building plans and realistic 3D visuals to active on-site construction oversight.",
  bio: "DIZTINCT TOUCH HOME DESIGN is a registered contemporary architectural design and 3D visualization studio founded and led by Mayowa. Guided by our foundational philosophy—'Remarkable design, long lasting'—we specialize in crafting homes with careful consideration given to the building's form, proportions, spatial arrangement, and external appearance. From precision 2D working drawings and photorealistic 3D renders to on-site construction supervision (as seen in our flagship ARMITY Estate duplex), we bridge the gap between creative design and lasting structural reality.",
  coordinates: "New Gbagi Road, Ibadan • Mosan Ipaja, Lagos",
  location: "Ibadan (Head Office) & Lagos, Nigeria",
  ibadanOffice: "Suite 14, Lamlat House, Opp. Bovas Filling Station, New Gbagi Road, Ibadan, Oyo State",
  lagosOffice: "1, Church Street, Federal Low Cost Housing Estate, Mosan, Ipaja, Lagos",
  workingHours: "Mondays to Fridays: 8:30am – 5:00pm",
  registeredOffice: "Suite 14, Lamlat House, Opp. Bovas Filling Station, New Gbagi Road, Ibadan, Oyo State",
  territories: ["Ibadan & Oyo State", "Lagos & Ogun State", "Nigeria (Nationwide)", "International Diaspora Clients"],
  email: "diztincttouch7@gmail.com",
  pressEmail: "diztincttouch7@gmail.com",
  phone: "+234 903 501 1649",
  phoneRaw: "09035011649",
  whatsappUrl: "https://wa.me/2349035011649",
  instagramUrl: "https://www.instagram.com/diztincttouchhomedesign?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  status: "Available for Architectural Design, 3D Visualization & Building Projects",
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
    { name: "WhatsApp", url: "https://wa.me/2349035011649", label: "+234 903 501 1649" },
    {
      name: "Instagram",
      url: "https://www.instagram.com/diztincttouchhomedesign?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
      label: "@diztincttouchhomedesign",
    },
    { name: "Portfolio", url: "/#projects", label: "Selected Works" },
  ],
  navLinks: [
    { label: "Featured", href: "/#featured" },
    { label: "Projects", href: "/#projects" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

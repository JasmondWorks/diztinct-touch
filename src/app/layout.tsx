import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "DIZTINCT TOUCH HOME DESIGN — Architectural Design & 3D Visualization",
  description:
    "Contemporary residential & commercial architectural design, 2D drawings, photorealistic 3D visualization, and construction-stage oversight. Remarkable design, long lasting.",
  keywords: [
    "DIZTINCT TOUCH HOME DESIGN",
    "Mayowa",
    "Architectural Design",
    "Residential Duplex",
    "3D Visualization",
    "2D Drawings",
    "ARMITY Estate",
    "Ejioku Village",
    "Contemporary Architecture",
    "Construction Supervision",
  ],
  authors: [{ name: "Mayowa", url: "https://diztinct-touch.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

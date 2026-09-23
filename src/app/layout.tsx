import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Diztinct Touch — Architecture & Design Practice",
  description:
    "A registered architectural practice crafting high-performance mass timber, post-tensioned stone, and sustainable masterplans across Europe, Asia, and West Africa.",
  keywords: [
    "Architecture",
    "Architectural Portfolio",
    "Mass Timber",
    "Computational Design",
    "BIM",
    "Civic Architecture",
    "Sustainable Masterplanning",
    "Revit",
    "Rhino Grasshopper",
  ],
  authors: [{ name: "Femi Thompson" }],
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

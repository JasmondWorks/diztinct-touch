import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://diztincttouch.com"),
  title: "DIZTINCT TOUCH HOME DESIGNS — Architectural Design & 3D Visualization",
  description:
    "Contemporary residential & commercial architectural design, 2D drawings, photorealistic 3D visualization, and construction-stage oversight. Remarkable design, long lasting.",
  keywords: [
    "DIZTINCT TOUCH HOME DESIGNS",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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

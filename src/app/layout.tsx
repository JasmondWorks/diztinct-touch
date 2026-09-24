import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

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
  authors: [{ name: "Mayowa", url: "https://diztincttouch.com" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand-logo-only.png", sizes: "221x300", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "DIZTINCT TOUCH HOME DESIGNS — Remarkable Design, Long Lasting",
    description:
      "Contemporary residential & commercial architectural design, 2D drawings, photorealistic 3D visualization, and construction-stage oversight.",
    url: "https://diztincttouch.com",
    siteName: "DIZTINCT TOUCH HOME DESIGNS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DIZTINCT TOUCH HOME DESIGNS — Contemporary Architecture & 3D Visualization",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIZTINCT TOUCH HOME DESIGNS — Remarkable Design, Long Lasting",
    description:
      "Contemporary residential & commercial architectural design, 2D drawings, photorealistic 3D visualization, and construction-stage oversight.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-white font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

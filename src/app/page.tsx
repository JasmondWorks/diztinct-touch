import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { AboutSection } from "@/components/home/AboutSection";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIZTINCT TOUCH HOME DESIGN | Contemporary Architecture & 3D Visualization",
  description:
    "Led by Mayowa, DIZTINCT TOUCH HOME DESIGN is a premier registered architectural practice delivering bespoke contemporary residential duplexes, 3D visualization, working drawings, and on-site construction oversight across Nigeria.",
  keywords: [
    "contemporary duplex design",
    "architect in Ibadan",
    "architect in Lagos",
    "Nigerian residential architecture",
    "3D architectural visualization Nigeria",
    "DIZTINCT TOUCH HOME DESIGN",
    "Mayowa architect",
    "duplex construction Ibadan",
    "modern residential duplex",
  ],
  openGraph: {
    title: "DIZTINCT TOUCH HOME DESIGN — Remarkable Design, Long Lasting",
    description:
      "Bespoke contemporary residential duplexes, architectural working drawings, 3D photorealistic visualization, and construction-stage site delivery.",
    url: "https://diztincttouch.com",
    siteName: "DIZTINCT TOUCH HOME DESIGN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 100dvh Hero */}
      <Hero />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Complete Projects Catalog with Typology & Tectonic Filters */}
      <ProjectsGrid />

      {/* Practice Ethos & Design Pillars */}
      <AboutSection />

      {/* Closing Call to Action Banner */}
      <section className="border-t border-border bg-card/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-mono font-semibold text-primary">
            <Compass className="h-3.5 w-3.5" />
            <span>Open for Commissions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground-heading max-w-2xl mx-auto">
            Ready to build a home of remarkable distinction?
          </h2>

          <p className="max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
            From bespoke contemporary duplexes to modern commercial spaces, Mayowa and the DIZTINCT TOUCH team guide your vision from initial 2D drawings and photorealistic 3D renders to flawless on-site construction delivery.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-primary/90 transition-all hover:scale-[1.02]"
            >
              <span>Initiate Project Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-xs font-semibold text-foreground hover:border-primary/40 transition-all"
            >
              <span>Explore Visual Archive</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

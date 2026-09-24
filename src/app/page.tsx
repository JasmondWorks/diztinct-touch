import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { getProjectsAction } from "@/actions/projects";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "DIZTINCT TOUCH HOME DESIGN | Contemporary Architecture & 3D Visualization",
  description:
    "Led by Mayowa, DIZTINCT TOUCH HOME DESIGN is a premier registered architectural studio delivering bespoke contemporary residential duplexes, 3D visualization, working drawings, and on-site construction oversight across Nigeria.",
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

export default async function HomePage() {
  const projects = await getProjectsAction(false);

  return (
    <main className="flex min-h-screen flex-col">
      {/* 100dvh Hero */}
      <Hero />

      {/* Featured Projects Section */}
      <FeaturedProjects initialProjects={projects} />

      {/* Complete Projects Catalog with Typology & Tectonic Filters */}
      <ProjectsGrid initialProjects={projects} />

      {/* Studio Ethos & Design Pillars */}
      <AboutSection />

      {/* Closing Call to Action Banner */}
      <section className="border-t border-border bg-card/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="outline" className="gap-2 px-4 py-1 text-xs font-mono font-semibold text-primary border-primary/20 bg-primary/5">
            <Compass className="h-3.5 w-3.5" />
            <span>Available for New Projects</span>
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground-heading max-w-2xl mx-auto">
            Ready to build a home of remarkable distinction?
          </h2>

          <p className="max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
            From bespoke contemporary duplexes to modern commercial spaces, Mayowa and the DIZTINCT TOUCH team guide your vision from initial 2D drawings and photorealistic 3D renders to flawless on-site construction delivery.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl gap-2">
              <Link href="/contact">
                <span>Book Design Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/gallery">
                <span>Explore Visual Archive</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

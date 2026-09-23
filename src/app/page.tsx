import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { AboutSection } from "@/components/home/AboutSection";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 100dvh Hero */}
      <Hero />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Complete Projects Catalog with Typology & Tectonic Filters */}
      <ProjectsGrid />

      {/* Atelier Ethos & Computational Pillars */}
      <AboutSection />

      {/* Closing Call to Action Banner */}
      <section className="border-t border-border bg-card/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-mono font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Open for Commissions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground-heading max-w-2xl mx-auto">
            Ready to shape physical permanence together?
          </h2>

          <p className="max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
            From alpine research retreats to high-density biophilic mass timber towers, we welcome challenging site briefs across the globe.
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

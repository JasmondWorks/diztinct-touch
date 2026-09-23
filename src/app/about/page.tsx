import { siteConfig } from "@/data/siteConfig";
import Image from "next/image";
import Link from "next/link";
import { Compass, Award, Building, HardHat, FileText, ArrowRight, ShieldCheck, Layers, Cpu } from "lucide-react";

export const metadata = {
  title: "About Our Practice — Diztinct Touch Architecture",
  description: "A registered architectural practice specializing in high-performance mass timber, smart computational design, and low-carbon buildings.",
};

export default function AboutPage() {
  const awards = [
    { year: "2025", title: "World Architecture Festival (WAF) Finalist", project: "Komorebi Forest Pavilion" },
    { year: "2025", title: "International Arctic Architecture Competition — 1st Prize", project: "Hyperborea Polar Station" },
    { year: "2024", title: "Architectural Review (AR) Emerging Architecture Commendation", project: "The Monolith Villa" },
    { year: "2024", title: "Nordic Wood Design Award", project: "Aethelgard High-Rise Tower" },
    { year: "2023", title: "Deutscher Architekturpreis Special Mention", project: "Foundry 04 Boilerhouse" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-border/80 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            <Compass className="h-3.5 w-3.5" />
            <span>About Our Practice</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground-heading leading-tight">
            Structural integrity, energy efficiency, and modern precision.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {siteConfig.bio}
          </p>
        </div>

        {/* Lead Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="relative aspect-4/3 lg:aspect-auto lg:h-[480px] lg:col-span-6 overflow-hidden rounded-3xl border border-border bg-muted/40 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85"
              alt="Architectural Design Studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white font-mono text-xs">
              <p className="font-bold text-primary">Design &amp; Engineering Studio</p>
              <p className="opacity-80">1:1 Physical Prototyping &amp; BIM Coordination</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
              Designed for longevity, efficiency, and real-world value.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We practice an architecture where every surface, wall, and material choice is accountable to performance and budget. We focus on physical permanence—specifying mass timber that sequesters carbon for generations, resilient materials that withstand harsh climates, and passive thermal systems that dramatically reduce operational electricity bills.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Our workflow unites advanced computational 3D modeling (Revit BIM, Rhino, structural simulation) with reliable regional contractor networks, ensuring every project is delivered on schedule, within budget, and built to the highest architectural standard.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary/90 transition-all"
              >
                <span>Start a Project Consultation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Awards & Critical Recognition */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border/80 pb-3">
            <Award className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold uppercase tracking-wider text-foreground-heading">
              Honors, Awards &amp; Nominations
            </h3>
          </div>

          <div className="divide-y divide-border/80 border-y border-border/80">
            {awards.map((award, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2 text-sm"
              >
                <div className="space-y-0.5">
                  <p className="font-bold text-foreground-heading">{award.title}</p>
                  <p className="text-xs text-muted-foreground font-mono">Commission: {award.project}</p>
                </div>
                <span className="font-mono text-xs font-semibold text-primary">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

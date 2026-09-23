import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { Compass, Layers, ShieldCheck, ArrowRight, CheckCircle2, Trees, HardHat } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      title: "Structural Integrity & Honest Materials",
      description:
        "Every load-bearing beam, mass wall, and facade is engineered for maximum durability. We prioritize authentic materials that age gracefully and retain value over decades.",
      icon: Layers,
    },
    {
      title: "High Energy Efficiency & Low Carbon",
      description:
        "Targeting net-positive buildings through mass timber, pozzolanic low-carbon concrete, and intelligent insulation that dramatically lowers operational energy bills.",
      icon: Trees,
    },
    {
      title: "Precision Digital Engineering",
      description:
        "From parametric solar optimization to CNC-prefabricated timber joinery, advanced digital modeling ensures on-time delivery with zero on-site material waste.",
      icon: Compass,
    },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              <HardHat className="h-3.5 w-3.5" />
              <span>Design Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground-heading leading-tight">
              Architecture engineered for permanence and performance.
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Diztinct Touch was founded on the belief that enduring architecture is born from the intersection of rigorous engineering, functional efficiency, and durable materials.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Operating out of London, Zurich, and Lagos, our practice collaborates with commercial developers, cultural institutions, and private property owners on projects ranging from bespoke coastal villas to multi-hectare sustainable masterplans.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all"
              >
                <span>Learn More About Our Practice</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Three Pillars & Capability Bento */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:border-primary/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-foreground-heading">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Software & Fabrication Stack Matrix */}
            <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Technical Stack &amp; Fabrication Systems
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Rhino 8",
                  "Grasshopper (Computational)",
                  "Revit / Open-BIM",
                  "Karamba3D (FEA)",
                  "Ladybug & Honeybee (Microclimate)",
                  "Enscape & V-Ray",
                  "Mass Timber / CLT / DLT",
                  "Pozzolanic Concrete",
                  "Corten Steel",
                  "Rammed Earth",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-mono font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

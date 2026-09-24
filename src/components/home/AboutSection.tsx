import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { Compass, Layers, ArrowRight, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function AboutSection() {
  const pillars = [
    {
      title: "Functional & Aesthetic Architectural Design",
      description:
        "Careful consideration of the building's form, proportions, and spatial arrangement to create homes that are functional, comfortable, and visually striking.",
      icon: Layers,
    },
    {
      title: "Photorealistic 3D Modeling & Visualization",
      description:
        "High-definition 3D rendering allowing clients to experience their home's materials, lighting, and volume before breaking ground on site.",
      icon: Compass,
    },
    {
      title: "Construction-Stage Input & Oversight",
      description:
        "Active architectural involvement across all milestones—from foundation and suspended decking to first-floor blockwork and bespoke finishes.",
      icon: HardHat,
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
              <span>DIZTINCT TOUCH HOME DESIGN</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground-heading leading-tight">
              Remarkable design, long lasting.
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Led by Mayowa, DIZTINCT TOUCH HOME DESIGN creates contemporary residential and commercial properties where functional spatial planning meets uncompromising structural durability.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              From our active duplex development in ARMITY Estate, Ejioku Village to custom private residences, we guide clients from initial 2D drawings and photorealistic 3D visualizations through to on-site construction delivery.
            </p>

            <div className="pt-2">
              <Button asChild variant="outline" className="gap-2 text-xs font-bold text-primary border-primary/30 bg-primary/10 hover:bg-primary hover:text-white">
                <Link href="/about">
                  <span>Learn More About Our Practice</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Three Pillars & Capability Bento */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Card
                    key={pillar.title}
                    className="flex flex-col sm:flex-row items-start gap-4 p-6 transition-all hover:border-primary/40"
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
                  </Card>
                );
              })}
            </div>

            {/* Software & Construction Systems Matrix */}
            <Card className="p-6 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Technical Systems &amp; Construction Methods
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Architectural 2D Working Drawings",
                  "Photorealistic 3D Modeling",
                  "V-Ray & Lumion Visualization",
                  "Revit (BIM) & AutoCAD",
                  "Reinforced Concrete Columns",
                  "Suspended Concrete Decking",
                  "Cantilevered Balconies",
                  "Textured Brick Facades",
                  "Architectural Privacy Louvers",
                  "On-Site Construction Oversight",
                ].map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="text-xs font-mono font-medium text-foreground bg-background"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

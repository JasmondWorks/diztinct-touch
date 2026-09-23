import { siteConfig } from "@/data/siteConfig";
import Image from "next/image";
import Link from "next/link";
import { Button, Badge, Card } from "@/components/ui";
import {
  Compass,
  CheckCircle2,
  HardHat,
  ArrowRight,
  Layers,
  PenTool,
  Eye,
  Building2,
  Clock,
  ShieldCheck,
  User,
  Phone,
  MessageSquare,
  FileCheck2,
} from "lucide-react";

export const metadata = {
  title: "About Mayowa & DIZTINCT TOUCH HOME DESIGN — Registered Practice",
  description:
    "Led by Mayowa, DIZTINCT TOUCH HOME DESIGN is a registered contemporary architectural design and 3D visualization practice. Remarkable design, long lasting.",
};

export default function AboutPage() {
  const services = [
    {
      title: "Architectural Concept & Spatial Design",
      description:
        "Careful consideration of the building's form, proportions, spatial arrangement, and external appearance to create homes that are functional, comfortable, and visually striking.",
      icon: Compass,
    },
    {
      title: "2D Working Drawings & Documentation",
      description:
        "Comprehensive architectural floor plans, sections, elevations, and structural coordination drawings required for government approvals and contractor execution.",
      icon: PenTool,
    },
    {
      title: "Photorealistic 3D Modeling & Visualization",
      description:
        "High-definition 3D visualization that gives clients a true-to-life preview of materials, light interaction, and landscape context long before breaking ground.",
      icon: Eye,
    },
    {
      title: "Construction-Stage Architectural Oversight",
      description:
        "Active on-site supervision and architectural input during critical construction phases—from foundation and ground floor to decking, masonry, and final finishes.",
      icon: HardHat,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Client Brief & Site Feasibility",
      description:
        "We discuss your lifestyle, spatial requirements, budget parameters, and site orientation to establish clear architectural goals.",
    },
    {
      number: "02",
      title: "2D Spatial Planning & Floor Plans",
      description:
        "Detailed functional layouts that balance flow, daylighting, natural cross-ventilation, and generous room proportions.",
    },
    {
      number: "03",
      title: "Photorealistic 3D Visualization",
      description:
        "Realistic exterior and interior 3D renderings showcasing materials, brick textures, glazing, and ambient evening illumination.",
    },
    {
      number: "04",
      title: "2D Working Drawings & Approvals",
      description:
        "Full set of technical construction drawings, dimensions, schedules, and structural coordination ready for builders.",
    },
    {
      number: "05",
      title: "Construction Oversight & Milestones",
      description:
        "Periodic site inspections and architectural input to guarantee that the physical build reflects the approved 3D design to the millimeter.",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header Banner */}
        <div className="max-w-3xl space-y-4 border-b border-border/80 pb-8">
          <Badge variant="outline" className="gap-2 text-xs py-1 px-3">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Registered Architectural Practice • Design Lead: Mayowa</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground-heading leading-tight">
            Remarkable design, long lasting.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {siteConfig.bio}
          </p>
        </div>

        {/* Section 1: Meet Mayowa — Principal & Design Lead */}
        <Card className="rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <Badge variant="gold" className="gap-2 px-3.5 py-1.5 text-xs font-mono font-bold">
                <User className="h-3.5 w-3.5" />
                <span>The Designer Behind The Work</span>
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground-heading">
                Mayowa
              </h2>
              <p className="text-sm font-mono text-primary font-semibold">
                Design Lead &amp; Principal • DIZTINCT TOUCH HOME DESIGN
              </p>
              <div className="pt-2 text-xs font-mono text-muted-foreground space-y-1">
                <p>• Registered Architecture &amp; 3D Visualization Practice</p>
                <p>• Principal Office: New Gbagi Road, Ibadan, Oyo State</p>
                <p>• Lagos Office: Mosan, Ipaja, Lagos</p>
                <p>• Direct: +234 903 501 1649 • diztincttouch7@gmail.com</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed border-t lg:border-t-0 lg:border-l border-border/80 pt-6 lg:pt-0 lg:pl-8">
              <p>
                Mayowa is the founder and design lead of{" "}
                <strong className="text-foreground">DIZTINCT TOUCH HOME DESIGN</strong>. With a deep passion for contemporary residential form and functional comfort, Mayowa approaches every building project as an enduring legacy for its occupants.
              </p>
              <p>
                Rather than treating architectural design simply as drawing pictures, Mayowa integrates{" "}
                <strong className="text-foreground">precision 2D working drawings</strong>,{" "}
                <strong className="text-foreground">photorealistic 3D visualization</strong>, and{" "}
                <strong className="text-foreground">hands-on construction-stage supervision</strong>. His work ensures that what is conceptualized on screen is structurally sound, cost-effective to build, and faithful to the approved design once built on site.
              </p>
              <p>
                As a registered business, DIZTINCT TOUCH HOME DESIGN operates with professional integrity, transparent milestone stages, and clear client communication—making it the ideal design partner for both local property developers and international diaspora clients building in Nigeria.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button asChild variant="emerald" size="sm">
                  <a
                    href={`https://wa.me/2349035011649?text=${encodeURIComponent("Hello Mayowa, I would like to consult on an architectural project with DIZTINCT TOUCH HOME DESIGN.")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Chat with Mayowa on WhatsApp (+234 903 501 1649)</span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Request Full Project Consultation</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Section 2: Active Project Spotlight — ARMITY Estate Duplex */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="relative aspect-4/3 lg:aspect-auto lg:h-[480px] lg:col-span-6 overflow-hidden rounded-3xl border border-border bg-muted/40 shadow-xl">
            <Image
              src="/projects/armity-duplex/cover.jpg"
              alt="ARMITY Estate Residential Duplex by DIZTINCT TOUCH HOME DESIGN"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white font-mono text-xs space-y-1.5">
              <Badge variant="primary" className="text-[10px] font-bold">
                Active Construction Spotlight
              </Badge>
              <p className="text-base font-bold text-white">
                The ARMITY Contemporary Duplex
              </p>
              <p className="text-xs text-zinc-300">
                Ejioku Village, ARMITY Estate • 2025 Ongoing Build
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Badge variant="outline" className="gap-2 text-xs py-1 px-3">
              <HardHat className="h-3.5 w-3.5 text-primary" />
              <span>Real Project Intake Verification</span>
            </Badge>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading leading-snug">
              Bridging 3D visualization and physical site execution.
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Our flagship 2025 residential duplex at ARMITY Estate, Ejioku Village demonstrates DIZTINCT TOUCH HOME DESIGN's complete end-to-end methodology in action.
            </p>

            {/* Construction Progress Breakdown */}
            <Card className="p-5 space-y-3 font-mono text-xs">
              <div className="font-bold text-foreground uppercase tracking-wider text-[11px] pb-1 border-b border-border/70 flex items-center justify-between">
                <span>Verified Construction Milestones</span>
                <span className="text-primary">Current Stage: First Floor</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Ground Floor: <strong>Completed</strong></span>
                </div>
                <div className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Suspended Decking: <strong>Completed</strong></span>
                </div>
                <div className="flex items-center gap-2 text-amber-500">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>First Floor Level: <strong>Ongoing</strong></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Finishing &amp; Glazing: <strong>Pending</strong></span>
                </div>
              </div>
            </Card>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <Button asChild variant="default">
                <Link href="/projects/armity-duplex">
                  <span>View The ARMITY Duplex Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Section 3: Professional Services & Scope */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
            <div className="space-y-1">
              <Badge variant="outline" className="gap-2 text-xs py-1 px-3">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>Our Professional Scope</span>
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground-heading">
                Comprehensive Architectural &amp; 3D Services
              </h3>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-muted-foreground">
              Every stage handled with precision—from early concept sketches to physical on-site construction delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="flex flex-col sm:flex-row items-start gap-4 p-6 hover:border-primary/40 transition-all"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-base text-foreground-heading">
                      {service.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Section 4: The 5-Stage Project Journey */}
        <Card className="rounded-3xl p-8 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                How Mayowa &amp; DIZTINCT TOUCH Work With You
              </span>
              <h3 className="text-2xl font-bold text-foreground-heading">
                Our 5-Stage Project Delivery Framework
              </h3>
            </div>
            <Badge variant="gold" className="text-xs font-mono font-bold py-1.5 px-3.5">
              GUARANTEED CLARITY
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="p-5 space-y-2.5 flex flex-col justify-between bg-background/60"
              >
                <div className="font-mono text-2xl font-black text-primary">
                  {step.number}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground-heading">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Section 5: Why Clients Choose DIZTINCT TOUCH HOME DESIGN */}
        <Card className="rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="space-y-1 border-b border-border/80 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
              The DIZTINCT Difference
            </span>
            <h3 className="text-2xl font-bold text-foreground-heading">
              Why Homeowners &amp; Developers Partner With Us
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="space-y-2 bg-background/50 p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase">
                <FileCheck2 className="h-4 w-4" />
                <span>Registered Business</span>
              </div>
              <h4 className="font-bold text-sm text-foreground-heading">
                Contractual Reliability
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Positioned as a registered business with clear project milestones, transparent staging, and accountable project delivery.
              </p>
            </Card>

            <Card className="space-y-2 bg-background/50 p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="h-4 w-4" />
                <span>3D-to-Site Match</span>
              </div>
              <h4 className="font-bold text-sm text-foreground-heading">
                Zero Design Drift
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                What you approve in our 3D visualizations is what our 2D working drawings specify and what is constructed on your site.
              </p>
            </Card>

            <Card className="space-y-2 bg-background/50 p-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase">
                <ShieldCheck className="h-4 w-4" />
                <span>Diaspora Peace of Mind</span>
              </div>
              <h4 className="font-bold text-sm text-foreground-heading">
                Active Site Oversight
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Regular photo/video construction updates at every milestone (foundation, decking, masonry, roof) for clients building from abroad.
              </p>
            </Card>
          </div>
        </Card>

        {/* Closing CTA */}
        <Card className="rounded-3xl border-primary/20 bg-linear-to-r from-primary/10 via-card to-background p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground-heading">
            Ready to design your next home with Mayowa?
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Whether you are planning a contemporary duplex, a family bungalow, or require 3D modeling and 2D working drawings, we are available to guide your vision.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild variant="default" size="lg" className="hover:scale-[1.02]">
              <Link href="/contact">
                <span>Schedule a Project Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={`https://wa.me/2349035011649?text=${encodeURIComponent("Hello Mayowa, I'd like to discuss a project with DIZTINCT TOUCH HOME DESIGN.")}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageSquare className="h-4 w-4 text-emerald-500" />
                <span>Chat Directly on WhatsApp (+234 903 501 1649)</span>
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


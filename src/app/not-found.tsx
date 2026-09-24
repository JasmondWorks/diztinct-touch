import Link from "next/link";
import { Metadata } from "next";
import {
  Compass,
  ArrowLeft,
  Building2,
  Camera,
  MessageSquare,
  FileQuestion,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "404 — Blueprint Not Found | DIZTINCT TOUCH HOME DESIGN",
  description:
    "The architectural design, drawing, or project page you are searching for does not exist in the studio archives.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center text-center relative selection:bg-primary/20">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl space-y-8 animate-fadeIn">
        {/* Architectural Coordinate Status Badge */}
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="gap-2 px-3.5 py-1 text-xs font-mono border-primary/30 bg-primary/5 text-primary"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>COORDINATE ERROR • ELEVATION 404m</span>
          </Badge>
        </div>

        {/* Large Architectural 404 Display */}
        <div className="space-y-3">
          <div className="font-mono text-7xl sm:text-9xl font-black tracking-tighter text-foreground-heading select-none opacity-90">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
            Architectural Blueprint Not Found
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            The project specification, perspective visualization, or archive entry
            you are looking for does not exist or has been repositioned.
          </p>
        </div>

        {/* Primary Recovery Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" className="gap-2 font-mono text-xs">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Studio Homepage</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="gap-2 font-mono text-xs">
            <Link href="/#projects">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Explore Verified Projects</span>
            </Link>
          </Button>

          <Button asChild variant="ghost" size="lg" className="gap-2 font-mono text-xs text-muted-foreground hover:text-foreground">
            <Link href="/gallery">
              <Camera className="h-4 w-4" />
              <span>Photo Gallery</span>
            </Link>
          </Button>
        </div>

        {/* Architectural Quick-Jump Recovery Cards */}
        <div className="pt-6 border-t border-border/80 text-left space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <span>Verified Studio Duplexes</span>
            <span>Direct Fast-Track</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/projects/armity-duplex"
              className="group p-4 rounded-2xl border border-border/80 bg-card/60 hover:border-primary/50 transition-all block"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono text-primary font-semibold">
                  DT-ARM-01
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-mono border-amber-500/30 text-amber-400">
                  In Progress
                </Badge>
              </div>
              <h2 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                <span>The Armity Contemporary Duplex</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </h2>
              <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                ARMITY Estate, Ejioku Village • Ground slab completed, first-floor active
              </p>
            </Link>

            <Link
              href="/projects/contemporary-duplex"
              className="group p-4 rounded-2xl border border-border/80 bg-card/60 hover:border-primary/50 transition-all block"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono text-primary font-semibold">
                  DT-DPX-02
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-mono border-emerald-500/30 text-emerald-400">
                  Completed
                </Badge>
              </div>
              <h2 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                <span>The Horizon Contemporary Duplex</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </h2>
              <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                Ibadan, Oyo State • Double-height atrium &amp; helical marble staircase
              </p>
            </Link>
          </div>
        </div>

        {/* Direct Architectural Consultation Link */}
        <div className="pt-2">
          <p className="text-xs font-mono text-muted-foreground">
            Looking for bespoke architectural consultation or 3D visualization?{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Speak with Mayowa</span>
              <MessageSquare className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

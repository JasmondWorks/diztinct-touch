"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { ShieldCheck } from "lucide-react";

interface AdminLoaderProps {
  label?: string;
  sublabel?: string;
  fullScreen?: boolean;
}

export function AdminLoader({
  label = "Verifying Security Credentials...",
  sublabel = "DIZTINCT TOUCH HOME DESIGNS • Studio Portal",
  fullScreen = true,
}: AdminLoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? "min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center text-center p-6 relative overflow-hidden selection:bg-primary/20"
          : "min-h-[50vh] w-full bg-transparent text-foreground flex flex-col items-center justify-center text-center p-6 relative"
      }
    >
      {/* Background Architectural Dot Grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="orb -top-20 -left-20 h-64 w-64 bg-rose-500/10 pointer-events-none" />
      <div className="orb bottom-10 right-10 h-64 w-64 bg-amber-500/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm">
        {/* Tectonic Precision Spinner: Dual-ring rotation around Studio Monogram */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer rotating primary track */}
          <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />

          {/* Inner counter-rotating accent track */}
          <div
            className="absolute w-12 h-12 rounded-full border border-accent/20 border-b-accent animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />

          {/* Studio Monogram Heart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-[#9f1239] via-[#cc2b43] to-[#db4d24] text-white font-bold text-xs shadow-md animate-pulse">
              {siteConfig.monogram}
            </div>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-mono font-semibold text-primary mb-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{label}</span>
        </div>

        {/* Studio Sublabel */}
        <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
          {sublabel}
        </span>
      </div>
    </div>
  );
}

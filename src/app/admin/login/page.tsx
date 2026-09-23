import React from "react";
import type { Metadata } from "next";
import { AdminLoginKeypad } from "@/components/admin/AdminLoginKeypad";

export const metadata: Metadata = {
  title: "Admin Portal Access | DIZTINCT TOUCH HOME DESIGN",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/20 selection:text-white">
      {/* Background Architectural Dot Grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="orb -top-24 -left-24 h-96 w-96 bg-rose-500/10 animate-[glow-pulse_7s_ease-in-out_infinite]" />
      <div className="orb top-1/3 -right-28 h-96 w-96 bg-amber-500/10 animate-[glow-pulse_9s_ease-in-out_infinite_2s]" />

      {/* Radial vignette mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_80%)] pointer-events-none" />

      {/* Interactive Tactile Keypad */}
      <AdminLoginKeypad />
    </div>
  );
}

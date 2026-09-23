"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowDown, ArrowRight, Building2, Layers, Award } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden pt-28 pb-12 sm:pt-36">
      {/* Background Architectural Dot Grid */}
      <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="orb -top-24 -left-24 h-96 w-96 bg-rose-500/10 animate-[glow-pulse_7s_ease-in-out_infinite]" />
      <div className="orb top-1/3 -right-28 h-96 w-96 bg-amber-500/10 animate-[glow-pulse_9s_ease-in-out_infinite_2s]" />
      <div className="orb -bottom-20 left-1/3 h-96 w-96 bg-red-600/10 animate-[glow-pulse_8s_ease-in-out_infinite_4s]" />

      {/* Radial vignette mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_80%)] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          {/* Live Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span>{siteConfig.status}</span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground-heading leading-[1.08]"
          >
            Designing structures where{" "}
            <span className="gradient-text-animated">geometry meets material permanence</span>.
          </motion.h1>

          {/* Subheadline & Brief Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {siteConfig.subheadline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href="#featured"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Featured Works</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-card hover:text-primary"
            >
              <span>Browse All Projects</span>
            </Link>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-transparent px-4 py-3.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:text-foreground"
            >
              <Layers className="h-4 w-4 text-primary" />
              <span>Visual Gallery</span>
            </Link>
          </motion.div>
        </div>

        {/* Quantified Studio Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 sm:mt-16 grid grid-cols-2 gap-4 border-t border-border/80 pt-8 sm:grid-cols-4 lg:gap-8"
        >
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-black text-foreground-heading tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                {stat.label}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Base Scroll Indicator */}
      <div className="relative z-10 mx-auto flex flex-col items-center pt-6 text-muted-foreground">
        <Link
          href="#featured"
          aria-label="Scroll down to featured projects"
          className="flex flex-col items-center gap-1.5 transition-colors hover:text-primary group"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-primary">
            Scroll to Discover
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce text-primary" />
        </Link>
      </div>
    </section>
  );
}

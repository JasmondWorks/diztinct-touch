"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { architecturalProjects } from "@/data/projects";
import { ArrowRight, Star, ExternalLink, Compass, Camera, Sparkles, Building } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedProjects() {
  const featured = architecturalProjects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));

  const [leadProject, ...secondaryFeatured] = featured;

  return (
    <section id="featured" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-12 border-b border-border/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span>Flagship Commissions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground-heading">
              Featured Case Studies
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Explore selected residential and commercial case studies by DIZTINCT TOUCH HOME DESIGN, led by Mayowa—featuring our active duplex build in ARMITY Estate.
          </p>
        </div>

        {/* Lead Featured Project (Hero Split Presentation) */}
        {leadProject && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Media Left Column */}
              <div className="relative aspect-16/10 lg:aspect-auto lg:col-span-7 overflow-hidden bg-muted/40">
                <Image
                  src={leadProject.coverImage}
                  alt={leadProject.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-lg border border-rose-500/20 bg-rose-500/15 backdrop-blur-md px-3 py-1 text-xs font-bold text-rose-500 uppercase tracking-wider">
                    {leadProject.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/15 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-amber-500 uppercase tracking-wider">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    Featured Case Study
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/85 backdrop-blur-md px-3 py-1 text-xs font-mono text-foreground">
                    <Camera className="h-3.5 w-3.5 text-primary" />
                    <span>{leadProject.gallery.length} High-Res Photographs</span>
                  </span>
                </div>
              </div>

              {/* Information Right Column */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>{leadProject.location}</span>
                    <span>{leadProject.yearCompleted}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading hover:text-primary transition-colors">
                    <Link href={`/projects/${leadProject.slug}`}>
                      {leadProject.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {leadProject.shortDescription}
                  </p>
                </div>

                {/* Key Measurable Results Highlight */}
                <div className="grid grid-cols-2 gap-3 border-y border-border/80 py-4">
                  {leadProject.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label} className="space-y-0.5">
                      <div className="font-mono text-xl font-black text-foreground-heading">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        {metric.label}
                      </div>
                      <div className="text-[10px] text-muted-foreground line-clamp-1">
                        {metric.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Material & Tool Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {leadProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={`/projects/${leadProject.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-primary/90 hover:scale-[1.02]"
                  >
                    <span>View Full Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  {leadProject.liveUrl && (
                    <a
                      href={leadProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all"
                    >
                      <Compass className="h-3.5 w-3.5 text-primary" />
                      <span>3D Model Tour</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Featured Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryFeatured.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
            >
              {/* Media Container */}
              <div className="relative aspect-video overflow-hidden bg-muted/30">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="rounded-md border border-border/80 bg-background/85 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-background/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-foreground">
                    <Camera className="h-2.5 w-2.5 text-primary" />
                    {project.gallery.length} Photos
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{project.location}</span>
                  <span>{project.yearCompleted}</span>
                </div>

                <h3 className="font-bold text-base text-foreground-heading line-clamp-1 group-hover:text-primary transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Primary Metric Preview */}
                {project.metrics[0] && (
                  <div className="rounded-lg border border-border/70 bg-muted/20 p-2.5 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase text-muted-foreground">
                        {project.metrics[0].label}
                      </span>
                      <span className="text-xs font-bold text-primary">
                        {project.metrics[0].value}
                      </span>
                    </div>
                  </div>
                )}

                {/* Link to Detail Page */}
                <div className="pt-2 mt-auto border-t border-border/80 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Tour</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

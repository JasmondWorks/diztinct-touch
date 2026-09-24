"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { architecturalProjects } from "@/data/projects";
import { ArrowRight, Star, ExternalLink, Compass, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface FeaturedProjectsProps {
  initialProjects?: Project[];
}

export function FeaturedProjects({ initialProjects }: FeaturedProjectsProps = {}) {
  const projectsList = initialProjects && initialProjects.length > 0 ? initialProjects : architecturalProjects;
  const featured = projectsList
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));

  const [leadProject, ...secondaryFeatured] = featured;

  return (
    <section id="featured" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-12 border-b border-border/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span>Featured Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground-heading">
              Featured Case Studies
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Explore selected residential and commercial case studies by DIZTINCT TOUCH HOME DESIGNS, led by Mayowa—featuring our active duplex build in ARMITY Estate.
          </p>
        </div>

        {/* Lead Featured Project (Hero Split Presentation) */}
        {leadProject && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <Card className="overflow-hidden rounded-3xl transition-all duration-300 hover:border-primary/40">
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
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-neutral-950/85 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-xs">
                      <span className="h-2 w-2 rounded-full shrink-0 bg-primary" />
                      {leadProject.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-xs border border-amber-300/40">
                      <Star className="h-3.5 w-3.5 fill-neutral-950 text-neutral-950 shrink-0" />
                      Featured Case Study
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-neutral-950/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md shadow-xs">
                      <Camera className="h-3.5 w-3.5 text-primary" />
                      <span>{leadProject.gallery.length} High-Res Photographs</span>
                    </span>
                  </div>
                </div>

                {/* Information Right Column */}
                <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
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

                  {/* Key Measurable Results Highlight (conditionally rendered) */}
                  {leadProject.metrics && leadProject.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 border-y border-border/80 py-4">
                      {leadProject.metrics.slice(0, 2).map((metric) => (
                        <div key={metric.label} className="space-y-0.5">
                          <div className="text-xl font-black text-foreground-heading">
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
                  )}

                  {/* Material & Tool Tags */}
                  {leadProject.techStack && leadProject.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {leadProject.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[11px] uppercase tracking-wider"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button asChild className="gap-2">
                      <Link href={`/projects/${leadProject.slug}`}>
                        <span>View Full Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>

                    {leadProject.liveUrl && (
                      <Button asChild variant="outline" className="gap-1.5">
                        <a
                          href={leadProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Compass className="h-3.5 w-3.5 text-primary" />
                          <span>3D Model Tour</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
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
              className="group flex flex-col h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-1.5">
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
                    <Badge variant="secondary" className="backdrop-blur-md text-[10px] font-bold uppercase tracking-wider bg-background/85">
                      {project.category}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <Badge variant="secondary" className="backdrop-blur-md gap-1 px-2 py-0.5 text-[10px] bg-background/80">
                      <Camera className="h-2.5 w-2.5 text-primary" />
                      {project.gallery.length} Photos
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5 space-y-3 justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Primary Metric Preview (conditionally rendered) */}
                    {project.metrics && project.metrics[0] && (
                      <div className="rounded-lg border border-border/70 bg-muted/20 p-2.5 ">
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
                    <div className="pt-2 border-t border-border/80 flex items-center justify-between">
                      <Button asChild variant="ghost" size="sm" className="h-7 px-0 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary hover:bg-transparent">
                        <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5">
                          <span>View Case Study</span>
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Tour</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

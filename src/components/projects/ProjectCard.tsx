"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, ArchitecturalCategory } from "@/types/project";
import { ExternalLink, ArrowRight, Star, FileText, Compass, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<ArchitecturalCategory, string> = {
  Residential: "bg-red-500/10 text-red-500 border-red-500/20",
  Commercial: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "Civic & Cultural": "bg-rose-500/10 text-rose-500 border-rose-500/20",
  "Adaptive Reuse": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Urban & Masterplan": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Competitions: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group h-full"
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:-translate-y-1.5 shadow-sm hover:shadow-xl cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Full Card Link to Single Project Detail */}
        <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">View full case study of {project.title}</span>
        </Link>

        {/* Media Container (16:9 Aspect Video) */}
        <div className="relative aspect-video overflow-hidden bg-muted/30">
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Static High-Res Cover Image */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              isHovered && project.demoVideo ? "opacity-0" : "opacity-100"
            )}
          >
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted/40 font-mono text-xs text-muted-foreground uppercase">
                Architectural Rendering
              </div>
            )}
          </div>

          {/* Cinematic Looping Video on Card Hover */}
          {project.demoVideo && (
            <video
              ref={videoRef}
              src={project.demoVideo}
              muted
              loop
              playsInline
              preload="none"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {/* Top Left: Category Badge */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
            <span
              className={cn(
                "rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-background/85 shadow-xs",
                CATEGORY_STYLES[project.category]
              )}
            >
              {project.category}
            </span>
          </div>

          {/* Top Right: Featured Badge or Gallery Count */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 pointer-events-none">
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/15 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-amber-500 uppercase tracking-wider shadow-xs">
                <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                Featured
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-background/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono font-medium text-foreground">
              <Camera className="h-2.5 w-2.5 text-primary" />
              {project.gallery.length}
            </span>
          </div>

          {/* Bottom Left: Interactive 3D Model Quick Action */}
          {project.liveUrl && (
            <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-foreground shadow-lg hover:border-primary/40 hover:text-primary transition-all"
              >
                <Compass className="h-3.5 w-3.5 text-primary" />
                <span>3D Tour</span>
              </a>
            </div>
          )}

          {/* Bottom Right: Circular Action Glow */}
          <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-5 gap-3.5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>{project.location ?? "International"}</span>
              <span>{project.yearCompleted ?? "2025"}</span>
            </div>
            <h3 className="font-bold text-base text-foreground-heading tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Material & Tool Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground font-semibold">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-border/80 pt-3 mt-auto">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
              View Case Study <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </span>

            <div className="flex items-center gap-2 relative z-20">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Architectural BIM Drawings"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                >
                  <FileText className="h-3.5 w-3.5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Open Virtual Model"
                  className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary hover:bg-primary hover:text-white transition-all"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Model</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

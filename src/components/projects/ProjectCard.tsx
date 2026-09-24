"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, ArchitecturalCategory } from "@/types/project";
import { ArrowRight, Star, Compass, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CATEGORY_DOTS: Record<ArchitecturalCategory, string> = {
  Residential: "bg-primary",
  Commercial: "bg-amber-400",
  "Civic & Cultural": "bg-accent",
  "Adaptive Reuse": "bg-emerald-400",
  "Urban & Masterplan": "bg-sky-400",
  Competitions: "bg-purple-400",
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
      <Card
        className="relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-1.5 cursor-pointer"
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
              <div className="flex h-full w-full items-center justify-center bg-muted/40 text-xs text-muted-foreground uppercase">
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
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-neutral-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-xs">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full shrink-0",
                  CATEGORY_DOTS[project.category] || "bg-primary"
                )}
              />
              {project.category}
            </span>
          </div>

          {/* Top Right: Featured Badge or Gallery Count */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 pointer-events-none">
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 shadow-xs border border-amber-300/40">
                <Star className="h-2.5 w-2.5 fill-neutral-950 text-neutral-950 shrink-0" />
                Featured
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-neutral-950/85 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md shadow-xs">
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all"
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
        <div className="flex flex-1 flex-col p-5 gap-3.5 justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground ">
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

          {/* Structural Typology Details */}
          <div className="flex items-center justify-between border-t border-border/80 pt-3 text-xs text-muted-foreground">
            <span className="truncate max-w-[200px]">{project.buildingType || project.category}</span>
            <span className="text-primary font-bold">{project.bedroomCount || project.siteArea}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

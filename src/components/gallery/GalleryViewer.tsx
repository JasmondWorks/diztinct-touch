"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, ArrowUpRight, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";

export interface GalleryPlate {
  url: string;
  caption: string;
  category: string;
  projectTitle: string;
  projectSlug: string;
  projectLocation?: string;
}

const CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "exterior", label: "Exterior" },
  { id: "construction", label: "Construction Progress" },
  { id: "interior", label: "Interior Spaces" },
  { id: "detail", label: "Design Details" },
];

export function GalleryViewer({ initialPlates }: { initialPlates: GalleryPlate[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPlates =
    selectedCategory === "all"
      ? initialPlates
      : initialPlates.filter((p) => p.category === selectedCategory);

  const nextPlate = useCallback(() => {
    setLightboxIndex((curr) =>
      curr !== null ? (curr + 1) % filteredPlates.length : null
    );
  }, [filteredPlates.length]);

  const prevPlate = useCallback(() => {
    setLightboxIndex((curr) =>
      curr !== null
        ? (curr - 1 + filteredPlates.length) % filteredPlates.length
        : null
    );
  }, [filteredPlates.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextPlate();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPlate();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextPlate, prevPlate]);

  const currentPlate = lightboxIndex !== null ? filteredPlates[lightboxIndex] : null;

  return (
    <div className="space-y-10">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? initialPlates.length
                : initialPlates.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <Button
                key={cat.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="h-8 text-xs font-semibold gap-1.5"
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] ",
                    isSelected ? "text-primary-foreground/80 font-bold" : "text-muted-foreground"
                  )}
                >
                  ({count})
                </span>
              </Button>
            );
          })}
        </div>

        <div className="text-xs text-muted-foreground">
          Displaying {filteredPlates.length} of {initialPlates.length} photos
        </div>
      </div>

      {/* Picture-Heavy Gallery Grid or Empty State */}
      {filteredPlates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlates.map((plate, index) => (
          <div
            key={plate.url + index}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 hover:border-primary/50 transition-all duration-300"
          >
            <div
              onClick={() => setLightboxIndex(index)}
              className="relative aspect-4/3 overflow-hidden bg-muted cursor-pointer"
            >
              <Image
                src={plate.url}
                alt={plate.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md uppercase text-[9px] ">
                  {plate.category}
                </Badge>
              </div>

              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Caption & Project Link */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <p className="text-xs text-foreground font-medium line-clamp-2 leading-relaxed">
                {plate.caption}
              </p>

              <div className="pt-2 border-t border-border/80 flex items-center justify-between text-xs">
                <Link
                  href={`/projects/${plate.projectSlug}`}
                  className="text-[11px] font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>{plate.projectTitle}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>

                <span className="text-[10px] text-muted-foreground">
                  {plate.projectLocation}
                </span>
              </div>
            </div>
          </div>
        ))}
        </div>
      ) : (
        <EmptyState
          icon={Camera}
          title="No Visual Assets Found"
          description={`There are currently no photographs tagged under "${
            CATEGORIES.find((c) => c.id === selectedCategory)?.label ?? selectedCategory
          }". Our visual archive is regularly updated as project construction progresses.`}
          actionLabel="View All Photos"
          onAction={() => setSelectedCategory("all")}
        />
      )}

      {/* Lightbox Reusable Modal */}
      <Modal
        isOpen={lightboxIndex !== null}
        setIsOpen={(open) => !open && setLightboxIndex(null)}
        size="2xl"
        title={
          currentPlate && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full pr-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  {currentPlate.projectTitle}
                </span>
                <div className="text-xs text-muted-foreground font-normal flex items-center gap-2 mt-0.5">
                  <span>{currentPlate.category} view</span>
                  <span className="text-border">•</span>
                  <span>Photo {lightboxIndex! + 1} of {filteredPlates.length}</span>
                  <span className="hidden sm:inline text-border">•</span>
                  <span className="hidden sm:inline text-[11px] text-muted-foreground/80">Use ← → arrow keys to navigate</span>
                </div>
              </div>
              <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs text-primary border-primary/30 shrink-0">
                <Link href={`/projects/${currentPlate.projectSlug}`}>
                  <span>View Case Study</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )
        }
        footer={
          currentPlate && (
            <p className="text-center text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto font-medium">
              {currentPlate.caption}
            </p>
          )
        }
      >
        {currentPlate && (
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-muted/30 flex items-center justify-center">
            {/* Prev Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevPlate}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-md hover:bg-background transition-all"
              aria-label="Previous image (Left arrow)"
              title="Previous image (←)"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Active Image */}
            <div className="relative h-full w-full">
              <Image
                src={currentPlate.url}
                alt={currentPlate.caption}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={nextPlate}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-md hover:bg-background transition-all"
              aria-label="Next image (Right arrow)"
              title="Next image (→)"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

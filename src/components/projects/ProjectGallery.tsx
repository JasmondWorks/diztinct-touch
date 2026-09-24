"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ProjectGalleryImage } from "@/types/project";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

interface ProjectGalleryProps {
  images: ProjectGalleryImage[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const categories = [
    { id: "all", label: "All Angles" },
    { id: "exterior", label: "Exteriors" },
    { id: "construction", label: "Construction Progress" },
    { id: "interior", label: "Interiors" },
    { id: "detail", label: "Details" },
  ];

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    setLightboxIndex((curr) =>
      curr !== null ? (curr + 1) % filteredImages.length : null
    );
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((curr) =>
      curr !== null
        ? (curr - 1 + filteredImages.length) % filteredImages.length
        : null
    );
  }, [filteredImages.length]);

  // Keyboard navigation for Lightbox: ArrowLeft, ArrowRight, and Escape
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  const currentImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground-heading">
            Project Gallery &amp; Architectural Photography
          </h3>
          <Badge variant="secondary" className="font-mono text-xs">
            {images.length} Photos
          </Badge>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? images.length
                : images.filter((img) => img.category === cat.id).length;

            if (count === 0) return null;
            const isSelected = activeCategory === cat.id;

            return (
              <Button
                key={cat.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className="h-8 gap-1 text-xs font-semibold"
              >
                <span>{cat.label}</span>
                <span className="opacity-70 font-mono text-[10px]">({count})</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Picture-Heavy Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.url + index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-16/10 cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50"
          >
            <Image
              src={image.url}
              alt={image.caption || `${title} perspective ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Hover Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between gap-2">
              <span className="text-xs font-medium line-clamp-1">
                {image.caption}
              </span>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <ZoomIn className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Category Tag Top Left */}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase text-white">
                {image.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <Modal
        isOpen={lightboxIndex !== null}
        setIsOpen={(open) => !open && closeLightbox()}
        size="2xl"
        title={
          currentImage && (
            <div className="space-y-0.5">
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                {title} • {currentImage.category} View
              </div>
              <div className="font-mono text-xs text-muted-foreground font-normal flex flex-wrap items-center gap-2">
                <span>
                  Photo {lightboxIndex! + 1} of {filteredImages.length}
                </span>
                <span className="hidden sm:inline text-border">•</span>
                <span className="hidden sm:inline text-[11px] text-muted-foreground/80">
                  Use ← → arrow keys to navigate
                </span>
              </div>
            </div>
          )
        }
        footer={
          currentImage && (
            <div className="w-full space-y-3">
              <p className="text-center text-xs sm:text-sm text-foreground max-w-3xl mx-auto font-medium">
                {currentImage.caption}
              </p>

              {/* Thumbnails */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 max-w-2xl mx-auto">
                {filteredImages.map((img, idx) => (
                  <Button
                    key={img.url + idx}
                    type="button"
                    variant="ghost"
                    onClick={() => setLightboxIndex(idx)}
                    className={cn(
                      "relative h-12 w-16 p-0 shrink-0 overflow-hidden rounded-md border transition-all cursor-pointer",
                      lightboxIndex === idx
                        ? "border-primary ring-2 ring-primary/40 scale-105"
                        : "border-border opacity-50 hover:opacity-90"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={img.caption}
                      fill
                      className="object-cover"
                    />
                  </Button>
                ))}
              </div>
            </div>
          )
        }
      >
        {currentImage && (
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-muted/30 flex items-center justify-center">
            {/* Prev Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-md hover:bg-background transition-all"
              aria-label="Previous image (Left arrow)"
              title="Previous image (←)"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Active Image */}
            <div className="relative h-full w-full">
              <Image
                src={currentImage.url}
                alt={currentImage.caption}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={nextImage}
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

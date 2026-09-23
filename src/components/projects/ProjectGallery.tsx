"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ProjectGalleryImage } from "@/types/project";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Layers,
  ZoomIn,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  title: string;
  images: ProjectGalleryImage[];
}

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "exterior", label: "Exterior" },
    { id: "interior", label: "Interior" },
    { id: "detail", label: "Construction Details" },
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
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredImages.length);
    }
  }, [lightboxIndex, filteredImages.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (prev) => ((prev ?? 0) - 1 + filteredImages.length) % filteredImages.length
      );
    }
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <div className="space-y-6">
      {/* Gallery Header & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          <h3 className="font-bold text-lg text-foreground-heading">
            Project Gallery &amp; Architectural Photography
          </h3>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-mono font-bold text-primary">
            {images.length} Photos
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? images.length
                : images.filter((img) => img.category === cat.id).length;

            if (count === 0) return null;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-xs"
                    : "border border-border bg-card/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                <span>{cat.label}</span>{" "}
                <span className="opacity-70 font-mono text-[10px]">({count})</span>
              </button>
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
            className="group relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted/30 cursor-pointer shadow-xs hover:border-primary/50 transition-all duration-300"
          >
            <Image
              src={image.url}
              alt={image.caption}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category tag */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="rounded-md border border-white/20 bg-black/60 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                {image.category}
              </span>
            </div>

            {/* Hover Caption & Zoom Icon */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-end justify-between gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <p className="text-xs text-white leading-tight line-clamp-2 drop-shadow-sm font-medium">
                {image.caption}
              </p>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-md">
                <ZoomIn className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
            <div className="space-y-0.5">
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                {title} • {filteredImages[lightboxIndex].category} View
              </div>
              <div className="font-mono text-xs text-white/70">
                Photo {lightboxIndex + 1} of {filteredImages.length}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={closeLightbox}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Photo Viewer */}
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8">
            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-primary transition-colors border border-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Active Image */}
            <div className="relative h-full w-full max-w-6xl max-h-[75vh]">
              <Image
                src={filteredImages[lightboxIndex].url}
                alt={filteredImages[lightboxIndex].caption}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-primary transition-colors border border-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom Caption & Thumbnail Strip */}
          <div className="border-t border-white/10 bg-black/80 px-6 py-4 space-y-3">
            <p className="text-center text-sm sm:text-base text-white/90 max-w-3xl mx-auto font-medium">
              {filteredImages[lightboxIndex].caption}
            </p>

            {/* Thumbnails */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 max-w-2xl mx-auto">
              {filteredImages.map((img, idx) => (
                <button
                  key={img.url + idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={cn(
                    "relative h-12 w-16 shrink-0 overflow-hidden rounded-md border transition-all",
                    lightboxIndex === idx
                      ? "border-primary ring-2 ring-primary/40 scale-105"
                      : "border-white/20 opacity-50 hover:opacity-90"
                  )}
                >
                  <Image
                    src={img.url}
                    alt={img.caption}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

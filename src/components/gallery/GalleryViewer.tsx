"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

export interface GalleryPlate {
  url: string;
  caption: string;
  category: string;
  projectTitle: string;
  projectSlug: string;
  projectLocation?: string;
}

export function GalleryViewer({ initialPlates }: { initialPlates: GalleryPlate[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxData, setLightboxData] = useState<GalleryPlate | null>(null);

  const filteredPlates =
    selectedCategory === "all"
      ? initialPlates
      : initialPlates.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Photos" },
            { id: "exterior", label: "Exterior" },
            { id: "interior", label: "Interior Spaces" },
            { id: "detail", label: "Construction Details" },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <Button
                key={cat.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="h-8 font-mono text-xs font-semibold"
              >
                {cat.label}
              </Button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-muted-foreground">
          Displaying {filteredPlates.length} photos
        </div>
      </div>

      {/* Picture-Heavy Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlates.map((plate, index) => (
          <div
            key={plate.url + index}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 shadow-xs hover:border-primary/50 transition-all duration-300"
          >
            <div
              onClick={() => setLightboxData(plate)}
              className="relative aspect-4/3 overflow-hidden bg-muted cursor-pointer"
            >
              <Image
                src={plate.url}
                alt={plate.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md uppercase text-[9px] font-mono">
                  {plate.category}
                </Badge>
              </div>

              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
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
                  className="font-mono text-[11px] font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>{plate.projectTitle}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>

                <span className="text-[10px] font-mono text-muted-foreground">
                  {plate.projectLocation}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Reusable Modal */}
      <Modal
        isOpen={!!lightboxData}
        setIsOpen={(open) => !open && setLightboxData(null)}
        size="2xl"
        title={
          lightboxData && (
            <div className="flex items-center justify-between w-full pr-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                  {lightboxData.projectTitle}
                </span>
                <p className="text-xs text-muted-foreground font-normal">{lightboxData.category} view</p>
              </div>
              <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs text-primary border-primary/30">
                <Link href={`/projects/${lightboxData.projectSlug}`}>
                  <span>View Case Study</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )
        }
        footer={
          lightboxData && (
            <p className="text-center text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto font-medium">
              {lightboxData.caption}
            </p>
          )
        }
      >
        {lightboxData && (
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-muted/30">
            <Image
              src={lightboxData.url}
              alt={lightboxData.caption}
              fill
              priority
              className="object-contain"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

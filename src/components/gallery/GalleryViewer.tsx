"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-mono font-semibold transition-all cursor-pointer",
                selectedCategory === cat.id
                  ? "bg-[#C9A84C] text-[#0A0A0A] shadow-xs"
                  : "border border-white/10 bg-white/[0.02] text-[#8A8A8A] hover:border-[#C9A84C]/40 hover:text-[#F9F6F0]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-[#8A8A8A]">
          Displaying {filteredPlates.length} photos
        </div>
      </div>

      {/* Picture-Heavy Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlates.map((plate, index) => (
          <div
            key={plate.url + index}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-xs hover:border-[#C9A84C]/50 transition-all duration-300"
          >
            <div
              onClick={() => setLightboxData(plate)}
              className="relative aspect-4/3 overflow-hidden bg-white/5 cursor-pointer"
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
                <span className="rounded-md border border-white/20 bg-black/60 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                  {plate.category}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A84C] text-[#0A0A0A] shadow-md">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Caption & Project Link */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <p className="text-xs text-[#F9F6F0] font-medium line-clamp-2 leading-relaxed">
                {plate.caption}
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <Link
                  href={`/projects/${plate.projectSlug}`}
                  className="font-mono text-[11px] font-bold text-[#C9A84C] hover:underline inline-flex items-center gap-1"
                >
                  <span>{plate.projectTitle}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>

                <span className="text-[10px] font-mono text-[#8A8A8A]">
                  {plate.projectLocation}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-in fade-in"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#C9A84C] font-bold">
                {lightboxData.projectTitle}
              </span>
              <p className="text-xs text-white/70">{lightboxData.category} view</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/projects/${lightboxData.projectSlug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#C9A84C]/40 bg-[#C9A84C]/20 px-3 py-1.5 text-xs font-semibold text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-colors"
              >
                <span>View Project Case Study</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={() => setLightboxData(null)}
                className="rounded-lg border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8">
            <div className="relative h-full w-full max-w-6xl max-h-[75vh]">
              <Image
                src={lightboxData.url}
                alt={lightboxData.caption}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/80 px-6 py-4 text-center">
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto font-medium">
              {lightboxData.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

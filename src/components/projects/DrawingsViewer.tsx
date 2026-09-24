"use client";

import { useState } from "react";
import Image from "next/image";
import { ArchitecturalDrawing } from "@/types/project";
import { Compass, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

interface DrawingsViewerProps {
  drawings?: ArchitecturalDrawing[];
  axonometricUrl?: string;
  axonometricDescription?: string;
}

export function DrawingsViewer({
  drawings,
  axonometricUrl,
  axonometricDescription,
}: DrawingsViewerProps) {
  const [activeDrawing, setActiveDrawing] = useState<string | null>(null);

  if (!drawings?.length && !axonometricUrl) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-primary" />
          <h3 className="text-base font-bold uppercase tracking-wider text-foreground-heading">
            Architectural Drawings &amp; Blueprints
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          BIM / Computational Geometry
        </span>
      </div>

      {/* Primary Axonometric Blueprint Diagram if present */}
      {axonometricUrl && (
        <div className="overflow-hidden rounded-2xl border border-border bg-card/60 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Primary Axonometric Section
            </span>
            <Badge variant="outline" className="text-[10px] font-mono">
              SVG Vector Drawing
            </Badge>
          </div>

          <div
            onClick={() => setActiveDrawing(axonometricUrl)}
            className="group relative aspect-16/10 w-full overflow-hidden rounded-xl border border-border bg-background p-2 sm:p-4 cursor-pointer hover:border-primary/40 transition-colors"
          >
            {/* Embedded SVG image */}
            <div className="relative h-full w-full flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={axonometricUrl}
                alt="Axonometric Blueprint Diagram"
                className="max-h-full max-w-full object-contain filter invert-0 dark:invert-0"
              />
            </div>

            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow-md">
                <Maximize2 className="h-3 w-3" />
                <span>Expand Blueprint</span>
              </span>
            </div>
          </div>

          {axonometricDescription && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-3 font-mono">
              {axonometricDescription}
            </p>
          )}
        </div>
      )}

      {/* Additional Drawings (Plans, Sections, Details) */}
      {drawings && drawings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {drawings.map((drawing) => (
            <div
              key={drawing.title}
              onClick={() => setActiveDrawing(drawing.url)}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card p-3 space-y-2 cursor-pointer hover:border-primary/40 transition-all"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-muted/30">
                <Image
                  src={drawing.url}
                  alt={drawing.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md uppercase text-[9px] font-mono">
                    {drawing.type} • {drawing.scale ?? "NTS"}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-foreground-heading line-clamp-1 group-hover:text-primary transition-colors">
                  {drawing.title}
                </h4>
                {drawing.caption && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                    {drawing.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Zoom Reusable Modal for Drawings */}
      <Modal
        isOpen={!!activeDrawing}
        setIsOpen={(open) => !open && setActiveDrawing(null)}
        size="2xl"
        title={
          <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
            Architectural Technical Drawing Inspection
          </span>
        }
      >
        {activeDrawing && (
          <div className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-background/50 rounded-xl p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeDrawing}
              alt="Expanded Architectural Drawing"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

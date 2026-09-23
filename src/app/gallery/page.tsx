import React from "react";
import type { Metadata } from "next";
import { getProjectsAction } from "@/actions/projects";
import { GalleryViewer, GalleryPlate } from "@/components/gallery/GalleryViewer";
import { Badge } from "@/components/ui";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Architectural Gallery & Photography | DIZTINCT TOUCH HOME DESIGN",
  description:
    "Explore photorealistic 3D visualization, exterior perspectives, luxury interior layouts, and on-site construction progress across projects by DIZTINCT TOUCH HOME DESIGN.",
  keywords: [
    "architectural photography Nigeria",
    "3D rendering gallery",
    "contemporary duplex photos",
    "interior architecture Nigeria",
    "construction progress photography",
  ],
  openGraph: {
    title: "Visual Archive | DIZTINCT TOUCH HOME DESIGN",
    description:
      "Curated visual plates capturing contemporary forms, construction stages, and interior detailing.",
    url: "https://diztincttouch.com/gallery",
  },
};

export default async function GalleryPage() {
  const projects = await getProjectsAction(false);

  // Aggregate all gallery plates from published projects
  const plates: GalleryPlate[] = projects.flatMap((project) =>
    project.gallery.map((img) => ({
      url: img.url,
      caption: img.caption,
      category: img.category,
      projectTitle: project.title,
      projectSlug: project.slug,
      projectLocation: project.location,
    }))
  );

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-border/80 pb-8">
          <Badge variant="outline" className="gap-2 text-xs py-1 px-3">
            <Camera className="h-3.5 w-3.5 text-primary" />
            <span>Visual Project Gallery</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground-heading">
            Architectural Photography &amp; Project Views
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            A curated visual archive capturing spaces, construction details, and finished environments across our completed projects and future developments.
          </p>
        </div>

        {/* Client Gallery Viewer */}
        <GalleryViewer initialPlates={plates} />
      </div>
    </div>
  );
}

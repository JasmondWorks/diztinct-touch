"use client";

import { useState, useMemo } from "react";
import { Project, ArchitecturalCategory } from "@/types/project";
import { architecturalProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Search, X, SlidersHorizontal, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CATEGORIES: ("All" | ArchitecturalCategory)[] = [
  "All",
  "Civic & Cultural",
  "Residential",
  "Commercial",
  "Adaptive Reuse",
  "Urban & Masterplan",
  "Competitions",
];

const COMMON_TAGS = [
  "2D Architectural Drawings",
  "3D Visualization",
  "Concrete Decking",
  "Textured Brick",
  "Cantilever Balcony",
  "Revit (BIM)",
  "AutoCAD",
  "Construction Oversight",
];

interface ProjectsGridProps {
  initialProjects?: Project[];
}

export function ProjectsGrid({ initialProjects }: ProjectsGridProps = {}) {
  const projectsList = initialProjects && initialProjects.length > 0 ? initialProjects : architecturalProjects;
  const [selectedCategory, setSelectedCategory] = useState<"All" | ArchitecturalCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !project.techStack.includes(selectedTag)) {
        return false;
      }

      // Search Query filter (matches title, location, category, techStack, etc.)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesCategory = project.category.toLowerCase().includes(query);
        const matchesLocation = project.location?.toLowerCase().includes(query) ?? false;
        const matchesDescription = project.shortDescription.toLowerCase().includes(query);
        const matchesTech = project.techStack.some((t) => t.toLowerCase().includes(query));

        return matchesTitle || matchesCategory || matchesLocation || matchesDescription || matchesTech;
      }

      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 border-b border-border/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              <Building2 className="h-3.5 w-3.5" />
              <span>Project Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground-heading">
              Selected Works
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            A portfolio of contemporary residential duplexes, bespoke residences, and commercial projects designed with precision and lasting structural integrity.
          </p>
        </div>

        {/* Filter Toolbar: Search Bar + Typology Tabs */}
        <div className="space-y-4 pt-4 pb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by typology, material, location, or software..."
                className="pl-10 pr-9 text-xs"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>

            {/* Tag Reset if active */}
            {(selectedTag || selectedCategory !== "All" || searchQuery) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag(null);
                  setSearchQuery("");
                }}
                className="gap-1.5 text-xs text-destructive border-destructive/20 bg-destructive/10 hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </Button>
            )}
          </div>

          {/* Typology Segmented Control Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? architecturalProjects.length
                  : architecturalProjects.filter((p) => p.category === cat).length;

              const isSelected = selectedCategory === cat;

              return (
                <Button
                  key={cat}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="gap-1.5 h-8 text-xs font-semibold whitespace-nowrap"
                >
                  <span>{cat}</span>
                  <Badge
                    variant={isSelected ? "secondary" : "outline"}
                    className="px-1.5 py-0 text-[10px] font-mono h-4 min-w-4 justify-center"
                  >
                    {count}
                  </Badge>
                </Button>
              );
            })}
          </div>

          {/* Materials & Systems Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" />
              Materials &amp; Systems:
            </span>
            {COMMON_TAGS.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <Button
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className="h-6 px-2.5 text-[11px] font-medium rounded-full"
                >
                  {tag}
                </Button>
              );
            })}
          </div>

          {/* Results Count Banner */}
          <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground font-mono">
            <span>
              Showing {filteredProjects.length} of {architecturalProjects.length} works
            </span>
            {selectedCategory !== "All" && (
              <span className="text-primary font-semibold">
                Category: {selectedCategory}
              </span>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-base font-semibold text-foreground-heading">
              No architectural projects match the selected parameters.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try selecting a different typology category or resetting your search query.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTag(null);
                setSearchQuery("");
              }}
              className="mt-4"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

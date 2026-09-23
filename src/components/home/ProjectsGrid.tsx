"use client";

import { useState, useMemo } from "react";
import { Project, ArchitecturalCategory } from "@/types/project";
import { architecturalProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Search, X, Filter, SlidersHorizontal, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ArchitecturalCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return architecturalProjects.filter((project) => {
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !project.techStack.includes(selectedTag)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesLocation = project.location?.toLowerCase().includes(query) ?? false;
        const matchesShort = project.shortDescription.toLowerCase().includes(query);
        const matchesTech = project.techStack.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesLocation || matchesShort || matchesTech;
      }

      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28 bg-muted/20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8">
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by typology, material, location, or software..."
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-9 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Tag Reset if active */}
            {(selectedTag || selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag(null);
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/10 px-3.5 py-2.5 text-xs font-semibold text-destructive hover:bg-destructive/20 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Typology Segmented Control Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? architecturalProjects.length
                  : architecturalProjects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap",
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                      selectedCategory === cat
                        ? "bg-white/20 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Materials & Systems Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" />
              Materials &amp; Systems:
            </span>
            {COMMON_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer",
                  selectedTag === tag
                    ? "border border-accent bg-accent text-white"
                    : "border border-border/80 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
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
              No architectural commissions match the selected parameters.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try selecting a different typology category or resetting your search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTag(null);
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

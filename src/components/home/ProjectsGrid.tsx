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
import { EmptyState } from "@/components/ui/empty-state";

const CATEGORIES: ("All" | ArchitecturalCategory)[] = [
  "All",
  "Residential",
  "Commercial",
  "Civic & Cultural",
  "Adaptive Reuse",
  "Urban & Masterplan",
  "Competitions",
];

interface ProjectsGridProps {
  initialProjects?: Project[];
}

export function ProjectsGrid({ initialProjects }: ProjectsGridProps = {}) {
  const projectsList = initialProjects && initialProjects.length > 0 ? initialProjects : architecturalProjects;
  const [selectedCategory, setSelectedCategory] = useState<"All" | ArchitecturalCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Dynamically derive available service tags from active projects
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    projectsList.forEach((p) => {
      if (Array.isArray(p.techStack)) {
        p.techStack.forEach((t) => {
          if (t && t.trim()) set.add(t.trim());
        });
      }
    });

    if (set.size === 0) {
      return [
        "Architectural Design",
        "2D Working Drawings",
        "3D Visualization",
        "Construction Oversight",
      ];
    }
    return Array.from(set);
  }, [projectsList]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // Tag filter with flexible, normalized matching
      if (selectedTag) {
        const normSelected = selectedTag.toLowerCase().trim();
        const hasTag = project.techStack?.some((t) => {
          const normT = t.toLowerCase().trim();
          return (
            normT === normSelected ||
            normT.includes(normSelected) ||
            normSelected.includes(normT) ||
            (normSelected.includes("2d") && normT.includes("2d")) ||
            (normSelected.includes("3d") && normT.includes("3d")) ||
            (normSelected.includes("oversight") && normT.includes("oversight")) ||
            (normSelected.includes("design") && normT.includes("design"))
          );
        });

        if (!hasTag) {
          return false;
        }
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
  }, [selectedCategory, selectedTag, searchQuery, projectsList]);

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 border-b border-border/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
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
                    className="px-1.5 py-0 text-[10px] h-4 min-w-4 justify-center"
                  >
                    {count}
                  </Badge>
                </Button>
              );
            })}
          </div>

          {/* Scope & Architectural Services Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" />
              Scope &amp; Services:
            </span>
            {availableTags.map((tag) => {
              const isSelected = selectedTag === tag;
              const tagCount = projectsList.filter((p) => {
                const normSelected = tag.toLowerCase().trim();
                return p.techStack?.some((t) => {
                  const normT = t.toLowerCase().trim();
                  return (
                    normT === normSelected ||
                    normT.includes(normSelected) ||
                    normSelected.includes(normT) ||
                    (normSelected.includes("2d") && normT.includes("2d")) ||
                    (normSelected.includes("3d") && normT.includes("3d")) ||
                    (normSelected.includes("oversight") && normT.includes("oversight")) ||
                    (normSelected.includes("design") && normT.includes("design"))
                  );
                });
              }).length;

              return (
                <Button
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className="h-6 px-2.5 text-[11px] font-medium rounded-full gap-1.5"
                >
                  <span>{tag}</span>
                  <span
                    className={cn(
                      "text-[9px] ",
                      isSelected ? "text-primary-foreground/80 font-bold" : "text-muted-foreground"
                    )}
                  >
                    ({tagCount})
                  </span>
                </Button>
              );
            })}
          </div>

          {/* Results Count Banner */}
          <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground ">
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
          <EmptyState
            icon={Building2}
            title="No Architectural Projects Found"
            description={
              searchQuery
                ? `No projects matched your search for "${searchQuery}". Try a different location, design style, or clearing active filters.`
                : `No projects found for the selected ${
                    selectedTag ? `service "${selectedTag}"` : ""
                  }${selectedTag && selectedCategory !== "All" ? " and " : ""}${
                    selectedCategory !== "All" ? `category "${selectedCategory}"` : ""
                  }.`
            }
            actionLabel="Clear All Filters"
            onAction={() => {
              setSelectedCategory("All");
              setSelectedTag(null);
              setSearchQuery("");
            }}
          />
        )}
      </div>
    </section>
  );
}

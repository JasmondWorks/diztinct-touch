"use client";

import { useState, useMemo } from "react";
import { Project } from "./projects.types";

export function useProjectFilters(initialProjects: Project[]) {
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.location ? p.location.toLowerCase().includes(search.toLowerCase()) : false) ||
        (p.projectCode && p.projectCode.toLowerCase().includes(search.toLowerCase())) ||
        (p.buildingType && p.buildingType.toLowerCase().includes(search.toLowerCase()));

      const projectStatus =
        p.status || (p.yearCompleted === "Under Construction" ? "in-progress" : "completed");
      const matchesCategory =
        categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase();
      const matchesStatus = statusFilter === "all" || projectStatus === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [initialProjects, search, categoryFilter, statusFilter]);

  return {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    filteredProjects,
  };
}

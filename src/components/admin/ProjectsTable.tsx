"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { togglePublishAction, deleteProjectAction } from "@/actions/projects";
import { useRouter } from "next/navigation";
import { Search, Plus, ExternalLink, Edit3, Trash2, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

export function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.location ? p.location.toLowerCase().includes(search.toLowerCase()) : false) ||
      (p.projectCode && p.projectCode.toLowerCase().includes(search.toLowerCase())) ||
      (p.buildingType && p.buildingType.toLowerCase().includes(search.toLowerCase()));

    const projectStatus =
      p.status || (p.yearCompleted === "Under Construction" ? "in-progress" : "completed");
    const matchesType = filterType === "all" || p.category.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || projectStatus === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleTogglePublish = (id: string, current: boolean) => {
    startTransition(async () => {
      // Optimistic update
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isPublished: !current } : p))
      );
      const res = await togglePublishAction(id, !current);
      if (!res.success) {
        // Rollback
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isPublished: current } : p))
        );
        alert(res.error || "Failed to update project status.");
      } else {
        router.refresh();
      }
    });
  };

  const confirmDelete = async (id: string) => {
    setDeletingId(id);
    startTransition(async () => {
      const res = await deleteProjectAction(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setDeleteTarget(null);
        router.refresh();
      } else {
        alert(res.error || "Failed to delete project.");
      }
      setDeletingId(null);
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search by code (DT-25-01), title, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 font-mono text-xs"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
        </div>

        {/* Filters & Add button */}
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-auto h-10 font-mono text-xs"
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed-use">Mixed-Use</option>
            <option value="interior">Interior</option>
          </Select>

          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-auto h-10 font-mono text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Construction</option>
          </Select>

          <Button asChild className="gap-1.5 font-mono text-xs h-10">
            <Link href="/admin/projects/new">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Project</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground">
                <th className="py-3.5 px-4 font-normal">Project</th>
                <th className="py-3.5 px-4 font-normal">Code & Typology</th>
                <th className="py-3.5 px-4 font-normal">Location & Year</th>
                <th className="py-3.5 px-4 font-normal">Construction Stage</th>
                <th className="py-3.5 px-4 font-normal">Visibility</th>
                <th className="py-3.5 px-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No projects found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((proj) => {
                  const isCompleted =
                    proj.status === "completed" ||
                    (proj.yearCompleted && proj.yearCompleted !== "Under Construction");

                  return (
                    <tr key={proj.id} className="hover:bg-muted/20 transition-colors">
                      {/* Project Thumbnail & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-10 rounded-xl bg-muted relative overflow-hidden shrink-0 border border-border/60">
                            {proj.coverImage && (
                              <Image
                                src={proj.coverImage}
                                alt={proj.title}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <div className="font-sans font-semibold text-foreground-heading line-clamp-1">
                              {proj.title}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              /{proj.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Code & Typology */}
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className="font-mono text-[10px] text-primary border-primary/20 bg-primary/5 font-semibold"
                        >
                          {proj.projectCode || "DT-25-01"}
                        </Badge>
                        <div className="text-[11px] text-muted-foreground mt-1">
                          {proj.buildingType || proj.category}
                        </div>
                      </td>

                      {/* Location & Year */}
                      <td className="py-3 px-4">
                        <div className="text-foreground">{proj.location || "Nigeria"}</div>
                        <div className="text-[10px] text-muted-foreground">{proj.yearCompleted || "2025"}</div>
                      </td>

                      {/* Construction Stage */}
                      <td className="py-3 px-4">
                        <Badge
                          variant={isCompleted ? "success" : "warning"}
                          className="text-[10px] uppercase font-mono font-medium"
                        >
                          {isCompleted ? "Completed" : "In Construction"}
                        </Badge>
                        {proj.currentStage && (
                          <div className="text-[10px] text-muted-foreground mt-1">
                            Stage: {proj.currentStage}
                          </div>
                        )}
                      </td>

                      {/* Visibility (Live vs Draft Toggle) */}
                      <td className="py-3 px-4">
                        <Button
                          type="button"
                          variant={proj.isPublished ? "emerald" : "outline"}
                          size="sm"
                          onClick={() => handleTogglePublish(proj.id, proj.isPublished ?? true)}
                          disabled={isPending}
                          className="h-6 rounded-full text-[10px] uppercase font-mono font-medium px-2.5"
                          title="Click to toggle publish status"
                        >
                          {proj.isPublished ? "● Live" : "○ Draft"}
                        </Button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-7 px-2 text-xs font-mono text-muted-foreground hover:text-foreground"
                          >
                            <Link href={`/projects/${proj.slug}`} target="_blank">
                              View
                            </Link>
                          </Button>
                          <span className="text-border">•</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-7 px-2 text-xs font-mono text-primary hover:text-primary hover:bg-primary/10 font-semibold"
                          >
                            <Link href={`/admin/projects/${proj.id}/edit`}>
                              Edit
                            </Link>
                          </Button>
                          <span className="text-border">•</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteTarget(proj)}
                            disabled={deletingId === proj.id}
                            className="h-7 px-2 text-xs font-mono text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            {deletingId === proj.id ? "..." : "Delete"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        setIsOpen={(open) => !open && setDeleteTarget(null)}
        title={
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Confirm Project Deletion</span>
          </div>
        }
        description="This action is permanent and cannot be undone. All project drawings, media references, and design specifications will be permanently removed."
        size="default"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTarget && confirmDelete(deleteTarget.id)}
              disabled={isPending}
            >
              {deletingId ? "Deleting..." : "Permanently Delete"}
            </Button>
          </div>
        }
      >
        {deleteTarget && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs font-mono space-y-2 mt-2">
            <div className="font-semibold text-foreground">
              Project: <span className="text-destructive font-bold">{deleteTarget.title}</span>
            </div>
            <div className="text-muted-foreground">
              Code: {deleteTarget.projectCode || "DT-PROJ"} • Typology: {deleteTarget.buildingType || deleteTarget.category}
            </div>
            <div className="text-muted-foreground">
              Location: {deleteTarget.location || "Nigeria"}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

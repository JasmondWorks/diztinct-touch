"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { togglePublishAction, deleteProjectAction } from "@/actions/projects";
import { useRouter } from "next/navigation";
import { Search, Plus, ExternalLink, Edit3, Trash2, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { EmptyState } from "@/components/ui/empty-state";
import { Building2 } from "lucide-react";

import { DataTable, ColumnDef } from "@/components/ui/data-table";

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

  const columns: ColumnDef<Project>[] = [
    {
      id: "project",
      header: "Project",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-10 rounded-xl bg-muted relative overflow-hidden shrink-0 border border-border/60">
            {row.coverImage && (
              <Image
                src={row.coverImage}
                alt={row.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            )}
          </div>
          <div>
            <div className="font-sans font-semibold text-foreground-heading line-clamp-1">
              {row.title}
            </div>
            <div className="text-[10px] text-muted-foreground">
              /{row.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "code-typology",
      header: "Code & Typology",
      cell: ({ row }) => (
        <div>
          <Badge
            variant="outline"
            className="text-[10px] text-primary border-primary/20 bg-primary/5 font-semibold"
          >
            {row.projectCode || "DT-25-01"}
          </Badge>
          <div className="text-[11px] text-muted-foreground mt-1">
            {row.buildingType || row.category}
          </div>
        </div>
      ),
    },
    {
      id: "location-year",
      header: "Location & Year",
      cell: ({ row }) => (
        <div>
          <div className="text-foreground">{row.location || "Nigeria"}</div>
          <div className="text-[10px] text-muted-foreground">{row.yearCompleted || "2025"}</div>
        </div>
      ),
    },
    {
      id: "construction-stage",
      header: "Construction Stage",
      cell: ({ row }) => {
        const isCompleted =
          row.status === "completed" ||
          (row.yearCompleted && row.yearCompleted !== "Under Construction");
        return (
          <div>
            <Badge
              variant={isCompleted ? "success" : "warning"}
              className="text-[10px] uppercase font-semibold"
            >
              {isCompleted ? "Completed" : "In Construction"}
            </Badge>
            {row.currentStage && (
              <div className="text-[10px] text-muted-foreground mt-1">
                Stage: {row.currentStage}
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "visibility",
      header: "Visibility",
      cell: ({ row }) => (
        <Button
          type="button"
          variant={row.isPublished ? "emerald" : "outline"}
          size="sm"
          onClick={() => handleTogglePublish(row.id, row.isPublished ?? true)}
          disabled={isPending}
          className="h-6 rounded-full text-[10px] uppercase font-semibold px-2.5"
          title="Click to toggle publish status"
        >
          {row.isPublished ? "● Live" : "○ Draft"}
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      align: "right",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Link href={`/projects/${row.slug}`} target="_blank">
              View
            </Link>
          </Button>
          <span className="text-border">•</span>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10 font-semibold"
          >
            <Link href={`/admin/projects/${row.id}/edit`}>
              Edit
            </Link>
          </Button>
          <span className="text-border">•</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setDeleteTarget(row)}
            disabled={deletingId === row.id}
            className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            {deletingId === row.id ? "..." : "Delete"}
          </Button>
        </div>
      ),
    },
  ];

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
            className="pl-10 h-10 text-xs"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
        </div>

        {/* Filters & Add button */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px] h-10 text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="mixed-use">Mixed-Use</SelectItem>
              <SelectItem value="interior">Interior</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px] h-10 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Construction</SelectItem>
            </SelectContent>
          </Select>

          <Button asChild className="gap-1.5 text-xs h-10">
            <Link href="/admin/projects/new">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Project</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Projects Reusable DataTable */}
      <DataTable
        columns={columns}
        data={filtered}
        loading={isPending}
        isPaginated={true}
        numLoaderRows={5}
        emptyTitle="No Projects Found"
        emptyMessage={
          search
            ? `No projects matched "${search}". Try resetting your search or filters.`
            : "No projects match your current category or status filter."
        }
        emptyIcon={Building2}
        emptyActionLabel="Clear Filters"
        onEmptyAction={() => {
          setSearch("");
          setFilterType("all");
          setFilterStatus("all");
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteTarget}
        setIsOpen={(open) => !open && setDeleteTarget(null)}
        title="Confirm Project Deletion"
        subtitle="This action is permanent and cannot be undone. All project drawings, media references, and design specifications will be permanently removed."
        icon={AlertTriangle}
        variant="destructive"
        confirmLabel={deletingId ? "Deleting..." : "Permanently Delete"}
        isLoading={isPending && deletingId === deleteTarget?.id}
        onConfirm={() => {
          if (deleteTarget) {
            confirmDelete(deleteTarget.id);
          }
        }}
      >
        {deleteTarget && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs space-y-2 mt-2">
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
      </ConfirmationModal>
    </div>
  );
}

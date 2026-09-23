"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { togglePublishAction, deleteProjectAction } from "@/actions/projects";
import { useRouter } from "next/navigation";

export function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }
    setDeletingId(id);
    startTransition(async () => {
      const res = await deleteProjectAction(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
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
          <input
            type="text"
            placeholder="Search by code (DT-25-01), title, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-xs font-mono text-[#F9F6F0] placeholder:text-[#666] focus:outline-none focus:border-[#C9A84C]"
          />
          <svg
            className="w-4 h-4 text-[#8A8A8A] absolute left-3.5 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filters & Add button */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-[#AAA] focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed-use">Mixed-Use</option>
            <option value="interior">Interior</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-[#AAA] focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Construction</option>
          </select>

          <Link
            href="/admin/projects/new"
            className="bg-[#C9A84C] text-[#0A0A0A] font-mono text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#D4B55E] transition-colors flex items-center gap-1.5"
          >
            <span>+ Create Project</span>
          </Link>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01] text-[#8A8A8A]">
                <th className="py-3 px-4 font-normal">Project</th>
                <th className="py-3 px-4 font-normal">Code & Typology</th>
                <th className="py-3 px-4 font-normal">Location & Year</th>
                <th className="py-3 px-4 font-normal">Construction Stage</th>
                <th className="py-3 px-4 font-normal">Visibility</th>
                <th className="py-3 px-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#666]">
                    No projects found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Project Thumbnail & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded bg-white/5 relative overflow-hidden flex-shrink-0">
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
                          <div className="font-sans font-medium text-[#F9F6F0] line-clamp-1">
                            {proj.title}
                          </div>
                          <div className="text-[10px] text-[#666]">
                            /{proj.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Code & Typology */}
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 border border-[#C9A84C]/30 text-[#C9A84C]">
                        {proj.projectCode || "DT-25-01"}
                      </span>
                      <div className="text-[11px] text-[#AAA] mt-1">
                        {proj.buildingType || proj.category}
                      </div>
                    </td>

                    {/* Location & Year */}
                    <td className="py-3 px-4">
                      <div className="text-[#AAA]">{proj.location || "Nigeria"}</div>
                      <div className="text-[10px] text-[#666]">{proj.yearCompleted || "2025"}</div>
                    </td>

                    {/* Construction Stage */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase ${
                          proj.status === "completed" || (proj.yearCompleted && proj.yearCompleted !== "Under Construction")
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {proj.status === "completed" || (proj.yearCompleted && proj.yearCompleted !== "Under Construction")
                          ? "Completed"
                          : "In Construction"}
                      </span>
                      {proj.currentStage && (
                        <div className="text-[10px] text-[#888] mt-1">
                          Stage: {proj.currentStage}
                        </div>
                      )}
                    </td>

                    {/* Visibility (Live vs Draft Toggle) */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(proj.id, proj.isPublished ?? true)}
                        disabled={isPending}
                        className={`px-2.5 py-1 rounded text-[10px] uppercase font-mono transition-all ${
                          proj.isPublished
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/60"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700"
                        }`}
                        title="Click to toggle publish status"
                      >
                        {proj.isPublished ? "● Live" : "○ Draft"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          className="text-[#8A8A8A] hover:text-[#F9F6F0] transition-colors"
                          title="View Public Page"
                        >
                          View
                        </Link>
                        <span className="text-white/20">•</span>
                        <Link
                          href={`/admin/projects/${proj.id}/edit`}
                          className="text-[#C9A84C] hover:underline"
                          title="Edit in Multi-Step Wizard"
                        >
                          Edit
                        </Link>
                        <span className="text-white/20">•</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(proj.id, proj.title)}
                          disabled={deletingId === proj.id}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete Project"
                        >
                          {deletingId === proj.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

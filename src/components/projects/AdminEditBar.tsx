"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { togglePublishAction } from "@/actions/projects";
import { useRouter } from "next/navigation";

export function AdminEditBar({ project }: { project: Project }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await togglePublishAction(project.id, !project.isPublished);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || "Failed to update project status.");
      }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className="bg-[#121212]/95 backdrop-blur-xl border border-[#C9A84C]/40 shadow-2xl rounded-2xl p-3 sm:px-4 sm:py-3 flex items-center gap-3 sm:gap-4 text-xs font-mono text-[#F9F6F0]">
        <div className="flex items-center gap-2 pr-2 border-r border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="font-semibold text-[#C9A84C] hidden sm:inline">
            ADMIN VIEW
          </span>
          <span className="text-[10px] text-[#888]">
            {project.projectCode || "DT-PROJ"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className={`px-2.5 py-1 rounded text-[10px] uppercase font-mono transition-all ${
            project.isPublished
              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900"
              : "bg-amber-950/80 text-amber-300 border border-amber-800/60 hover:bg-amber-900"
          }`}
          title="Click to toggle publish status"
        >
          {project.isPublished ? "● Live (Visible)" : "○ Draft (Hidden)"}
        </button>

        <Link
          href={`/admin/projects/${project.id}/edit`}
          className="bg-[#C9A84C] text-[#0A0A0A] font-semibold px-3 py-1 rounded-lg hover:bg-[#D4B55E] transition-colors flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit Project</span>
        </Link>

        <Link
          href="/admin"
          className="text-[#888] hover:text-[#FFF] transition-colors hidden md:inline"
          title="Go to Admin Dashboard"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

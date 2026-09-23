import React from "react";
import { getProjectByIdAction } from "@/actions/projects";
import { MultiStepProjectForm } from "@/components/admin/MultiStepProjectForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectByIdAction(id);

  if (!project) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-serif text-[#F9F6F0]">Project Not Found</h2>
        <p className="text-xs font-mono text-[#8A8A8A]">
          No project matches identifier &ldquo;{id}&rdquo;.
        </p>
        <div>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-[#C9A84C] hover:underline"
          >
            ← Back to Projects Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-[#C9A84C]/30 text-[#C9A84C]">
              {project.projectCode || "DT-PROJ"}
            </span>
            <span className="text-xs text-[#8A8A8A] font-mono">
              Editing: {project.title}
            </span>
          </div>
          <h1 className="text-2xl font-serif text-[#F9F6F0]">Update Project</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="text-xs font-mono text-[#8A8A8A] hover:text-[#F9F6F0] border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <span>Live Preview</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>

      <MultiStepProjectForm initialProject={project} isEditMode={true} />
    </div>
  );
}

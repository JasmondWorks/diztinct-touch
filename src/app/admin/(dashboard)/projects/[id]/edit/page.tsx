import React from "react";
import { getProjectByIdAction } from "@/actions/projects";
import { MultiStepProjectForm } from "@/components/admin/MultiStepProjectForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft } from "lucide-react";

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
        <h2 className="text-xl font-bold tracking-tight text-foreground-heading">
          Project Not Found
        </h2>
        <p className="text-xs text-muted-foreground">
          No project matches identifier &ldquo;{id}&rdquo;.
        </p>
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/5 border border-primary/20 text-primary font-semibold">
              {project.projectCode || "DT-PROJ"}
            </span>
            <span className="text-xs text-muted-foreground ">
              Editing: {project.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
            Update Project
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="text-xs text-muted-foreground hover:text-foreground border border-border px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors bg-card/40"
          >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <MultiStepProjectForm initialProject={project} isEditMode={true} />
    </div>
  );
}

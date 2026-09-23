"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { togglePublishAction } from "@/actions/projects";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit3 } from "lucide-react";

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
      <div className="bg-card/95 backdrop-blur-xl border border-primary/40 shadow-2xl rounded-2xl p-2.5 sm:px-4 sm:py-2.5 flex items-center gap-3 text-xs font-mono text-foreground">
        <div className="flex items-center gap-2 pr-2 border-r border-border/80">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-semibold text-primary hidden sm:inline">
            ADMIN VIEW
          </span>
          <Badge variant="outline" className="text-[10px] font-mono border-primary/20 bg-primary/5 text-primary">
            {project.projectCode || "DT-PROJ"}
          </Badge>
        </div>

        <Button
          type="button"
          variant={project.isPublished ? "emerald" : "outline"}
          size="sm"
          onClick={handleToggle}
          disabled={isPending}
          className="h-6 rounded-full text-[10px] uppercase font-mono px-2.5"
          title="Click to toggle publish status"
        >
          {project.isPublished ? "● Live (Visible)" : "○ Draft (Hidden)"}
        </Button>

        <Button asChild size="sm" className="h-7 text-xs font-mono gap-1.5 shadow-xs">
          <Link href={`/admin/projects/${project.id}/edit`}>
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Project</span>
          </Link>
        </Button>

        <Button variant="ghost" size="sm" asChild className="h-7 text-xs font-mono text-muted-foreground hover:text-foreground hidden md:inline-flex">
          <Link href="/admin">
            Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}

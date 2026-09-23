import React from "react";
import { getProjectsAction } from "@/actions/projects";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjectsAction(true);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
          Projects Catalog
        </h1>
        <p className="text-xs font-mono text-muted-foreground mt-1">
          Manage architectural projects, construction stages, photography, and blueprints.
        </p>
      </div>

      <ProjectsTable initialProjects={projects} />
    </div>
  );
}

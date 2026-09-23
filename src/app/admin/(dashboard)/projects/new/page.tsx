import React from "react";
import { MultiStepProjectForm } from "@/components/admin/MultiStepProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
          Create New Project
        </h1>
        <p className="text-xs font-mono text-muted-foreground mt-1">
          Add an architectural design or active construction site to the DIZTINCT TOUCH portfolio.
        </p>
      </div>

      <MultiStepProjectForm />
    </div>
  );
}

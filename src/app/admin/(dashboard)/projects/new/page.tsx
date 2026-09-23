import React from "react";
import { MultiStepProjectForm } from "@/components/admin/MultiStepProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-2xl font-serif text-[#F9F6F0]">Create New Project</h1>
        <p className="text-xs font-mono text-[#8A8A8A] mt-1">
          Add an architectural design or active construction site to the DIZTINCT TOUCH portfolio.
        </p>
      </div>

      <MultiStepProjectForm />
    </div>
  );
}

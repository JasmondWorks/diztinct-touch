import { Metadata } from "next";
import { MultiStepProjectForm } from "@/components/admin/MultiStepProjectForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create New Project | DIZTINCT TOUCH",
  description: "Architectural project intake and creation portal.",
};

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
          Create New Project
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Add an architectural design or active construction site to the DIZTINCT TOUCH portfolio.
        </p>
      </div>

      <MultiStepProjectForm />
    </div>
  );
}

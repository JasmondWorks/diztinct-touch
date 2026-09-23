"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, ArchitecturalCategory, ProjectGalleryImage, ProjectMetric, ProjectDecision } from "@/types/project";
import { createProjectAction, updateProjectAction } from "@/actions/projects";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Building2,
  FileText,
  Camera,
  Activity,
  Save,
  Plus,
  Trash2,
  Eye,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiStepProjectFormProps {
  initialProject?: Project;
  isEditMode?: boolean;
}

const STEPS = [
  { id: 1, title: "Identity & Taxonomy", icon: Building2 },
  { id: 2, title: "Design Statement & Scope", icon: FileText },
  { id: 3, title: "Media & Drawings", icon: Camera },
  { id: 4, title: "Metrics & Engineering", icon: Activity },
  { id: 5, title: "Review & Publish", icon: CheckCircle2 },
];

const CATEGORIES: ArchitecturalCategory[] = [
  "Residential",
  "Commercial",
  "Civic & Cultural",
  "Adaptive Reuse",
  "Urban & Masterplan",
  "Competitions",
];

const BUILDING_TYPES = [
  "Fully-Detached Contemporary Duplex",
  "Semi-Detached Duplex",
  "Terrace Duplex",
  "Contemporary Villa",
  "Executive Bungalow",
  "Commercial Plaza",
  "Mixed-Use Development",
];

export function MultiStepProjectForm({ initialProject, isEditMode = false }: MultiStepProjectFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    id: initialProject?.id || "",
    title: initialProject?.title || "",
    slug: initialProject?.slug || "",
    projectCode: initialProject?.projectCode || "DT-25-01",
    category: initialProject?.category || "Residential",
    buildingType: initialProject?.buildingType || "Fully-Detached Contemporary Duplex",
    bedroomCount: initialProject?.bedroomCount || "5 Bedrooms + BQ",
    location: initialProject?.location || "Ejioku Village, ARMITY Estate",
    yearCompleted: initialProject?.yearCompleted || "2025 (Under Construction)",
    client: initialProject?.client || "Private Client",
    siteArea: initialProject?.siteArea || "650 m²",
    gfa: initialProject?.gfa || "380 m²",
    budget: initialProject?.budget || "Confidential",
    shortDescription: initialProject?.shortDescription || "",
    longDescription: initialProject?.longDescription || "",
    fullCaseStudy: initialProject?.fullCaseStudy || {
      contextAndChallenge: "",
      designConcept: "",
      materialityAndStructure: "",
      environmentalPerformance: "",
    },
    techStack: initialProject?.techStack || [
      "2D Architectural Drawings",
      "3D Visualization",
      "Concrete Decking",
      "Textured Brick",
      "Cantilever Balcony",
      "Construction Oversight",
    ],
    coverImage: initialProject?.coverImage || "",
    gallery: initialProject?.gallery || [],
    drawings: initialProject?.drawings || [],
    architecture: initialProject?.architecture || {
      diagramUrl: "",
      description: "",
    },
    engineeringDecisions: initialProject?.engineeringDecisions || [],
    metrics: initialProject?.metrics || [
      { label: "Design-to-Site Match", value: "100%", description: "Exact adherence between approved 3D renders and physical construction", changeBadge: "Precision" },
      { label: "Construction Decking", value: "Completed", description: "Suspended reinforced concrete slab cast and cured", changeBadge: "Milestone" },
    ],
    futureImprovements: initialProject?.futureImprovements || [],
    featured: initialProject?.featured ?? false,
    featuredRank: initialProject?.featuredRank ?? 1,
    isPublished: initialProject?.isPublished ?? true,
    dateStr: initialProject?.dateStr || new Date().toISOString().split("T")[0],
  });

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isEditMode && prev.slug ? prev.slug : slug,
      id: isEditMode && prev.id ? prev.id : slug,
    }));
  };

  // Gallery Helpers
  const addGalleryImage = (url: string) => {
    if (!url) return;
    const newImage: ProjectGalleryImage = {
      url,
      caption: "Perspective view",
      category: "exterior",
    };
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), newImage],
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index),
    }));
  };

  const updateGalleryImage = (index: number, field: keyof ProjectGalleryImage, value: any) => {
    setFormData((prev) => {
      const updated = [...(prev.gallery || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, gallery: updated };
    });
  };

  // Metrics Helpers
  const addMetric = () => {
    const newMetric: ProjectMetric = {
      label: "Metric Label",
      value: "Value",
      description: "",
      changeBadge: "Standard",
    };
    setFormData((prev) => ({
      ...prev,
      metrics: [...(prev.metrics || []), newMetric],
    }));
  };

  const removeMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: (prev.metrics || []).filter((_, i) => i !== index),
    }));
  };

  const updateMetric = (index: number, field: keyof ProjectMetric, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.metrics || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, metrics: updated };
    });
  };

  // Decisions Helpers
  const addDecision = () => {
    const newDecision: ProjectDecision = {
      topic: "Topic",
      decision: "Architectural Decision",
      reason: "Rationale",
      tradeoff: "Tradeoff",
    };
    setFormData((prev) => ({
      ...prev,
      engineeringDecisions: [...(prev.engineeringDecisions || []), newDecision],
    }));
  };

  const removeDecision = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      engineeringDecisions: (prev.engineeringDecisions || []).filter((_, i) => i !== index),
    }));
  };

  const updateDecision = (index: number, field: keyof ProjectDecision, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.engineeringDecisions || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, engineeringDecisions: updated };
    });
  };

  // Submit Handler
  const handleSubmit = async () => {
    setError(null);
    setSaving(true);

    try {
      if (!formData.title || !formData.slug) {
        throw new Error("Project Title and Slug are required.");
      }

      const res = isEditMode
        ? await updateProjectAction(initialProject!.id, formData)
        : await createProjectAction(formData);

      if (res.success) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        setError(res.error || "Failed to save project.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Progress Bar */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer",
                  isCurrent && "bg-primary text-white shadow-sm",
                  isCompleted && "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
                  !isCurrent && !isCompleted && "text-muted-foreground hover:bg-muted"
                )}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold font-mono",
                    isCurrent && "bg-white/20 text-white",
                    isCompleted && "bg-emerald-500 text-white",
                    !isCurrent && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.id}
                </div>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-mono text-destructive">
          {error}
        </div>
      )}

      {/* Step 1: Identity & Taxonomy */}
      {currentStep === 1 && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="border-b border-border/80 pb-4">
            <h3 className="text-xl font-bold text-foreground-heading">
              1. Project Identity &amp; Taxonomy
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Set clear, differentiating titles and codes so multiple duplexes remain distinct.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Public Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. The Armity Contemporary Duplex"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. armity-contemporary-duplex"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-mono text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Studio Project Code
              </label>
              <input
                type="text"
                value={formData.projectCode || ""}
                onChange={(e) => setFormData({ ...formData, projectCode: e.target.value })}
                placeholder="e.g. DT-25-01"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-mono text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Typology Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ArchitecturalCategory })}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Building Sub-Type
              </label>
              <select
                value={formData.buildingType || ""}
                onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              >
                {BUILDING_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Configuration / Bedrooms
              </label>
              <input
                type="text"
                value={formData.bedroomCount || ""}
                onChange={(e) => setFormData({ ...formData, bedroomCount: e.target.value })}
                placeholder="e.g. 5 Bedrooms + Maid Quarters"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Location &amp; Estate
              </label>
              <input
                type="text"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Ejioku Village, ARMITY Estate"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Construction Year &amp; Stage
              </label>
              <input
                type="text"
                value={formData.yearCompleted || ""}
                onChange={(e) => setFormData({ ...formData, yearCompleted: e.target.value })}
                placeholder="e.g. 2025 (First Floor Underway)"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Gross Floor Area (GFA)
              </label>
              <input
                type="text"
                value={formData.gfa || ""}
                onChange={(e) => setFormData({ ...formData, gfa: e.target.value })}
                placeholder="e.g. 380 m²"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Statement & Scope */}
      {currentStep === 2 && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="border-b border-border/80 pb-4">
            <h3 className="text-xl font-bold text-foreground-heading">
              2. Design Statement &amp; Case Study Narrative
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Explain the architectural rationale, daylight strategies, and construction integrity.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Short Pitch / Summary (Shows on preview cards) *
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="A contemporary residential duplex featuring a double-height glazed atrium tower..."
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-foreground">
                Comprehensive Design Statement (Monograph intro) *
              </label>
              <textarea
                rows={4}
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                placeholder="Designed by DIZTINCT TOUCH HOME DESIGN under our core ethos of 'Remarkable design, long lasting'..."
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase text-primary">
                  Pillar 1: Context &amp; Challenge
                </label>
                <textarea
                  rows={3}
                  value={formData.fullCaseStudy?.contextAndChallenge || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullCaseStudy: {
                        ...formData.fullCaseStudy!,
                        contextAndChallenge: e.target.value,
                      },
                    })
                  }
                  placeholder="Site conditions, solar angles, and client lifestyle requirements..."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase text-primary">
                  Pillar 2: Design Concept
                </label>
                <textarea
                  rows={3}
                  value={formData.fullCaseStudy?.designConcept || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullCaseStudy: {
                        ...formData.fullCaseStudy!,
                        designConcept: e.target.value,
                      },
                    })
                  }
                  placeholder="Geometric volumes, atrium flow, and cantilever balcony..."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase text-primary">
                  Pillar 3: Materiality &amp; Structure
                </label>
                <textarea
                  rows={3}
                  value={formData.fullCaseStudy?.materialityAndStructure || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullCaseStudy: {
                        ...formData.fullCaseStudy!,
                        materialityAndStructure: e.target.value,
                      },
                    })
                  }
                  placeholder="Concrete frame, suspended decking, textured brick cladding..."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase text-primary">
                  Pillar 4: Environmental Performance
                </label>
                <textarea
                  rows={3}
                  value={formData.fullCaseStudy?.environmentalPerformance || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullCaseStudy: {
                        ...formData.fullCaseStudy!,
                        environmentalPerformance: e.target.value,
                      },
                    })
                  }
                  placeholder="Deep overhangs, cross-ventilation, and natural daylight autonomy..."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Media & Drawings */}
      {currentStep === 3 && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="border-b border-border/80 pb-4">
            <h3 className="text-xl font-bold text-foreground-heading">
              3. Media, Visual Gallery &amp; Blueprints
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Upload high-resolution renderings. All images are optimized with sharp into progressive WebP and saved in Neon S3.
            </p>
          </div>

          {/* Cover Image Uploader */}
          <div className="space-y-2">
            <ImageUploader
              label="Lead Project Cover Render *"
              sublabel="This image represents the project in the hero and featured cards."
              initialUrl={formData.coverImage}
              folder="projects/covers"
              onUploadComplete={(url) => setFormData({ ...formData, coverImage: url })}
            />
          </div>

          {/* Gallery Multi-Photo Manager */}
          <div className="space-y-4 border-t border-border/80 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground-heading uppercase tracking-wider font-mono">
                  Project Photo Gallery ({formData.gallery?.length || 0} images)
                </h4>
                <p className="text-xs text-muted-foreground">
                  Exterior angles, double-height interiors, cantilever details, and night illumination.
                </p>
              </div>

              <div className="w-56">
                <ImageUploader
                  label="Add Gallery Photo"
                  sublabel="Uploads and auto-compresses"
                  folder="projects/gallery"
                  onUploadComplete={(url) => url && addGalleryImage(url)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {formData.gallery?.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-2xl border border-border bg-background p-3 space-y-2"
                >
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt="Gallery item" className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-2 right-2 rounded-lg bg-destructive p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={img.caption}
                    onChange={(e) => updateGalleryImage(idx, "caption", e.target.value)}
                    placeholder="Photo caption..."
                    className="w-full rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />

                  <select
                    value={img.category}
                    onChange={(e) => updateGalleryImage(idx, "category", e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="exterior">Exterior View</option>
                    <option value="interior">Interior Space</option>
                    <option value="detail">Construction Detail</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Metrics & Engineering */}
      {currentStep === 4 && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="border-b border-border/80 pb-4">
            <h3 className="text-xl font-bold text-foreground-heading">
              4. Measurable Results &amp; Engineering Decisions
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Give clients confidence with real numbers (decking strength, GFA, design-to-build accuracy).
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground-heading font-mono uppercase tracking-wider">
                Measurable Results &amp; Spatial Metrics
              </h4>
              <button
                type="button"
                onClick={addMetric}
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Metric Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.metrics?.map((m, idx) => (
                <div key={idx} className="rounded-2xl border border-border bg-background p-4 space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => removeMetric(idx)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => updateMetric(idx, "label", e.target.value)}
                      placeholder="e.g. Design-to-Site Match"
                      className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-mono font-bold text-foreground"
                    />
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => updateMetric(idx, "value", e.target.value)}
                      placeholder="e.g. 100%"
                      className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-mono font-bold text-primary"
                    />
                  </div>

                  <input
                    type="text"
                    value={m.description || ""}
                    onChange={(e) => updateMetric(idx, "description", e.target.value)}
                    placeholder="Short description of the result..."
                    className="w-full rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Decisions Bento */}
          <div className="space-y-4 border-t border-border/80 pt-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground-heading font-mono uppercase tracking-wider">
                Key Engineering &amp; Design Decisions
              </h4>
              <button
                type="button"
                onClick={addDecision}
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Decision Card</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.engineeringDecisions?.map((dec, idx) => (
                <div key={idx} className="rounded-2xl border border-border bg-background p-4 space-y-2 relative group">
                  <button
                    type="button"
                    onClick={() => removeDecision(idx)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={dec.topic}
                      onChange={(e) => updateDecision(idx, "topic", e.target.value)}
                      placeholder="Topic (e.g. Facade Massing & Daylight)"
                      className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground"
                    />
                    <input
                      type="text"
                      value={dec.decision}
                      onChange={(e) => updateDecision(idx, "decision", e.target.value)}
                      placeholder="Decision (e.g. Double-height floor-to-ceiling glass)"
                      className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={dec.reason}
                    onChange={(e) => updateDecision(idx, "reason", e.target.value)}
                    placeholder="Reason & Architectural Rationale..."
                    className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Review & Publish */}
      {currentStep === 5 && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="border-b border-border/80 pb-4">
            <h3 className="text-xl font-bold text-foreground-heading">
              5. Review &amp; Publication Settings
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Choose visibility and review your project before saving to the database.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-background p-5 space-y-4">
              <span className="text-xs font-mono font-bold uppercase text-primary">
                Publication Controls
              </span>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    Public Status
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {formData.isPublished ? "Visible to public visitors" : "Saved as private draft"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                  className={cn(
                    "rounded-xl px-4 py-1.5 text-xs font-bold transition-all cursor-pointer",
                    formData.isPublished ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  {formData.isPublished ? "Published" : "Draft"}
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-3">
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    Featured on Homepage
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Showcases in the flagship hero section
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  className={cn(
                    "rounded-xl px-4 py-1.5 text-xs font-bold transition-all cursor-pointer",
                    formData.featured ? "bg-amber-500 text-black" : "bg-muted text-muted-foreground"
                  )}
                >
                  {formData.featured ? "Featured ★" : "Standard"}
                </button>
              </div>
            </div>

            {/* Quick Preview Card */}
            <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-primary">
                Summary Preview
              </span>

              <div className="space-y-1">
                <span className="text-xs font-mono text-muted-foreground block">
                  {formData.projectCode || "DT-25-01"} • {formData.buildingType}
                </span>
                <h4 className="text-base font-bold text-foreground-heading">
                  {formData.title || "Untitled Project"}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {formData.shortDescription || "No short description provided yet."}
                </p>
              </div>

              <div className="pt-2 text-[11px] font-mono text-muted-foreground border-t border-border/60 flex items-center justify-between">
                <span>Location: {formData.location}</span>
                <span>GFA: {formData.gfa}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wizard Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Step</span>
          </button>
        ) : <div />}

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary/90 cursor-pointer"
          >
            <span>Next Step</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={saving}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-500 cursor-pointer transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving to Neon Database...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEditMode ? "Save Changes" : "Create & Publish Project"}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

import { z } from "zod";

export const architecturalCategorySchema = z.enum([
  "Residential",
  "Commercial",
  "Civic & Cultural",
  "Adaptive Reuse",
  "Urban & Masterplan",
  "Competitions",
]);

export const projectMetricSchema = z.object({
  label: z.string().min(1, "Metric label is required"),
  value: z.string().min(1, "Metric value is required"),
  description: z.string().optional(),
  changeBadge: z.string().optional(),
});

export const projectDecisionSchema = z.object({
  topic: z.string().min(1, "Decision topic is required"),
  decision: z.string().min(1, "Decision description is required"),
  reason: z.string().min(1, "Reason is required"),
  tradeoff: z.string().optional(),
});

export const projectGalleryImageSchema = z.object({
  url: z.string().url("Valid image URL required"),
  caption: z.string().min(1, "Caption is required"),
  category: z.enum(["exterior", "interior", "detail", "drawing", "axonometric"]),
  aspect: z.enum(["16/9", "4/3", "3/2", "1/1"]).optional(),
});

export const architecturalDrawingSchema = z.object({
  title: z.string().min(1, "Drawing title is required"),
  url: z.string().url("Valid drawing URL required"),
  type: z.enum(["Plan", "Section", "Elevation", "Axonometric", "Detail"]),
  scale: z.string().optional(),
  caption: z.string().optional(),
});

export const fullCaseStudySchema = z.object({
  contextAndChallenge: z.string().min(1, "Context and challenge narrative required"),
  designConcept: z.string().min(1, "Design concept description required"),
  materialityAndStructure: z.string().min(1, "Materiality and structural concept required"),
  environmentalPerformance: z.string().min(1, "Environmental performance description required"),
});

export const projectFormSchema = z.object({
  title: z.string().min(3, "Project title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  category: architecturalCategorySchema,
  location: z.string().optional(),
  yearCompleted: z.string().optional(),
  client: z.string().optional(),
  siteArea: z.string().optional(),
  gfa: z.string().optional(),
  budget: z.string().optional(),
  shortDescription: z.string().min(10, "Short pitch must be at least 10 characters"),
  longDescription: z.string().min(20, "Comprehensive design statement must be at least 20 characters"),
  buildingType: z.string().optional(),
  bedroomCount: z.string().optional(),
  projectCode: z.string().optional(),
  isPublished: z.boolean().default(true),
  status: z.enum(["completed", "in-progress"]).default("completed"),
  currentStage: z.string().optional(),
  coverImage: z.string().min(1, "Cover image is required"),
  gallery: z.array(projectGalleryImageSchema).default([]),
  drawings: z.array(architecturalDrawingSchema).optional(),
  techStack: z.array(z.string()).default([]),
  metrics: z.array(projectMetricSchema).default([]),
  engineeringDecisions: z.array(projectDecisionSchema).default([]),
  fullCaseStudy: fullCaseStudySchema.optional(),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  demoVideo: z.string().optional(),
  futureImprovements: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  featuredRank: z.number().int().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

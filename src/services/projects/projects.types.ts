export type ArchitecturalCategory =
  | "Residential"
  | "Commercial"
  | "Civic & Cultural"
  | "Adaptive Reuse"
  | "Urban & Masterplan"
  | "Competitions";

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
  changeBadge?: string;
}

export interface ProjectDecision {
  topic: string;
  decision: string;
  reason: string;
  tradeoff?: string;
}

export interface ProjectGalleryImage {
  url: string;
  caption: string;
  category: "exterior" | "interior" | "detail" | "drawing" | "axonometric" | "construction";
  aspect?: "16/9" | "4/3" | "3/2" | "1/1";
}

export interface ArchitecturalDrawing {
  title: string;
  url: string;
  type: "Plan" | "Section" | "Elevation" | "Axonometric" | "Detail";
  scale?: string;
  caption?: string;
}

export interface FullCaseStudy {
  contextAndChallenge?: string;
  designConcept?: string;
  materialityAndStructure?: string;
  environmentalPerformance?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ArchitecturalCategory;
  location?: string;
  yearCompleted?: string;
  client?: string;
  siteArea?: string;
  gfa?: string;
  budget?: string;
  shortDescription: string;
  longDescription: string;
  fullCaseStudy?: FullCaseStudy;
  techStack: string[];
  coverImage: string;
  gallery: ProjectGalleryImage[];
  drawings?: ArchitecturalDrawing[];
  demoVideo?: string;
  githubUrl?: string;
  liveUrl?: string;

  architecture?: {
    diagramUrl?: string;
    description: string;
  };

  engineeringDecisions?: ProjectDecision[];
  metrics?: ProjectMetric[];
  futureImprovements?: string[];
  featured?: boolean;
  featuredRank?: number;
  dateStr: string;
  buildingType?: string;
  bedroomCount?: string;
  projectCode?: string;
  isPublished?: boolean;
  status?: "completed" | "in-progress";
  currentStage?: string;
}

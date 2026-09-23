export type ArchitecturalCategory =
  | "Residential"
  | "Commercial"
  | "Civic & Cultural"
  | "Adaptive Reuse"
  | "Urban & Masterplan"
  | "Competitions";

export interface ProjectMetric {
  label: string; // e.g., "Gross Floor Area", "Operational Carbon", "Daylight Autonomy"
  value: string; // e.g., "4,850 m²", "-42% vs Baseline", "87% sDA"
  description?: string;
  changeBadge?: string; // e.g., "LEED Platinum", "-38% Carbon", "A+ Rated"
}

export interface ProjectDecision {
  topic: string; // e.g., "Structural Core", "Envelope Glazing", "Passive Cooling"
  decision: string; // e.g., "Hybrid Cross-Laminated Timber (CLT) & Low-Carbon Concrete"
  reason: string; // e.g., "Reduces embodied carbon by 38% while exposing warm wood grain internally"
  tradeoff?: string; // e.g., "Required stricter moisture management during wet-season construction"
}

export interface ProjectGalleryImage {
  url: string;
  caption: string;
  category: "exterior" | "interior" | "detail" | "drawing" | "axonometric";
  aspect?: "16/9" | "4/3" | "3/2" | "1/1";
}

export interface ArchitecturalDrawing {
  title: string;
  url: string;
  type: "Plan" | "Section" | "Elevation" | "Axonometric" | "Detail";
  scale?: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ArchitecturalCategory;
  location?: string; // e.g., "Kyoto, Japan" or "Zurich, Switzerland"
  yearCompleted?: string; // e.g., "2025" or "Under Construction"
  client?: string;
  siteArea?: string; // e.g., "12,400 m²"
  gfa?: string; // Gross Floor Area
  budget?: string;
  shortDescription: string; // 1-2 sentence pitch
  longDescription: string; // Comprehensive design statement & brief
  fullCaseStudy?: {
    contextAndChallenge: string;
    designConcept: string;
    materialityAndStructure: string;
    environmentalPerformance: string;
  };
  techStack: string[]; // Software tools & material systems
  coverImage: string; // High-resolution exterior rendering/photo
  gallery: ProjectGalleryImage[]; // Picture-heavy multi-shot gallery
  drawings?: ArchitecturalDrawing[]; // Blueprint drawings, plans & sections
  demoVideo?: string; // Cinematic walk-through video (MP4) for hover playback
  githubUrl?: string; // Link to BIM Docs / Drawings PDF / Model viewer
  liveUrl?: string; // Interactive 3D Model / Virtual Tour URL

  // Detailed Architectural Breakdown
  architecture?: {
    diagramUrl?: string; // Axonometric drawing, section, or exploded BIM diagram
    description: string; // Spatial organization, circulation, and structural flow
  };

  engineeringDecisions: ProjectDecision[];
  metrics: ProjectMetric[];
  futureImprovements?: string[]; // Phase II extensions, future retrofits
  featured?: boolean;
  featuredRank?: number;
  dateStr: string; // ISO date string (YYYY-MM-DD) for chronological ordering
  buildingType?: string; // e.g., "Fully-Detached Contemporary Duplex", "Terrace Duplex", "Commercial Plaza"
  bedroomCount?: string; // e.g., "5 Bedrooms + BQ"
  projectCode?: string; // e.g., "DT-25-01"
  isPublished?: boolean; // Default true, false for private drafts
  status?: "completed" | "in-progress"; // Construction or completion status
  currentStage?: string; // e.g. "First Floor Level", "Decking Completed", "Finishing"
}

import { ArchitecturalCategory, Project, ProjectGalleryImage, ArchitecturalDrawing, FullCaseStudy, ProjectMetric, ProjectDecision } from "./projects.types";

/**
 * Data Transfer Objects (DTOs) for Projects Service Module
 */

export interface CreateProjectDto {
  id?: string;
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
  buildingType?: string;
  bedroomCount?: string;
  projectCode?: string;
  isPublished?: boolean;
  status?: "completed" | "in-progress";
  currentStage?: string;
  coverImage: string;
  gallery?: ProjectGalleryImage[];
  drawings?: ArchitecturalDrawing[];
  techStack?: string[];
  metrics?: ProjectMetric[];
  engineeringDecisions?: ProjectDecision[];
  fullCaseStudy?: FullCaseStudy;
  liveUrl?: string;
  githubUrl?: string;
  demoVideo?: string;
  futureImprovements?: string[];
  featured?: boolean;
  featuredRank?: number;
  dateStr?: string;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  id?: string;
}

export interface ProjectFilterDto {
  category?: ArchitecturalCategory | "All";
  status?: "completed" | "in-progress" | "all";
  search?: string;
  includeUnpublished?: boolean;
  featuredOnly?: boolean;
}

export interface ProjectSummaryDto {
  id: string;
  title: string;
  slug: string;
  category: ArchitecturalCategory;
  location?: string;
  yearCompleted?: string;
  shortDescription: string;
  coverImage: string;
  featured?: boolean;
  featuredRank?: number;
  dateStr: string;
  buildingType?: string;
  bedroomCount?: string;
  projectCode?: string;
  isPublished: boolean;
  status: "completed" | "in-progress";
  currentStage?: string;
}

export type ProjectDetailDto = Project;

export interface ProjectResponseDto {
  success: boolean;
  id?: string;
  error?: string;
}

export interface ProjectStatsDto {
  total: number;
  published: number;
  drafts: number;
  completed: number;
  inProgress: number;
  categories: Record<string, number>;
}

import { prisma } from "@/lib/prisma";
import { Project } from "./projects.types";
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectFilterDto,
  ProjectStatsDto,
  PaginatedProjectsDto,
} from "./projects.dtos";
import { architecturalProjects } from "@/data/projects";

function prismaToProject(p: any): Project {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    location: p.location || undefined,
    yearCompleted: p.yearCompleted || undefined,
    client: p.client || undefined,
    siteArea: p.siteArea || undefined,
    gfa: p.gfa || undefined,
    budget: p.budget || undefined,
    shortDescription: p.shortDescription,
    longDescription: p.longDescription,
    fullCaseStudy: typeof p.fullCaseStudy === "string" ? JSON.parse(p.fullCaseStudy) : (p.fullCaseStudy || undefined),
    techStack: p.techStack || [],
    coverImage: p.coverImage,
    gallery: typeof p.gallery === "string" ? JSON.parse(p.gallery) : (p.gallery || []),
    drawings: typeof p.drawings === "string" ? JSON.parse(p.drawings) : (p.drawings || undefined),
    demoVideo: p.demoVideo || undefined,
    githubUrl: p.githubUrl || undefined,
    liveUrl: p.liveUrl || undefined,
    architecture: typeof p.architecture === "string" ? JSON.parse(p.architecture) : (p.architecture || undefined),
    engineeringDecisions: typeof p.engineeringDecisions === "string" ? JSON.parse(p.engineeringDecisions) : (p.engineeringDecisions || []),
    metrics: typeof p.metrics === "string" ? JSON.parse(p.metrics) : (p.metrics || []),
    futureImprovements: p.futureImprovements || [],
    featured: p.featured ?? false,
    featuredRank: p.featuredRank ?? undefined,
    dateStr: p.dateStr,
    buildingType: p.buildingType || undefined,
    bedroomCount: p.bedroomCount || undefined,
    projectCode: p.projectCode || undefined,
    isPublished: p.isPublished ?? true,
    status: (p.status as any) || (p.yearCompleted === "Under Construction" ? "in-progress" : "completed"),
    currentStage: p.currentStage || undefined,
  } as Project;
}

/**
 * ProjectsService
 * Backend domain service handling data access, transformations, and persistence
 */
export class ProjectsService {
  /**
   * Fetch all projects matching optional filter criteria
   */
  static async getAll(filter?: ProjectFilterDto): Promise<Project[]> {
    try {
      const where: any = {};

      if (!filter?.includeUnpublished) {
        where.isPublished = true;
      }

      if (filter?.category && filter.category !== "All") {
        where.category = filter.category;
      }

      if (filter?.status && filter.status !== "all") {
        where.status = filter.status;
      }

      if (filter?.featuredOnly) {
        where.featured = true;
      }

      const rows = await prisma.project.findMany({
        where: Object.keys(where).length > 0 ? where : undefined,
        orderBy: [
          { featuredRank: "asc" },
          { createdAt: "desc" },
        ],
      });

      if (rows.length === 0 && !filter?.includeUnpublished) {
        return architecturalProjects;
      }

      let projects = rows.map(prismaToProject);

      if (filter?.search) {
        const q = filter.search.toLowerCase();
        projects = projects.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.location?.toLowerCase().includes(q) ||
            p.projectCode?.toLowerCase().includes(q)
        );
      }

      return projects;
    } catch (err) {
      console.error("Error fetching projects via Prisma, falling back to static data:", err);
      return architecturalProjects;
    }
  }

  /**
   * Fetch backend-paginated projects matching optional filter criteria
   */
  static async getPaginated(filter?: ProjectFilterDto): Promise<PaginatedProjectsDto> {
    const page = Math.max(1, filter?.page ?? 1);
    const pageSize = Math.max(1, filter?.pageSize ?? 10);
    const all = await this.getAll(filter);
    const totalCount = all.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const startIndex = (page - 1) * pageSize;
    const data = all.slice(startIndex, startIndex + pageSize);

    return {
      data,
      totalCount,
      page,
      pageSize,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  /**
   * Fetch a single project by unique slug
   */
  static async getBySlug(slug: string): Promise<Project | null> {
    try {
      const row = await prisma.project.findUnique({
        where: { slug },
      });

      if (row) {
        return prismaToProject(row);
      }

      const staticProject = architecturalProjects.find((p) => p.slug === slug);
      return staticProject || null;
    } catch (err) {
      console.error("Error in ProjectsService.getBySlug:", err);
      const staticProject = architecturalProjects.find((p) => p.slug === slug);
      return staticProject || null;
    }
  }

  /**
   * Fetch a single project by ID
   */
  static async getById(id: string): Promise<Project | null> {
    try {
      const row = await prisma.project.findUnique({
        where: { id },
      });

      if (row) {
        return prismaToProject(row);
      }

      const staticProject = architecturalProjects.find((p) => p.id === id);
      return staticProject || null;
    } catch (err) {
      console.error("Error in ProjectsService.getById:", err);
      const staticProject = architecturalProjects.find((p) => p.id === id);
      return staticProject || null;
    }
  }

  /**
   * Create a new project record in the database
   */
  static async create(dto: CreateProjectDto | Partial<Project>): Promise<Project> {
    if (!dto.title || !dto.slug) {
      throw new Error("Project Title and Slug are required.");
    }
    const id = dto.id || dto.slug;
    const coverImage = dto.coverImage || "/projects/armity-duplex/cover.jpg";
    const dateStr = dto.dateStr || new Date().toISOString().split("T")[0];

    const created = await prisma.project.create({
      data: {
        id,
        title: dto.title,
        slug: dto.slug,
        category: dto.category || "Residential",
        location: dto.location || null,
        yearCompleted: dto.yearCompleted || null,
        client: dto.client || null,
        siteArea: dto.siteArea || null,
        gfa: dto.gfa || null,
        budget: dto.budget || null,
        shortDescription: dto.shortDescription || "",
        longDescription: dto.longDescription || "",
        fullCaseStudy: (dto.fullCaseStudy as any) || undefined,
        techStack: dto.techStack || [],
        coverImage,
        gallery: (dto.gallery as any) || [],
        drawings: (dto.drawings as any) || [],
        demoVideo: dto.demoVideo || null,
        githubUrl: dto.githubUrl || null,
        liveUrl: dto.liveUrl || null,
        engineeringDecisions: (dto.engineeringDecisions as any) || [],
        metrics: (dto.metrics as any) || [],
        futureImprovements: dto.futureImprovements || [],
        featured: dto.featured ?? false,
        featuredRank: dto.featuredRank ?? null,
        dateStr,
        buildingType: dto.buildingType || null,
        bedroomCount: dto.bedroomCount || null,
        projectCode: dto.projectCode || null,
        isPublished: dto.isPublished ?? true,
        status: dto.status || "in-progress",
        currentStage: dto.currentStage || null,
      },
    });

    return prismaToProject(created);
  }

  /**
   * Update an existing project record
   */
  static async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        category: dto.category,
        location: dto.location,
        yearCompleted: dto.yearCompleted,
        client: dto.client,
        siteArea: dto.siteArea,
        gfa: dto.gfa,
        budget: dto.budget,
        shortDescription: dto.shortDescription,
        longDescription: dto.longDescription,
        fullCaseStudy: (dto.fullCaseStudy as any) || undefined,
        techStack: dto.techStack,
        coverImage: dto.coverImage,
        gallery: (dto.gallery as any) || undefined,
        drawings: (dto.drawings as any) || undefined,
        demoVideo: dto.demoVideo,
        githubUrl: dto.githubUrl,
        liveUrl: dto.liveUrl,
        engineeringDecisions: (dto.engineeringDecisions as any) || undefined,
        metrics: (dto.metrics as any) || undefined,
        futureImprovements: dto.futureImprovements,
        featured: dto.featured,
        featuredRank: dto.featuredRank,
        dateStr: dto.dateStr,
        buildingType: dto.buildingType,
        bedroomCount: dto.bedroomCount,
        projectCode: dto.projectCode,
        isPublished: dto.isPublished,
        status: dto.status,
        currentStage: dto.currentStage,
      },
    });

    return prismaToProject(updated);
  }

  /**
   * Delete a project record
   */
  static async delete(id: string): Promise<boolean> {
    await prisma.project.delete({
      where: { id },
    });
    return true;
  }

  /**
   * Toggle publication visibility of a project
   */
  static async togglePublish(id: string, isPublished: boolean): Promise<Project> {
    const updated = await prisma.project.update({
      where: { id },
      data: { isPublished },
    });
    return prismaToProject(updated);
  }

  /**
   * Aggregate statistics for projects
   */
  static async getStats(): Promise<ProjectStatsDto> {
    try {
      const [total, published, completed, inProgress, byCategory] = await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { isPublished: true } }),
        prisma.project.count({ where: { status: "completed" } }),
        prisma.project.count({ where: { status: "in-progress" } }),
        prisma.project.groupBy({
          by: ["category"],
          _count: { category: true },
        }),
      ]);

      const categories: Record<string, number> = {};
      byCategory.forEach((c) => {
        categories[c.category] = c._count.category;
      });

      return {
        total,
        published,
        drafts: total - published,
        completed,
        inProgress,
        categories,
      };
    } catch (err) {
      console.error("Error in ProjectsService.getStats:", err);
      return {
        total: architecturalProjects.length,
        published: architecturalProjects.length,
        drafts: 0,
        completed: architecturalProjects.filter((p) => p.status === "completed").length,
        inProgress: architecturalProjects.filter((p) => p.status === "in-progress").length,
        categories: {},
      };
    }
  }
}

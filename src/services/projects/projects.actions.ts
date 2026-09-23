"use server";

import { prisma } from "@/lib/prisma";
import { Project } from "./projects.types";
import { architecturalProjects } from "@/data/projects";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";

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

export async function getProjectsAction(
  options?: boolean | { includeUnpublished?: boolean }
): Promise<Project[]> {
  const includeUnpublished =
    typeof options === "boolean" ? options : !!options?.includeUnpublished;

  try {
    const rows = await prisma.project.findMany({
      where: includeUnpublished ? undefined : { isPublished: true },
      orderBy: [
        { featuredRank: "asc" },
        { createdAt: "desc" },
      ],
    });

    if (rows.length === 0) {
      return architecturalProjects;
    }

    return rows.map(prismaToProject);
  } catch (err) {
    console.error("Error fetching projects via Prisma, falling back to static data:", err);
    return architecturalProjects;
  }
}

export async function getProjectBySlugAction(slug: string): Promise<Project | null> {
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
    console.error("Error fetching project by slug via Prisma:", err);
    const staticProject = architecturalProjects.find((p) => p.slug === slug);
    return staticProject || null;
  }
}

export async function getProjectByIdAction(id: string): Promise<Project | null> {
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
    console.error("Error fetching project by ID via Prisma:", err);
    const staticProject = architecturalProjects.find((p) => p.id === id);
    return staticProject || null;
  }
}

export async function createProjectAction(
  data: Partial<Project>
): Promise<{ success: boolean; id?: string; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized. Admin PIN required." };
  }

  try {
    if (!data.title || !data.slug) {
      return { success: false, error: "Project Title and Slug are required." };
    }

    const id = data.id || data.slug;
    const coverImage = data.coverImage || "/projects/armity-duplex/cover.jpg";
    const dateStr = data.dateStr || new Date().toISOString().split("T")[0];

    await prisma.project.create({
      data: {
        id,
        title: data.title,
        slug: data.slug,
        category: data.category || "Residential",
        location: data.location || null,
        yearCompleted: data.yearCompleted || null,
        client: data.client || null,
        siteArea: data.siteArea || null,
        gfa: data.gfa || null,
        budget: data.budget || null,
        shortDescription: data.shortDescription || "",
        longDescription: data.longDescription || "",
        fullCaseStudy: (data.fullCaseStudy as any) || undefined,
        techStack: data.techStack || [],
        coverImage,
        gallery: (data.gallery as any) || [],
        drawings: (data.drawings as any) || [],
        demoVideo: data.demoVideo || null,
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        architecture: (data.architecture as any) || undefined,
        engineeringDecisions: (data.engineeringDecisions as any) || [],
        metrics: (data.metrics as any) || [],
        futureImprovements: data.futureImprovements || [],
        featured: data.featured ?? false,
        featuredRank: data.featuredRank ?? null,
        dateStr,
        buildingType: data.buildingType || null,
        bedroomCount: data.bedroomCount || null,
        projectCode: data.projectCode || null,
        isPublished: data.isPublished ?? true,
        status: data.status || "in-progress",
        currentStage: data.currentStage || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${data.slug}`);

    return { success: true, id };
  } catch (err: any) {
    console.error("Error creating project via Prisma:", err);
    return { success: false, error: err.message || "Failed to create project in database." };
  }
}

export async function updateProjectAction(
  id: string,
  data: Partial<Project>
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized. Admin PIN required." };
  }

  try {
    await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        location: data.location,
        yearCompleted: data.yearCompleted,
        client: data.client,
        siteArea: data.siteArea,
        gfa: data.gfa,
        budget: data.budget,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        fullCaseStudy: (data.fullCaseStudy as any) || undefined,
        techStack: data.techStack,
        coverImage: data.coverImage,
        gallery: (data.gallery as any) || undefined,
        drawings: (data.drawings as any) || undefined,
        demoVideo: data.demoVideo,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        architecture: (data.architecture as any) || undefined,
        engineeringDecisions: (data.engineeringDecisions as any) || undefined,
        metrics: (data.metrics as any) || undefined,
        futureImprovements: data.futureImprovements,
        featured: data.featured,
        featuredRank: data.featuredRank,
        dateStr: data.dateStr,
        buildingType: data.buildingType,
        bedroomCount: data.bedroomCount,
        projectCode: data.projectCode,
        isPublished: data.isPublished,
        status: data.status,
        currentStage: data.currentStage,
      },
    });

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    if (data.slug) {
      revalidatePath(`/projects/${data.slug}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error updating project via Prisma:", err);
    return { success: false, error: err.message || "Failed to update project." };
  }
}

export async function deleteProjectAction(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (err: any) {
    console.error("Error deleting project via Prisma:", err);
    return { success: false, error: err.message || "Failed to delete project." };
  }
}

export async function togglePublishAction(
  id: string,
  isPublished: boolean
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false, error: "Unauthorized." };

  try {
    await prisma.project.update({
      where: { id },
      data: { isPublished },
    });
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update project status." };
  }
}

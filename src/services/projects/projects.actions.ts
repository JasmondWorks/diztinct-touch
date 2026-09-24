"use server";

import { Project } from "./projects.types";
import { CreateProjectDto, UpdateProjectDto, ProjectResponseDto, ProjectFilterDto, PaginatedProjectsDto } from "./projects.dtos";
import { ProjectsService } from "./projects.service";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";

export async function getProjectsAction(
  options?: boolean | { includeUnpublished?: boolean }
): Promise<Project[]> {
  const includeUnpublished =
    typeof options === "boolean" ? options : !!options?.includeUnpublished;

  return await ProjectsService.getAll({ includeUnpublished });
}

export async function getPaginatedProjectsAction(
  filter?: ProjectFilterDto
): Promise<PaginatedProjectsDto> {
  return await ProjectsService.getPaginated(filter);
}

export async function getProjectBySlugAction(slug: string): Promise<Project | null> {
  return await ProjectsService.getBySlug(slug);
}

export async function getProjectByIdAction(id: string): Promise<Project | null> {
  return await ProjectsService.getById(id);
}

export async function createProjectAction(
  data: CreateProjectDto | Partial<Project>
): Promise<ProjectResponseDto> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized. Admin PIN required." };
  }

  try {
    if (!data.title || !data.slug) {
      return { success: false, error: "Project Title and Slug are required." };
    }

    const created = await ProjectsService.create(data);

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${data.slug}`);

    return { success: true, id: created.id };
  } catch (err: any) {
    console.error("Error creating project via ProjectsService:", err);
    return { success: false, error: err.message || "Failed to create project in database." };
  }
}

export async function updateProjectAction(
  id: string,
  data: UpdateProjectDto
): Promise<ProjectResponseDto> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized. Admin PIN required." };
  }

  try {
    await ProjectsService.update(id, data);

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    if (data.slug) {
      revalidatePath(`/projects/${data.slug}`);
    }

    return { success: true, id };
  } catch (err: any) {
    console.error("Error updating project via ProjectsService:", err);
    return { success: false, error: err.message || "Failed to update project." };
  }
}

export async function deleteProjectAction(id: string): Promise<ProjectResponseDto> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await ProjectsService.delete(id);

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    return { success: true, id };
  } catch (err: any) {
    console.error("Error deleting project via ProjectsService:", err);
    return { success: false, error: err.message || "Failed to delete project." };
  }
}

export async function togglePublishAction(
  id: string,
  isPublished: boolean
): Promise<ProjectResponseDto> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false, error: "Unauthorized." };

  try {
    await ProjectsService.togglePublish(id, isPublished);

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    return { success: true, id };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update project status." };
  }
}

"use server";

import { sql, initDatabase, rowToProject } from "@/db";
import { Project } from "@/types/project";
import { architecturalProjects } from "@/data/projects";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";

export async function getProjectsAction(
  options?: boolean | { includeUnpublished?: boolean }
): Promise<Project[]> {
  const includeUnpublished =
    typeof options === "boolean" ? options : !!options?.includeUnpublished;

  try {
    await initDatabase();

    const rows = includeUnpublished
      ? await sql`SELECT * FROM projects ORDER BY featured_rank ASC NULLS LAST, created_at DESC`
      : await sql`SELECT * FROM projects WHERE is_published = true ORDER BY featured_rank ASC NULLS LAST, created_at DESC`;

    if (rows.length === 0) {
      return architecturalProjects;
    }

    return rows.map(rowToProject);
  } catch (err) {
    console.error("Error fetching projects from Neon, falling back to static data:", err);
    return architecturalProjects;
  }
}

export async function getProjectBySlugAction(slug: string): Promise<Project | null> {
  try {
    await initDatabase();

    const rows = await sql`SELECT * FROM projects WHERE slug = ${slug} LIMIT 1`;
    if (rows.length > 0) {
      return rowToProject(rows[0]);
    }

    // Fallback to static data
    const staticProject = architecturalProjects.find((p) => p.slug === slug);
    return staticProject || null;
  } catch (err) {
    console.error("Error fetching project by slug from Neon:", err);
    const staticProject = architecturalProjects.find((p) => p.slug === slug);
    return staticProject || null;
  }
}

export async function getProjectByIdAction(id: string): Promise<Project | null> {
  try {
    await initDatabase();
    const rows = await sql`SELECT * FROM projects WHERE id = ${id} LIMIT 1`;
    if (rows.length > 0) {
      return rowToProject(rows[0]);
    }
    const staticProject = architecturalProjects.find((p) => p.id === id);
    return staticProject || null;
  } catch (err) {
    console.error("Error fetching project by ID from Neon:", err);
    const staticProject = architecturalProjects.find((p) => p.id === id);
    return staticProject || null;
  }
}

export async function createProjectAction(data: Partial<Project>): Promise<{ success: boolean; id?: string; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized. Admin PIN required." };
  }

  try {
    await initDatabase();

    if (!data.title || !data.slug) {
      return { success: false, error: "Project Title and Slug are required." };
    }

    const id = data.id || data.slug;
    const coverImage = data.coverImage || "/projects/armity-duplex/cover.jpg";
    const dateStr = data.dateStr || new Date().toISOString().split("T")[0];

    await sql`
      INSERT INTO projects (
        id, title, slug, category, location, year_completed, client,
        site_area, gfa, budget, short_description, long_description,
        full_case_study, tech_stack, cover_image, gallery, drawings,
        demo_video, github_url, live_url, architecture, engineering_decisions,
        metrics, future_improvements, featured, featured_rank, date_str,
        building_type, bedroom_count, project_code, is_published, updated_at
      ) VALUES (
        ${id},
        ${data.title},
        ${data.slug},
        ${data.category || "Residential"},
        ${data.location || null},
        ${data.yearCompleted || null},
        ${data.client || null},
        ${data.siteArea || null},
        ${data.gfa || null},
        ${data.budget || null},
        ${data.shortDescription || ""},
        ${data.longDescription || ""},
        ${JSON.stringify(data.fullCaseStudy || null)},
        ${data.techStack || []},
        ${coverImage},
        ${JSON.stringify(data.gallery || [])},
        ${JSON.stringify(data.drawings || [])},
        ${data.demoVideo || null},
        ${data.githubUrl || null},
        ${data.liveUrl || null},
        ${JSON.stringify(data.architecture || null)},
        ${JSON.stringify(data.engineeringDecisions || [])},
        ${JSON.stringify(data.metrics || [])},
        ${data.futureImprovements || []},
        ${data.featured ?? false},
        ${data.featuredRank ?? null},
        ${dateStr},
        ${data.buildingType || null},
        ${data.bedroomCount || null},
        ${data.projectCode || null},
        ${data.isPublished ?? true},
        NOW()
      );
    `;

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${data.slug}`);

    return { success: true, id };
  } catch (err: any) {
    console.error("Error creating project:", err);
    return { success: false, error: err.message || "Failed to create project in database." };
  }
}

export async function updateProjectAction(id: string, data: Partial<Project>): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized. Admin PIN required." };
  }

  try {
    await initDatabase();

    await sql`
      UPDATE projects SET
        title = COALESCE(${data.title}, title),
        slug = COALESCE(${data.slug}, slug),
        category = COALESCE(${data.category}, category),
        location = ${data.location ?? null},
        year_completed = ${data.yearCompleted ?? null},
        client = ${data.client ?? null},
        site_area = ${data.siteArea ?? null},
        gfa = ${data.gfa ?? null},
        budget = ${data.budget ?? null},
        short_description = COALESCE(${data.shortDescription}, short_description),
        long_description = COALESCE(${data.longDescription}, long_description),
        full_case_study = ${JSON.stringify(data.fullCaseStudy || null)},
        tech_stack = ${data.techStack || []},
        cover_image = COALESCE(${data.coverImage}, cover_image),
        gallery = ${JSON.stringify(data.gallery || [])},
        drawings = ${JSON.stringify(data.drawings || [])},
        demo_video = ${data.demoVideo ?? null},
        github_url = ${data.githubUrl ?? null},
        live_url = ${data.liveUrl ?? null},
        architecture = ${JSON.stringify(data.architecture || null)},
        engineering_decisions = ${JSON.stringify(data.engineeringDecisions || [])},
        metrics = ${JSON.stringify(data.metrics || [])},
        future_improvements = ${data.futureImprovements || []},
        featured = COALESCE(${data.featured}, featured),
        featured_rank = ${data.featuredRank ?? null},
        date_str = COALESCE(${data.dateStr}, date_str),
        building_type = ${data.buildingType ?? null},
        bedroom_count = ${data.bedroomCount ?? null},
        project_code = ${data.projectCode ?? null},
        is_published = COALESCE(${data.isPublished}, is_published),
        updated_at = NOW()
      WHERE id = ${id};
    `;

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    if (data.slug) {
      revalidatePath(`/projects/${data.slug}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error updating project:", err);
    return { success: false, error: err.message || "Failed to update project." };
  }
}

export async function deleteProjectAction(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await initDatabase();
    await sql`DELETE FROM projects WHERE id = ${id}`;

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (err: any) {
    console.error("Error deleting project:", err);
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
    await initDatabase();
    await sql`UPDATE projects SET is_published = ${isPublished}, updated_at = NOW() WHERE id = ${id}`;
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update project status." };
  }
}

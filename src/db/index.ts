import { neon } from "@neondatabase/serverless";
import { architecturalProjects } from "@/data/projects";
import { Project } from "@/types/project";

if (!process.env.DB_URL) {
  console.warn("DB_URL is not set in environment. Neon database calls may fail.");
}

export const sql = neon(process.env.DB_URL || "");

let isInitialized = false;

export async function initDatabase(): Promise<void> {
  if (isInitialized) return;
  if (!process.env.DB_URL) return;

  try {
    // Create tables if they do not exist
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        category TEXT NOT NULL,
        location TEXT,
        year_completed TEXT,
        client TEXT,
        site_area TEXT,
        gfa TEXT,
        budget TEXT,
        short_description TEXT NOT NULL,
        long_description TEXT NOT NULL,
        full_case_study JSONB,
        tech_stack TEXT[] NOT NULL DEFAULT '{}',
        cover_image TEXT NOT NULL,
        gallery JSONB NOT NULL DEFAULT '[]',
        drawings JSONB DEFAULT '[]',
        demo_video TEXT,
        github_url TEXT,
        live_url TEXT,
        architecture JSONB,
        engineering_decisions JSONB DEFAULT '[]',
        metrics JSONB DEFAULT '[]',
        future_improvements TEXT[] DEFAULT '{}',
        featured BOOLEAN DEFAULT FALSE,
        featured_rank INTEGER,
        date_str TEXT NOT NULL,
        building_type TEXT,
        bedroom_count TEXT,
        project_code TEXT,
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        typology TEXT,
        location TEXT,
        message TEXT NOT NULL,
        estimated_budget TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        path TEXT NOT NULL,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Check if projects table is empty, if so, seed from architecturalProjects
    const existing = await sql`SELECT count(*)::int as count FROM projects`;
    if (existing[0]?.count === 0) {
      console.log("Seeding initial DIZTINCT TOUCH projects into Neon database...");
      for (const p of architecturalProjects) {
        await sql`
          INSERT INTO projects (
            id, title, slug, category, location, year_completed, client,
            site_area, gfa, budget, short_description, long_description,
            full_case_study, tech_stack, cover_image, gallery, drawings,
            demo_video, github_url, live_url, architecture, engineering_decisions,
            metrics, future_improvements, featured, featured_rank, date_str,
            building_type, bedroom_count, project_code, is_published
          ) VALUES (
            ${p.id}, ${p.title}, ${p.slug}, ${p.category}, ${p.location || ""},
            ${p.yearCompleted || ""}, ${p.client || ""}, ${p.siteArea || ""},
            ${p.gfa || ""}, ${p.budget || ""}, ${p.shortDescription}, ${p.longDescription},
            ${JSON.stringify(p.fullCaseStudy || null)}, ${p.techStack},
            ${p.coverImage}, ${JSON.stringify(p.gallery || [])},
            ${JSON.stringify(p.drawings || [])}, ${p.demoVideo || null},
            ${p.githubUrl || null}, ${p.liveUrl || null},
            ${JSON.stringify(p.architecture || null)},
            ${JSON.stringify(p.engineeringDecisions || [])},
            ${JSON.stringify(p.metrics || [])}, ${p.futureImprovements || []},
            ${p.featured ?? false}, ${p.featuredRank ?? null}, ${p.dateStr},
            ${(p as any).buildingType || "Residential Duplex"},
            ${(p as any).bedroomCount || null},
            ${(p as any).projectCode || null},
            true
          ) ON CONFLICT (id) DO NOTHING;
        `;
      }
      console.log("Initial projects seeded successfully!");
    }

    isInitialized = true;
  } catch (err) {
    console.error("Failed to initialize database tables:", err);
  }
}

// Convert a database row to the TypeScript Project model
export function rowToProject(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    location: row.location || undefined,
    yearCompleted: row.year_completed || undefined,
    client: row.client || undefined,
    siteArea: row.site_area || undefined,
    gfa: row.gfa || undefined,
    budget: row.budget || undefined,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    fullCaseStudy: typeof row.full_case_study === "string" 
      ? JSON.parse(row.full_case_study) 
      : row.full_case_study || undefined,
    techStack: row.tech_stack || [],
    coverImage: row.cover_image,
    gallery: typeof row.gallery === "string" ? JSON.parse(row.gallery) : (row.gallery || []),
    drawings: typeof row.drawings === "string" ? JSON.parse(row.drawings) : (row.drawings || undefined),
    demoVideo: row.demo_video || undefined,
    githubUrl: row.github_url || undefined,
    liveUrl: row.live_url || undefined,
    architecture: typeof row.architecture === "string" 
      ? JSON.parse(row.architecture) 
      : (row.architecture || undefined),
    engineeringDecisions: typeof row.engineering_decisions === "string" 
      ? JSON.parse(row.engineering_decisions) 
      : (row.engineering_decisions || []),
    metrics: typeof row.metrics === "string" ? JSON.parse(row.metrics) : (row.metrics || []),
    futureImprovements: row.future_improvements || [],
    featured: row.featured ?? false,
    featuredRank: row.featured_rank ?? undefined,
    dateStr: row.date_str,
    buildingType: row.building_type || undefined,
    bedroomCount: row.bedroom_count || undefined,
    projectCode: row.project_code || undefined,
    isPublished: row.is_published ?? true,
    status: (row.status as any) || (row.year_completed === "Under Construction" ? "in-progress" : "completed"),
    currentStage: row.current_stage || undefined,
  } as Project;
}

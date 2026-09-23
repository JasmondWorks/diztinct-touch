"use server";

import { sql, initDatabase } from "@/db";
import { isAdminAuthenticated } from "@/lib/auth-session";

export interface AnalyticsSummary {
  totalPageViews: number;
  totalWhatsAppClicks: number;
  totalInquiries: number;
  totalProjects: number;
  conversionRate: string;
  viewsByPath: { path: string; count: number }[];
  recentEvents: {
    id: number;
    eventType: string;
    path: string;
    createdAt: string;
  }[];
}

export async function trackEventAction(
  eventType: "page_view" | "project_view" | "whatsapp_click" | "inquiry_submit",
  path: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await initDatabase();
    await sql`
      INSERT INTO analytics_events (event_type, path, metadata)
      VALUES (${eventType}, ${path}, ${JSON.stringify(metadata || {})});
    `;
  } catch (err) {
    // Fail silently so client UX is never interrupted
    console.error("Analytics track error:", err);
  }
}

export async function getAnalyticsSummaryAction(): Promise<AnalyticsSummary> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return {
      totalPageViews: 0,
      totalWhatsAppClicks: 0,
      totalInquiries: 0,
      totalProjects: 0,
      conversionRate: "0.0%",
      viewsByPath: [],
      recentEvents: [],
    };
  }

  try {
    await initDatabase();

    const [viewsRes] = await sql`
      SELECT count(*)::int as count FROM analytics_events WHERE event_type IN ('page_view', 'project_view');
    `;
    const [waRes] = await sql`
      SELECT count(*)::int as count FROM analytics_events WHERE event_type = 'whatsapp_click';
    `;
    const [inqRes] = await sql`
      SELECT count(*)::int as count FROM leads;
    `;
    const [projRes] = await sql`
      SELECT count(*)::int as count FROM projects;
    `;

    const topPaths = await sql`
      SELECT path, count(*)::int as count
      FROM analytics_events
      WHERE event_type IN ('page_view', 'project_view')
      GROUP BY path
      ORDER BY count DESC
      LIMIT 8;
    `;

    const recent = await sql`
      SELECT id, event_type, path, created_at
      FROM analytics_events
      ORDER BY created_at DESC
      LIMIT 12;
    `;

    const totalViews = viewsRes?.count || 0;
    const totalWA = waRes?.count || 0;
    const totalInquiries = inqRes?.count || 0;
    const totalInteractions = totalWA + totalInquiries;
    const conversionRate = totalViews > 0 
      ? ((totalInteractions / totalViews) * 100).toFixed(1) + "%" 
      : "0.0%";

    return {
      totalPageViews: totalViews,
      totalWhatsAppClicks: totalWA,
      totalInquiries,
      totalProjects: projRes?.count || 0,
      conversionRate,
      viewsByPath: topPaths.map((p: any) => ({ path: p.path, count: p.count })),
      recentEvents: recent.map((r: any) => ({
        id: r.id,
        eventType: r.event_type,
        path: r.path,
        createdAt: r.created_at?.toISOString?.() || String(r.created_at),
      })),
    };
  } catch (err) {
    console.error("Error generating analytics summary:", err);
    return {
      totalPageViews: 0,
      totalWhatsAppClicks: 0,
      totalInquiries: 0,
      totalProjects: 0,
      conversionRate: "0.0%",
      viewsByPath: [],
      recentEvents: [],
    };
  }
}

"use server";

import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { AnalyticsEventType, AnalyticsSummary } from "./analytics.types";

export async function trackEventAction(
  eventType: AnalyticsEventType,
  path: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await prisma.analyticsEvent.create({
      data: {
        eventType,
        path,
        metadata: metadata || {},
      },
    });
  } catch (err) {
    // Fail silently so client UX is never interrupted
    console.error("Analytics track error via Prisma:", err);
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
    const [totalViews, totalWA, totalInquiries, totalProjects, recentEvents] =
      await Promise.all([
        prisma.analyticsEvent.count({
          where: { eventType: { in: ["page_view", "project_view"] } },
        }),
        prisma.analyticsEvent.count({
          where: { eventType: "whatsapp_click" },
        }),
        prisma.lead.count(),
        prisma.project.count(),
        prisma.analyticsEvent.findMany({
          orderBy: { createdAt: "desc" },
          take: 12,
        }),
      ]);

    const topPathsRaw = await prisma.analyticsEvent.groupBy({
      by: ["path"],
      where: { eventType: { in: ["page_view", "project_view"] } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 8,
    });

    const totalInteractions = totalWA + totalInquiries;
    const conversionRate =
      totalViews > 0
        ? ((totalInteractions / totalViews) * 100).toFixed(1) + "%"
        : "0.0%";

    return {
      totalPageViews: totalViews,
      totalWhatsAppClicks: totalWA,
      totalInquiries,
      totalProjects,
      conversionRate,
      viewsByPath: topPathsRaw.map((p) => ({
        path: p.path,
        count: p._count.path,
      })),
      recentEvents: recentEvents.map((r) => ({
        id: r.id,
        eventType: r.eventType,
        path: r.path,
        createdAt: r.createdAt?.toISOString?.() || String(r.createdAt),
      })),
    };
  } catch (err) {
    console.error("Error generating analytics summary via Prisma:", err);
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

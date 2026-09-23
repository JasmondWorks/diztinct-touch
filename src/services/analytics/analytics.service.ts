import { prisma } from "@/lib/prisma";
import { TrackEventDto, AnalyticsSummaryDto, AnalyticsRecentEventDto } from "./analytics.dtos";

/**
 * AnalyticsService
 * Backend domain service handling event recording and telemetry aggregation
 */
export class AnalyticsService {
  /**
   * Record a visitor telemetry event
   */
  static async recordEvent(dto: TrackEventDto): Promise<void> {
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: dto.eventType,
          path: dto.path,
          metadata: dto.metadata || {},
        },
      });
    } catch (err) {
      console.error("Analytics recording error in AnalyticsService:", err);
    }
  }

  /**
   * Aggregate analytics KPIs and event counts
   */
  static async getSummary(): Promise<AnalyticsSummaryDto> {
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
      console.error("Error generating analytics summary in AnalyticsService:", err);
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

  /**
   * Fetch recent telemetry events
   */
  static async getRecentEvents(limit: number = 20): Promise<AnalyticsRecentEventDto[]> {
    try {
      const events = await prisma.analyticsEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
      });

      return events.map((r) => ({
        id: r.id,
        eventType: r.eventType,
        path: r.path,
        createdAt: r.createdAt?.toISOString?.() || String(r.createdAt),
      }));
    } catch {
      return [];
    }
  }
}

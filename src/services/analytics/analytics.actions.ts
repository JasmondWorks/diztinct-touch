"use server";

import { isAdminAuthenticated } from "@/lib/auth-session";
import { AnalyticsEventType, AnalyticsSummary } from "./analytics.types";
import { AnalyticsService } from "./analytics.service";

export async function trackEventAction(
  eventType: AnalyticsEventType,
  path: string,
  metadata?: Record<string, any>
): Promise<void> {
  await AnalyticsService.recordEvent({
    eventType,
    path,
    metadata,
  });
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

  return await AnalyticsService.getSummary();
}

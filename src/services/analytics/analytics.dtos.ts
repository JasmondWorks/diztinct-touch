import { AnalyticsEventType } from "./analytics.types";

/**
 * Data Transfer Objects (DTOs) for Analytics Service Module
 */

export interface TrackEventDto {
  eventType: AnalyticsEventType;
  path: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsPathMetricDto {
  path: string;
  count: number;
}

export interface AnalyticsRecentEventDto {
  id: number;
  eventType: string;
  path: string;
  createdAt: string;
}

export interface AnalyticsSummaryDto {
  totalPageViews: number;
  totalWhatsAppClicks: number;
  totalInquiries: number;
  totalProjects: number;
  conversionRate: string;
  viewsByPath: AnalyticsPathMetricDto[];
  recentEvents: AnalyticsRecentEventDto[];
}

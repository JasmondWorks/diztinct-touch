export type AnalyticsEventType =
  | "page_view"
  | "project_view"
  | "whatsapp_click"
  | "inquiry_submit";

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

export interface TrackEventPayload {
  eventType: AnalyticsEventType;
  path: string;
  metadata?: Record<string, any>;
}

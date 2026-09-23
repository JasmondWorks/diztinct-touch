import React from "react";
import { getAnalyticsSummaryAction } from "@/actions/analytics";
import { Eye, MessageSquare, Mail, TrendingUp, Activity, BarChart2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const summary = await getAnalyticsSummaryAction();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
          Analytics &amp; Conversion Performance
        </h1>
        <p className="text-xs font-mono text-muted-foreground mt-1">
          Detailed site engagement, project interest heatmaps, and prospective client conversion rates.
        </p>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 hover:border-primary/30 transition-all shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Total Views
            </span>
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <Eye className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-foreground-heading mt-2">
            {summary.totalPageViews}
          </div>
          <p className="text-[11px] font-mono text-muted-foreground mt-1">
            Across homepage &amp; portfolio projects
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 hover:border-emerald-500/30 transition-all shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              WhatsApp Clicks
            </span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-foreground-heading mt-2">
            {summary.totalWhatsAppClicks}
          </div>
          <p className="text-[11px] font-mono text-muted-foreground mt-1">
            High-intent direct chats initiated
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 hover:border-primary/30 transition-all shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Form Inquiries
            </span>
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <Mail className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-foreground-heading mt-2">
            {summary.totalInquiries}
          </div>
          <p className="text-[11px] font-mono text-muted-foreground mt-1">
            Submitted consultation requests
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 hover:border-primary/30 transition-all shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Total Conversion
            </span>
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-foreground-heading mt-2">
            {summary.conversionRate}
          </div>
          <p className="text-[11px] font-mono text-muted-foreground mt-1">
            Inquiries / Views ratio
          </p>
        </div>
      </div>

      {/* Grid: Popular Content & Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Viewed Pages / Projects */}
        <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-bold tracking-tight text-foreground-heading">
              Most Viewed Pages &amp; Projects
            </h2>
          </div>
          <p className="text-xs font-mono text-muted-foreground mb-6">
            Identifies which designs and pages attract the highest prospective client engagement
          </p>

          {summary.viewsByPath.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-muted-foreground border border-dashed border-border/80 rounded-xl">
              No page view telemetry recorded yet. Live visits will populate here automatically.
            </div>
          ) : (
            <div className="space-y-4">
              {summary.viewsByPath.map((item, idx) => {
                const maxCount = summary.viewsByPath[0]?.count || 1;
                const pct = Math.round((item.count / maxCount) * 100);

                return (
                  <div key={item.path} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-foreground truncate max-w-[280px]">
                        {idx + 1}. {item.path}
                      </span>
                      <span className="text-primary font-semibold">
                        {item.count} views
                      </span>
                    </div>
                    <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Real-time Interaction Feed */}
        <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-bold tracking-tight text-foreground-heading">
              Live Telemetry Feed
            </h2>
          </div>
          <p className="text-xs font-mono text-muted-foreground mb-6">
            Recent visitor actions across the DIZTINCT TOUCH portfolio
          </p>

          {summary.recentEvents.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-muted-foreground border border-dashed border-border/80 rounded-xl">
              No live telemetry recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {summary.recentEvents.map((event) => (
                <div key={event.id} className="py-3 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        event.eventType === "whatsapp_click"
                          ? "bg-emerald-400"
                          : event.eventType === "inquiry_submit"
                          ? "bg-primary"
                          : "bg-blue-400"
                      }`}
                    />
                    <div>
                      <div className="text-foreground font-medium capitalize">
                        {event.eventType.replace("_", " ")}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{event.path}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {new Date(event.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

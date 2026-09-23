import React from "react";
import { getAnalyticsSummaryAction } from "@/actions/analytics";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const summary = await getAnalyticsSummaryAction();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-serif text-[#F9F6F0]">Analytics & Conversion Performance</h1>
        <p className="text-xs font-mono text-[#8A8A8A] mt-1">
          Detailed site engagement, project interest heatmaps, and prospective client conversion rates.
        </p>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-xs font-mono text-[#8A8A8A] uppercase">Total Views</div>
          <div className="text-3xl font-serif font-bold text-[#F9F6F0] mt-2">
            {summary.totalPageViews}
          </div>
          <p className="text-[11px] font-mono text-[#666] mt-1">
            Across homepage & portfolio projects
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-xs font-mono text-[#8A8A8A] uppercase">WhatsApp Clicks</div>
          <div className="text-3xl font-serif font-bold text-[#25D366] mt-2">
            {summary.totalWhatsAppClicks}
          </div>
          <p className="text-[11px] font-mono text-[#666] mt-1">
            High-intent direct chats initiated
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-xs font-mono text-[#8A8A8A] uppercase">Form Inquiries</div>
          <div className="text-3xl font-serif font-bold text-[#C9A84C] mt-2">
            {summary.totalInquiries}
          </div>
          <p className="text-[11px] font-mono text-[#666] mt-1">
            Submitted consultation requests
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-xs font-mono text-[#8A8A8A] uppercase">Total Conversion</div>
          <div className="text-3xl font-serif font-bold text-[#F9F6F0] mt-2">
            {summary.conversionRate}
          </div>
          <p className="text-[11px] font-mono text-[#666] mt-1">
            Inquiries / Views ratio
          </p>
        </div>
      </div>

      {/* Grid: Popular Content & Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Viewed Pages / Projects */}
        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
          <h2 className="text-lg font-serif text-[#F9F6F0] mb-1">Most Viewed Pages & Projects</h2>
          <p className="text-xs font-mono text-[#8A8A8A] mb-6">
            Identifies which designs and pages attract the highest prospective client engagement
          </p>

          {summary.viewsByPath.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#666] border border-dashed border-white/5 rounded-lg">
              No page view telemetry recorded yet. Live visits will populate here automatically.
            </div>
          ) : (
            <div className="space-y-4">
              {summary.viewsByPath.map((item, idx) => {
                const maxCount = summary.viewsByPath[0]?.count || 1;
                const pct = Math.round((item.count / maxCount) * 100);

                return (
                  <div key={item.path} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#DDD] truncate max-w-[280px]">
                        {idx + 1}. {item.path}
                      </span>
                      <span className="text-[#C9A84C] font-semibold">
                        {item.count} views
                      </span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#C9A84C] h-full rounded-full transition-all duration-500"
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
        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
          <h2 className="text-lg font-serif text-[#F9F6F0] mb-1">Live Telemetry Feed</h2>
          <p className="text-xs font-mono text-[#8A8A8A] mb-6">
            Recent visitor actions across the DIZTINCT TOUCH portfolio
          </p>

          {summary.recentEvents.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#666] border border-dashed border-white/5 rounded-lg">
              No live telemetry recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {summary.recentEvents.map((event) => (
                <div key={event.id} className="py-3 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        event.eventType === "whatsapp_click"
                          ? "bg-[#25D366]"
                          : event.eventType === "inquiry_submit"
                          ? "bg-[#C9A84C]"
                          : "bg-blue-400"
                      }`}
                    />
                    <div>
                      <div className="text-[#F9F6F0] capitalize">
                        {event.eventType.replace("_", " ")}
                      </div>
                      <div className="text-[10px] text-[#666]">{event.path}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#888]">
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

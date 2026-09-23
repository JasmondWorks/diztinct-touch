import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAnalyticsSummaryAction } from "@/actions/analytics";
import { getProjectsAction } from "@/actions/projects";
import { getLeadsAction } from "@/actions/leads";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [summary, projects, leads] = await Promise.all([
    getAnalyticsSummaryAction(),
    getProjectsAction(true),
    getLeadsAction(),
  ]);

  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const publishedProjectsCount = projects.filter((p) => p.isPublished).length;
  const inProgressProjectsCount = projects.filter(
    (p) => p.status === "in-progress" || p.yearCompleted === "Under Construction"
  ).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif text-[#F9F6F0] tracking-tight">
            Firm Overview
          </h1>
          <p className="text-sm text-[#8A8A8A] font-mono mt-1">
            Real-time portfolio metrics, client inquiry pipeline & construction tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] px-4 py-2 rounded-lg font-mono text-xs font-semibold hover:bg-[#D4B55E] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Project
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 text-[#F9F6F0] px-4 py-2 rounded-lg font-mono text-xs transition-colors"
          >
            <span>Inquiry Pipeline</span>
            {newLeadsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#C9A84C] text-[#0A0A0A] font-bold text-[10px] flex items-center justify-center">
                {newLeadsCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Page Views */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider">Site Traffic</span>
            <span className="p-2 rounded-lg bg-white/5 text-[#C9A84C]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#F9F6F0]">
            {summary.totalPageViews}
          </div>
          <div className="text-[11px] font-mono text-[#8A8A8A] mt-1">
            Total portfolio pageviews
          </div>
        </div>

        {/* WhatsApp Inquiries */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider">WhatsApp Clicks</span>
            <span className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.35.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.232-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z" />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#F9F6F0]">
            {summary.totalWhatsAppClicks}
          </div>
          <div className="text-[11px] font-mono text-[#8A8A8A] mt-1">
            Direct chat inquiries initiated
          </div>
        </div>

        {/* Client Inquiries */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider">Client Leads</span>
            <span className="p-2 rounded-lg bg-[#C9A84C]/10 text-[#C9A84C]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#F9F6F0] flex items-center gap-2">
            <span>{summary.totalInquiries}</span>
            {newLeadsCount > 0 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-normal">
                {newLeadsCount} New
              </span>
            )}
          </div>
          <div className="text-[11px] font-mono text-[#8A8A8A] mt-1">
            Conversion Rate: <span className="text-[#C9A84C]">{summary.conversionRate}</span>
          </div>
        </div>

        {/* Portfolio Status */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider">Total Projects</span>
            <span className="p-2 rounded-lg bg-white/5 text-[#C9A84C]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#F9F6F0] flex items-center gap-2">
            <span>{projects.length}</span>
            <span className="text-xs font-mono text-[#8A8A8A]">
              ({publishedProjectsCount} Live)
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#8A8A8A] mt-1">
            {inProgressProjectsCount} Currently under construction
          </div>
        </div>
      </div>

      {/* Grid: Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Client Inquiries (2 cols) */}
        <div className="lg:col-span-2 rounded-xl bg-white/[0.02] border border-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-serif text-[#F9F6F0]">Recent Client Inquiries</h2>
              <p className="text-xs font-mono text-[#8A8A8A] mt-0.5">Prospective homeowners and commercial developers</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-mono text-[#C9A84C] hover:underline flex items-center gap-1"
            >
              <span>View All Pipeline</span>
              <span>→</span>
            </Link>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-10 text-xs font-mono text-[#666] border border-dashed border-white/10 rounded-lg">
              No client inquiries recorded yet. Forms submitted on /contact will stream here in real time.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/5 text-[#8A8A8A]">
                    <th className="pb-3 font-normal">Client Name</th>
                    <th className="pb-3 font-normal">Building Typology</th>
                    <th className="pb-3 font-normal">Status</th>
                    <th className="pb-3 font-normal">Date</th>
                    <th className="pb-3 font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3">
                        <div className="font-sans font-medium text-[#F9F6F0]">{lead.name}</div>
                        <div className="text-[10px] text-[#666]">{lead.email}</div>
                      </td>
                      <td className="py-3 text-[#AAA]">
                        <div>{lead.typology || "Duplex Project"}</div>
                        {lead.location && <div className="text-[10px] text-[#666]">{lead.location}</div>}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                            lead.status === "new"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : lead.status === "contacted"
                              ? "bg-blue-500/20 text-blue-300"
                              : lead.status === "site_inspection"
                              ? "bg-purple-500/20 text-purple-300"
                              : lead.status === "contract_signed"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-white/10 text-[#888]"
                          }`}
                        >
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 text-[#8A8A8A]">
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href="/admin/leads"
                          className="text-[#C9A84C] hover:underline"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Architectural Status & Storage Health */}
        <div className="space-y-6">
          {/* Storage & Optimization Card */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
            <h3 className="text-sm font-serif text-[#F9F6F0] mb-1">
              Neon Free Tier Storage
            </h3>
            <p className="text-xs font-mono text-[#8A8A8A] mb-4">
              512 MB Allocation • WebP Sharp Pipeline Active
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-[#AAA]">
                  <span>Storage Engine</span>
                  <span className="text-emerald-400">Connected (assets)</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C9A84C] h-full rounded-full" style={{ width: "3.5%" }} />
                </div>
                <div className="text-[10px] font-mono text-[#666] mt-1 text-right">
                  Estimated ~18MB of 512MB used
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-[#8A8A8A] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Client-side compression (1.5MB clamp)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Sharp WebP compression (82% quality)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Presigned S3 access urls</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Project Status */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
            <h3 className="text-sm font-serif text-[#F9F6F0] mb-1">
              Active Construction Highlight
            </h3>
            <p className="text-xs font-mono text-[#8A8A8A] mb-3">
              DT-25-01 • ARMITY Estate Duplex
            </p>
            <div className="text-xs text-[#AAA] space-y-2">
              <div className="flex justify-between">
                <span>Stage:</span>
                <span className="font-mono text-[#C9A84C]">First Floor Level</span>
              </div>
              <div className="flex justify-between">
                <span>Ground Floor:</span>
                <span className="text-emerald-400">Completed</span>
              </div>
              <div className="flex justify-between">
                <span>Decking:</span>
                <span className="text-emerald-400">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Catalog Overview */}
      <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-serif text-[#F9F6F0]">Project Catalog</h2>
            <p className="text-xs font-mono text-[#8A8A8A] mt-0.5">
              Manage architectural designs, construction updates, and blueprints
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-[#C9A84C] hover:underline flex items-center gap-1"
          >
            <span>View All ({projects.length})</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 6).map((proj) => (
            <div
              key={proj.id}
              className="rounded-lg bg-black/40 border border-white/5 hover:border-white/15 overflow-hidden transition-all flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] bg-white/5 w-full overflow-hidden">
                {proj.coverImage ? (
                  <Image
                    src={proj.coverImage}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#555]">
                    No cover image
                  </div>
                )}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#C9A84C] border border-[#C9A84C]/30">
                    {proj.projectCode || "DT-PROJ"}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      proj.isPublished
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40"
                        : "bg-amber-950/80 text-amber-300 border border-amber-800/40"
                    }`}
                  >
                    {proj.isPublished ? "Live" : "Draft"}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#8A8A8A] uppercase tracking-wider mb-1">
                    {proj.buildingType || proj.category} • {proj.location}
                  </div>
                  <h3 className="font-serif text-[#F9F6F0] text-base group-hover:text-[#C9A84C] transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#8A8A8A] mt-1 line-clamp-2">
                    {proj.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#666]">
                    Year: {proj.yearCompleted || "2025"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="text-[11px] font-mono text-[#8A8A8A] hover:text-[#F9F6F0] transition-colors"
                    >
                      View
                    </Link>
                    <span className="text-white/20">•</span>
                    <Link
                      href={`/admin/projects/${proj.id}/edit`}
                      className="text-[11px] font-mono text-[#C9A84C] hover:underline"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

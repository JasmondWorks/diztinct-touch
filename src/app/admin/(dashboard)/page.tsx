import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAnalyticsSummaryAction } from "@/actions/analytics";
import { getProjectsAction } from "@/actions/projects";
import { getLeadsAction } from "@/actions/leads";
import {
  Eye,
  MessageSquare,
  Users,
  Building2,
  Plus,
  ArrowRight,
  ExternalLink,
  HardHat,
  CheckCircle2,
  Database,
  ArrowUpRight,
} from "lucide-react";

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground-heading">
            Firm Overview
          </h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            Real-time portfolio metrics, client inquiry pipeline & construction tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-mono text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 bg-card border border-border hover:border-primary/40 text-foreground px-4 py-2 rounded-xl font-mono text-xs transition-colors"
          >
            <span>Inquiry Pipeline</span>
            {newLeadsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground font-bold text-[10px] flex items-center justify-center">
                {newLeadsCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Page Views */}
        <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 hover:border-primary/30 transition-all shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Site Traffic
            </span>
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <Eye className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-foreground-heading">
            {summary.totalPageViews}
          </div>
          <div className="text-[11px] font-mono text-muted-foreground mt-1">
            Total portfolio pageviews
          </div>
        </div>

        {/* WhatsApp Inquiries */}
        <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 hover:border-emerald-500/30 transition-all shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              WhatsApp Clicks
            </span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-foreground-heading">
            {summary.totalWhatsAppClicks}
          </div>
          <div className="text-[11px] font-mono text-muted-foreground mt-1">
            Direct chat inquiries initiated
          </div>
        </div>

        {/* Client Inquiries */}
        <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 hover:border-primary/30 transition-all shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Client Leads
            </span>
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-foreground-heading flex items-center gap-2">
            <span>{summary.totalInquiries}</span>
            {newLeadsCount > 0 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                {newLeadsCount} New
              </span>
            )}
          </div>
          <div className="text-[11px] font-mono text-muted-foreground mt-1">
            Conversion Rate: <span className="text-primary font-semibold">{summary.conversionRate}</span>
          </div>
        </div>

        {/* Portfolio Status */}
        <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 hover:border-primary/30 transition-all shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Total Projects
            </span>
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-foreground-heading flex items-center gap-2">
            <span>{projects.length}</span>
            <span className="text-xs font-mono text-muted-foreground">
              ({publishedProjectsCount} Live)
            </span>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground mt-1">
            {inProgressProjectsCount} In active construction
          </div>
        </div>
      </div>

      {/* Grid: Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Client Inquiries (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground-heading">
                Recent Client Inquiries
              </h2>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                Prospective homeowners and commercial developers
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
            >
              <span>View All Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-10 text-xs font-mono text-muted-foreground border border-dashed border-border/80 rounded-xl">
              No client inquiries recorded yet. Forms submitted on /contact will stream here in real time.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-border/80 text-muted-foreground">
                    <th className="pb-3 font-normal">Client Name</th>
                    <th className="pb-3 font-normal">Building Typology</th>
                    <th className="pb-3 font-normal">Status</th>
                    <th className="pb-3 font-normal">Date</th>
                    <th className="pb-3 font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3">
                        <div className="font-sans font-semibold text-foreground-heading">{lead.name}</div>
                        <div className="text-[10px] text-muted-foreground">{lead.email}</div>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        <div>{lead.typology || "Duplex Project"}</div>
                        {lead.location && <div className="text-[10px] text-muted-foreground/80">{lead.location}</div>}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono font-medium ${
                            lead.status === "new"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : lead.status === "contacted"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : lead.status === "site_inspection"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : lead.status === "contract_signed"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href="/admin/leads"
                          className="text-primary hover:underline font-semibold"
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
          <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold tracking-tight text-foreground-heading">
                Storage Allocation
              </h3>
            </div>
            <p className="text-xs font-mono text-muted-foreground mb-4">
              512 MB Allocation • WebP Sharp Pipeline Active
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-muted-foreground">
                  <span>Storage Engine</span>
                  <span className="text-emerald-400 font-semibold">Connected (assets)</span>
                </div>
                <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "3.5%" }} />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1 text-right">
                  Estimated ~18MB of 512MB used
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 text-[11px] font-mono text-muted-foreground space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Client-side compression (1.5MB clamp)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sharp WebP compression (82% quality)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Presigned S3 access urls</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Project Status */}
          <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <HardHat className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold tracking-tight text-foreground-heading">
                Active Construction Highlight
              </h3>
            </div>
            <p className="text-xs font-mono text-muted-foreground mb-3">
              DT-25-01 • ARMITY Estate Duplex
            </p>
            <div className="text-xs text-muted-foreground space-y-2">
              <div className="flex justify-between">
                <span>Stage:</span>
                <span className="font-mono text-primary font-semibold">First Floor Level</span>
              </div>
              <div className="flex justify-between">
                <span>Ground Floor:</span>
                <span className="text-emerald-400 font-medium">Completed</span>
              </div>
              <div className="flex justify-between">
                <span>Decking:</span>
                <span className="text-emerald-400 font-medium">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Catalog Overview */}
      <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground-heading">
              Project Catalog
            </h2>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">
              Manage architectural designs, construction updates, and blueprints
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
          >
            <span>View All ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 6).map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-card border border-border/80 hover:border-primary/40 overflow-hidden transition-all flex flex-col group shadow-xs hover:shadow-md"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden">
                {proj.coverImage ? (
                  <Image
                    src={proj.coverImage}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-muted-foreground">
                    No cover image
                  </div>
                )}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-mono text-primary border border-primary/20 font-semibold">
                    {proj.projectCode || "DT-PROJ"}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium backdrop-blur-md ${
                      proj.isPublished
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {proj.isPublished ? "Live" : "Draft"}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
                    {proj.buildingType || proj.category} • {proj.location}
                  </div>
                  <h3 className="font-bold tracking-tight text-foreground-heading text-base group-hover:text-primary transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {proj.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Year: {proj.yearCompleted || "2025"}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                    >
                      View
                    </Link>
                    <span className="text-border">•</span>
                    <Link
                      href={`/admin/projects/${proj.id}/edit`}
                      className="text-[11px] font-mono text-primary hover:underline font-semibold"
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

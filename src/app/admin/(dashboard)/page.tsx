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
  HardHat,
  CheckCircle2,
  Database,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
          <Button asChild className="gap-2 font-mono text-xs">
            <Link href="/admin/projects/new">
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 font-mono text-xs">
            <Link href="/admin/leads">
              <span>Inquiry Pipeline</span>
              {newLeadsCount > 0 && (
                <Badge variant="default" className="px-1.5 py-0 h-5 text-[10px] min-w-5 justify-center">
                  {newLeadsCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Page Views */}
        <Card className="hover:border-primary/30 transition-all">
          <CardContent className="p-5">
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
          </CardContent>
        </Card>

        {/* WhatsApp Inquiries */}
        <Card className="hover:border-emerald-500/30 transition-all">
          <CardContent className="p-5">
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
          </CardContent>
        </Card>

        {/* Client Inquiries */}
        <Card className="hover:border-primary/30 transition-all">
          <CardContent className="p-5">
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
                <Badge variant="success" className="text-xs font-mono">
                  {newLeadsCount} New
                </Badge>
              )}
            </div>
            <div className="text-[11px] font-mono text-muted-foreground mt-1">
              Conversion Rate: <span className="text-primary font-semibold">{summary.conversionRate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Status */}
        <Card className="hover:border-primary/30 transition-all">
          <CardContent className="p-5">
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
          </CardContent>
        </Card>
      </div>

      {/* Grid: Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Client Inquiries (2 cols) */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg">Recent Client Inquiries</CardTitle>
              <CardDescription className="font-mono text-xs">
                Prospective homeowners and commercial developers
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs font-mono text-primary gap-1">
              <Link href="/admin/leads">
                <span>View All Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
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
                    {leads.slice(0, 5).map((lead) => {
                      const badgeVariant =
                        lead.status === "new"
                          ? "warning"
                          : lead.status === "contacted"
                          ? "default"
                          : lead.status === "site_inspection"
                          ? "secondary"
                          : lead.status === "contract_signed"
                          ? "success"
                          : "outline";

                      return (
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
                            <Badge variant={badgeVariant} className="text-[10px] uppercase font-mono font-medium">
                              {lead.status.replace("_", " ")}
                            </Badge>
                          </td>
                          <td className="py-3 text-muted-foreground">
                            {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                            })}
                          </td>
                          <td className="py-3 text-right">
                            <Button variant="ghost" size="sm" asChild className="h-7 px-2 font-mono text-primary font-semibold">
                              <Link href="/admin/leads">
                                Manage
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Architectural Status & Storage Health */}
        <div className="space-y-6">
          {/* Storage & Optimization Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm">Storage Allocation</CardTitle>
              </div>
              <CardDescription className="text-xs font-mono">
                512 MB Allocation • WebP Sharp Pipeline Active
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-muted-foreground">
                  <span>Storage Engine</span>
                  <Badge variant="success" className="text-[10px] font-mono">
                    Connected (assets)
                  </Badge>
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
            </CardContent>
          </Card>

          {/* Featured Project Status */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm">Active Construction Highlight</CardTitle>
              </div>
              <CardDescription className="text-xs font-mono">
                DT-25-01 • ARMITY Estate Duplex
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground space-y-2">
                <div className="flex justify-between">
                  <span>Stage:</span>
                  <span className="font-mono text-primary font-semibold">First Floor Level</span>
                </div>
                <div className="flex justify-between">
                  <span>Ground Floor:</span>
                  <Badge variant="success" className="text-[10px] font-mono">Completed</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Decking:</span>
                  <Badge variant="success" className="text-[10px] font-mono">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Projects Catalog Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg">Project Catalog</CardTitle>
            <CardDescription className="font-mono text-xs">
              Manage architectural designs, construction updates, and blueprints
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-xs font-mono text-primary gap-1">
            <Link href="/admin/projects">
              <span>View All ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.slice(0, 6).map((proj) => (
              <Card
                key={proj.id}
                className="overflow-hidden hover:border-primary/40 transition-all flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-16/10 bg-muted w-full overflow-hidden">
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
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-md text-[10px] font-mono text-primary border-primary/20 font-semibold">
                      {proj.projectCode || "DT-PROJ"}
                    </Badge>
                    <Badge
                      variant={proj.isPublished ? "success" : "warning"}
                      className="backdrop-blur-md text-[10px] font-mono font-medium"
                    >
                      {proj.isPublished ? "Live" : "Draft"}
                    </Badge>
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
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-[11px] font-mono text-muted-foreground hover:text-foreground">
                        <Link href={`/projects/${proj.slug}`} target="_blank">
                          View
                        </Link>
                      </Button>
                      <span className="text-border">•</span>
                      <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-[11px] font-mono text-primary font-semibold hover:text-primary hover:bg-primary/10">
                        <Link href={`/admin/projects/${proj.id}/edit`}>
                          Edit →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

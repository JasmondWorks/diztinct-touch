"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { logoutAdminAction } from "@/actions/auth";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Users,
  BarChart3,
  Globe,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Plus,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "New Project", href: "/admin/projects/new", icon: PlusCircle },
  { label: "Client Leads (CRM)", href: "/admin/leads", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

function getActiveNavHref(pathname: string, navItems: typeof NAV_ITEMS): string {
  // If exact match exists, pick it
  const exactMatch = navItems.find((item) => item.href === pathname);
  if (exactMatch) return exactMatch.href;

  // Otherwise, find items where pathname starts with item.href + "/"
  // Sort by href length descending so the most specific match wins (e.g. /admin/projects/new before /admin/projects)
  const prefixMatches = navItems
    .filter((item) => pathname.startsWith(item.href + "/"))
    .sort((a, b) => b.href.length - a.href.length);

  return prefixMatches[0]?.href ?? "";
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeNavHref = getActiveNavHref(pathname, NAV_ITEMS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved desktop collapse state
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin_sidebar_collapsed");
    if (saved === "true") {
      setDesktopCollapsed(true);
    }
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDesktopCollapse = () => {
    const next = !desktopCollapsed;
    setDesktopCollapsed(next);
    localStorage.setItem("admin_sidebar_collapsed", String(next));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans selection:bg-primary/20 selection:text-white">
      {/* ============================================================
          DESKTOP SIDEBAR (Visible on md and up, collapsible)
          ============================================================ */}
      <aside
        className={cn(
          "hidden md:flex flex-col justify-between shrink-0 border-r border-border/80 bg-card/60 backdrop-blur-md sticky top-0 h-screen transition-all duration-300 z-40",
          desktopCollapsed ? "w-20 p-3" : "w-64 p-5"
        )}
      >
        <div className="space-y-6">
          {/* Header Monogram & Brand */}
          <div
            className={cn(
              "flex items-center pb-5 border-b border-border/80",
              desktopCollapsed ? "justify-center" : "justify-between"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#9f1239] via-[#cc2b43] to-[#db4d24] text-white font-bold text-sm shadow-md">
                {siteConfig.monogram}
              </div>
              {!desktopCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm tracking-tight text-foreground-heading truncate">
                    Studio Admin
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-primary flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 shrink-0" />
                    <span className="truncate">Mayowa • Verified</span>
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse / Expand Button */}
            {!desktopCollapsed && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleDesktopCollapse}
                title="Collapse sidebar"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <PanelLeftClose className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Collapsed Expand Toggle */}
          {desktopCollapsed && (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleDesktopCollapse}
                title="Expand sidebar"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <PanelLeftOpen className="w-4 h-4 text-primary" />
              </Button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === activeNavHref;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={desktopCollapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center rounded-xl text-xs font-semibold transition-all group",
                    desktopCollapsed
                      ? "justify-center p-3"
                      : "gap-3 px-3.5 py-2.5",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!desktopCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-border/80 space-y-2">
          {/* Theme Row */}
          {!desktopCollapsed ? (
            <div className="flex items-center justify-between rounded-xl border border-border/80 bg-background/50 px-3.5 py-2 text-xs font-medium">
              <span className="text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          ) : (
            <div className="flex justify-center py-1">
              <ThemeToggle />
            </div>
          )}

          {/* Public site link */}
          <Link
            href="/"
            target="_blank"
            title={desktopCollapsed ? "View Public Site" : undefined}
            className={cn(
              "flex items-center rounded-xl border border-border bg-background text-xs font-medium text-foreground hover:border-primary/40 transition-all",
              desktopCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3.5 py-2"
            )}
          >
            <Globe className="h-4 w-4 text-primary shrink-0" />
            {!desktopCollapsed && <span>View Public Site</span>}
          </Link>

          {/* Logout button */}
          <form action={logoutAdminAction}>
            <Button
              type="submit"
              variant="ghost"
              title={desktopCollapsed ? "Lock Admin" : undefined}
              className={cn(
                "w-full text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive transition-all",
                desktopCollapsed ? "justify-center p-2.5 h-10" : "justify-start gap-2.5 px-3.5 py-2"
              )}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!desktopCollapsed && <span>Lock Admin</span>}
            </Button>
          </form>
        </div>
      </aside>

      {/* ============================================================
          MOBILE DRAWER SIDEBAR (Slide-over on < md)
          ============================================================ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop overlay */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-fadeIn"
          />

          {/* Slide-over Drawer */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-card border-r border-border p-5 flex flex-col justify-between z-50 animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between pb-5 border-b border-border/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#9f1239] via-[#cc2b43] to-[#db4d24] text-white font-bold text-sm shadow-md">
                    {siteConfig.monogram}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-tight text-foreground-heading">
                      Studio Admin
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-primary flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Mayowa • Verified
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                  className="h-9 w-9 text-muted-foreground hover:text-foreground"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href === activeNavHref;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer Navigation */}
            <div className="pt-6 border-t border-border/80 space-y-2.5">
              <div className="flex items-center justify-between rounded-xl border border-border/80 bg-background/50 px-4 py-2.5 text-xs font-medium">
                <span className="text-muted-foreground">Interface Theme</span>
                <ThemeToggle />
              </div>

              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground hover:border-primary/40 transition-all"
              >
                <Globe className="h-4 w-4 text-primary" />
                <span>View Public Site</span>
              </Link>

              <form action={logoutAdminAction}>
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full justify-start gap-2.5 px-4 py-2.5 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Lock Admin</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MAIN CONTENT AREA & TOPBAR
          ============================================================ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Responsive Header */}
        <header className="h-16 border-b border-border/80 bg-card/60 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          {/* Left section: Hamburger on mobile / Breadcrumbs on desktop */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger button */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden h-9 w-9"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Mobile Brand indicator */}
            <div className="md:hidden flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-[#9f1239] via-[#cc2b43] to-[#db4d24] text-white font-bold text-xs shadow-xs">
                {siteConfig.monogram}
              </div>
              <span className="font-bold text-xs tracking-tight text-foreground-heading truncate">
                Admin
              </span>
            </div>

            {/* Desktop breadcrumb */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Management Portal
              </span>
              <span className="text-xs text-border">•</span>
              <span className="text-xs font-mono text-primary font-medium">
                Lead Architect: Mayowa
              </span>
            </div>
          </div>

          {/* Right section: Theme + Quick actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-nowrap">
            <ThemeToggle />

            {/* View public portfolio */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors inline-flex flex-row items-center gap-1.5 border border-border px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-card/40 whitespace-nowrap shrink-0"
              title="View Public Portfolio"
            >
              <span className="hidden sm:inline whitespace-nowrap">Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </Link>

            {/* Create new project button */}
            <Button asChild size="sm" className="font-mono text-xs h-8 px-3 shrink-0 whitespace-nowrap">
              <Link
                href="/admin/projects/new"
                className="inline-flex flex-row items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">New Project</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

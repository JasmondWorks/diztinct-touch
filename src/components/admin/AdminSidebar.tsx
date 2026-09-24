"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Users,
  BarChart3,
  Globe,
  LogOut,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useAdminAuth } from "./AdminAuthProvider";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "New Project", href: "/admin/projects/new", icon: PlusCircle },
  { label: "Client Leads (CRM)", href: "/admin/leads", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

function getActiveNavHref(pathname: string, navItems: typeof NAV_ITEMS): string {
  const exactMatch = navItems.find((item) => item.href === pathname);
  if (exactMatch) return exactMatch.href;

  const prefixMatches = navItems
    .filter((item) => pathname.startsWith(item.href + "/"))
    .sort((a, b) => b.href.length - a.href.length);

  return prefixMatches[0]?.href ?? "";
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const activeNavHref = getActiveNavHref(pathname, NAV_ITEMS);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [isLocking, setIsLocking] = useState(false);

  const handleConfirmLock = async () => {
    setIsLocking(true);
    try {
      await logout();
    } finally {
      setIsLocking(false);
      setIsLockModalOpen(false);
    }
  };

  return (
    <>
      <aside className="w-64 shrink-0 border-r border-border/80 bg-card/60 backdrop-blur-md flex flex-col justify-between p-5 min-h-screen">
        <div className="space-y-6">
          {/* Header Brand Logo & Title */}
          <div className="flex items-center gap-3 pb-5 border-b border-border/80">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-brand-navy">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.studioName}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-foreground-heading">
                Studio Admin
              </span>
              <span className="text-[10px] uppercase tracking-wider text-primary flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Mayowa • PIN Verified
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === activeNavHref;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all",
                    isActive
                      ? "bg-primary text-white shadow-sm"
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

        {/* Footer Navigation: Theme Switcher, Public View & Logout */}
        <div className="pt-6 border-t border-border/80 space-y-2">
          <div className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-3.5 py-2 text-xs font-medium">
            <span className="text-muted-foreground">Interface Theme</span>
            <ThemeToggle />
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground hover:border-primary/40 transition-all"
          >
            <Globe className="h-4 w-4 text-primary" />
            <span>View Public Site</span>
          </Link>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsLockModalOpen(true)}
            className="w-full justify-start gap-2.5 rounded-xl px-3.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Lock Admin (Logout)</span>
          </Button>
        </div>
      </aside>

      {/* Lock Admin Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLockModalOpen}
        setIsOpen={setIsLockModalOpen}
        title="Lock Administrative Console"
        subtitle="Are you sure you want to end your administrative session? You will need your security PIN to regain access."
        icon={Lock}
        variant="warning"
        confirmLabel={isLocking ? "Locking..." : "Lock Console"}
        cancelLabel="Stay Signed In"
        isLoading={isLocking}
        onConfirm={handleConfirmLock}
      />
    </>
  );
}

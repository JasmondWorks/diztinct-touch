import React from "react";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import Link from "next/link";
import { ArrowUpRight, Plus, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Admin Portal | DIZTINCT TOUCH HOME DESIGN",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans selection:bg-primary/20 selection:text-white">
        {/* Sidebar navigation */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-16 border-b border-border/80 bg-card/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider hidden sm:inline">
                Management Portal
              </span>
              <span className="text-xs text-border hidden sm:inline">•</span>
              <span className="text-xs font-mono text-primary font-medium">
                Lead Architect: Mayowa
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors flex items-center gap-1.5 border border-border px-3.5 py-1.5 rounded-xl bg-card/40"
              >
                <span>View Public Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/admin/projects/new"
                className="text-xs font-mono font-semibold bg-primary text-primary-foreground px-4 py-1.5 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Project</span>
              </Link>
            </div>
          </header>

          {/* Dynamic page content */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthProvider>
  );
}

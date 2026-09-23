import React from "react";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import Link from "next/link";

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
      <div className="min-h-screen bg-[#0A0A0A] text-[#F9F6F0] flex flex-col md:flex-row font-sans selection:bg-[#C9A84C]/30">
      {/* Sidebar navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider hidden sm:inline">
              Management Portal
            </span>
            <span className="text-xs text-white/20 hidden sm:inline">•</span>
            <span className="text-xs font-mono text-[#C9A84C]">
              Lead Architect: Mayowa
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#8A8A8A] hover:text-[#C9A84C] transition-colors flex items-center gap-1.5 border border-white/10 px-3 py-1.5 rounded-lg hover:border-[#C9A84C]/40"
            >
              <span>View Public Portfolio</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <Link
              href="/admin/projects/new"
              className="text-xs font-mono font-medium bg-[#C9A84C] text-[#0A0A0A] px-3.5 py-1.5 rounded-lg hover:bg-[#D4B55E] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>+ New Project</span>
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

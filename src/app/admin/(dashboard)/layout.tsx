import React from "react";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin Portal | DIZTINCT TOUCH HOME DESIGNS",
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
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}

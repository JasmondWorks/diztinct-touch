import React from "react";
import { AdminLoader } from "@/components/admin/AdminLoader";

export default function AdminDashboardLoading() {
  return (
    <AdminLoader
      label="Loading Studio Data..."
      sublabel="Architectural Portfolio & CRM Stream"
      fullScreen={false}
    />
  );
}

import React from "react";
import { getLeadsAction } from "@/actions/leads";
import { LeadsTable } from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await getLeadsAction();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
          Client Inquiries Pipeline
        </h1>
        <p className="text-xs font-mono text-muted-foreground mt-1">
          Review, contact, and manage incoming leads from potential homeowners and commercial clients.
        </p>
      </div>

      <LeadsTable initialLeads={leads} />
    </div>
  );
}

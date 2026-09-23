import React from "react";
import { getLeadsAction } from "@/actions/leads";
import { LeadsTable } from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await getLeadsAction();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-serif text-[#F9F6F0]">Client Inquiries Pipeline</h1>
        <p className="text-xs font-mono text-[#8A8A8A] mt-1">
          Review, contact, and manage incoming leads from potential homeowners and commercial clients.
        </p>
      </div>

      <LeadsTable initialLeads={leads} />
    </div>
  );
}

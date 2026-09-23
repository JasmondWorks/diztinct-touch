"use client";

import React, { useState, useTransition } from "react";
import { Lead, updateLeadStatusAction, deleteLeadAction } from "@/actions/leads";
import { useRouter } from "next/navigation";

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const filtered = leads.filter((l) => {
    const matchesFilter = filterStatus === "all" || l.status === filterStatus;
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.phone && l.phone.includes(search)) ||
      (l.location && l.location.toLowerCase().includes(search.toLowerCase())) ||
      (l.typology && l.typology.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (id: number, newStatus: Lead["status"]) => {
    startTransition(async () => {
      // Optimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
      const res = await updateLeadStatusAction(id, newStatus);
      if (!res.success) {
        alert(res.error || "Failed to update lead status.");
        router.refresh();
      }
    });
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    startTransition(async () => {
      const res = await updateLeadStatusAction(selectedLead.id, selectedLead.status, leadNotes);
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: leadNotes } : l))
        );
        setSelectedLead((prev) => prev ? { ...prev, notes: leadNotes } : null);
        alert("Client notes updated successfully.");
      } else {
        alert(res.error || "Failed to save notes.");
      }
    });
  };

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Are you sure you want to remove lead from "${name}"?`)) return;

    startTransition(async () => {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
      await deleteLeadAction(id);
      router.refresh();
    });
  };

  // WhatsApp quick response generator
  const getWhatsAppLink = (lead: Lead) => {
    if (!lead.phone) return null;
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("0") ? "234" + cleanPhone.slice(1) : cleanPhone;
    const message = encodeURIComponent(
      `Hello ${lead.name}, this is Mayowa from DIZTINCT TOUCH HOME DESIGN. Thank you for your inquiry regarding your ${
        lead.typology || "building"
      } project. I would love to discuss your vision and schedule a site inspection.`
    );
    return `https://wa.me/${formattedPhone}?text=${message}`;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by client name, email, phone, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-xs font-mono text-[#F9F6F0] placeholder:text-[#666] focus:outline-none focus:border-[#C9A84C]"
          />
          <svg
            className="w-4 h-4 text-[#8A8A8A] absolute left-3.5 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "new", "contacted", "site_inspection", "contract_signed", "archived"] as const).map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-colors ${
                  filterStatus === status
                    ? "bg-[#C9A84C] text-[#0A0A0A] font-semibold"
                    : "bg-white/[0.03] text-[#8A8A8A] hover:text-[#F9F6F0] border border-white/5"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01] text-[#8A8A8A]">
                <th className="py-3 px-4 font-normal">Client Info</th>
                <th className="py-3 px-4 font-normal">Building Typology</th>
                <th className="py-3 px-4 font-normal">Estimated Budget</th>
                <th className="py-3 px-4 font-normal">Lead Status</th>
                <th className="py-3 px-4 font-normal">Received</th>
                <th className="py-3 px-4 font-normal text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#666]">
                    No client inquiries found matching your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => {
                  const waLink = getWhatsAppLink(lead);
                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedLead(lead);
                        setLeadNotes(lead.notes || "");
                      }}
                    >
                      {/* Name & Contact */}
                      <td className="py-3 px-4">
                        <div className="font-sans font-medium text-[#F9F6F0] text-sm">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-[#888]">{lead.email}</div>
                        {lead.phone && (
                          <div className="text-[10px] text-[#C9A84C]">{lead.phone}</div>
                        )}
                      </td>

                      {/* Typology & Location */}
                      <td className="py-3 px-4">
                        <div className="text-[#AAA] font-medium">
                          {lead.typology || "Residential Duplex"}
                        </div>
                        {lead.location && (
                          <div className="text-[10px] text-[#666]">{lead.location}</div>
                        )}
                      </td>

                      {/* Budget */}
                      <td className="py-3 px-4 text-[#AAA]">
                        {lead.estimatedBudget || "Not specified"}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as Lead["status"])
                          }
                          disabled={isPending}
                          className={`px-2.5 py-1 rounded text-[10px] uppercase font-mono border focus:outline-none ${
                            lead.status === "new"
                              ? "bg-amber-950/50 text-amber-300 border-amber-800/60"
                              : lead.status === "contacted"
                              ? "bg-blue-950/50 text-blue-300 border-blue-800/60"
                              : lead.status === "site_inspection"
                              ? "bg-purple-950/50 text-purple-300 border-purple-800/60"
                              : lead.status === "contract_signed"
                              ? "bg-emerald-950/50 text-emerald-300 border-emerald-800/60"
                              : "bg-zinc-900 text-zinc-400 border-zinc-700"
                          }`}
                        >
                          <option value="new">New Inquiry</option>
                          <option value="contacted">Contacted</option>
                          <option value="site_inspection">Site Inspection</option>
                          <option value="contract_signed">Contract Signed</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      {/* Received Date */}
                      <td className="py-3 px-4 text-[#8A8A8A]">
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.35.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.232-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z" />
                              </svg>
                            </a>
                          )}

                          <a
                            href={`mailto:${lead.email}?subject=DIZTINCT TOUCH HOME DESIGN - Architectural Inquiry Response`}
                            className="p-1.5 rounded bg-white/5 text-[#AAA] hover:text-[#F9F6F0] hover:bg-white/10 transition-colors"
                            title="Send Email"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(lead.id, lead.name)}
                            className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
                            title="Delete Lead"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over or Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-[#0E0E0E] border-l border-white/10 h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#C9A84C] tracking-wider">
                    Client Details
                  </span>
                  <h2 className="text-xl font-serif text-[#F9F6F0]">
                    {selectedLead.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="text-xs font-mono text-[#8A8A8A] hover:text-[#F9F6F0]"
                >
                  ✕ Close
                </button>
              </div>

              {/* Inquiry Details */}
              <div className="mt-6 space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-[#666] block text-[10px]">Email Address</span>
                    <a href={`mailto:${selectedLead.email}`} className="text-[#C9A84C] underline break-all">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-[#666] block text-[10px]">Phone Number</span>
                    <span className="text-[#F9F6F0]">{selectedLead.phone || "None provided"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-[#666] block text-[10px]">Building Typology</span>
                    <span className="text-[#F9F6F0]">{selectedLead.typology || "Residential Duplex"}</span>
                  </div>
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-[#666] block text-[10px]">Site Location</span>
                    <span className="text-[#F9F6F0]">{selectedLead.location || "Not specified"}</span>
                  </div>
                </div>

                <div className="p-4 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[#666] block text-[10px] mb-1">Inquiry Message</span>
                  <p className="font-sans text-sm text-[#DDD] whitespace-pre-wrap leading-relaxed">
                    {selectedLead.message}
                  </p>
                </div>

                {/* Internal Architect Notes */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-mono text-[#AAA]">
                    Internal Notes (Mayowa & Team)
                  </label>
                  <textarea
                    rows={4}
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="Add notes about client requirements, site visit date, quote status, or contract milestones..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-xs font-mono text-[#F9F6F0] focus:outline-none focus:border-[#C9A84C]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={isPending}
                      className="px-4 py-2 rounded bg-[#C9A84C] text-[#0A0A0A] font-semibold text-xs hover:bg-[#D4B55E] transition-colors"
                    >
                      Save Internal Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              {getWhatsAppLink(selectedLead) && (
                <a
                  href={getWhatsAppLink(selectedLead)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-black font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#22bf5b] transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              )}
              <a
                href={`mailto:${selectedLead.email}`}
                className="bg-white/10 text-[#F9F6F0] text-xs px-4 py-2 rounded-lg hover:bg-white/15 transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

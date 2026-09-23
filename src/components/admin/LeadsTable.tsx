"use client";

import React, { useState, useTransition } from "react";
import { Lead, updateLeadStatusAction, deleteLeadAction } from "@/actions/leads";
import { useRouter } from "next/navigation";
import { Search, Mail, Trash2, MessageSquare, X } from "lucide-react";

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
      const res = await deleteLeadAction(id);
      if (res.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        router.refresh();
      } else {
        alert("Failed to delete lead.");
      }
    });
  };

  const getWhatsAppLink = (lead: Lead) => {
    if (!lead.phone) return null;
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("0")
      ? "234" + cleanPhone.slice(1)
      : cleanPhone;

    const message = encodeURIComponent(
      `Hello ${lead.name}, this is Mayowa from DIZTINCT TOUCH HOME DESIGN regarding your inquiry for the ${lead.typology || "architectural design"} project. Let us discuss your requirements.`
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
            className="w-full bg-card border border-border/80 rounded-xl px-4 py-2.5 pl-10 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "new", "contacted", "site_inspection", "contract_signed", "archived"] as const).map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono capitalize transition-all cursor-pointer ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border/80 hover:border-border"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground">
                <th className="py-3 px-4 font-normal">Client Info</th>
                <th className="py-3 px-4 font-normal">Building Typology</th>
                <th className="py-3 px-4 font-normal">Estimated Budget</th>
                <th className="py-3 px-4 font-normal">Lead Status</th>
                <th className="py-3 px-4 font-normal">Received</th>
                <th className="py-3 px-4 font-normal text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No client inquiries found matching your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => {
                  const waLink = getWhatsAppLink(lead);
                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedLead(lead);
                        setLeadNotes(lead.notes || "");
                      }}
                    >
                      {/* Name & Contact */}
                      <td className="py-3 px-4">
                        <div className="font-sans font-semibold text-foreground-heading text-sm">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{lead.email}</div>
                        {lead.phone && (
                          <div className="text-[10px] text-primary font-medium">{lead.phone}</div>
                        )}
                      </td>

                      {/* Typology & Location */}
                      <td className="py-3 px-4">
                        <div className="text-foreground font-medium">
                          {lead.typology || "Residential Duplex"}
                        </div>
                        {lead.location && (
                          <div className="text-[10px] text-muted-foreground">{lead.location}</div>
                        )}
                      </td>

                      {/* Budget */}
                      <td className="py-3 px-4 text-muted-foreground">
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
                          className={`px-3 py-1 rounded-full text-[10px] uppercase font-mono border focus:outline-hidden cursor-pointer ${
                            lead.status === "new"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : lead.status === "contacted"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : lead.status === "site_inspection"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : lead.status === "contract_signed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-muted text-muted-foreground border-border"
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
                      <td className="py-3 px-4 text-muted-foreground">
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
                              className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <a
                            href={`mailto:${lead.email}?subject=DIZTINCT TOUCH HOME DESIGN - Architectural Inquiry Response`}
                            className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(lead.id, lead.name)}
                            className="p-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-lg bg-card border-l border-border h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border/80">
                <div>
                  <span className="text-[10px] font-mono uppercase text-primary tracking-wider font-semibold">
                    Client Details
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground-heading">
                    {selectedLead.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Inquiry Details */}
              <div className="mt-6 space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/80">
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                      Email Address
                    </span>
                    <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline break-all font-semibold">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/80">
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                      Phone Number
                    </span>
                    <span className="text-foreground font-semibold">{selectedLead.phone || "None provided"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/80">
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                      Building Typology
                    </span>
                    <span className="text-foreground font-semibold">{selectedLead.typology || "Residential Duplex"}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/80">
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                      Site Location
                    </span>
                    <span className="text-foreground font-semibold">{selectedLead.location || "Not specified"}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/80">
                  <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                    Inquiry Message
                  </span>
                  <p className="font-sans text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {selectedLead.message}
                  </p>
                </div>

                {/* Internal Architect Notes */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    Internal Notes (Mayowa &amp; Team)
                  </label>
                  <textarea
                    rows={4}
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="Add notes about client requirements, site visit date, quote status, or contract milestones..."
                    className="w-full bg-card border border-border/80 rounded-xl p-3 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={isPending}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
                    >
                      Save Internal Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-6 border-t border-border/80 flex items-center justify-between gap-3">
              {getWhatsAppLink(selectedLead) && (
                <a
                  href={getWhatsAppLink(selectedLead)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}
              <a
                href={`mailto:${selectedLead.email}`}
                className="bg-card border border-border hover:border-primary/40 text-foreground text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

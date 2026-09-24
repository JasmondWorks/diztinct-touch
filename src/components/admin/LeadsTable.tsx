"use client";

import React, { useState, useTransition } from "react";
import { Lead, updateLeadStatusAction, deleteLeadAction } from "@/actions/leads";
import { useRouter } from "next/navigation";
import { Search, Mail, Trash2, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";

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
        setSelectedLead((prev) => (prev ? { ...prev, notes: leadNotes } : null));
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

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "warning";
      case "contacted":
        return "secondary";
      case "site_inspection":
        return "primary";
      case "contract_signed":
        return "success";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search by client name, email, phone, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "new", "contacted", "site_inspection", "contract_signed", "archived"] as const).map(
            (status) => (
              <Button
                key={status}
                type="button"
                size="sm"
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(status)}
                className="capitalize rounded-xl"
              >
                {status.replace("_", " ")}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground">
                <th className="py-3.5 px-4 font-normal">Client Info</th>
                <th className="py-3.5 px-4 font-normal">Building Typology</th>
                <th className="py-3.5 px-4 font-normal">Estimated Budget</th>
                <th className="py-3.5 px-4 font-normal">Lead Status</th>
                <th className="py-3.5 px-4 font-normal">Received</th>
                <th className="py-3.5 px-4 font-normal text-right">Quick Contact</th>
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
                      <td className="py-3.5 px-4">
                        <div className="font-sans font-semibold text-foreground-heading text-sm">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{lead.email}</div>
                        {lead.phone && (
                          <div className="text-[10px] text-primary font-medium">{lead.phone}</div>
                        )}
                      </td>

                      {/* Typology & Location */}
                      <td className="py-3.5 px-4">
                        <div className="text-foreground font-medium">
                          {lead.typology || "Residential Duplex"}
                        </div>
                        {lead.location && (
                          <div className="text-[10px] text-muted-foreground">{lead.location}</div>
                        )}
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {lead.estimatedBudget || "Not specified"}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="w-36">
                          <Select
                            value={lead.status}
                            onValueChange={(val) =>
                              handleStatusChange(lead.id, val as Lead["status"])
                            }
                            disabled={isPending}
                          >
                            <SelectTrigger className="h-8 text-[11px] py-1 font-mono">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New Inquiry</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="site_inspection">Site Inspection</SelectItem>
                              <SelectItem value="contract_signed">Contract Signed</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>

                      {/* Received Date */}
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {waLink && (
                            <Button
                              asChild
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 text-emerald-500 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20"
                              title="Chat on WhatsApp"
                            >
                              <a href={waLink} target="_blank" rel="noopener noreferrer">
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          )}

                          <Button
                            asChild
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            title="Send Email"
                          >
                            <a href={`mailto:${lead.email}?subject=DIZTINCT TOUCH HOME DESIGN - Architectural Inquiry Response`}>
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(lead.id, lead.name)}
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
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

      {/* Reusable Modal encapsulating Dialog components */}
      <Modal
        isOpen={!!selectedLead}
        setIsOpen={(open) => {
          if (!open) setSelectedLead(null);
        }}
        title={
          selectedLead && (
            <div className="flex items-center gap-2.5">
              <span>{selectedLead.name}</span>
              <Badge variant={getBadgeVariant(selectedLead.status)}>
                {selectedLead.status.replace("_", " ")}
              </Badge>
            </div>
          )
        }
        description="Prospective Client Inquiry & Tectonic Project Brief"
        size="lg"
        footer={
          selectedLead && (
            <div className="flex items-center justify-between w-full gap-3 pt-2">
              {getWhatsAppLink(selectedLead) ? (
                <Button asChild variant="emerald" className="gap-2">
                  <a href={getWhatsAppLink(selectedLead)!} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Client</span>
                  </a>
                </Button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <Button asChild variant="outline" className="gap-2">
                  <a href={`mailto:${selectedLead.email}`}>
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                </Button>
                <Button variant="ghost" onClick={() => setSelectedLead(null)}>
                  Close
                </Button>
              </div>
            </div>
          )
        }
      >
        {selectedLead && (
          <div className="space-y-5 text-xs font-mono">
            {/* Meta Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                  Email Address
                </span>
                <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline break-all font-semibold">
                  {selectedLead.email}
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                  Phone Number
                </span>
                <span className="text-foreground font-semibold">{selectedLead.phone || "None provided"}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                  Building Typology
                </span>
                <span className="text-foreground font-semibold">{selectedLead.typology || "Residential Duplex"}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                  Site Location
                </span>
                <span className="text-foreground font-semibold">{selectedLead.location || "Not specified"}</span>
              </div>
            </div>

            {/* Inquiry Message */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/80">
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-1.5 font-semibold">
                Client Inquiry Message
              </span>
              <p className="font-sans text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {selectedLead.message}
              </p>
            </div>

            {/* Internal Architect Notes */}
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                Internal Architect Notes (Mayowa &amp; Team)
              </label>
              <Textarea
                rows={4}
                value={leadNotes}
                onChange={(e) => setLeadNotes(e.target.value)}
                placeholder="Add notes about client requirements, site visit date, quote status, or contract milestones..."
              />
              <div className="flex justify-end pt-1">
                <Button
                  type="button"
                  variant="default"
                  onClick={handleSaveNotes}
                  disabled={isPending}
                >
                  Save Internal Notes
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

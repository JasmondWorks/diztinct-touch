"use client";

import React, { useState, useTransition } from "react";
import { Lead, updateLeadStatusAction, deleteLeadAction } from "@/actions/leads";
import { useRouter } from "next/navigation";
import { Search, Mail, Trash2, MessageSquare, AlertTriangle } from "lucide-react";
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
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { EmptyState } from "@/components/ui/empty-state";

import { DataTable, ColumnDef } from "@/components/ui/data-table";

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState<string>("");
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
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

  const handleDelete = (lead: Lead) => {
    setLeadToDelete(lead);
  };

  const confirmDeleteLead = () => {
    if (!leadToDelete) return;
    const targetId = leadToDelete.id;
    startTransition(async () => {
      const res = await deleteLeadAction(targetId);
      if (res.success) {
        setLeads((prev) => prev.filter((l) => l.id !== targetId));
        if (selectedLead?.id === targetId) setSelectedLead(null);
        setLeadToDelete(null);
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
      `Hello ${lead.name}, this is Mayowa from DIZTINCT TOUCH HOME DESIGNS regarding your inquiry for the ${lead.typology || "architectural design"} project. Let us discuss your requirements.`
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

  const columns: ColumnDef<Lead>[] = [
    {
      id: "client-info",
      header: "Client Info",
      cell: ({ row }) => (
        <div>
          <div className="font-sans font-semibold text-foreground-heading text-sm">
            {row.name}
          </div>
          <div className="text-[11px] text-muted-foreground">{row.email}</div>
          {row.phone && (
            <div className="text-[10px] text-primary font-medium">{row.phone}</div>
          )}
        </div>
      ),
    },
    {
      id: "typology-location",
      header: "Building Typology",
      cell: ({ row }) => (
        <div>
          <div className="text-foreground font-medium">
            {row.typology || "Residential Duplex"}
          </div>
          {row.location && (
            <div className="text-[10px] text-muted-foreground">{row.location}</div>
          )}
        </div>
      ),
    },
    {
      id: "budget",
      header: "Estimated Budget",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.estimatedBudget || "Not specified"}
        </span>
      ),
    },
    {
      id: "status",
      header: "Lead Status",
      cell: ({ row }) => (
        <div className="w-36" onClick={(e) => e.stopPropagation()}>
          <Select
            value={row.status}
            onValueChange={(val) =>
              handleStatusChange(row.id, val as Lead["status"])
            }
            disabled={isPending}
          >
            <SelectTrigger className="h-8 text-[11px] py-1">
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
      ),
    },
    {
      id: "received",
      header: "Received",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Quick Contact",
      align: "right",
      cell: ({ row }) => {
        const waLink = getWhatsAppLink(row);
        return (
          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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
              <a href={`mailto:${row.email}?subject=DIZTINCT TOUCH HOME DESIGNS - Architectural Inquiry Response`}>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleDelete(row)}
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
              title="Delete Lead"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      },
    },
  ];

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

      {/* Main Leads DataTable */}
      <DataTable
        columns={columns}
        data={filtered}
        loading={isPending}
        isPaginated={true}
        numLoaderRows={5}
        onRowClick={(lead) => {
          setSelectedLead(lead);
          setLeadNotes(lead.notes || "");
        }}
        emptyTitle="No Inquiries Found"
        emptyMessage={
          search
            ? `No client inquiries match "${search}". Try resetting your search or status filter.`
            : "No prospective client intake records match your active filter."
        }
        emptyIcon={Mail}
        emptyActionLabel="Clear Filters"
        onEmptyAction={() => {
          setSearch("");
          setFilterStatus("all");
        }}
      />

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
          <div className="space-y-5 text-xs">
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
              <label className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
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

      {/* Delete Lead Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!leadToDelete}
        setIsOpen={(open) => !open && setLeadToDelete(null)}
        title="Confirm Lead Removal"
        subtitle="Are you sure you want to remove this client inquiry? All communication history and architect notes will be permanently erased."
        icon={AlertTriangle}
        variant="destructive"
        confirmLabel={isPending ? "Deleting..." : "Permanently Delete Lead"}
        isLoading={isPending}
        onConfirm={confirmDeleteLead}
      >
        {leadToDelete && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs space-y-2 mt-2">
            <div className="font-semibold text-foreground">
              Client: <span className="text-destructive font-bold">{leadToDelete.name}</span>
            </div>
            <div className="text-muted-foreground">
              Email: {leadToDelete.email} {leadToDelete.phone ? `• ${leadToDelete.phone}` : ""}
            </div>
            <div className="text-muted-foreground">
              Typology: {leadToDelete.typology || "Residential"} • Location: {leadToDelete.location || "Nigeria"}
            </div>
          </div>
        )}
      </ConfirmationModal>
    </div>
  );
}

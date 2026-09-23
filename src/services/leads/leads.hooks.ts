"use client";

import { useState, useTransition } from "react";
import { Lead } from "./leads.types";
import { updateLeadStatusAction, deleteLeadAction } from "./leads.actions";

export function useLeadManagement(initialLeads: Lead[]) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [isPending, startTransition] = useTransition();

  const updateStatus = (id: number, newStatus: Lead["status"], notes?: string) => {
    startTransition(async () => {
      // Optimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus, notes: notes ?? l.notes } : l))
      );
      await updateLeadStatusAction(id, newStatus, notes);
    });
  };

  const removeLead = (id: number) => {
    startTransition(async () => {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      await deleteLeadAction(id);
    });
  };

  return {
    leads,
    setLeads,
    isPending,
    updateStatus,
    removeLead,
  };
}

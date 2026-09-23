export type LeadStatus =
  | "new"
  | "contacted"
  | "site_inspection"
  | "contract_signed"
  | "archived";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  typology?: string;
  location?: string;
  message: string;
  estimatedBudget?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitLeadInput {
  name: string;
  email: string;
  phone?: string;
  typology?: string;
  location?: string;
  message: string;
  estimatedBudget?: string;
}

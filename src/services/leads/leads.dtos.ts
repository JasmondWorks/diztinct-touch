import { Lead, LeadStatus } from "./leads.types";

/**
 * Data Transfer Objects (DTOs) for Leads Service Module
 */

export interface CreateLeadDto {
  name: string;
  email: string;
  phone?: string;
  typology?: string;
  location?: string;
  message: string;
  estimatedBudget?: string;
}

export interface UpdateLeadStatusDto {
  id: number;
  status: LeadStatus;
  notes?: string;
}

export interface LeadFilterDto {
  status?: LeadStatus | "all";
  search?: string;
  limit?: number;
}

export interface LeadResponseDto {
  success: boolean;
  error?: string;
  id?: number;
  lead?: Lead;
}

export interface LeadStatsDto {
  total: number;
  newCount: number;
  contacted: number;
  siteInspection: number;
  contractSigned: number;
  archived: number;
}

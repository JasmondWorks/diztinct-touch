import { z } from "zod";

export const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "site_inspection",
  "contract_signed",
  "archived",
]);

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  typology: z.string().min(1, "Please select a building typology."),
  location: z.string().optional(),
  estimatedBudget: z.string().optional(),
  message: z.string().min(10, "Please provide a brief message describing your site or project (at least 10 characters)."),
});

export const updateLeadStatusSchema = z.object({
  id: z.number().int(),
  status: leadStatusSchema,
  notes: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;

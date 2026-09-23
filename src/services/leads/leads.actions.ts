"use server";

import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";
import { Lead } from "./leads.types";
import { CreateLeadDto, UpdateLeadStatusDto, LeadResponseDto } from "./leads.dtos";
import { LeadsService } from "./leads.service";
import { leadSchema } from "./leads.schemas";

export async function submitLeadAction(
  data: CreateLeadDto
): Promise<LeadResponseDto> {
  try {
    const validated = leadSchema.safeParse(data);
    if (!validated.success) {
      const firstError = validated.error.issues[0]?.message || "Invalid submission details.";
      return { success: false, error: firstError };
    }

    const lead = await LeadsService.create(data);

    // Track analytics event
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: "inquiry_submit",
          path: "/contact",
          metadata: { typology: data.typology, location: data.location },
        },
      });
    } catch {
      // Ignore telemetry failure
    }

    revalidatePath("/admin");
    revalidatePath("/admin/leads");

    return { success: true, id: lead.id, lead };
  } catch (err: any) {
    console.error("Error submitting client inquiry via LeadsService:", err);
    return { success: false, error: "We could not save your inquiry. Please try WhatsApp directly." };
  }
}

export async function getLeadsAction(): Promise<Lead[]> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return [];

  try {
    return await LeadsService.getAll();
  } catch (err) {
    console.error("Error fetching leads via LeadsService:", err);
    return [];
  }
}

export async function updateLeadStatusAction(
  id: number,
  status: Lead["status"],
  notes?: string
): Promise<LeadResponseDto> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false, error: "Unauthorized." };

  try {
    const updated = await LeadsService.updateStatus({ id, status, notes });
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return { success: true, id: updated.id, lead: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteLeadAction(id: number): Promise<{ success: boolean }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false };

  try {
    await LeadsService.delete(id);
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return { success: true };
  } catch {
    return { success: false };
  }
}

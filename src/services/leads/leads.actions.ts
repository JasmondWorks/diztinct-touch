"use server";

import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";
import { Lead, SubmitLeadInput } from "./leads.types";

export async function submitLeadAction(
  data: SubmitLeadInput
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!data.name || !data.email || !data.message) {
      return { success: false, error: "Please fill in your name, email, and project message." };
    }

    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        typology: data.typology || "Residential Duplex",
        location: data.location || null,
        message: data.message,
        estimatedBudget: data.estimatedBudget || null,
        status: "new",
      },
    });

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

    return { success: true };
  } catch (err: any) {
    console.error("Error submitting client inquiry via Prisma:", err);
    return { success: false, error: "We could not save your inquiry. Please try WhatsApp directly." };
  }
}

export async function getLeadsAction(): Promise<Lead[]> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return [];

  try {
    const rows = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone || undefined,
      typology: r.typology || undefined,
      location: r.location || undefined,
      message: r.message,
      estimatedBudget: r.estimatedBudget || undefined,
      status: r.status as Lead["status"],
      notes: r.notes || undefined,
      createdAt: r.createdAt?.toISOString?.() || String(r.createdAt),
      updatedAt: r.updatedAt?.toISOString?.() || String(r.updatedAt),
    }));
  } catch (err) {
    console.error("Error fetching leads via Prisma:", err);
    return [];
  }
}

export async function updateLeadStatusAction(
  id: number,
  status: Lead["status"],
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false, error: "Unauthorized." };

  try {
    await prisma.lead.update({
      where: { id },
      data: {
        status,
        notes: notes !== undefined ? notes : undefined,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteLeadAction(id: number): Promise<{ success: boolean }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false };

  try {
    await prisma.lead.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return { success: true };
  } catch {
    return { success: false };
  }
}

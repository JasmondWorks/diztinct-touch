"use server";

import { sql, initDatabase } from "@/db";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  typology?: string;
  location?: string;
  message: string;
  estimatedBudget?: string;
  status: "new" | "contacted" | "site_inspection" | "contract_signed" | "archived";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export async function submitLeadAction(data: {
  name: string;
  email: string;
  phone?: string;
  typology?: string;
  location?: string;
  message: string;
  estimatedBudget?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await initDatabase();

    if (!data.name || !data.email || !data.message) {
      return { success: false, error: "Please fill in your name, email, and project message." };
    }

    await sql`
      INSERT INTO leads (
        name, email, phone, typology, location, message, estimated_budget, status
      ) VALUES (
        ${data.name},
        ${data.email},
        ${data.phone || null},
        ${data.typology || "Residential Duplex"},
        ${data.location || null},
        ${data.message},
        ${data.estimatedBudget || null},
        'new'
      );
    `;

    // Also track analytics event
    await sql`
      INSERT INTO analytics_events (event_type, path, metadata)
      VALUES ('inquiry_submit', '/contact', ${JSON.stringify({ typology: data.typology, location: data.location })});
    `;

    revalidatePath("/admin");
    revalidatePath("/admin/leads");

    return { success: true };
  } catch (err: any) {
    console.error("Error submitting client inquiry:", err);
    return { success: false, error: "We could not save your inquiry. Please try WhatsApp directly." };
  }
}

export async function getLeadsAction(): Promise<Lead[]> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return [];

  try {
    await initDatabase();
    const rows = await sql`SELECT * FROM leads ORDER BY created_at DESC`;

    return rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone || undefined,
      typology: r.typology || undefined,
      location: r.location || undefined,
      message: r.message,
      estimatedBudget: r.estimated_budget || undefined,
      status: r.status,
      notes: r.notes || undefined,
      createdAt: r.created_at?.toISOString?.() || String(r.created_at),
      updatedAt: r.updated_at?.toISOString?.() || String(r.updated_at),
    }));
  } catch (err) {
    console.error("Error fetching leads:", err);
    return [];
  }
}

export async function updateLeadStatusAction(
  id: number,
  status: "new" | "contacted" | "site_inspection" | "contract_signed" | "archived",
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return { success: false, error: "Unauthorized." };

  try {
    await initDatabase();
    await sql`
      UPDATE leads SET
        status = ${status},
        notes = COALESCE(${notes ?? null}, notes),
        updated_at = NOW()
      WHERE id = ${id};
    `;

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
    await initDatabase();
    await sql`DELETE FROM leads WHERE id = ${id}`;
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return { success: true };
  } catch {
    return { success: false };
  }
}

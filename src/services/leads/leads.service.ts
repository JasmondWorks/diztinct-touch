import { prisma } from "@/lib/prisma";
import { Lead } from "./leads.types";
import {
  CreateLeadDto,
  UpdateLeadStatusDto,
  LeadFilterDto,
  LeadStatsDto,
  PaginatedLeadsDto,
} from "./leads.dtos";

function prismaToLead(r: any): Lead {
  return {
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
  };
}

/**
 * LeadsService
 * Backend domain service handling client intake, CRM pipeline progression, and Prisma queries
 */
export class LeadsService {
  /**
   * Create a new prospective client lead
   */
  static async create(dto: CreateLeadDto): Promise<Lead> {
    const created = await prisma.lead.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone || null,
        typology: dto.typology || "Residential Duplex",
        location: dto.location || null,
        message: dto.message,
        estimatedBudget: dto.estimatedBudget || null,
        status: "new",
      },
    });

    return prismaToLead(created);
  }

  /**
   * Fetch all leads matching filter criteria
   */
  static async getAll(filter?: LeadFilterDto): Promise<Lead[]> {
    const where: any = {};

    if (filter?.status && filter.status !== "all") {
      where.status = filter.status;
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { message: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
      ];
    }

    const rows = await prisma.lead.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { createdAt: "desc" },
      take: filter?.limit,
    });

    return rows.map(prismaToLead);
  }

  /**
   * Fetch backend-paginated leads matching filter criteria
   */
  static async getPaginated(filter?: LeadFilterDto): Promise<PaginatedLeadsDto> {
    const page = Math.max(1, filter?.page ?? 1);
    const pageSize = Math.max(1, filter?.pageSize ?? 10);
    const where: any = {};

    if (filter?.status && filter.status !== "all") {
      where.status = filter.status;
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { message: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
      ];
    }

    const filterWhere = Object.keys(where).length > 0 ? where : undefined;

    const [totalCount, rows] = await Promise.all([
      prisma.lead.count({ where: filterWhere }),
      prisma.lead.findMany({
        where: filterWhere,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    return {
      data: rows.map(prismaToLead),
      totalCount,
      page,
      pageSize,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  /**
   * Fetch a single lead by ID
   */
  static async getById(id: number): Promise<Lead | null> {
    const row = await prisma.lead.findUnique({
      where: { id },
    });

    return row ? prismaToLead(row) : null;
  }

  /**
   * Update lead CRM status and architectural notes
   */
  static async updateStatus(dto: UpdateLeadStatusDto): Promise<Lead> {
    const updated = await prisma.lead.update({
      where: { id: dto.id },
      data: {
        status: dto.status,
        notes: dto.notes !== undefined ? dto.notes : undefined,
      },
    });

    return prismaToLead(updated);
  }

  /**
   * Permanently delete a lead record
   */
  static async delete(id: number): Promise<boolean> {
    await prisma.lead.delete({
      where: { id },
    });
    return true;
  }

  /**
   * Aggregate CRM pipeline counts
   */
  static async getStats(): Promise<LeadStatsDto> {
    const [total, newCount, contacted, siteInspection, contractSigned, archived] =
      await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: "new" } }),
        prisma.lead.count({ where: { status: "contacted" } }),
        prisma.lead.count({ where: { status: "site_inspection" } }),
        prisma.lead.count({ where: { status: "contract_signed" } }),
        prisma.lead.count({ where: { status: "archived" } }),
      ]);

    return {
      total,
      newCount,
      contacted,
      siteInspection,
      contractSigned,
      archived,
    };
  }
}

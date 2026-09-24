"use client";

import React from "react";
import Link from "next/link";
import { Lead } from "@/services/leads/leads.types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function RecentLeadsTable({ leads }: { leads: Lead[] }) {
  const columns: ColumnDef<Lead>[] = [
    {
      id: "client",
      header: "Client Name",
      cell: ({ row }) => (
        <div>
          <div className="font-sans font-semibold text-foreground-heading">{row.name}</div>
          <div className="text-[10px] text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    {
      id: "typology",
      header: "Building Typology",
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          <div>{row.typology || "Duplex Project"}</div>
          {row.location && (
            <div className="text-[10px] text-muted-foreground/80">{row.location}</div>
          )}
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const badgeVariant =
          row.status === "new"
            ? "warning"
            : row.status === "contacted"
            ? "secondary"
            : "primary";

        return (
          <Badge
            variant={
              row.status === "contract_signed"
                ? "success"
                : row.status === "new"
                ? "warning"
                : row.status === "archived"
                ? "outline"
                : badgeVariant
            }
            className="text-[10px] uppercase font-semibold"
          >
            {row.status.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      id: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      align: "right",
      cell: () => (
        <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-primary font-semibold">
          <Link href="/admin/leads">
            Manage
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={leads}
      isPaginated={false}
      emptyTitle="No Recent Inquiries"
      emptyMessage="No client inquiries recorded yet. Forms submitted on /contact will stream here in real time."
      emptyIcon={Mail}
      className="border-0 bg-transparent"
    />
  );
}

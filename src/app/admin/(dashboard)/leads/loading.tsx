import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminLeadsLoading() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-44 rounded-xl" />
      </div>

      {/* Filter Tabs & Search Bar Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-xl shrink-0" />
          ))}
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>

      {/* Table Skeleton */}
      <Card className="border border-border/80 bg-card/60 overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y divide-border/60">
            {/* Table Header Row */}
            <div className="p-4 bg-muted/30 flex items-center justify-between">
              <Skeleton className="h-3 w-28" />
              <div className="hidden md:flex items-center gap-12">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>

            {/* Table Body Rows */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-48" />
                </div>

                <div className="hidden md:flex items-center gap-12">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-7 w-28 rounded-lg" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

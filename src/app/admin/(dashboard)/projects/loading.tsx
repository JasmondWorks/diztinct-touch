import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminProjectsLoading() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Filter Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <Skeleton className="h-10 w-full sm:w-80 rounded-xl" />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Skeleton className="h-10 w-36 rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>

      {/* Table Skeleton */}
      <Card className="border border-border/80 bg-card/60 overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y divide-border/60">
            {/* Table Header Row */}
            <div className="p-4 bg-muted/30 flex items-center justify-between">
              <Skeleton className="h-3 w-32" />
              <div className="hidden md:flex items-center gap-12">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>

            {/* Table Body Rows */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Skeleton className="h-12 w-16 rounded-lg shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-40 sm:w-60" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-12">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
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

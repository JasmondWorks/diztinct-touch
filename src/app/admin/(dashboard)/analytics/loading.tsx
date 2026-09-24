import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminAnalyticsLoading() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="space-y-2">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>

      {/* KPI Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border border-border/80 bg-card/60">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-8 rounded-xl" />
              </div>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Chart & Breakdown Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-border/80 bg-card/60 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </Card>

        <Card className="border border-border/80 bg-card/60 p-6 space-y-4">
          <div className="space-y-1.5 pb-4 border-b border-border/80">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-48" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/40">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

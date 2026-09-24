import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44 md:w-56" />
          <Skeleton className="h-4 w-72 md:w-96" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-36 rounded-xl" />
          <Skeleton className="h-9 w-36 rounded-xl" />
        </div>
      </div>

      {/* Primary KPI Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border border-border/80 bg-card/60">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-8 rounded-xl" />
              </div>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid: Projects & Leads Stream Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Projects Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-border/80 bg-card/60">
            <div className="p-6 border-b border-border/80 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-3 w-64" />
              </div>
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
            <CardContent className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-muted/20"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-xl shrink-0" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </div>
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Leads Stream Skeleton */}
        <div className="space-y-4">
          <Card className="border border-border/80 bg-card/60">
            <div className="p-6 border-b border-border/80 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
            <CardContent className="p-6 space-y-3.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-44" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

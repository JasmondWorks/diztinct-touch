import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function ProjectDetailLoading() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Project Header Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-10 sm:h-14 w-3/4 max-w-2xl" />
        <Skeleton className="h-5 w-full max-w-3xl" />
      </div>

      {/* Hero Cover Image Skeleton */}
      <Skeleton className="w-full aspect-16/9 rounded-3xl" />

      {/* Specifications & Overview Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border/80 bg-card/60 p-6 sm:p-8 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </Card>

          <Card className="border border-border/80 bg-card/60 p-6 sm:p-8 space-y-4">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </Card>
        </div>

        {/* Specs Table Skeleton */}
        <div>
          <Card className="border border-border/80 bg-card/60 p-6 space-y-4">
            <Skeleton className="h-5 w-36" />
            <div className="divide-y divide-border/60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-28" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Gallery Section Skeleton */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="aspect-4/3 rounded-2xl w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}

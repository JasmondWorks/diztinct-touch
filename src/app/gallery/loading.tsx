import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-fadeIn">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-10 sm:h-12 w-80 max-w-md" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-xl shrink-0" />
        ))}
      </div>

      {/* Image Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-4/3 w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}

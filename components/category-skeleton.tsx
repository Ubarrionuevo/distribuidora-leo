"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function CategorySkeleton() {
  return (
    <div className="w-full h-[120px] lg:h-[200px] rounded-lg bg-white shadow-sm overflow-hidden">
      <Skeleton className="w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex flex-col justify-between">
        <div className="flex items-center">
          <Skeleton className="h-8 w-8 rounded-full mr-2" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function CategorySkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </div>
  )
} 
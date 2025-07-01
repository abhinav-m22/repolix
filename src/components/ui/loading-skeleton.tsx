"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function CardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Skeleton className="h-16 w-full md:w-[300px]" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CardSkeleton />
        </div>
        <CardSkeleton />
      </div>

      <CardSkeleton />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-full max-w-[300px]" />
      <div className="rounded-md border">
        <div className="border-b px-4">
          <TableRowSkeleton />
        </div>
        <div className="border-b px-4">
          <TableRowSkeleton />
        </div>
        <div className="border-b px-4">
          <TableRowSkeleton />
        </div>
        <div className="border-b px-4">
          <TableRowSkeleton />
        </div>
        <div className="px-4">
          <TableRowSkeleton />
        </div>
      </div>
    </div>
  )
} 
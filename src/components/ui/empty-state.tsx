"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  actionOnClick?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  actionOnClick,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-fadeIn",
      className
    )}>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        {description}
      </p>
      {actionLabel && (actionHref || actionOnClick) && (
        <div className="mt-6">
          {actionHref ? (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={actionOnClick}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  )
} 
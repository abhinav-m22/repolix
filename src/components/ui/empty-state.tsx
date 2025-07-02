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
      "flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center animate-fadeIn shadow-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all duration-200",
      className
    )}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-950/70 ring-1 ring-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
        <Icon className="h-7 w-7 text-cyan-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70 max-w-md mx-auto">
        {description}
      </p>
      {actionLabel && (actionHref || actionOnClick) && (
        <div className="mt-6">
          {actionHref ? (
            <Button 
              asChild 
              className="bg-blue-950/70 text-white border border-cyan-500/30 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button 
              onClick={actionOnClick}
              className="bg-blue-950/70 text-white border border-cyan-500/30 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )
} 
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface KeyboardShortcutProps {
  keys: string[]
  className?: string
}

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            {key}
          </kbd>
          {index < keys.length - 1 && <span className="text-muted-foreground">+</span>}
        </React.Fragment>
      ))}
    </div>
  )
} 
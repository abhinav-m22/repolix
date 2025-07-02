import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-black/10 border-white/10 placeholder:text-white/50 text-white focus-visible:border-[#3B82F6] focus-visible:ring-[#3B82F6]/30 flex field-sizing-content min-h-16 w-full rounded-md border backdrop-blur-sm px-3 py-2 text-base shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-white/50 selection:bg-cyan-500/20 selection:text-cyan-400 border-white/10 bg-blue-950/40 backdrop-blur-sm flex h-10 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-all duration-200 outline-none text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-cyan-500/50 focus:ring-cyan-500/20 focus:ring-[3px] focus:shadow-[0_0_10px_rgba(34,211,238,0.1)]",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500/50",
        className
      )}
      {...props}
    />
  )
}

export { Input }

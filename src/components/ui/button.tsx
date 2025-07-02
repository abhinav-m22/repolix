import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[#3B82F6]/30 focus-visible:ring-[3px] shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white shadow-lg hover:shadow-[#3B82F6]/20 hover:opacity-90",
        destructive:
          "bg-red-500 text-white shadow-lg hover:bg-red-600",
        outline:
          "border border-white/20 bg-black/20 text-white backdrop-blur-sm hover:bg-white/10",
        secondary:
          "bg-white/10 backdrop-blur-sm text-white shadow-sm hover:bg-white/20",
        ghost:
          "text-white hover:bg-white/10 hover:text-white",
        link: "text-[#60A5FA] underline-offset-4 hover:underline",
        gradient: 
          "bg-gradient-to-r from-[#3B82F6] to-[#A78BFA] text-white shadow-lg hover:opacity-90",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

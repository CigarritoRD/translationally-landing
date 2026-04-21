import * as React from "react"
import { cn } from "@/lib/utils"

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[160px] w-full rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white",
        "placeholder:text-white/35",
        "outline-none transition-all duration-300",
        "focus:border-[#ff7a7c]/35 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#ff7a7c]/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none",
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

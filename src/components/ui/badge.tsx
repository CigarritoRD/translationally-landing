import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "soft" | "outline" | "coral"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "border border-white/10 bg-white/8 text-white/80",
  soft: "border border-white/8 bg-white/[0.05] text-white/75",
  outline: "border border-white/10 bg-transparent text-white/75",
  coral: "border border-[#ef4d4f]/20 bg-[#ef4d4f]/10 text-[#ff9b9d]",
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.08em]",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}
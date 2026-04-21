import * as React from "react"
import { cn } from "@/lib/utils"

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[26px] border border-white/6 bg-white/[0.045] shadow-xl backdrop-blur-md",
        className
      )}
      {...props}
    />
  )
})

Card.displayName = "Card"

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6", className)} {...props} />
})

CardContent.displayName = "CardContent"

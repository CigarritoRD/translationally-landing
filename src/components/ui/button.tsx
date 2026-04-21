import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type ButtonVariant = "default" | "outline" | "ghost" | "soft"
type ButtonSize = "default" | "sm" | "lg" | "icon"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "border border-[#ef4d4f]/20 bg-[#ef4d4f] text-white shadow-[0_10px_30px_rgba(239,77,79,0.22)] hover:bg-[#e5484b]",
  outline:
    "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]",
  ghost:
    "border border-transparent bg-transparent text-white/86 hover:bg-white/[0.06]",
  soft:
    "border border-white/8 bg-white/[0.055] text-white hover:bg-white/[0.08]",
}

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
  icon: "h-11 w-11",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300",
          "outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a7c]/35 focus-visible:ring-offset-0",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.985]",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

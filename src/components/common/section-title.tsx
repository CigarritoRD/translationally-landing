
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-[15px] leading-8 text-white/70 lg:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
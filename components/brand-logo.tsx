import { LOGO_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

export function BrandLogo({ className }: { className?: string }) {
  if (LOGO_URL) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={LOGO_URL || "/placeholder.svg"}
        alt="next ECA logo"
        className={cn("h-8 w-auto", className)}
      />
    )
  }
  return (
    <span className={cn("font-heading text-xl font-extrabold tracking-tight", className)}>
      next <span className="text-primary">ECA</span>
    </span>
  )
}

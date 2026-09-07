import { Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandProps = {
  /** Size of the logo mark in px */
  size?: number;
  /** Wordmark text size classes */
  textClassName?: string;
  /** Icon color override — default is brand blue, pass "text-white" on dark surfaces */
  iconClassName?: string;
  className?: string;
  /** Hide the "Finance Lab" wordmark, show the mark only */
  markOnly?: boolean;
};

/**
 * Single source of truth for the Finance Lab lockup (mark + wordmark) so every
 * surface — sidebar, mobile header, landing nav, footer, auth cards — stays in
 * sync.
 */
export default function Brand({
  size = 36,
  textClassName = "text-2xl",
  iconClassName,
  className,
  markOnly = false,
}: BrandProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Landmark
        className={cn("shrink-0 text-primary", iconClassName)}
        style={{ width: size, height: size }}
        strokeWidth={1.75}
      />
      {!markOnly && (
        <span
          className={cn("font-extrabold tracking-tight whitespace-nowrap", textClassName)}
        >
          Finance Lab
        </span>
      )}
    </span>
  );
}

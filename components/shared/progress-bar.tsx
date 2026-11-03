"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number        // 0-100
  label?: string
  showPercent?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
  color?: "default" | "green" | "amber" | "red"
}

const colorMap = {
  default: "bg-primary",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
}

const sizeMap = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
}

export function ProgressBar({
  value,
  label,
  showPercent = true,
  className,
  size = "md",
  color = "default",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
          )}
          {showPercent && (
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-muted",
          sizeMap[size]
        )}
      >
        <motion.div
          className={cn("h-full rounded-full", colorMap[color])}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

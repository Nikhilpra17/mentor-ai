import { Flame, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface XpBadgeProps {
  xp: number
  streak: number
  className?: string
}

export function XpBadge({ xp, streak, className }: XpBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1">
        <Zap className="size-3.5 text-amber-400" />
        <span className="text-xs font-bold tabular-nums text-amber-300">
          {xp.toLocaleString()} XP
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">
        <Flame className="size-3.5 text-orange-400" />
        <span className="text-xs font-bold tabular-nums text-orange-300">
          {streak} day{streak !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  )
}

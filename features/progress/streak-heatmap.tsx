import { cn } from "@/lib/utils"
import type { StreakDay } from "@/types"

interface StreakHeatmapProps {
  days: StreakDay[]
}

export function StreakHeatmap({ days }: StreakHeatmapProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <div key={day.date} className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "size-8 rounded-md border",
              day.active
                ? "border-emerald-500/50 bg-emerald-500/30"
                : "border-border bg-muted"
            )}
            title={`${day.date} ${day.active ? "active" : "inactive"}`}
          />
          <span className="text-[10px] text-muted-foreground">
            {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2)}
          </span>
        </div>
      ))}
    </div>
  )
}

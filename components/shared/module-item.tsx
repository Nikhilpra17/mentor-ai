"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Lock, CheckCircle2, PlayCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProgressBar } from "@/components/shared/progress-bar"
import type { Module, Lesson } from "@/types"

interface ModuleItemProps {
  module: Module
  isExpanded: boolean
  onToggle: () => void
  onLessonClick: (lesson: Lesson) => void
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    borderClass: "border-emerald-500/40",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    label: "Completed",
  },
  active: {
    icon: PlayCircle,
    borderClass: "border-primary/40",
    badgeClass: "bg-primary/10 text-primary border border-primary/20",
    label: "In Progress",
  },
  locked: {
    icon: Lock,
    borderClass: "border-border",
    badgeClass: "bg-muted text-muted-foreground border border-border",
    label: "Locked",
  },
}

export function ModuleItem({ module, isExpanded, onToggle, onLessonClick }: ModuleItemProps) {
  const cfg = statusConfig[module.status]
  const StatusIcon = cfg.icon
  const completedCount = module.lessons.filter((l) => l.status === "completed").length
  const progress = Math.round((completedCount / module.lessons.length) * 100)

  return (
    <div
      className={cn(
        "rounded-xl border bg-card transition-colors duration-200",
        cfg.borderClass,
        module.status === "locked" && "opacity-70"
      )}
    >
      {/* Module header */}
      <button
        onClick={module.status !== "locked" ? onToggle : undefined}
        disabled={module.status === "locked"}
        className={cn(
          "flex w-full items-start gap-4 p-5 text-left transition-colors",
          module.status !== "locked" && "hover:bg-muted/30 cursor-pointer",
          module.status === "locked" && "cursor-not-allowed"
        )}
      >
        {/* Order number */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
          {module.order}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{module.title}</h3>
            <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", cfg.badgeClass)}>
              <StatusIcon className="inline size-3 mr-1 -mt-0.5" />
              {cfg.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{module.description}</p>
          <div className="mt-3 flex items-center gap-4">
            <ProgressBar value={progress} showPercent={false} size="sm" className="flex-1" />
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {completedCount}/{module.lessons.length}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="size-3" />
              {module.estimatedHours}h
            </div>
          </div>
        </div>

        {module.status !== "locked" && (
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        )}
        {module.status === "locked" && (
          <Lock className="size-4 shrink-0 text-muted-foreground" />
        )}
      </button>

      {/* Lesson list */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 pb-4 pt-2 space-y-1">
              {module.lessons.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  onClick={() => onLessonClick(lesson)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── LessonRow ───────────────────────────────────────────────────────────────
function LessonRow({ lesson, onClick }: { lesson: Lesson; onClick: () => void }) {
  const isClickable = lesson.status !== "locked"

  return (
    <button
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
        isClickable && "hover:bg-muted/50 cursor-pointer",
        !isClickable && "cursor-not-allowed opacity-50"
      )}
    >
      <LessonStatusIcon status={lesson.status} />
      <span
        className={cn(
          "flex-1 text-sm font-medium",
          lesson.status === "completed" && "text-muted-foreground line-through decoration-muted-foreground/50",
          lesson.status === "active" && "text-foreground",
          lesson.status === "locked" && "text-muted-foreground"
        )}
      >
        {lesson.title}
      </span>
      <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
        <Clock className="size-3" />
        {lesson.estimatedMinutes}m
      </span>
    </button>
  )
}

function LessonStatusIcon({ status }: { status: Lesson["status"] }) {
  if (status === "completed") return <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
  if (status === "active") return <PlayCircle className="size-4 shrink-0 text-primary" />
  return <Lock className="size-4 shrink-0 text-muted-foreground" />
}

export { LessonRow }

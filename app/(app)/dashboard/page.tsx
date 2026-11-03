"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { CalendarDays, Clock3, GraduationCap, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/shared/progress-bar"
import { XpBadge } from "@/components/shared/xp-badge"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { ErrorState } from "@/components/shared/empty-state"
import { roadmapApi, progressApi } from "@/lib/api"
import { useUserStore } from "@/store/user-store"
import type { Lesson, Module } from "@/types"

export default function DashboardPage() {
  const { user } = useUserStore()

  const {
    data: modules,
    isLoading: modulesLoading,
    error: modulesError,
    refetch: refetchModules,
  } = useQuery({
    queryKey: ["roadmap", "modules"],
    queryFn: roadmapApi.getModules,
  })

  const {
    data: progress,
    isLoading: progressLoading,
    error: progressError,
    refetch: refetchProgress,
  } = useQuery({
    queryKey: ["progress", "overview"],
    queryFn: progressApi.getProgress,
  })

  let activeLesson: { lesson: Lesson; roadmapModule: Module } | null = null

  if (modules) {
    for (const roadmapModule of modules) {
      const lesson = roadmapModule.lessons.find((l) => l.status === "active")
      if (lesson) {
        activeLesson = { lesson, roadmapModule }
        break
      }
    }
  }

  if (modulesLoading || progressLoading) {
    return <LoadingSkeleton variant="dashboard" />
  }

  if (modulesError || progressError || !progress || !modules) {
    return (
      <ErrorState
        message="Unable to load your dashboard right now."
        onRetry={() => {
          refetchModules()
          refetchProgress()
        }}
      />
    )
  }

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-border bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.18),transparent_45%),linear-gradient(to_bottom_right,hsl(var(--card)),hsl(var(--card)/0.72))] p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{today}</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              Welcome back, {user?.name?.split(" ")[0] ?? "Learner"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Stay consistent. Small progress compounds quickly.
            </p>
          </div>
          <XpBadge xp={user?.xp ?? 0} streak={user?.streak ?? 0} />
        </div>
      </section>

      {/* Stats row */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Lessons Completed" value={String(progress.totalLessonsCompleted)} icon={GraduationCap} />
        <StatCard title="Completion" value={`${progress.overallPercentage}%`} icon={Sparkles} />
        <StatCard title="Learning Streak" value={`${progress.streakDays} days`} icon={CalendarDays} />
        <StatCard title="Time Spent" value={`${Math.round(progress.timeSpentMinutes / 60)}h`} icon={Clock3} />
      </section>

      {/* Active learning */}
      <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Current Progress</CardTitle>
            <CardDescription>
              Keep moving through your roadmap to unlock advanced modules.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProgressBar value={progress.overallPercentage} label="Overall roadmap" size="lg" />
            {activeLesson ? (
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Active Module</p>
                <h3 className="mt-1 font-semibold text-foreground">{activeLesson.roadmapModule.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">Next lesson: {activeLesson.lesson.title}</p>
                <Link href={`/lesson/${activeLesson.lesson.id}`}>
                  <Button className="mt-4">Resume learning</Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                No active lesson right now. Explore your roadmap to continue.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest completed lessons.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {modules
                .flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitle: m.title })))
                .filter((l) => l.status === "completed")
                .slice(0, 3)
                .map((lesson) => (
                  <li key={lesson.id} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.moduleTitle}</p>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card className="border-border/80">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
          <p className="mt-1 text-xl font-bold text-foreground tabular-nums">{value}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="size-4" />
        </div>
      </CardContent>
    </Card>
  )
}

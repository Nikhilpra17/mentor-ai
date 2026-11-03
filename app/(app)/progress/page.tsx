"use client"

import { useQuery } from "@tanstack/react-query"
import { BarChart3, Clock3, Flame, Target } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/shared/progress-bar"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { ErrorState } from "@/components/shared/empty-state"
import { progressApi } from "@/lib/api"
import { mockStreakDays } from "@/lib/mock-data"
import { StreakHeatmap } from "@/features/progress/streak-heatmap"

export default function ProgressPage() {
  const {
    data: progress,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["progress", "overview"],
    queryFn: progressApi.getProgress,
  })

  if (isLoading) return <LoadingSkeleton variant="dashboard" />

  if (error || !progress) {
    return (
      <ErrorState
        message="Unable to load your progress right now."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Overall Completion</CardTitle>
            <CardDescription>
              You&apos;re {progress.overallPercentage}% through the JavaScript roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-5">
              <div className="relative grid size-28 place-items-center rounded-full border-8 border-primary/25 bg-primary/10">
                <span className="text-2xl font-bold tabular-nums text-foreground">
                  {progress.overallPercentage}%
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Lessons completed: <span className="font-semibold text-foreground">{progress.totalLessonsCompleted}/{progress.totalLessons}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Last activity: <span className="font-semibold text-foreground">{progress.lastActivity}</span>
                </p>
              </div>
            </div>
            <ProgressBar value={progress.overallPercentage} label="Roadmap completion" />
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Learning Streak</CardTitle>
            <CardDescription>Keep your momentum alive each day.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-orange-300">
              <Flame className="size-4" />
              <span className="text-lg font-bold tabular-nums">{progress.streakDays} days</span>
            </div>
            <StreakHeatmap days={mockStreakDays} />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Module-wise Progress</CardTitle>
            <CardDescription>Track progress inside each module.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {progress.moduleProgress.map((module) => (
              <div key={module.moduleId} className="rounded-lg border border-border p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{module.moduleTitle}</p>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {module.completedLessons}/{module.totalLessons}
                  </span>
                </div>
                <ProgressBar value={module.percentage} showPercent size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Weak Areas</CardTitle>
            <CardDescription>Topics to focus on next.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {progress.weakAreas.map((item) => (
              <div key={item.topic} className="rounded-lg border border-border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{item.topic}</p>
                  <span className="text-xs tabular-nums text-muted-foreground">{item.score}/100</span>
                </div>
                <ProgressBar
                  value={item.score}
                  showPercent={false}
                  size="sm"
                  color={item.score < 40 ? "red" : item.score < 60 ? "amber" : "green"}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <MiniStat title="Time on platform" value={`${progress.timeSpentMinutes} min`} icon={Clock3} />
        <MiniStat title="Total tracked lessons" value={String(progress.totalLessons)} icon={BarChart3} />
        <MiniStat title="Next focus" value={progress.weakAreas[0]?.topic ?? "N/A"} icon={Target} />
      </section>
    </div>
  )
}

function MiniStat({
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
          <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
        </div>
        <div className="rounded-md bg-primary/10 p-2 text-primary">
          <Icon className="size-4" />
        </div>
      </CardContent>
    </Card>
  )
}

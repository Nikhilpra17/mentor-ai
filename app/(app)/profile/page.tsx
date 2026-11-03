"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Calendar, Crown, Medal, Target } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { ErrorState } from "@/components/shared/empty-state"
import { useUserStore } from "@/store/user-store"
import { progressApi } from "@/lib/api"
import { mockAchievements } from "@/lib/mock-data"

export default function ProfilePage() {
  const { user, updateUser } = useUserStore()

  const {
    data: progress,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["progress", "overview"],
    queryFn: progressApi.getProgress,
  })

  const initials = useMemo(
    () => user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() ?? "U",
    [user?.name]
  )

  if (isLoading) return <LoadingSkeleton variant="dashboard" />

  if (error || !progress || !user) {
    return (
      <ErrorState
        message="Unable to load profile right now."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/80">
        <CardContent className="flex flex-wrap items-center gap-5 p-6">
          <Avatar className="size-20 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-55 space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="outline" className="text-xs">
                <Calendar className="mr-1 size-3.5" />
                Joined {new Date(user.joinedAt).toLocaleDateString()}
              </Badge>
              <Badge className="text-xs">
                <Crown className="mr-1 size-3.5" />
                {user.plan === "premium" ? "Premium" : "Free Plan"}
              </Badge>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">XP</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">{user.xp}</p>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Learning Goal</CardTitle>
            <CardDescription>Update your focus to stay accountable.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="goal" className="text-xs">Current goal</Label>
            <Input
              id="goal"
              value={user.learningGoal}
              onChange={(e) => updateUser({ learningGoal: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Changes are saved locally in your profile state.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>Stats Snapshot</CardTitle>
            <CardDescription>How your learning momentum looks right now.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Completion" value={`${progress.overallPercentage}%`} />
            <Metric label="Streak" value={`${progress.streakDays}d`} />
            <Metric label="Lessons" value={`${progress.totalLessonsCompleted}/${progress.totalLessons}`} />
            <Metric label="Time" value={`${progress.timeSpentMinutes}m`} />
          </CardContent>
        </Card>
      </section>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Milestones you&apos;ve unlocked on MentorAI.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {mockAchievements.map((achievement) => {
            const unlocked = Boolean(achievement.unlockedAt)
            return (
              <div
                key={achievement.id}
                className={`rounded-xl border p-4 transition-colors ${
                  unlocked
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-border bg-muted/20 opacity-70"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xl leading-none">{achievement.icon}</p>
                    <h3 className="mt-2 text-sm font-semibold text-foreground">{achievement.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Medal className={`size-4 ${unlocked ? "text-emerald-400" : "text-muted-foreground"}`} />
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  {unlocked
                    ? `Unlocked ${new Date(achievement.unlockedAt!).toLocaleDateString()}`
                    : "Locked"}
                </p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card className="border-border/80">
        <CardContent className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-primary" />
            <p className="text-sm text-muted-foreground">
              Current focus area: <span className="font-medium text-foreground">{progress.weakAreas[0]?.topic ?? "N/A"}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground tabular-nums">{value}</p>
    </div>
  )
}

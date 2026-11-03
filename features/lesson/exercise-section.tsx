"use client"

import { CheckCircle2, XCircle, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLessonStore } from "@/store/lesson-store"
import type { Lesson } from "@/types"

interface ExerciseSectionProps {
  lesson: Lesson
}

export function ExerciseSection({ lesson }: ExerciseSectionProps) {
  const {
    exerciseInput,
    setExerciseInput,
    exerciseResult,
    setExerciseResult,
    showHint,
    toggleHint,
  } = useLessonStore()

  const evaluate = () => {
    const expected = lesson.exercise.expectedAnswer?.toLowerCase().trim()
    const input = exerciseInput.toLowerCase()

    if (!expected) {
      setExerciseResult(exerciseInput.trim().length > 8 ? "success" : "error")
      return
    }

    setExerciseResult(input.includes(expected) ? "success" : "error")
  }

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Exercise: {lesson.exercise.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{lesson.exercise.instructions}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <textarea
          value={exerciseInput}
          onChange={(e) => setExerciseInput(e.target.value)}
          placeholder={lesson.exercise.type === "code" ? "Write your code here..." : "Type your answer..."}
          className="min-h-36 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={evaluate} disabled={!exerciseInput.trim()}>
            Submit answer
          </Button>
          <Button variant="outline" onClick={toggleHint}>
            <Lightbulb className="mr-1.5 size-4" />
            {showHint ? "Hide hint" : "Show hint"}
          </Button>
        </div>

        {showHint && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
            <strong className="mr-1">Hint:</strong>
            {lesson.exercise.hint}
          </div>
        )}

        {exerciseResult === "success" && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            <CheckCircle2 className="size-4" />
            Great work. Your answer looks correct.
          </div>
        )}

        {exerciseResult === "error" && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <XCircle className="size-4" />
            Not quite. Revisit the lesson or ask the mentor for a hint.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

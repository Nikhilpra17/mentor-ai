"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { ErrorState } from "@/components/shared/empty-state"
import { LessonContent } from "@/features/lesson/lesson-content"
import { MentorPanel } from "@/features/lesson/mentor-panel"
import { ExerciseSection } from "@/features/lesson/exercise-section"
import { roadmapApi } from "@/lib/api"
import { useLessonStore } from "@/store/lesson-store"

export default function LessonPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const lessonId = params.id

  const { setCurrentLesson } = useLessonStore()

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
    data: lesson,
    isLoading: lessonLoading,
    error: lessonError,
    refetch: refetchLesson,
  } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => roadmapApi.getLesson(lessonId),
    enabled: Boolean(lessonId),
  })

  useEffect(() => {
    if (lesson) {
      setCurrentLesson(lesson)
    }
  }, [lesson, setCurrentLesson])

  if (modulesLoading || lessonLoading) {
    return <LoadingSkeleton variant="lesson" />
  }

  if (modulesError || lessonError || !modules || !lesson) {
    return (
      <ErrorState
        message="Unable to load this lesson right now."
        onRetry={() => {
          refetchModules()
          refetchLesson()
        }}
      />
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.push("/roadmap") }>
          <ArrowLeft className="mr-1.5 size-4" />
          Back to roadmap
        </Button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="min-w-0 rounded-xl border border-border bg-card p-5">
          <LessonContent lesson={lesson} modules={modules} />
        </section>

        <section className="h-[calc(100vh-11.5rem)] min-h-140">
          <MentorPanel lesson={lesson} />
        </section>
      </div>

      <section>
        <ExerciseSection lesson={lesson} />
      </section>
    </div>
  )
}

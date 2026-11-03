"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState, ErrorState } from "@/components/shared/empty-state"
import { roadmapApi } from "@/lib/api"
import { useRoadmapStore } from "@/store/roadmap-store"
import { Compass } from "lucide-react"
import { ModuleList } from "@/features/roadmap/module-list"

export default function RoadmapPage() {
  const router = useRouter()
  const { modules, setModules, expandedModuleId, toggleModule, setSelectedLesson } = useRoadmapStore()

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["roadmap", "modules"],
    queryFn: roadmapApi.getModules,
  })

  useEffect(() => {
    if (data) {
      setModules(data)
    }
  }, [data, setModules])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingSkeleton key={i} variant="module" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <ErrorState
        message="Unable to load your roadmap right now."
        onRetry={() => refetch()}
      />
    )
  }

  if (!modules.length) {
    return (
      <EmptyState
        icon={Compass}
        title="Roadmap not found"
        description="No modules are available yet. Please check back later."
      />
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">JavaScript Learning Roadmap</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Follow modules in sequence. Complete lessons to unlock the next stage.
        </p>
      </section>

      <section className="relative">
        {/* Timeline line */}
        <div className="pointer-events-none absolute left-9 top-0 h-full w-px bg-border" />

        <ModuleList
          modules={modules}
          expandedModuleId={expandedModuleId}
          onToggleModule={toggleModule}
          onLessonClick={(lesson) => {
            if (lesson.status === "locked") return
            setSelectedLesson(lesson)
            router.push(`/lesson/${lesson.id}`)
          }}
        />
      </section>
    </div>
  )
}

import type { Module, Lesson } from "@/types"
import { ModuleItem } from "@/components/shared/module-item"

interface ModuleListProps {
  modules: Module[]
  expandedModuleId: string | null
  onToggleModule: (moduleId: string) => void
  onLessonClick: (lesson: Lesson) => void
}

export function ModuleList({
  modules,
  expandedModuleId,
  onToggleModule,
  onLessonClick,
}: ModuleListProps) {
  return (
    <div className="space-y-4">
      {modules
        .sort((a, b) => a.order - b.order)
        .map((module) => (
          <ModuleItem
            key={module.id}
            module={module}
            isExpanded={expandedModuleId === module.id}
            onToggle={() => onToggleModule(module.id)}
            onLessonClick={onLessonClick}
          />
        ))}
    </div>
  )
}

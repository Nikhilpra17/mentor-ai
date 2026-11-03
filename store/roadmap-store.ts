import { create } from "zustand"
import type { Module, Lesson } from "@/types"

interface RoadmapState {
  modules: Module[]
  expandedModuleId: string | null
  selectedLesson: Lesson | null
  setModules: (modules: Module[]) => void
  toggleModule: (moduleId: string) => void
  setSelectedLesson: (lesson: Lesson | null) => void
}

export const useRoadmapStore = create<RoadmapState>()((set) => ({
  modules: [],
  expandedModuleId: null,
  selectedLesson: null,

  setModules: (modules) => set({ modules }),

  toggleModule: (moduleId) =>
    set((state) => ({
      expandedModuleId:
        state.expandedModuleId === moduleId ? null : moduleId,
    })),

  setSelectedLesson: (lesson) => set({ selectedLesson: lesson }),
}))

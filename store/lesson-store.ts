import { create } from "zustand"
import type { Lesson, MentorMessage } from "@/types"

interface LessonState {
  currentLesson: Lesson | null
  mentorMessages: MentorMessage[]
  exerciseInput: string
  exerciseResult: "idle" | "success" | "error"
  showHint: boolean
  isMentorTyping: boolean

  setCurrentLesson: (lesson: Lesson) => void
  addMentorMessage: (msg: MentorMessage) => void
  addUserMessage: (content: string) => void
  setMentorTyping: (v: boolean) => void
  setExerciseInput: (v: string) => void
  setExerciseResult: (v: "idle" | "success" | "error") => void
  toggleHint: () => void
  resetLesson: () => void
}

export const useLessonStore = create<LessonState>()((set) => ({
  currentLesson: null,
  mentorMessages: [],
  exerciseInput: "",
  exerciseResult: "idle",
  showHint: false,
  isMentorTyping: false,

  setCurrentLesson: (lesson) =>
    set({ currentLesson: lesson, mentorMessages: [], exerciseInput: "", exerciseResult: "idle", showHint: false }),

  addMentorMessage: (msg) =>
    set((s) => ({ mentorMessages: [...s.mentorMessages, msg] })),

  addUserMessage: (content) =>
    set((s) => ({
      mentorMessages: [
        ...s.mentorMessages,
        {
          id: `user-${Date.now()}`,
          role: "user" as const,
          content,
          timestamp: new Date(),
        },
      ],
    })),

  setMentorTyping: (v) => set({ isMentorTyping: v }),
  setExerciseInput: (v) => set({ exerciseInput: v }),
  setExerciseResult: (v) => set({ exerciseResult: v }),
  toggleHint: () => set((s) => ({ showHint: !s.showHint })),
  resetLesson: () =>
    set({
      currentLesson: null,
      mentorMessages: [],
      exerciseInput: "",
      exerciseResult: "idle",
      showHint: false,
      isMentorTyping: false,
    }),
}))

// ─── Auth ──────────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  joinedAt: string
  plan: "free" | "premium"
  xp: number
  streak: number
  learningGoal: string
}

// ─── Roadmap ────────────────────────────────────────────────────────────────
export type LessonStatus = "locked" | "active" | "completed"

export interface Lesson {
  id: string
  moduleId: string
  title: string
  estimatedMinutes: number
  status: LessonStatus
  order: number
  content: LessonContent
  exercise: Exercise
}

export interface LessonContent {
  objective: string
  tags: string[]
  explanation: string      // markdown
  codeExample: string      // raw code string
  codeLanguage: string
}

export interface Exercise {
  title: string
  instructions: string
  hint: string
  expectedAnswer?: string  // used for mock evaluation
  type: "code" | "text"
}

export interface Module {
  id: string
  title: string
  description: string
  status: "locked" | "active" | "completed"
  order: number
  lessons: Lesson[]
  estimatedHours: number
}

// ─── Mentor ─────────────────────────────────────────────────────────────────
export type MentorActionType =
  | "ask_doubt"
  | "explain_simpler"
  | "give_analogy"
  | "give_hint"
  | "free_text"

export interface MentorMessage {
  id: string
  role: "user" | "mentor"
  content: string
  timestamp: Date
  actionType?: MentorActionType
}

// ─── Progress ───────────────────────────────────────────────────────────────
export interface ModuleProgress {
  moduleId: string
  moduleTitle: string
  completedLessons: number
  totalLessons: number
  percentage: number
}

export interface WeakArea {
  topic: string
  score: number  // 0-100
}

export interface Progress {
  overallPercentage: number
  totalLessonsCompleted: number
  totalLessons: number
  streakDays: number
  timeSpentMinutes: number
  moduleProgress: ModuleProgress[]
  weakAreas: WeakArea[]
  lastActivity: string
}

// ─── Gamification ───────────────────────────────────────────────────────────
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string  // ISO date string, undefined = locked
}

export interface StreakDay {
  date: string   // "YYYY-MM-DD"
  active: boolean
}

// ─── API layer response wrappers ────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface AuthResponse {
  user: User
  token: string
}

import axios from "axios"
import type {
  AuthResponse,
  Module,
  Lesson,
  MentorMessage,
  Progress,
  MentorActionType,
} from "@/types"
import {
  mockUser,
  mockModules,
  mockProgress,
  mockMentorResponses,
} from "@/lib/mock-data"

// ─── Axios instance ─────────────────────────────────────────────────────────
// Base URL is environment-driven — swap NEXT_PUBLIC_API_URL to connect a real backend.
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
})

// Attach auth token on every request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("mentor-ai-token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// ─── Mock delay helper ───────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ─── Auth API ────────────────────────────────────────────────────────────────
export const authApi = {
  async login(email: string, _password: string): Promise<AuthResponse> {
    void _password
    await delay(800)
    if (!email) throw new Error("Email is required")
    return { user: { ...mockUser, email }, token: "mock-jwt-token-12345" }
  },

  async signup(
    name: string,
    email: string,
    _password: string
  ): Promise<AuthResponse> {
    void _password
    await delay(900)
    if (!email || !name) throw new Error("Name and email are required")
    return {
      user: { ...mockUser, name, email, xp: 0, streak: 0 },
      token: "mock-jwt-token-new-user",
    }
  },

  async logout(): Promise<void> {
    await delay(200)
    if (typeof window !== "undefined") {
      localStorage.removeItem("mentor-ai-token")
    }
  },
}

// ─── Roadmap API ─────────────────────────────────────────────────────────────
export const roadmapApi = {
  async getModules(): Promise<Module[]> {
    await delay(600)
    return mockModules
  },

  async getLesson(lessonId: string): Promise<Lesson> {
    await delay(500)
    for (const mod of mockModules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId)
      if (lesson) return lesson
    }
    throw new Error(`Lesson ${lessonId} not found`)
  },
}

// ─── Mentor API ──────────────────────────────────────────────────────────────
export const mentorApi = {
  async askQuestion(
    _lessonId: string,
    _prompt: string,
    actionType: MentorActionType
  ): Promise<MentorMessage> {
    await delay(1200 + Math.random() * 800)

    const responses = mockMentorResponses[actionType] ?? mockMentorResponses.free_text
    const content = responses[Math.floor(Math.random() * responses.length)]

    return {
      id: `msg-${Date.now()}`,
      role: "mentor",
      content,
      timestamp: new Date(),
      actionType,
    }
  },
}

// ─── Progress API ─────────────────────────────────────────────────────────────
export const progressApi = {
  async getProgress(): Promise<Progress> {
    await delay(500)
    return mockProgress
  },

  async updateProgress(
    _lessonId: string,
    _completed: boolean
  ): Promise<Progress> {
    void _lessonId
    void _completed
    await delay(400)
    return mockProgress
  },
}

export default apiClient

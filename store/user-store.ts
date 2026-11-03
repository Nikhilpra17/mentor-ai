import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/types"

interface UserState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User, token: string) => void
  updateUser: (partial: Partial<User>) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("mentor-ai-token", token)
        }
        set({ user, token, isAuthenticated: true })
      },

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("mentor-ai-token")
        }
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: "mentor-ai-user",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

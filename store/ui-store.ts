import { create } from "zustand"

interface UIState {
  sidebarOpen: boolean
  focusMode: boolean   // true on lesson page — hides sidebar
  activeTab: string
  setSidebarOpen: (v: boolean) => void
  setFocusMode: (v: boolean) => void
  setActiveTab: (tab: string) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  focusMode: false,
  activeTab: "overview",

  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  setFocusMode: (v) => set({ focusMode: v }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}))

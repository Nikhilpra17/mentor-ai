"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useUIStore } from "@/store/ui-store"
import { AppShell } from "@/components/layout/app-shell"

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { setFocusMode, setSidebarOpen } = useUIStore()

  useEffect(() => {
    const isLessonPage = pathname.startsWith("/lesson/")
    setFocusMode(isLessonPage)
    setSidebarOpen(!isLessonPage)
  }, [pathname, setFocusMode, setSidebarOpen])

  return <AppShell>{children}</AppShell>
}

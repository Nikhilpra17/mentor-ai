"use client"

import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/ui-store"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/roadmap": "Learning Roadmap",
  "/progress": "My Progress",
  "/profile": "Profile",
}

export function TopNav() {
  const pathname = usePathname()
  const { toggleSidebar, sidebarOpen } = useUIStore()

  const title = Object.entries(pageTitles).find(([key]) => pathname.startsWith(key))?.[1] ?? "MentorAI"

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-card/80 px-5 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        className="text-muted-foreground hover:text-foreground md:hidden"
      >
        {sidebarOpen ? <X className="size-4" /> : <Menu className="size-4" />}
      </Button>
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>
    </header>
  )
}

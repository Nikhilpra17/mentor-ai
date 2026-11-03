"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Map,
  BarChart2,
  User,
  BookOpen,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserStore } from "@/store/user-store"
import { authApi } from "@/lib/api"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { XpBadge } from "@/components/shared/xp-badge"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/progress", label: "Progress", icon: BarChart2 },
  { href: "/profile", label: "Profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useUserStore()

  async function handleLogout() {
    await authApi.logout()
    logout()
    router.push("/login")
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U"

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <BookOpen className="size-4 text-primary-foreground" />
        </div>
        <span className="font-bold tracking-tight text-foreground">MentorAI</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-border p-4 space-y-3">
        {user && <XpBadge xp={user.xp} streak={user.streak} />}
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name ?? "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleLogout}
            className="shrink-0 text-muted-foreground hover:text-destructive"
            aria-label="Logout"
          >
            <LogOut className="size-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  )
}

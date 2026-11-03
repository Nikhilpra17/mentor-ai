import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Auth",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.22),transparent_40%),radial-gradient(circle_at_85%_0%,hsl(var(--secondary)/0.18),transparent_35%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)/0.98))]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.12)_1px,transparent_1px)] bg-size-[38px_38px] mask-[radial-gradient(circle_at_center,black,transparent_75%)]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <BookOpen className="size-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">MentorAI</span>
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-4 pb-10">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  )
}

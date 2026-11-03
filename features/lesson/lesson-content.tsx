"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { ArrowLeft, ArrowRight } from "lucide-react"

import type { Lesson, Module } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface LessonContentProps {
  lesson: Lesson
  modules: Module[]
}

export function LessonContent({ lesson, modules }: LessonContentProps) {
  const router = useRouter()
  const lessonSequence = useMemo(
    () => modules.flatMap((m) => m.lessons).sort((a, b) => a.order - b.order),
    [modules]
  )

  const currentIdx = lessonSequence.findIndex((l) => l.id === lesson.id)
  const prevLesson = currentIdx > 0 ? lessonSequence[currentIdx - 1] : null
  const nextLesson = currentIdx < lessonSequence.length - 1 ? lessonSequence[currentIdx + 1] : null

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{lesson.title}</h1>
        <p className="text-sm text-muted-foreground">{lesson.content.objective}</p>
        <div className="flex flex-wrap gap-2">
          {lesson.content.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <section className="prose prose-invert max-w-none prose-p:text-foreground/90 prose-li:text-foreground/90 prose-headings:text-foreground">
        <ReactMarkdown>{lesson.content.explanation}</ReactMarkdown>
      </section>

      <section className="overflow-hidden rounded-xl border border-border">
        <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
          Example ({lesson.content.codeLanguage})
        </div>
        <SyntaxHighlighter
          language={lesson.content.codeLanguage}
          style={oneDark}
          customStyle={{ margin: 0, background: "transparent", fontSize: "0.875rem" }}
          wrapLongLines
        >
          {lesson.content.codeExample}
        </SyntaxHighlighter>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Button
          variant="outline"
          disabled={!prevLesson || prevLesson.status === "locked"}
          onClick={() => prevLesson && router.push(`/lesson/${prevLesson.id}`)}
        >
          <ArrowLeft className="mr-2 size-4" />
          Previous lesson
        </Button>

        <Button
          disabled={!nextLesson || nextLesson.status === "locked"}
          onClick={() => nextLesson && router.push(`/lesson/${nextLesson.id}`)}
        >
          Next lesson
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </footer>
    </article>
  )
}

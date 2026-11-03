"use client"

import { useRef, useEffect, useState } from "react"
import { Sparkles, HelpCircle, Lightbulb, WandSparkles, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatBubble, TypingIndicator } from "@/components/shared/chat-bubble"
import { useLessonStore } from "@/store/lesson-store"
import { mentorApi } from "@/lib/api"
import type { MentorActionType, Lesson } from "@/types"

interface MentorPanelProps {
  lesson: Lesson
}

const quickActions: Array<{
  label: string
  type: MentorActionType
  icon: React.ComponentType<{ className?: string }>
  prompt: string
}> = [
  {
    label: "Ask Doubt",
    type: "ask_doubt",
    icon: HelpCircle,
    prompt: "I have a doubt about this concept. Can you clarify?",
  },
  {
    label: "Explain Simpler",
    type: "explain_simpler",
    icon: Sparkles,
    prompt: "Can you explain this in simpler terms?",
  },
  {
    label: "Give Analogy",
    type: "give_analogy",
    icon: WandSparkles,
    prompt: "Can you give me a real-world analogy for this?",
  },
  {
    label: "Give Hint",
    type: "give_hint",
    icon: Lightbulb,
    prompt: "Give me a hint without revealing the full answer.",
  },
]

export function MentorPanel({ lesson }: MentorPanelProps) {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    mentorMessages,
    addUserMessage,
    addMentorMessage,
    isMentorTyping,
    setMentorTyping,
  } = useLessonStore()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [mentorMessages, isMentorTyping])

  const askMentor = async (prompt: string, type: MentorActionType) => {
    addUserMessage(prompt)
    setMentorTyping(true)

    try {
      const reply = await mentorApi.askQuestion(lesson.id, prompt, type)
      addMentorMessage(reply)
    } finally {
      setMentorTyping(false)
    }
  }

  return (
    <aside className="flex h-full flex-col rounded-xl border border-border bg-card">
      <header className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="rounded-lg bg-violet-500/15 p-1.5 text-violet-400">
          <Sparkles className="size-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">AI Mentor</h2>
          <p className="text-xs text-muted-foreground">Context-aware guidance</p>
        </div>
      </header>

      <div className="border-b border-border p-3">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.type}
              variant="outline"
              size="sm"
              className="justify-start text-xs"
              onClick={() => askMentor(action.prompt, action.type)}
              disabled={isMentorTyping}
            >
              <action.icon className="mr-1.5 size-3.5" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-3">
        {mentorMessages.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-3 text-xs text-muted-foreground">
            Ask a question or use quick actions. I will respond based on your current lesson context.
          </div>
        )}

        {mentorMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isMentorTyping && <TypingIndicator />}
      </div>

      <footer className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask MentorAI..."
            className="text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim() && !isMentorTyping) {
                askMentor(input.trim(), "free_text")
                setInput("")
              }
            }}
            disabled={isMentorTyping}
          />
          <Button
            size="icon"
            disabled={!input.trim() || isMentorTyping}
            onClick={() => {
              askMentor(input.trim(), "free_text")
              setInput("")
            }}
            aria-label="Send question"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </footer>
    </aside>
  )
}

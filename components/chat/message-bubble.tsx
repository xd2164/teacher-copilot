"use client"
import React from "react"
import { ChatMessage } from "@/lib/types"
import { Bot, Sparkles, Database, Pencil, RefreshCw } from "lucide-react"
import { formatDate } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MessageBubbleProps {
  message: ChatMessage
}

type SpClass = "und" | "ret" | "gen" | "rev"

const STAGE_CONFIG: Record<string, { label: string; spClass: SpClass; Icon: React.ComponentType<{ className?: string }> }> = {
  understand: { label: "Understanding",      spClass: "und", Icon: Sparkles   },
  retrieve:   { label: "Retrieving context", spClass: "ret", Icon: Database   },
  generate:   { label: "Generating lesson",  spClass: "gen", Icon: Pencil     },
  revise:     { label: "Revising",           spClass: "rev", Icon: RefreshCw  },
  reflect:    { label: "Reflecting",         spClass: "rev", Icon: RefreshCw  },
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant"
  const stageConfig = message.stage ? STAGE_CONFIG[message.stage] : null

  return (
    <div className={`ws-msg ${isAssistant ? "a" : "u"}`}>
      <div className="ws-mav">
        {isAssistant ? <Bot /> : "T"}
      </div>
      <div className="ws-mi">
        {isAssistant && stageConfig && (
          <span className={`ws-sp ${stageConfig.spClass}`}>
            <stageConfig.Icon className="" />
            {stageConfig.label}
          </span>
        )}
        {isAssistant && message.retrievalSummary && message.retrievalSummary.length > 0 && (
          <div className="ws-ctx">
            <strong>Context from your materials</strong>
            <ul>
              {message.retrievalSummary.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="ws-mb">
          {isAssistant ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          ) : (
            <p style={{ whiteSpace: "pre-wrap" }}>{message.content}</p>
          )}
        </div>
        <div className="ws-mt">{formatDate(message.timestamp)}</div>
      </div>
    </div>
  )
}

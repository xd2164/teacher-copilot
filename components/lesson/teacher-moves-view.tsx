"use client"
import React, { useState } from "react"
import { TeacherMove } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Zap, MessageSquare, HelpCircle, Users, CheckSquare, AlertCircle, RefreshCw } from "lucide-react"

interface TeacherMovesViewProps {
  moves: TeacherMove[]
}

const MOVE_ICONS: Record<string, React.ReactNode> = {
  guiding_question: <HelpCircle className="w-4 h-4" />,
  misconception_probe: <AlertCircle className="w-4 h-4" />,
  think_aloud: <MessageSquare className="w-4 h-4" />,
  pair_discussion: <Users className="w-4 h-4" />,
  evidence_check: <CheckSquare className="w-4 h-4" />,
  ethical_dilemma: <Zap className="w-4 h-4" />,
  student_reflection: <RefreshCw className="w-4 h-4" />,
}

const MOVE_COLORS: Record<string, string> = {
  guiding_question: "bg-blue-50 text-blue-600 border-blue-100",
  misconception_probe: "bg-amber-50 text-amber-600 border-amber-100",
  think_aloud: "bg-indigo-50 text-indigo-600 border-indigo-100",
  pair_discussion: "bg-green-50 text-green-600 border-green-100",
  evidence_check: "bg-teal-50 text-teal-600 border-teal-100",
  ethical_dilemma: "bg-purple-50 text-purple-600 border-purple-100",
  student_reflection: "bg-pink-50 text-pink-600 border-pink-100",
}

export function TeacherMovesView({ moves }: TeacherMovesViewProps) {
  const [expanded, setExpanded] = useState<string | null>(moves[0]?.type || null)

  return (
    <div className="p-4 space-y-3">
      <div className="bg-blue-50 rounded-lg px-3 py-2 mb-4">
        <p className="text-xs text-blue-700">
          These moves support the teacher during instruction. Use them to guide student thinking, surface misconceptions, and deepen engagement.
        </p>
      </div>

      {moves.map((move) => {
        const isOpen = expanded === move.type
        const colorClass = MOVE_COLORS[move.type] || "bg-gray-50 text-gray-600 border-gray-100"
        const icon = MOVE_ICONS[move.type]

        return (
          <div
            key={move.type}
            className={cn("border rounded-xl overflow-hidden transition-all", colorClass)}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : move.type)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left"
            >
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", colorClass)}>
                {icon}
              </div>
              <span className="text-sm font-medium flex-1">{move.label}</span>
              <span className="text-xs opacity-60">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-3 bg-white border-t border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">When to use it</p>
                  <p className="text-xs text-gray-700">{move.whenToUse}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">What to say</p>
                  <p className="text-xs text-gray-800 italic bg-gray-50 rounded-lg px-3 py-2">"{move.whatToSay}"</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Why it helps</p>
                  <p className="text-xs text-gray-700">{move.whyItHelps}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

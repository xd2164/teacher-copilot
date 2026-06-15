"use client"
import React from "react"
import { TeacherMove } from "@/lib/types"
import { Brain, Zap, RefreshCw } from "lucide-react"

interface TeacherMovesViewProps {
  moves: TeacherMove[]
}

// Map move types to phases: design (d), create (c), reflect (r)
function getPhase(type: string): "d" | "c" | "r" {
  if (type === "misconception_probe" || type === "guiding_question") return "d"
  if (type === "think_aloud" || type === "pair_discussion" || type === "evidence_check") return "c"
  return "r"
}

const PHASE_CONFIG: Record<"d" | "c" | "r", { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  d: { label: "Design Phase",  Icon: Brain    },
  c: { label: "Create Phase",  Icon: Zap      },
  r: { label: "Reflect Phase", Icon: RefreshCw },
}

// Group moves by phase preserving order
function groupMoves(moves: TeacherMove[]): Array<{ phase: "d" | "c" | "r"; moves: TeacherMove[] }> {
  const groups: Array<{ phase: "d" | "c" | "r"; moves: TeacherMove[] }> = []
  for (const move of moves) {
    const phase = getPhase(move.type)
    const last = groups[groups.length - 1]
    if (last && last.phase === phase) {
      last.moves.push(move)
    } else {
      groups.push({ phase, moves: [move] })
    }
  }
  return groups
}

// Assign a rough time offset per move index
function timeLabel(index: number): string {
  const times = ["0:00", "5:00", "10:00", "15:00", "20:00", "25:00", "30:00"]
  return times[index] ?? `${index * 5}:00`
}

export function TeacherMovesView({ moves }: TeacherMovesViewProps) {
  const groups = groupMoves(moves)

  return (
    <div>
      {groups.map(({ phase, moves: phaseMoves }) => {
        const cfg = PHASE_CONFIG[phase]
        return (
          <div key={phase} style={{ marginBottom: "1rem" }}>
            <div className={`ws-mph ${phase}`}>
              <cfg.Icon />
              {cfg.label}
            </div>
            {phaseMoves.map((move, i) => (
              <div key={move.type} className="ws-mrow">
                <span className="ws-mtime">{timeLabel(i)}</span>
                <div>
                  <h4>{move.label}</h4>
                  <p><strong>When:</strong> {move.whenToUse}</p>
                  <p style={{ marginTop: 3, fontStyle: "italic" }}>&ldquo;{move.whatToSay}&rdquo;</p>
                  <p style={{ marginTop: 3 }}><strong>Why:</strong> {move.whyItHelps}</p>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

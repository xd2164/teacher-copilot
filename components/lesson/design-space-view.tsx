"use client"
import React from "react"
import { LessonDraft } from "@/lib/types"
import { Layers, Users, Map, Cpu, Database, BookOpen, AlertTriangle } from "lucide-react"

interface DesignSpaceViewProps {
  draft: LessonDraft
}

type DsiClass = "id" | "al" | "wn"

interface Dimension {
  icon: React.ReactNode
  dsiClass: DsiClass
  label: string
  value: string | string[]
}

export function DesignSpaceView({ draft }: DesignSpaceViewProps) {
  const dimensions: Dimension[] = [
    {
      icon: <Layers />,
      dsiClass: "id",
      label: "Task Stage",
      value: "Planning + classroom activity + reflection",
    },
    {
      icon: <Users />,
      dsiClass: "id",
      label: "Teacher Expertise",
      value: "AI-curious beginner with subject-area depth",
    },
    {
      icon: <Map />,
      dsiClass: "id",
      label: "Interaction Mode",
      value: "Guided chat + structured draft panel",
    },
    {
      icon: <Cpu />,
      dsiClass: "al",
      label: "AI Role",
      value: "Co-designer, not replacement. Teacher retains all final decisions.",
    },
    {
      icon: <Database />,
      dsiClass: "id",
      label: "Knowledge Sources Used",
      value: draft.sourceUseSummary,
    },
    {
      icon: <BookOpen />,
      dsiClass: "id",
      label: "Student Mode",
      value: "Unplugged collaborative activity — no student AI accounts required",
    },
    {
      icon: <AlertTriangle />,
      dsiClass: "wn",
      label: "Ethical Focus",
      value: draft.reflectPhase.ethicalReflection,
    },
    {
      icon: <Layers />,
      dsiClass: "id",
      label: "Output Types",
      value: ["Teacher guide", "Student activity", "Discussion prompts", "Exit ticket", "Differentiation supports"],
    },
    {
      icon: <AlertTriangle />,
      dsiClass: "wn",
      label: "Teacher Decision Points",
      value: draft.teacherDecisionPoints,
    },
  ]

  return (
    <div>
      <span className="ws-bkh">Lesson Design Space</span>
      <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6, marginBottom: "1rem" }}>
        This view surfaces the design choices, assumptions, and teacher decisions that shaped this lesson.
      </p>

      {dimensions.map((dim) => (
        <div key={dim.label} className="ws-dsr">
          <div className={`ws-dsi ${dim.dsiClass}`}>
            {dim.icon}
          </div>
          <div>
            <h4>{dim.label}</h4>
            {Array.isArray(dim.value) ? (
              <p>{dim.value.join(" · ")}</p>
            ) : (
              <p>{dim.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

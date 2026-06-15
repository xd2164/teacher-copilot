"use client"
import React from "react"
import { LessonDraft } from "@/lib/types"
import { Map, Layers, Users, Cpu, Database, BookOpen, AlertTriangle } from "lucide-react"

interface DesignSpaceViewProps {
  draft: LessonDraft
}

interface SpaceDimension {
  icon: React.ReactNode
  label: string
  value: string | string[]
  color: string
}

export function DesignSpaceView({ draft }: DesignSpaceViewProps) {
  const dimensions: SpaceDimension[] = [
    {
      icon: <Layers className="w-4 h-4" />,
      label: "Task Stage",
      value: "Planning + classroom activity + reflection",
      color: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Teacher Expertise",
      value: "AI-curious beginner with subject-area depth",
      color: "bg-green-50 border-green-200 text-green-800",
    },
    {
      icon: <Map className="w-4 h-4" />,
      label: "Interaction Mode",
      value: "Guided chat + structured draft panel",
      color: "bg-indigo-50 border-indigo-200 text-indigo-800",
    },
    {
      icon: <Cpu className="w-4 h-4" />,
      label: "AI Role",
      value: "Co-designer, not replacement. Teacher retains all final decisions.",
      color: "bg-purple-50 border-purple-200 text-purple-800",
    },
    {
      icon: <Database className="w-4 h-4" />,
      label: "Knowledge Sources Used",
      value: draft.sourceUseSummary,
      color: "bg-teal-50 border-teal-200 text-teal-800",
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: "Student Mode",
      value: "Unplugged collaborative activity — no student AI accounts required",
      color: "bg-amber-50 border-amber-200 text-amber-800",
    },
    {
      icon: <AlertTriangle className="w-4 h-4" />,
      label: "Ethical Focus",
      value: `${draft.reflectPhase.ethicalReflection}`,
      color: "bg-orange-50 border-orange-200 text-orange-800",
    },
    {
      icon: <Layers className="w-4 h-4" />,
      label: "Output Types",
      value: ["Teacher guide", "Student activity", "Discussion prompts", "Exit ticket", "Differentiation supports"],
      color: "bg-rose-50 border-rose-200 text-rose-800",
    },
    {
      icon: <AlertTriangle className="w-4 h-4" />,
      label: "Teacher Decision Points",
      value: draft.teacherDecisionPoints,
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
  ]

  return (
    <div className="p-4 space-y-3">
      <div className="bg-indigo-50 rounded-lg px-3 py-2 mb-2">
        <p className="text-xs text-indigo-700 font-medium mb-0.5">Lesson Design Space</p>
        <p className="text-xs text-indigo-600">
          This view surfaces the design choices, assumptions, and teacher decisions that shaped this lesson. Use it to understand what the AI assumed and what still needs your review.
        </p>
      </div>

      {dimensions.map((dim) => (
        <div key={dim.label} className={`rounded-xl border p-3 ${dim.color}`}>
          <div className="flex items-center gap-2 mb-1.5">
            {dim.icon}
            <span className="text-xs font-semibold uppercase tracking-wide opacity-70">{dim.label}</span>
          </div>
          {Array.isArray(dim.value) ? (
            <ul className="space-y-0.5">
              {dim.value.map((v, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs">
                  <span className="mt-0.5 opacity-60">·</span>
                  {v}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs leading-relaxed">{dim.value}</p>
          )}
        </div>
      ))}
    </div>
  )
}

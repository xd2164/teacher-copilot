"use client"
import React, { useState } from "react"
import { LessonDraft } from "@/lib/types"
import { ChevronDown, ChevronRight, AlertTriangle, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface LessonDraftViewProps {
  draft: LessonDraft
}

function Section({ title, children, defaultOpen = true, badge }: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  badge?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{title}</span>
          {badge && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{badge}</span>}
        </div>
        {open ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

function GoalsList({ goals, variant }: { goals: string[]; variant?: "ai" | "subject" }) {
  return (
    <ul className="space-y-1.5">
      {goals.map((g, i) => (
        <li key={i} className={cn(
          "flex items-start gap-2 text-xs rounded-lg px-3 py-2",
          variant === "ai" ? "bg-purple-50 text-purple-800" : "bg-blue-50 text-blue-800"
        )}>
          <span className="mt-0.5 font-bold flex-shrink-0">{i + 1}.</span>
          {g}
        </li>
      ))}
    </ul>
  )
}

function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className={cn("flex items-start gap-2 text-xs text-gray-700", className)}>
          <span className="text-gray-400 mt-0.5 flex-shrink-0">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LessonDraftView({ draft }: LessonDraftViewProps) {
  return (
    <div>
      {/* Big AI Idea */}
      <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
        <p className="text-xs font-medium text-indigo-700 mb-1">Big AI Idea</p>
        <p className="text-sm text-indigo-900">{draft.bigAiIdea}</p>
      </div>

      {/* Learning Goals */}
      <Section title="Learning Goals">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Subject Goals</p>
            <GoalsList goals={draft.subjectLearningGoals} variant="subject" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">AI Literacy Goals</p>
            <GoalsList goals={draft.aiLiteracyGoals} variant="ai" />
          </div>
        </div>
      </Section>

      {/* Design Phase */}
      <Section title="Design Phase" badge="DCR">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Teacher Goal</p>
            <p className="text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{draft.designPhase.teacherGoal}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Student Question</p>
            <p className="text-xs text-gray-700 italic bg-gray-50 rounded-lg px-3 py-2">"{draft.designPhase.studentQuestion}"</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Misconceptions to Surface</p>
            <BulletList items={draft.designPhase.misconceptionsToSurface} />
          </div>
        </div>
      </Section>

      {/* Create Phase */}
      <Section title="Create Phase" badge="DCR">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Activity Overview</p>
            <p className="text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{draft.createPhase.activityOverview}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Student Steps</p>
            <ol className="space-y-1.5">
              {draft.createPhase.studentSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-medium text-xs">{i + 1}</span>
                  <span className="mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Materials</p>
            <BulletList items={draft.createPhase.materials} />
          </div>
        </div>
      </Section>

      {/* Reflect Phase */}
      <Section title="Reflect Phase" badge="DCR">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Discussion Prompts</p>
            <ul className="space-y-1.5">
              {draft.reflectPhase.discussionPrompts.map((prompt, i) => (
                <li key={i} className="text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-2 italic">"{prompt}"</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Ethical Reflection</p>
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{draft.reflectPhase.ethicalReflection}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Exit Ticket</p>
            <p className="text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{draft.reflectPhase.exitTicket}</p>
          </div>
        </div>
      </Section>

      {/* Differentiation */}
      <Section title="Differentiation" defaultOpen={false}>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Multilingual Learners</p>
            <BulletList items={draft.differentiation.multilingualLearners} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Students Needing Support</p>
            <BulletList items={draft.differentiation.studentsNeedingSupport} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Extension</p>
            <BulletList items={draft.differentiation.extension} />
          </div>
        </div>
      </Section>

      {/* Teacher Decision Points */}
      <Section title="Teacher Decisions Needed" defaultOpen={false}>
        <ul className="space-y-2">
          {draft.teacherDecisionPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Source Use Summary */}
      <Section title="Sources Used" defaultOpen={false}>
        <ul className="space-y-1.5">
          {draft.sourceUseSummary.map((source, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{source}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Rationale */}
      <Section title="Rationale" defaultOpen={false}>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Why this activity</p>
            <p className="text-xs text-gray-700">{draft.rationale.whyThisActivity}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Why this AI connection</p>
            <p className="text-xs text-gray-700">{draft.rationale.whyThisAiConnection}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Why this assessment</p>
            <p className="text-xs text-gray-700">{draft.rationale.whyThisAssessment}</p>
          </div>
        </div>
      </Section>
    </div>
  )
}

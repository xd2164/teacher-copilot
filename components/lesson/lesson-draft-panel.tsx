"use client"
import React, { useState } from "react"
import { LessonDraft, TeacherMove, DraftRevision, QualityReview } from "@/lib/types"
import { LessonDraftView } from "./lesson-draft-view"
import { TeacherMovesView } from "./teacher-moves-view"
import { DraftTimelineView } from "./draft-timeline-view"
import { DesignSpaceView } from "./design-space-view"
import { QualityReviewView } from "./quality-review-view"
import { readinessColor } from "@/lib/utils"
import { Download, RefreshCw, Layers, Map, CheckCircle2, Zap } from "lucide-react"

type ActiveView = "draft" | "teacher-moves" | "timeline" | "design-space" | "quality"

interface LessonDraftPanelProps {
  draft: LessonDraft
  teacherMoves: TeacherMove[]
  revisions: DraftRevision[]
  qualityReview: QualityReview
  activeView: ActiveView
  onViewChange: (view: ActiveView) => void
}

export function LessonDraftPanel({
  draft,
  teacherMoves,
  revisions,
  qualityReview,
  activeView,
  onViewChange,
}: LessonDraftPanelProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportMarkdown = () => {
    const md = generateMarkdown(draft)
    const blob = new Blob([md], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${draft.lessonTitle.replace(/\s+/g, "-")}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const tabs = [
    { id: "draft" as ActiveView, label: "Lesson", icon: <Layers className="w-3 h-3" /> },
    { id: "teacher-moves" as ActiveView, label: "Teacher Moves", icon: <Zap className="w-3 h-3" /> },
    { id: "timeline" as ActiveView, label: "History", icon: <RefreshCw className="w-3 h-3" /> },
    { id: "design-space" as ActiveView, label: "Design Space", icon: <Map className="w-3 h-3" /> },
    { id: "quality" as ActiveView, label: "Quality", icon: <CheckCircle2 className="w-3 h-3" /> },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-gray-900 truncate">{draft.lessonTitle || "Lesson Draft"}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {draft.gradeLevel} · {draft.subject} · {draft.duration}
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${readinessColor(qualityReview.readiness)}`}>
              {qualityReview.readiness === "ready" ? "Ready" : qualityReview.readiness === "needs_revision" ? "Needs Review" : "Not Ready"}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              v{draft.versionNumber}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-thin">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                activeView === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* View content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {activeView === "draft" && <LessonDraftView draft={draft} />}
        {activeView === "teacher-moves" && <TeacherMovesView moves={teacherMoves} />}
        {activeView === "timeline" && <DraftTimelineView revisions={revisions} />}
        {activeView === "design-space" && <DesignSpaceView draft={draft} />}
        {activeView === "quality" && <QualityReviewView review={qualityReview} />}
      </div>

      {/* Export footer */}
      <div className="border-t border-gray-200 p-3 bg-white flex gap-2">
        <button
          onClick={handleExportMarkdown}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Export Markdown
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(generateMarkdown(draft))}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  )
}

function generateMarkdown(draft: LessonDraft): string {
  return `# ${draft.lessonTitle}

**Grade:** ${draft.gradeLevel} | **Subject:** ${draft.subject} | **Duration:** ${draft.duration}

## Learning Goals

**Subject Learning Goals:**
${draft.subjectLearningGoals.map(g => `- ${g}`).join("\n")}

**AI Literacy Goals:**
${draft.aiLiteracyGoals.map(g => `- ${g}`).join("\n")}

**Big AI Idea:** ${draft.bigAiIdea}

---

## Design Phase

**Teacher Goal:** ${draft.designPhase.teacherGoal}

**Student Question:** ${draft.designPhase.studentQuestion}

**Prior Knowledge:** ${draft.designPhase.priorKnowledge}

**Activity:** ${draft.designPhase.activity}

**Misconceptions to Surface:**
${draft.designPhase.misconceptionsToSurface.map(m => `- ${m}`).join("\n")}

---

## Create Phase

**Activity Overview:** ${draft.createPhase.activityOverview}

**Student Steps:**
${draft.createPhase.studentSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

**Teacher Moves:**
${draft.createPhase.teacherMoves.map(m => `- ${m}`).join("\n")}

**Materials:**
${draft.createPhase.materials.map(m => `- ${m}`).join("\n")}

---

## Reflect Phase

**Discussion Prompts:**
${draft.reflectPhase.discussionPrompts.map(p => `- ${p}`).join("\n")}

**Ethical Reflection:** ${draft.reflectPhase.ethicalReflection}

**Exit Ticket:** ${draft.reflectPhase.exitTicket}

---

## Assessment

**Success Criteria:**
${draft.assessment.successCriteria.map(c => `- ${c}`).join("\n")}

---

## Differentiation

**Multilingual Learners:**
${draft.differentiation.multilingualLearners.map(s => `- ${s}`).join("\n")}

**Students Needing Support:**
${draft.differentiation.studentsNeedingSupport.map(s => `- ${s}`).join("\n")}

**Extension:**
${draft.differentiation.extension.map(s => `- ${s}`).join("\n")}

---

## Teacher Decision Points

${draft.teacherDecisionPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

---

## Sources Used

${draft.sourceUseSummary.map(s => `- ${s}`).join("\n")}

---

## Rationale

**Why this activity:** ${draft.rationale.whyThisActivity}

**Why this AI connection:** ${draft.rationale.whyThisAiConnection}

**Why this assessment:** ${draft.rationale.whyThisAssessment}
`
}

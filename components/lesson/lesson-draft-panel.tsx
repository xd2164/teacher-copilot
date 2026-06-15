"use client"
import React, { useState } from "react"
import { LessonDraft, TeacherMove, DraftRevision, QualityReview } from "@/lib/types"
import { LessonDraftView } from "./lesson-draft-view"
import { TeacherMovesView } from "./teacher-moves-view"
import { DraftTimelineView } from "./draft-timeline-view"
import { DesignSpaceView } from "./design-space-view"
import { QualityReviewView } from "./quality-review-view"
import { Download, Copy, Check, Share2, X } from "lucide-react"
import { track } from "@/lib/analytics"

type ActiveView = "draft" | "teacher-moves" | "timeline" | "design-space" | "quality"

interface LessonDraftPanelProps {
  draft: LessonDraft
  teacherMoves: TeacherMove[]
  revisions: DraftRevision[]
  qualityReview: QualityReview
  activeView: ActiveView
  onViewChange: (view: ActiveView) => void
  justUpdated?: boolean
}

const TABS = [
  { id: "draft" as ActiveView,         label: "Lesson"       },
  { id: "teacher-moves" as ActiveView, label: "Moves"        },
  { id: "timeline" as ActiveView,      label: "History"      },
  { id: "design-space" as ActiveView,  label: "Design Space" },
  { id: "quality" as ActiveView,       label: "Quality"      },
]

export function LessonDraftPanel({
  draft, teacherMoves, revisions, qualityReview, activeView, onViewChange, justUpdated,
}: LessonDraftPanelProps) {
  const [copied, setCopied]       = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const handleExportMarkdown = () => {
    track("lesson_exported")
    const md = generateMarkdown(draft)
    const blob = new Blob([md], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${draft.lessonTitle.replace(/\s+/g, "-")}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    track("lesson_copied")
    await navigator.clipboard.writeText(generateMarkdown(draft))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="les-head">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
          <span className="les-chap">Lesson plan · v{draft.versionNumber}</span>
          {justUpdated && (
            <span className="ws-updated-badge" key={draft.versionNumber}>
              <Check /> Updated
            </span>
          )}
        </div>
        <h2 className="les-title">{draft.lessonTitle}</h2>
        <div className="les-meta">
          <span className="les-tag">{draft.gradeLevel}</span>
          <span className="les-tag">{draft.subject}</span>
          <span className="les-tag">{draft.duration}</span>
          <span className="ws-bdg tl">Current</span>
        </div>
      </div>

      <div className="les-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`les-tab${activeView === tab.id ? " on" : ""}`}
            onClick={() => onViewChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="les-tp scrollbar-thin">
        {activeView === "draft" && <LessonDraftView draft={draft} />}
        {activeView === "teacher-moves" && <TeacherMovesView moves={teacherMoves} />}
        {activeView === "timeline" && <DraftTimelineView revisions={revisions} />}
        {activeView === "design-space" && <DesignSpaceView draft={draft} />}
        {activeView === "quality" && <QualityReviewView review={qualityReview} />}
      </div>

      <div className="les-lfoot">
        <button className="ws-btn" style={{ flex: 1, justifyContent: "center" }} onClick={handleExportMarkdown}>
          <Download /> Export .md
        </button>
        <button className="ws-btn" style={{ flex: 1, justifyContent: "center" }} onClick={handleCopy}>
          <Copy /> {copied ? "Copied!" : "Copy"}
        </button>
        <button className="ws-btn" style={{ justifyContent: "center" }} onClick={() => setShareOpen(true)}>
          <Share2 /> Share
        </button>
      </div>

      {shareOpen && (
        <div className="ws-modal-overlay" role="dialog" aria-modal="true"
          onClick={e => e.target === e.currentTarget && setShareOpen(false)}>
          <div className="ws-modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.125rem" }}>
              <div>
                <p className="ws-modal-title">Share to Community</p>
                <p className="ws-modal-sub">Help other teachers by sharing this lesson</p>
              </div>
              <button className="ws-modal-x" onClick={() => setShareOpen(false)} aria-label="Close">
                <X style={{ width: 15, height: 15 }} />
              </button>
            </div>
            <label className="ws-modal-label">Lesson title</label>
            <input className="ws-modal-input" defaultValue={draft.lessonTitle} readOnly />
            <label className="ws-modal-label">Grade & subject</label>
            <input className="ws-modal-input" defaultValue={`${draft.gradeLevel} · ${draft.subject}`} readOnly />
            <label className="ws-modal-label" htmlFor="share-desc">What makes this lesson special?</label>
            <textarea id="share-desc" className="ws-modal-ta"
              placeholder="Brief description for the community…" />
            <div className="ws-modal-actions">
              <button className="ws-modal-cancel" onClick={() => setShareOpen(false)}>Cancel</button>
              <button className="ws-modal-ok" onClick={() => { track("lesson_shared"); setShareOpen(false) }}>
                <Share2 style={{ width: 12, height: 12 }} /> Share lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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

## Rationale

**Why this activity:** ${draft.rationale.whyThisActivity}

**Why this AI connection:** ${draft.rationale.whyThisAiConnection}

**Why this assessment:** ${draft.rationale.whyThisAssessment}
`
}

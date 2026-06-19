"use client"
import React, { useState, useMemo } from "react"
import { LessonDraft } from "@/lib/types"
import { generateLesson } from "@/lib/lesson-generator"
import { getRelevantStandards, Standard, AI_BIG_IDEAS } from "@/lib/standards-data"

const GRADE_LEVELS = [
  "K",
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6",
  "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12",
]

const SUBJECTS = [
  "Science",
  "Math",
  "English/ELA",
  "History/Social Studies",
  "Art",
  "Computer Science",
  "Health/PE",
  "Other",
]

const DURATIONS = ["30 minutes", "45 minutes", "60 minutes", "90 minutes"]

interface LessonIntakeFormProps {
  onGenerate: (draft: LessonDraft) => void
}

export function LessonIntakeForm({ onGenerate }: LessonIntakeFormProps) {
  const [gradeLevel,        setGradeLevel]        = useState("")
  const [subject,           setSubject]           = useState("")
  const [topic,             setTopic]             = useState("")
  const [duration,          setDuration]          = useState("45 minutes")
  const [aiConcept,         setAiConcept]         = useState("")
  const [selectedStandards, setSelectedStandards] = useState<Standard[]>([])
  const [priorFeedback,     setPriorFeedback]     = useState("")

  const standardGroups = useMemo(
    () => getRelevantStandards(gradeLevel, subject),
    [gradeLevel, subject]
  )

  const handleGradeChange = (val: string) => {
    setGradeLevel(val)
    setSelectedStandards([])
  }
  const handleSubjectChange = (val: string) => {
    setSubject(val)
    setSelectedStandards([])
  }

  const toggleStandard = (std: Standard) => {
    setSelectedStandards(prev =>
      prev.some(s => s.code === std.code)
        ? prev.filter(s => s.code !== std.code)
        : [...prev, std]
    )
  }

  const canSubmit = gradeLevel !== "" && subject !== "" && topic.trim() !== "" && aiConcept !== ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    const draft = generateLesson({
      gradeLevel,
      subject,
      topic: topic.trim(),
      duration,
      aiConcept,
      selectedStandards: selectedStandards.length > 0 ? selectedStandards : undefined,
      priorFeedback: priorFeedback.trim() || undefined,
    })
    onGenerate(draft)
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
      <p style={{ fontSize: 16, fontWeight: 600, color: "var(--tx)", marginBottom: 4 }}>
        Let&apos;s plan your lesson
      </p>
      <p style={{ fontSize: 13, color: "var(--t2)", marginBottom: "1.5rem" }}>
        Tell the co-pilot what you&apos;re teaching and we&apos;ll draft a full AI literacy lesson.
      </p>

      {/* Grade Level */}
      <label className="ws-modal-label" htmlFor="intake-grade">Grade level</label>
      <select
        id="intake-grade"
        className="ws-modal-input"
        value={gradeLevel}
        onChange={e => handleGradeChange(e.target.value)}
      >
        <option value="">Select grade…</option>
        {GRADE_LEVELS.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      {/* Subject */}
      <label className="ws-modal-label" htmlFor="intake-subject">Subject</label>
      <select
        id="intake-subject"
        className="ws-modal-input"
        value={subject}
        onChange={e => handleSubjectChange(e.target.value)}
      >
        <option value="">Select subject…</option>
        {SUBJECTS.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Topic */}
      <label className="ws-modal-label" htmlFor="intake-topic">Topic or unit</label>
      <input
        id="intake-topic"
        className="ws-modal-input"
        type="text"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        placeholder="e.g. Data and prediction, The Civil Rights Movement, Ecosystems"
      />

      {/* Duration */}
      <label className="ws-modal-label" htmlFor="intake-duration">Lesson duration</label>
      <select
        id="intake-duration"
        className="ws-modal-input"
        value={duration}
        onChange={e => setDuration(e.target.value)}
      >
        {DURATIONS.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* Five Big Ideas of AI */}
      <label className="ws-modal-label">
        AI literacy focus
        <span className="lif-framework-badge">AI4K12 Five Big Ideas</span>
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 2 }}>
        {AI_BIG_IDEAS.map(idea => {
          const isSelected = aiConcept === idea.value
          return (
            <button
              key={idea.value}
              type="button"
              onClick={() => setAiConcept(idea.value)}
              className={`lif-idea-chip${isSelected ? " selected" : ""}`}
            >
              <span className="lif-idea-label">{idea.label}</span>
              <span className="lif-idea-desc">{idea.description}</span>
            </button>
          )
        })}
      </div>

      {/* Dynamic standards picker — appears once grade + subject are selected */}
      {standardGroups.length > 0 && (
        <div style={{ marginTop: "1.25rem" }}>
          <label className="ws-modal-label" style={{ marginBottom: 4 }}>
            Standards alignment
            <span style={{ fontWeight: 400, color: "var(--t3)", marginLeft: 6, textTransform: "none", letterSpacing: 0 }}>
              — optional
            </span>
          </label>
          <p style={{ fontSize: 11, color: "var(--t3)", marginBottom: 8, lineHeight: 1.5 }}>
            Select any standards this lesson should address.
            {selectedStandards.length > 0 && (
              <strong style={{ color: "var(--nv)", marginLeft: 4 }}>
                {selectedStandards.length} selected
              </strong>
            )}
          </p>
          {standardGroups.map(group => (
            <div key={group.label} className="lif-std-group">
              <p className="lif-std-group-label">{group.label}</p>
              {group.standards.map(std => {
                const isChecked = selectedStandards.some(s => s.code === std.code)
                return (
                  <label key={std.code} className={`lif-std-item${isChecked ? " checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleStandard(std)}
                    />
                    <span>
                      <span className="lif-std-code">{std.code}</span>
                      <span className="lif-std-desc"> — {std.description}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {/* Prior feedback (optional) */}
      <label
        className="ws-modal-label"
        htmlFor="intake-feedback"
        style={{ marginTop: "1.25rem" }}
      >
        Prior experience with this topic
        <span style={{ fontWeight: 400, color: "var(--t3)", marginLeft: 6, textTransform: "none", letterSpacing: 0 }}>
          — optional
        </span>
      </label>
      <textarea
        id="intake-feedback"
        className="ws-modal-ta"
        value={priorFeedback}
        onChange={e => setPriorFeedback(e.target.value)}
        placeholder="What worked or didn't work last time? Any student misconceptions to watch for?"
        style={{ minHeight: 60 }}
      />

      {/* Submit */}
      <div style={{ marginTop: "1.25rem" }}>
        <button
          type="submit"
          className="ws-modal-ok"
          disabled={!canSubmit}
          style={{ width: "100%", justifyContent: "center", fontSize: 13 }}
        >
          Generate lesson plan →
        </button>
        <p style={{ fontSize: 11, color: "var(--t3)", marginTop: ".5rem", textAlign: "center" }}>
          You can refine every part of this lesson through the chat after generating.
        </p>
      </div>
    </form>
  )
}

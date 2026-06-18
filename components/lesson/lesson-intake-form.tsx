"use client"
import React, { useState } from "react"
import { LessonDraft } from "@/lib/types"
import { generateLesson } from "@/lib/lesson-generator"

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

const AI_CONCEPTS: { value: string; label: string }[] = [
  { value: "patterns",   label: "How AI learns from data" },
  { value: "decisions",  label: "How AI makes decisions" },
  { value: "fairness",   label: "AI fairness & bias" },
  { value: "creativity", label: "AI & creativity" },
  { value: "society",    label: "AI in society" },
]

interface LessonIntakeFormProps {
  onGenerate: (draft: LessonDraft) => void
}

export function LessonIntakeForm({ onGenerate }: LessonIntakeFormProps) {
  const [gradeLevel,     setGradeLevel]     = useState("")
  const [subject,        setSubject]        = useState("")
  const [topic,          setTopic]          = useState("")
  const [duration,       setDuration]       = useState("45 minutes")
  const [aiConcept,      setAiConcept]      = useState("")
  const [standards,      setStandards]      = useState("")
  const [priorFeedback,  setPriorFeedback]  = useState("")

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
      standards: standards.trim() || undefined,
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
        Tell the co-pilot what you&apos;re teaching.
      </p>

      {/* Grade Level */}
      <label className="ws-modal-label" htmlFor="intake-grade">Grade level</label>
      <select
        id="intake-grade"
        className="ws-modal-input"
        value={gradeLevel}
        onChange={e => setGradeLevel(e.target.value)}
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
        onChange={e => setSubject(e.target.value)}
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

      {/* AI Concept chips */}
      <label className="ws-modal-label">AI literacy focus</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
        {AI_CONCEPTS.map(concept => {
          const isSelected = aiConcept === concept.value
          return (
            <button
              key={concept.value}
              type="button"
              onClick={() => setAiConcept(concept.value)}
              style={{
                fontSize: 11,
                border: `1px solid ${isSelected ? "var(--nv)" : "var(--nvm)"}`,
                borderRadius: 100,
                padding: "3px 11px",
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                transition: "background .1s, color .1s",
                background: isSelected ? "var(--nv)" : "var(--nvl)",
                color: isSelected ? "#fff" : "var(--nv)",
              }}
            >
              {concept.label}
            </button>
          )
        })}
      </div>

      {/* Standards (optional) */}
      <label className="ws-modal-label" htmlFor="intake-standards">Standards (optional)</label>
      <textarea
        id="intake-standards"
        className="ws-modal-ta"
        value={standards}
        onChange={e => setStandards(e.target.value)}
        placeholder="Paste relevant standards or leave blank"
        style={{ minHeight: 60 }}
      />

      {/* Prior feedback (optional) */}
      <label className="ws-modal-label" htmlFor="intake-feedback">Prior feedback (optional)</label>
      <textarea
        id="intake-feedback"
        className="ws-modal-ta"
        value={priorFeedback}
        onChange={e => setPriorFeedback(e.target.value)}
        placeholder="What worked or didn't work last time teaching this?"
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

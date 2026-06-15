"use client"
import React, { useState } from "react"
import { LessonDraft } from "@/lib/types"
import { ChevronDown, AlertTriangle, BookOpen, Package } from "lucide-react"

interface LessonDraftViewProps {
  draft: LessonDraft
}

function Accordion({ label, children, defaultOpen = false }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ border: "1px solid var(--bd)", borderRadius: 4, overflow: "hidden", marginBottom: ".5rem" }}>
      <button
        className="ws-acc-t"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>{label}</span>
        <ChevronDown className="aci" />
      </button>
      {open && <div className="ws-acc-b">{children}</div>}
    </div>
  )
}

export function LessonDraftView({ draft }: LessonDraftViewProps) {
  return (
    <div>
      {/* Big AI Idea */}
      <div className="ws-bia">
        <span className="ws-bia-l">Big AI Idea</span>
        <p>{draft.bigAiIdea}</p>
      </div>

      {/* Design Phase */}
      <span className="ws-bkh">Design Phase</span>

      <p className="ws-glbl">Subject Learning Goals</p>
      {draft.subjectLearningGoals.map((g, i) => (
        <div key={i} className="ws-gi">
          <span className="ws-bn">{i + 1}</span>
          <span>{g}</span>
        </div>
      ))}

      <hr className="ws-rule" />

      <p className="ws-glbl">AI Literacy Goals</p>
      {draft.aiLiteracyGoals.map((g, i) => (
        <div key={i} className="ws-gi">
          <span className="ws-bn">{i + 1}</span>
          <span>{g}</span>
        </div>
      ))}

      <hr className="ws-rule" />

      <div className="ws-ibl">
        <p className="ws-ill">Teacher Goal</p>
        <p>{draft.designPhase.teacherGoal}</p>
      </div>

      <div className="ws-ibl">
        <p className="ws-ill">Student Question</p>
        <div className="ws-scen">
          <div className="ws-scen-b" style={{ fontStyle: "italic" }}>
            &ldquo;{draft.designPhase.studentQuestion}&rdquo;
          </div>
        </div>
      </div>

      <div className="ws-ibl">
        <p className="ws-ill">Misconceptions to Surface</p>
        {draft.designPhase.misconceptionsToSurface.map((m, i) => (
          <div key={i} className="ws-mi2">
            <AlertTriangle />
            <span>{m}</span>
          </div>
        ))}
      </div>

      <hr className="ws-rule" />

      {/* Create Phase */}
      <span className="ws-bkh">Create Phase</span>

      <div className="ws-ibl">
        <p className="ws-ill">Activity Overview</p>
        <p>{draft.createPhase.activityOverview}</p>
      </div>

      <p className="ws-glbl">Student Steps</p>
      <div style={{ marginBottom: ".75rem" }}>
        {draft.createPhase.studentSteps.map((s, i) => (
          <div key={i} className="ws-sti">
            <span className="ws-sn">{i + 1}</span>
            <p>{s}</p>
          </div>
        ))}
      </div>

      <p className="ws-glbl">Teacher Moves</p>
      <div style={{ marginBottom: ".75rem" }}>
        {draft.createPhase.teacherMoves.map((m, i) => (
          <div key={i} className="ws-mvi">{m}</div>
        ))}
      </div>

      <p className="ws-glbl">Materials</p>
      <div style={{ marginBottom: ".75rem" }}>
        {draft.createPhase.materials.map((m, i) => (
          <div key={i} className="ws-mti">
            <Package />
            <span>{m}</span>
          </div>
        ))}
      </div>

      <hr className="ws-rule" />

      {/* Reflect Phase */}
      <span className="ws-bkh">Reflect Phase</span>

      <p className="ws-glbl">Discussion Prompts</p>
      <div style={{ marginBottom: ".75rem" }}>
        {draft.reflectPhase.discussionPrompts.map((p, i) => (
          <div key={i} className="ws-prml">{p}</div>
        ))}
      </div>

      <div className="ws-etb" style={{ marginBottom: ".75rem" }}>
        <div className="ws-eth-h">Ethical Reflection</div>
        <div className="ws-eth-b">{draft.reflectPhase.ethicalReflection}</div>
      </div>

      <div className="ws-ibl">
        <p className="ws-ill">Exit Ticket</p>
        <div className="ws-ext">
          {draft.reflectPhase.exitTicket.split(". ").filter(Boolean).map((item, i) => (
            <div key={i} className="ws-exi">
              <span className="ws-en">{i + 1}</span>
              <span>{item.replace(/\.$/, "")}.</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="ws-rule" />

      {/* Accordions */}
      <Accordion label="Differentiation">
        <p className="ws-glbl">Multilingual Learners</p>
        <div style={{ marginBottom: ".5rem" }}>
          {draft.differentiation.multilingualLearners.map((s, i) => (
            <div key={i} className="ws-gi">
              <span className="ws-bn">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p className="ws-glbl">Students Needing Support</p>
        <div style={{ marginBottom: ".5rem" }}>
          {draft.differentiation.studentsNeedingSupport.map((s, i) => (
            <div key={i} className="ws-gi">
              <span className="ws-bn">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p className="ws-glbl">Extension</p>
        <div>
          {draft.differentiation.extension.map((s, i) => (
            <div key={i} className="ws-gi">
              <span className="ws-bn">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion label="Teacher Decision Points">
        {draft.teacherDecisionPoints.map((point, i) => (
          <div key={i} className="ws-mi2">
            <AlertTriangle />
            <span>{point}</span>
          </div>
        ))}
      </Accordion>

      <Accordion label="Sources Used">
        {draft.sourceUseSummary.map((source, i) => (
          <div key={i} className="ws-gi">
            <BookOpen style={{ width: 13, height: 13, color: "var(--nv)", flexShrink: 0, marginTop: 2 }} />
            <span>{source}</span>
          </div>
        ))}
      </Accordion>

      <Accordion label="Why This Lesson?">
        <div className="ws-why-quote">{draft.rationale.whyThisActivity}</div>
        <div className="ws-ibl">
          <p className="ws-ill">Why this AI connection</p>
          <p>{draft.rationale.whyThisAiConnection}</p>
        </div>
        <div className="ws-ibl">
          <p className="ws-ill">Why this assessment</p>
          <p>{draft.rationale.whyThisAssessment}</p>
        </div>
      </Accordion>

      <div className="ws-pgf">
        <span>Teacher Co-Pilot · Design–Create–Reflect</span>
        <span>v{draft.versionNumber}</span>
      </div>
    </div>
  )
}

"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Pencil, Home, BookOpen, BarChart2, ClipboardList, Users, BookOpen as BookCheck,
         MessageSquare, TrendingUp, Wand2, Save, CheckCircle, Brain, Plus,
         User, Lightbulb } from "lucide-react"

type Tab = "plan" | "simulate" | "teach" | "reflect" | "improve"

interface ReflectionEntry {
  date: string
  worked: string
  struggled: string
  evidence: string
  support: string
  remember: string
}

const DEFAULT_FORM = {
  grade: "Grade 6",
  subject: "Science",
  topic: "Weather prediction and data",
  duration: "45 minutes",
  goal: "Students will understand how data can support predictions and why predictions can be uncertain.",
  studentNeeds: "Students enjoy hands-on activities but need support explaining reasoning.",
  standard: "NGSS: Analyzing and interpreting data to make predictions",
  constraint: "Students have varied vocabulary knowledge and need visual examples.",
}

type SimProfile = "advanced" | "struggling" | "multilingual" | "disengaged" | null

const SIM_DATA: Record<Exclude<SimProfile, null>, { label: string; response: string; coaching: string }> = {
  advanced: {
    label: "Advanced Learner",
    response: "Each app probably uses different weather models and different data sources, so their predictions would naturally differ based on what data they trained on.",
    coaching: "Strong reasoning. Challenge this student to consider: what if one app has more data from urban areas? How might that affect forecast accuracy for rural students?",
  },
  struggling: {
    label: "Struggling Learner",
    response: "Maybe one app is wrong.",
    coaching: "This student may need support understanding uncertainty. Add a visual showing that models use different data, assumptions, and update times. Try: 'What if both apps used different weather stations?'",
  },
  multilingual: {
    label: "Multilingual Learner",
    response: "I know forecast means weather guess, but I am not sure what prediction model means.",
    coaching: "Add vocabulary support before the activity: forecast, prediction, model, uncertainty, data. Provide a visual glossary with everyday examples alongside the card sort.",
  },
  disengaged: {
    label: "Disengaged Learner",
    response: "I don't know, they just say different things.",
    coaching: "This student may need a concrete hook. Try showing two real weather apps side-by-side as a warm-up before the card sort activity to build immediate relevance.",
  },
}

const TEACH_CARDS = [
  {
    title: "Opening Move",
    tags: [{ cls: "retrieval", label: "Retrieval practice" }, { cls: "metacog", label: "Metacognition" }],
    body: "Ask students: \"Think of a time a weather forecast was wrong. What might have caused the error?\" Give 60 seconds to write, then share with a partner before the whole-group discussion.",
    rationale: "Activates prior knowledge and surfaces existing misconceptions about prediction and certainty before any new instruction begins.",
  },
  {
    title: "Main Activity Launch",
    tags: [{ cls: "struggle", label: "Productive struggle" }, { cls: "peer", label: "Peer instruction" }],
    body: "Distribute weather data card sets to groups of 3–4. Say: \"Your job is to find patterns in this data that help predict rain. Don't ask me for the answer — your group's reasoning is the activity.\" Don't model the sorting first.",
    rationale: "Productive struggle is most effective when students don't have a worked example to copy first. This builds the reasoning habit you want to assess on the exit ticket.",
  },
  {
    title: "Misconception Probe",
    tags: [{ cls: "formative", label: "Formative assessment" }, { cls: "discussion", label: "Classroom discussion" }],
    body: "After groups share their forecast rules, ask: \"What evidence supports your prediction? What might make your forecast rule wrong?\" Follow up: \"How is this similar to how AI makes predictions?\"",
    rationale: "This probe directly addresses the core misconception that predictions equal certainty — the key concept for AI literacy in this lesson.",
  },
  {
    title: "Formative Checkpoint",
    tags: [{ cls: "formative", label: "Formative assessment" }, { cls: "scaffold", label: "Scaffolding" }],
    body: "Before the exit ticket, ask each group to test their forecast rule against the 2 mystery data cards. Collect the Forecast Rule recording sheets as a formative check.",
    rationale: "Provides a low-stakes formative check you can scan quickly to see which groups are ready for the ethical discussion and which need more support.",
  },
  {
    title: "Ethical Discussion Close",
    tags: [{ cls: "discussion", label: "Classroom discussion" }, { cls: "metacog", label: "Metacognition" }],
    body: "Close with: \"What could happen if the weather data used to train an AI system left out some neighborhoods? Who gets worse forecasts, and does that matter?\"",
    rationale: "Connects scientific reasoning to equity and AI literacy. All students can engage with this regardless of their technical background — it requires reasoning, not knowledge.",
  },
]

const IMPROVE_CARDS = [
  { type: "m", typeLabel: "Misconception detected", title: "Students think AI predictions equal certainty", evidence: "Exit tickets from the weather unit showed students described forecasts as either 'right' or 'wrong' — not as probabilistic estimates.", next: "Use two different weather forecasts and ask students to compare what data each model may have used. Ask: 'Why might both be partially right?'", tags: ["Metacognition", "Formative assessment", "Productive struggle"] },
  { type: "e", typeLabel: "Engagement pattern", title: "Hands-on activities drive the most engagement", evidence: "Observation notes show off-task behavior nearly disappeared during the card sort. Paired work was significantly more productive than individual work.", next: "Start the next lesson with a quick model-comparison challenge before any direct instruction.", tags: ["Active learning", "Peer instruction", "Student explanation"] },
  { type: "s", typeLabel: "Support need", title: "Multilingual learners need vocabulary scaffolds", evidence: "Three English learner students paused at 'forecast model', 'uncertainty', and 'training data' during the activity.", next: "Add a visual vocabulary preview card and sentence frames to the next activity materials. Provide bilingual partner time before whole-group share.", tags: ["Scaffolding", "Accessibility", "Classroom discussion"] },
  { type: "v", typeLabel: "Evidence gap", title: "Reflection notes engagement, not learning evidence", evidence: "Post-lesson reflection describes student interest and activity enjoyment, but doesn't include evidence about learning goals.", next: "Add a structured 3-question exit ticket: (1) name one data pattern, (2) explain one forecast limitation, (3) ask one question about AI predictions.", tags: ["Formative assessment", "Evidence-based reasoning"] },
  { type: "m", typeLabel: "Misconception detected", title: "Students use AI outputs but struggle to critique them", evidence: "Students accepted the AI weather output without questioning it during the demo portion of the lesson.", next: "Add a compare-and-challenge activity where students identify what the AI got right, what it missed, and what evidence they used.", tags: ["Metacognition", "Productive struggle", "Student explanation"] },
]

const REFINEMENTS: { id: string; label: string; note: string }[] = [
  { id: "hands-on",    label: "Make it more hands-on",              note: "<strong>Hands-on revision:</strong> Adding a second card sort variation where students physically rearrange cards to test different forecast rules before comparing with another group." },
  { id: "discussion",  label: "Add discussion prompts",             note: "<strong>Discussion prompts added:</strong> (1) What pattern did you trust most? (2) When should we trust an AI forecast less? (3) How would you improve this AI system?" },
  { id: "assessment",  label: "Add assessment",                     note: "<strong>Formative assessment added:</strong> A 3-question exit ticket checking data pattern reasoning, AI literacy connection, and one open question about prediction uncertainty." },
  { id: "younger",     label: "Make it easier for younger students", note: "<strong>Simplified for younger students:</strong> Reducing card sort to 6 cards (instead of 12), adding a sample forecast rule as a model, and removing rubric scoring levels." },
  { id: "ethics",      label: "Add ethical reflection",             note: "<strong>Ethical reflection added:</strong> A structured closing discussion about what happens when AI systems have unequal training data, and who benefits from better weather forecasts." },
  { id: "standards",   label: "Align to standards",                 note: "<strong>Standards alignment added:</strong> Explicit NGSS MS-ESS2-5 connections to the learning goals, activity design, and exit ticket questions." },
  { id: "simulate",    label: "Add synthetic student test",         note: "<strong>Synthetic student test run:</strong> The Struggling Learner profile flagged 'forecast model' as unclear. Adding a vocabulary preview card before the activity." },
  { id: "pedagogy",    label: "Add pedagogy rationale",             note: "<strong>Pedagogy rationale added:</strong> Each teacher move now includes an explanation of why it is recommended and what learning science supports the choice." },
  { id: "intervention",label: "Add intervention strategy",         note: "<strong>Intervention strategy added:</strong> For students who struggle with the card sort, provide a worked example with 3 cards and an explicit if-then rule to model the thinking." },
  { id: "evidence",    label: "Add evidence collection",            note: "<strong>Evidence collection plan added:</strong> Three checkpoints — (1) recording sheet, (2) mystery card test, (3) exit ticket — each with a specific assessment question." },
]

export default function NewLessonPage() {
  const [activeTab, setActiveTab] = useState<Tab>("plan")
  const [form, setForm] = useState(DEFAULT_FORM)
  const [lessonGenerated, setLessonGenerated] = useState(false)
  const [simProfile, setSimProfile] = useState<SimProfile>(null)
  const [reflections, setReflections] = useState<ReflectionEntry[]>([])
  const [reflectForm, setReflectForm] = useState({ worked: "", struggled: "", evidence: "", support: "", remember: "" })
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)
  const [selectedRefinements, setSelectedRefinements] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tcp-reflections")
      if (saved) setReflections(JSON.parse(saved))
    } catch {}
  }, [])

  function handleGenerate() {
    setLessonGenerated(true)
    setActiveTab("plan")
  }

  function handleSaveReflection() {
    const entry: ReflectionEntry = {
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      ...reflectForm,
    }
    const updated = [entry, ...reflections]
    setReflections(updated)
    try { localStorage.setItem("tcp-reflections", JSON.stringify(updated)) } catch {}
    setShowSaveConfirm(true)
    setTimeout(() => setShowSaveConfirm(false), 3000)
    setReflectForm({ worked: "", struggled: "", evidence: "", support: "", remember: "" })
  }

  function toggleRefinement(id: string) {
    setSelectedRefinements(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const TABS: { id: Tab; label: string; icon: React.ReactNode; num: string }[] = [
    { id: "plan",     label: "Plan",    icon: <ClipboardList />, num: "1" },
    { id: "simulate", label: "Simulate",icon: <Users />,         num: "2" },
    { id: "teach",    label: "Teach",   icon: <BookCheck />,     num: "3" },
    { id: "reflect",  label: "Reflect", icon: <MessageSquare />, num: "4" },
    { id: "improve",  label: "Improve", icon: <TrendingUp />,    num: "5" },
  ]

  return (
    <div className="nl-page">
      {/* Nav */}
      <nav className="nl-nav" aria-label="Workspace navigation">
        <Link href="/" className="nl-logo">
          <div className="nl-logo-mark" aria-hidden="true"><Pencil /></div>
          <span className="nl-logo-text">Teacher Co-Pilot</span>
        </Link>
        <div className="nl-nav-links">
          <Link href="/" className="nl-nav-btn"><Home /> Home</Link>
          <Link href="/library" className="nl-nav-btn"><BookOpen /> Library</Link>
          <Link href="/dashboard" className="nl-nav-btn"><BarChart2 /> Dashboard</Link>
        </div>
      </nav>

      {/* Workflow tabs */}
      <div className="nl-workflow" role="tablist" aria-label="Lesson workflow">
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`nl-wf-tab${activeTab === tab.id ? " on" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nl-wf-num" aria-hidden="true">{tab.num}</span>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="nl-content" role="tabpanel">

        {/* ── PLAN TAB ── */}
        {activeTab === "plan" && (
          <div>
            <h1 className="nl-section-title">Plan your lesson</h1>
            <p className="nl-section-sub">Fill in the details below and click &ldquo;Generate&rdquo; to create your instructional plan.</p>
            <div className="nl-plan-split">
              {/* Form */}
              <div className="nl-form-card">
                <h3>Lesson details</h3>
                {[
                  { key: "grade",        label: "Grade level",            type: "input" },
                  { key: "subject",      label: "Subject",                type: "input" },
                  { key: "topic",        label: "Topic",                  type: "input" },
                  { key: "duration",     label: "Lesson length",          type: "input" },
                  { key: "goal",         label: "Learning goal",          type: "ta"    },
                  { key: "studentNeeds", label: "Student needs / context",type: "ta"    },
                  { key: "standard",     label: "Standard or curriculum note (optional)", type: "input" },
                  { key: "constraint",   label: "Classroom constraint",   type: "ta"    },
                ].map(({ key, label, type }) => (
                  <div key={key} className="nl-field">
                    <label className="nl-field-label" htmlFor={`field-${key}`}>{label}</label>
                    {type === "input" ? (
                      <input
                        id={`field-${key}`}
                        className="nl-field-input"
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      />
                    ) : (
                      <textarea
                        id={`field-${key}`}
                        className="nl-field-ta"
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
                <button className="nl-generate-btn" onClick={handleGenerate}>
                  <Wand2 /> Generate instructional plan
                </button>
              </div>

              {/* Output */}
              {lessonGenerated ? (
                <div className="nl-output">
                  <div className="nl-output-head">
                    <p className="nl-output-eyebrow">Generated lesson plan · {form.grade} · {form.subject}</p>
                    <p className="nl-output-title">Can Data Predict Tomorrow&apos;s Weather?</p>
                    <p className="nl-output-meta">{form.duration} · {form.topic}</p>
                  </div>
                  <div className="nl-output-body">
                    <div className="nl-bq">
                      How can looking at patterns in data help us predict what will happen next — and why are predictions never certain?
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">Learning Goals</div>
                      <div className="nl-ls-body">
                        <ul>
                          <li>Explain how patterns in weather data can support predictions</li>
                          <li>Recognize that AI systems use data patterns to make predictions — and can be uncertain</li>
                          <li>Discuss what happens when training data is incomplete or unequal</li>
                        </ul>
                      </div>
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">Materials</div>
                      <div className="nl-ls-body">
                        <ul>
                          <li>Weather data card sets (1 per group of 3–4)</li>
                          <li>Large paper or whiteboard for sorting</li>
                          <li>Forecast Rule recording sheet</li>
                          <li>2 mystery data cards per group (reveal at end)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">Warm-Up (5 min)</div>
                      <div className="nl-ls-body">
                        <p>Ask students: &ldquo;Think of a time a weather forecast was wrong. What might have caused it?&rdquo; 60-second write, then share with a partner.</p>
                      </div>
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">Main Activity (25 min) — Weather Data Card Sort</div>
                      <div className="nl-ls-body">
                        <p>Students work in groups to organize weather data cards and create a forecast rule, then compare their rules with another group.</p>
                        <ul>
                          <li>Sort 12 weather data cards to find patterns that predict rain</li>
                          <li>Write your group&apos;s forecast rule as an if-then statement</li>
                          <li>Test your rule against 2 mystery data cards</li>
                          <li>Discuss: What would make your rule less reliable?</li>
                        </ul>
                      </div>
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">AI Literacy Connection</div>
                      <div className="nl-ls-body">
                        <p>Connect to how AI systems learn from patterns in data — just like students used patterns to make forecast rules. Emphasize that AI predictions can be uncertain for the same reasons student rules can fail.</p>
                      </div>
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">Discussion Prompts</div>
                      <div className="nl-ls-body">
                        <ul>
                          <li>How is making a forecast rule similar to training an AI system on weather data?</li>
                          <li>What could happen if weather data only came from wealthy neighborhoods?</li>
                          <li>Should we trust an AI weather app more or less than a meteorologist? Why?</li>
                        </ul>
                      </div>
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">Exit Ticket</div>
                      <div className="nl-ls-body">
                        <p>Name one way data patterns help make predictions. Name one reason predictions can be wrong. Name one question you&apos;d ask before trusting an AI forecast.</p>
                      </div>
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">Differentiation Support</div>
                      <div className="nl-ls-body">
                        <p><strong>Multilingual learners:</strong> Provide sentence frames — &ldquo;I notice a pattern that... / My forecast rule is... / This could be wrong if...&rdquo; Pre-teach: forecast, prediction, evidence, pattern, uncertainty.</p>
                        <p style={{ marginTop: ".4rem" }}><strong>Students needing support:</strong> Start with a 6-card set. Provide a sample forecast rule as a model. Partner with a student who explains their thinking aloud.</p>
                      </div>
                    </div>
                    <div className="nl-ls">
                      <div className="nl-ls-head">Responsible AI / Ethics Prompt</div>
                      <div className="nl-ls-body">
                        <p>What could happen if an AI weather system had less data from some neighborhoods than others? Who gets worse forecasts, and does that matter?</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="nl-empty-state">
                  <div className="nl-empty-icon" aria-hidden="true"><Wand2 /></div>
                  <h3>Your lesson plan will appear here</h3>
                  <p>Fill in the form and click &ldquo;Generate instructional plan&rdquo; to create a full lesson.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SIMULATE TAB ── */}
        {activeTab === "simulate" && (
          <div>
            <h1 className="nl-section-title">Test with Synthetic Students</h1>
            <p className="nl-section-sub">Select a learner profile to see likely responses and coaching notes before class.</p>

            <div className="nl-sim-profiles" role="group" aria-label="Learner profiles">
              {(["advanced", "struggling", "multilingual", "disengaged"] as const).map(p => (
                <button
                  key={p}
                  className={`nl-sim-profile${simProfile === p ? " on" : ""}`}
                  onClick={() => setSimProfile(prev => prev === p ? null : p)}
                >
                  <User /> {SIM_DATA[p].label}
                </button>
              ))}
            </div>

            <div className="nl-prompt-box">
              <p className="nl-prompt-label">Teacher discussion prompt</p>
              <p className="nl-prompt-text">&ldquo;Why might two weather apps give different forecasts?&rdquo;</p>
            </div>

            {simProfile ? (
              <div className="nl-sim-result">
                <div className="nl-sim-student">
                  <div className="nl-sim-student-head">
                    <User /> {SIM_DATA[simProfile].label} · Likely response
                  </div>
                  <div className="nl-sim-response">&ldquo;{SIM_DATA[simProfile].response}&rdquo;</div>
                  <div className="nl-sim-coach">
                    <Lightbulb />
                    <div>
                      <strong style={{ display: "block", marginBottom: 3, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>Co-Pilot coaching note</strong>
                      {SIM_DATA[simProfile].coaching}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="nl-empty-state">
                <div className="nl-empty-icon" aria-hidden="true"><Users /></div>
                <h3>Select a learner profile above</h3>
                <p>See how different students might respond and what supports to add before class.</p>
              </div>
            )}
          </div>
        )}

        {/* ── TEACH TAB ── */}
        {activeTab === "teach" && (
          <div>
            <h1 className="nl-section-title">Teaching Plan</h1>
            <p className="nl-section-sub">Facilitation guidance with pedagogy rationale — so you know why each move is recommended.</p>

            {TEACH_CARDS.map((card, i) => (
              <div key={i} className="nl-teach-card">
                <div className="nl-teach-card-head">
                  <h3>{card.title}</h3>
                  <div className="nl-ped-tags">
                    {card.tags.map(tag => (
                      <span key={tag.label} className={`nl-ped-tag ${tag.cls}`}>{tag.label}</span>
                    ))}
                  </div>
                </div>
                <div className="nl-teach-card-body"><p>{card.body}</p></div>
                <div className="nl-teach-rationale"><strong>Why this move:</strong> {card.rationale}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── REFLECT TAB ── */}
        {activeTab === "reflect" && (
          <div>
            <h1 className="nl-section-title">Post-Lesson Reflection</h1>
            <p className="nl-section-sub">What did you observe? Save insights to memory so future lessons can build on what you learned.</p>

            <div className="nl-reflect-grid">
              {[
                { key: "worked",    label: "What worked well?" },
                { key: "struggled", label: "Where did students struggle?" },
                { key: "evidence",  label: "What evidence did you observe?" },
                { key: "support",   label: "Which students needed more support?" },
              ].map(({ key, label }) => (
                <div key={key} className="nl-reflect-field-card">
                  <div className="nl-reflect-field-head">{label}</div>
                  <textarea
                    className="nl-reflect-ta"
                    placeholder="Write your observations here..."
                    value={reflectForm[key as keyof typeof reflectForm]}
                    onChange={e => setReflectForm(f => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>

            <div className="nl-reflect-full-card">
              <div className="nl-reflect-field-head">What should the co-pilot remember for next time?</div>
              <textarea
                className="nl-reflect-ta"
                placeholder="e.g., Students struggled with vocabulary around uncertainty. Add visual glossary next time."
                style={{ minHeight: 80 }}
                value={reflectForm.remember}
                onChange={e => setReflectForm(f => ({ ...f, remember: e.target.value }))}
              />
            </div>

            <div>
              {showSaveConfirm ? (
                <span className="nl-save-confirm">
                  <CheckCircle /> Reflection saved. Future lessons will use this classroom insight.
                </span>
              ) : (
                <button className="nl-save-btn" onClick={handleSaveReflection}>
                  <Save /> Save reflection to memory
                </button>
              )}
            </div>

            {reflections.length > 0 && (
              <div className="nl-saved-mems">
                <p className="nl-saved-mems-title"><Brain /> Saved classroom memories</p>
                {reflections.map((r, i) => (
                  <div key={i} className="nl-saved-mem">
                    <p className="nl-saved-mem-date">Saved {r.date}</p>
                    {r.remember && <p className="nl-saved-mem-text"><strong>Remember:</strong> {r.remember}</p>}
                    {r.worked && <p className="nl-saved-mem-text" style={{ marginTop: 4 }}><strong>What worked:</strong> {r.worked}</p>}
                    {r.struggled && <p className="nl-saved-mem-text" style={{ marginTop: 4 }}><strong>Struggled:</strong> {r.struggled}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── IMPROVE TAB ── */}
        {activeTab === "improve" && (
          <div>
            <h1 className="nl-section-title">What should I do next?</h1>
            <p className="nl-section-sub">Evidence-informed recommendations from classroom observations and reflections.</p>

            <div className="nl-improve-grid">
              {IMPROVE_CARDS.map((card, i) => (
                <div key={i} className="nl-insight-card">
                  <span className={`nl-insight-type ${card.type}`}>{card.typeLabel}</span>
                  <h4>{card.title}</h4>
                  <p style={{ fontSize: 12, color: "var(--t3)", fontStyle: "italic", marginBottom: ".5rem" }}>{card.evidence}</p>
                  <div className="nl-insight-action">
                    <p className="nl-insight-action-label">Recommended next move</p>
                    <p>{card.next}</p>
                  </div>
                  <div className="nl-insight-tags">
                    {card.tags.map(t => <span key={t} className="nl-insight-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <div className="nl-refine-section">
              <p className="nl-refine-title">Refine this lesson</p>
              <div className="nl-rfn-chips">
                {REFINEMENTS.map(r => (
                  <button
                    key={r.id}
                    className={`nl-rfn-chip${selectedRefinements.has(r.id) ? " on" : ""}`}
                    onClick={() => toggleRefinement(r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              {selectedRefinements.size > 0 && (
                <div>
                  {REFINEMENTS.filter(r => selectedRefinements.has(r.id)).map(r => (
                    <div key={r.id} className="nl-rfn-note" dangerouslySetInnerHTML={{ __html: r.note }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import Link from "next/link"
import { Pencil, FileText, Plus, ArrowLeft } from "lucide-react"

/* ─── constants ─────────────────────────────────────── */
const AI_POLICIES = [
  { id: "off",        name: "AI off",                desc: "No AI tools. Students write independently." },
  { id: "polish",     name: "Polish & grammar only", desc: "AI corrects grammar and punctuation only." },
  { id: "brainstorm", name: "Brainstorm + polish",   desc: "AI helps brainstorm and revise sentences." },
  { id: "chat",       name: "AI chat allowed",        desc: "Students may use AI to ask questions." },
  { id: "full",       name: "Full AI access",         desc: "All AI features on. Reflection required." },
]

const TABS = ["Student Prompt", "AI Policy", "Rubric", "Reflection", "Humanly Setup"]

type FormData = {
  grade: string
  subject: string
  topic: string
  writingType: string
  policy: string
}

const DEFAULT: FormData = {
  grade: "8",
  subject: "ELA",
  topic: "Should schools allow AI tools in classrooms?",
  writingType: "argumentative",
  policy: "brainstorm",
}

/* ─── tab content ────────────────────────────────────── */
function PromptTab({ form }: { form: FormData }) {
  const verbMap: Record<string, string> = {
    argumentative: "argue", explanatory: "explain", research: "investigate", narrative: "narrate",
  }
  const instrMap: Record<string, string> = {
    argumentative: "Make a clear claim. Support it with at least two pieces of evidence. Address a counterargument.",
    explanatory:   "Explain clearly and precisely. Use examples and evidence. Show how ideas connect.",
    research:      "Use your sources to investigate the question. Synthesize — don't just summarize.",
    narrative:     "Use specific details and your own perspective. Show, don't tell.",
  }
  const verb  = verbMap[form.writingType]  ?? "write about"
  const instr = instrMap[form.writingType] ?? ""
  const policyLabel = AI_POLICIES.find(p => p.id === form.policy)?.name ?? "Custom"

  return (
    <>
      <h2>The task</h2>
      <p>Write a <strong>{form.writingType}</strong> essay in which you <strong>{verb}</strong> the following question:</p>
      <span className="hl">&ldquo;{form.topic}&rdquo;</span>
      <p>{instr}</p>

      <h2>What your essay must include</h2>
      <ul>
        <li>A clear opening statement or claim (1 paragraph)</li>
        <li>At least <strong>two pieces of evidence</strong> from the provided sources, with your explanation</li>
        <li>Your own reasoning — don&apos;t just quote or summarize sources</li>
        <li>A closing paragraph that acknowledges the limits of your argument</li>
        <li>A <strong>reflection paragraph</strong> explaining your AI use (see AI policy)</li>
      </ul>

      <h2>Sources provided</h2>
      <ul>
        <li><strong>Source A:</strong> Assigned reading #1 (available as a PDF inside Humanly)</li>
        <li><strong>Source B:</strong> Assigned reading #2 (available as a PDF inside Humanly)</li>
        <li>You may draw on class discussions and experience, but <em>your essay must cite the sources.</em></li>
      </ul>

      <h2>Length and format</h2>
      <ul>
        <li><strong>Grade:</strong> {form.grade} &nbsp;·&nbsp; <strong>Subject:</strong> {form.subject}</li>
        <li>300–500 words (not counting the reflection paragraph)</li>
        <li>Written and submitted inside <strong>Humanly</strong></li>
        <li>Submit your <strong>Humanly process certificate</strong> alongside your draft</li>
      </ul>

      <h2>AI use</h2>
      <p>Policy: <strong>{policyLabel}</strong>. See the AI Policy tab for complete rules. Your Humanly process certificate will show all AI activity and is part of your grade.</p>
    </>
  )
}

function PolicyTab({ form }: { form: FormData }) {
  type PolicyRule = { allowed: string[]; notAllowed: string[]; humanly: [string, string][] }
  const rules: Record<string, PolicyRule> = {
    off: {
      allowed: [
        "Students write entirely in Humanly with no AI support",
        "Spell-check is permitted (not AI grammar tools)",
        "Students may review source PDFs within Humanly",
      ],
      notAllowed: [
        "No AI prompting, chatting, or suggestion tools of any kind",
        "No AI grammar assistants or autocomplete",
        "No pasting text from outside Humanly",
      ],
      humanly: [
        ["AI assistance", "Disabled"],
        ["Paste restriction", "Block all paste"],
        ["Time limit", "40 minutes"],
        ["Certificate required", "Yes — submit with draft"],
      ],
    },
    polish: {
      allowed: [
        "AI may check grammar and punctuation after a first draft is complete",
        "AI may suggest clearer wording for individual sentences",
        "Source PDFs are accessible throughout the session",
      ],
      notAllowed: [
        "AI may not generate ideas, arguments, or paragraph-length text",
        "No AI chatting, brainstorming, or outlining",
        "Pasting AI-generated text into the essay is blocked",
      ],
      humanly: [
        ["AI assistance", "Grammar polish only"],
        ["Paste restriction", "Block AI-generated paste"],
        ["AI prompt character limit", "150 characters (corrections only)"],
        ["Time limit", "40 minutes"],
        ["Certificate required", "Yes — submit with draft"],
      ],
    },
    brainstorm: {
      allowed: [
        "AI may help generate initial ideas and brainstorm approaches before writing",
        "AI may revise individual sentences for clarity after the first draft is done",
        "Students may ask AI clarifying questions about the sources",
        "Source PDFs are accessible throughout",
      ],
      notAllowed: [
        "AI may not write full paragraphs or generate arguments",
        "Students must write their own introduction and conclusion without AI",
        "Pasting AI-generated text into the essay is not permitted",
      ],
      humanly: [
        ["AI assistance", "Brainstorm + sentence revision"],
        ["Paste restriction", "Limited — flag for review"],
        ["AI prompt character limit", "300 characters per prompt"],
        ["Time limit", "45 minutes"],
        ["Certificate required", "Yes — submit with draft"],
      ],
    },
    chat: {
      allowed: [
        "Students may chat with AI throughout the writing process",
        "AI may help with outlining, drafting, and revision",
        "Students may ask AI to explain sources or give feedback on their draft",
        "Paste from AI is allowed with disclosure in the reflection paragraph",
      ],
      notAllowed: [
        "AI may not write the entire essay",
        "Students must author at least 50% of the final word count",
        "All AI use must be disclosed specifically in the closing reflection paragraph",
      ],
      humanly: [
        ["AI assistance", "Full chat enabled"],
        ["Paste restriction", "Allowed — logged in certificate"],
        ["AI prompt character limit", "No limit"],
        ["Time limit", "50 minutes"],
        ["Certificate required", "Yes — required for grading"],
      ],
    },
    full: {
      allowed: [
        "All AI features enabled — students may use AI at any stage",
        "Paste is allowed and logged in the process certificate",
        "AI-assisted drafts are acceptable when accompanied by a full reflection",
      ],
      notAllowed: [
        "The reflection paragraph must be written entirely without AI",
        "Work must be the student's own synthesis — AI is a tool, not the author",
        "Submitting AI output without engagement or revision is not accepted",
      ],
      humanly: [
        ["AI assistance", "All features on"],
        ["Paste restriction", "Allowed — logged"],
        ["AI prompt character limit", "No limit"],
        ["Time limit", "50 minutes"],
        ["Certificate required", "Required — key evidence for grading"],
      ],
    },
  }

  const r = rules[form.policy] ?? rules["brainstorm"]
  const policyLabel = AI_POLICIES.find(p => p.id === form.policy)?.name ?? "Custom"
  const badgeClass  = form.policy === "off" ? "off" : form.policy === "full" || form.policy === "chat" ? "on" : "lim"

  return (
    <>
      <h2>Policy for this assignment</h2>
      <span className="hl">Level: <strong>{policyLabel}</strong></span>

      <h2>Students may</h2>
      <ul>
        {r.allowed.map((item, i) => <li key={i}><span className="ok">✓</span> {item}</li>)}
      </ul>

      <h2>Students may not</h2>
      <ul>
        {r.notAllowed.map((item, i) => <li key={i}><span className="no">✗</span> {item}</li>)}
      </ul>

      <h2>Disclosure requirement</h2>
      <p>At the end of the essay, students must write a reflection paragraph explaining: where they used AI, what they kept, what they changed, and what they chose to write independently. This paragraph must be written without AI assistance.</p>

      <h2>Humanly task settings</h2>
      <table className="ap-config-table">
        <thead><tr><th>Setting</th><th>Recommended value</th></tr></thead>
        <tbody>
          {r.humanly.map(([k, v]) => (
            <tr key={k}>
              <td className="ap-config-key">{k}</td>
              <td className="ap-config-val">
                {k === "AI assistance"
                  ? <span className={`ap-config-badge ${badgeClass}`}>{v}</span>
                  : v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function RubricTab({ form }: { form: FormData }) {
  const wt = form.writingType.charAt(0).toUpperCase() + form.writingType.slice(1)
  return (
    <>
      <h2>4-level rubric</h2>
      <p style={{ fontSize: 12, color: "var(--t3)", marginBottom: ".75rem" }}>
        Grade {form.grade} · {form.subject} · {wt} writing
      </p>
      <table className="ap-rubric">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>4 — Exemplary</th>
            <th>3 — Proficient</th>
            <th>2 — Developing</th>
            <th>1 — Beginning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Task achievement</strong></td>
            <td>Directly addresses the prompt with a clear, specific claim. All parts of the task met.</td>
            <td>Addresses the prompt with a clear claim. Most task requirements met.</td>
            <td>Partially addresses prompt. Claim present but vague.</td>
            <td>Does not address the prompt clearly. No identifiable claim.</td>
          </tr>
          <tr>
            <td><strong>Evidence &amp; reasoning</strong></td>
            <td>Two or more pieces of evidence used effectively. Explains the connection to the claim. Addresses complexity or counterargument.</td>
            <td>Uses evidence from at least one source. Connects to claim with some explanation.</td>
            <td>Evidence present but relies on summary or quotation without explanation.</td>
            <td>Little or no evidence. Reasoning absent or circular.</td>
          </tr>
          <tr>
            <td><strong>Responsible AI use</strong></td>
            <td>Reflection names specifically where AI was used, what was changed, and why. AI enhances — does not replace — the student&apos;s thinking.</td>
            <td>Reflection addresses AI use. Most of the essay reflects independent thinking.</td>
            <td>Reflection is vague. Some AI-generated content without meaningful revision.</td>
            <td>No reflection. Evidence of reliance on AI without engagement or revision.</td>
          </tr>
          <tr>
            <td><strong>Writing craft</strong></td>
            <td>Clear sentences. Organized paragraphs. Appropriate vocabulary. Few or no mechanical errors.</td>
            <td>Mostly clear. Organized with minor lapses. Minor errors.</td>
            <td>Some unclear sentences. Inconsistent organization. Noticeable errors.</td>
            <td>Frequent unclear sentences. Little organization. Significant errors throughout.</td>
          </tr>
        </tbody>
      </table>

      <h2>Note on Humanly certificates</h2>
      <p>The Humanly process certificate is evidence for the <strong>Responsible AI use</strong> dimension. Review each student&apos;s certificate before assigning a score on that row.</p>
    </>
  )
}

function ReflectionTab({ form }: { form: FormData }) {
  return (
    <>
      <h2>Student reflection (after submitting)</h2>
      <p style={{ fontSize: 12, color: "var(--t3)", marginBottom: ".75rem" }}>
        Students answer these in writing after submitting their draft. They accompany the Humanly certificate as part of the final submission.
      </p>

      <h2>Required questions</h2>
      <ul>
        <li><strong>Q1.</strong> What claim or main idea did you decide to make? Why did you choose it?</li>
        <li><strong>Q2.</strong> Which piece of evidence felt most convincing to you? Explain why in your own words.</li>
        <li><strong>Q3.</strong> Where in your writing process did you use AI? What did it help you do?</li>
        <li><strong>Q4.</strong> What did you change or decide <em>not</em> to keep from an AI suggestion? Why?</li>
        <li><strong>Q5.</strong> What is one thing you understand about this topic now that you didn&apos;t before you started writing?</li>
      </ul>

      <h2>Optional class debrief discussion</h2>
      <ul>
        <li>Did AI make your writing better, or just different? How can you tell?</li>
        <li>What would your essay look like if you had not used AI? Is that better or worse?</li>
        <li>What parts of writing do you want to protect from AI? What parts do you want help with?</li>
      </ul>

      <span className="hl">
        These questions connect to the AI literacy goal: students should understand the difference between AI as a tool for thinking and AI as a replacement for thinking.
      </span>

      <h2>AI literacy connection</h2>
      <p>Use the reflection debrief to discuss: How is using AI for writing similar to using a calculator in math? How is it different? When does AI help you think more — and when does it help you think less?</p>
      <p style={{ fontSize: 12, color: "var(--t3)" }}>
        Grade {form.grade} · {form.subject} — tailor examples to your students&apos; AI experience and your classroom policy.
      </p>
    </>
  )
}

function HumanlyTab({ form }: { form: FormData }) {
  const policyLabel = AI_POLICIES.find(p => p.id === form.policy)?.name ?? "Custom"
  const policyBadge = form.policy === "off" ? "off" : form.policy === "full" || form.policy === "chat" ? "on" : "lim"
  const shortTopic  = form.topic.length > 45 ? form.topic.slice(0, 45) + "…" : form.topic
  const timeLimit   = form.policy === "off" ? "40 minutes" : "45–50 minutes"

  const settings: [string, string, string?][] = [
    ["Task name",        `${form.subject} Gr.${form.grade} — ${shortTopic}`],
    ["Writing type",     form.writingType.charAt(0).toUpperCase() + form.writingType.slice(1)],
    ["Grade",            `Grade ${form.grade}`],
    ["AI policy",        policyLabel, policyBadge],
    ["Time limit",       timeLimit],
    ["Source PDFs",      "Upload Source A and Source B as allowed PDFs"],
    ["Paste logging",    form.policy === "off" ? "Block all paste" : "Log all paste events"],
    ["Certificate",      "Required — students submit with their draft"],
  ]

  return (
    <>
      <h2>Humanly task setup</h2>
      <p style={{ fontSize: 12, color: "var(--t3)", marginBottom: ".75rem" }}>
        Use these settings when creating the task in Humanly. Update source PDFs and time limit to match your class plan.
      </p>

      <table className="ap-config-table">
        <thead><tr><th>Setting</th><th>Recommended value</th></tr></thead>
        <tbody>
          {settings.map(([k, v, badge]) => (
            <tr key={k}>
              <td className="ap-config-key">{k}</td>
              <td className="ap-config-val">
                {badge
                  ? <span className={`ap-config-badge ${badge}`}>{v}</span>
                  : v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Certificate signals to review</h2>
      <ul>
        <li><span className="ok">★</span> <strong>Typing time vs. total session time</strong> — low ratio may indicate heavy paste or AI use</li>
        <li><span className="ok">★</span> <strong>AI prompt count and character volume</strong> — context for the Responsible AI rubric dimension</li>
        <li><span className="ok">★</span> <strong>Large paste events</strong> — especially if paste was limited by policy</li>
        <li><span className="ok">★</span> <strong>Revision patterns</strong> — deletions and rewrites show active engagement</li>
        <li><span className="ok">★</span> <strong>Time on task</strong> — very short sessions warrant a writing conference, not a penalty</li>
      </ul>

      <h2>After collecting certificates</h2>
      <p>Import certificate summaries into Teacher Co-Pilot to:</p>
      <ul>
        <li>Flag students who may benefit from a writing conference</li>
        <li>Identify class-wide patterns (&ldquo;most students used AI only for brainstorming&rdquo;)</li>
        <li>Generate follow-up discussion questions based on what you observe</li>
        <li>Save process insights as classroom memory for future assignment design</li>
      </ul>

      <div className="ap-hm-footer">
        <span className="ap-hm-logo">Humanly</span>
        <span>writehumanly.net · Write with AI. Prove your process.</span>
        <span className="ap-config-badge info" style={{ background: "var(--nvl)", color: "var(--nv)", border: "1px solid var(--nvm)" }}>
          Teacher Co-Pilot integration
        </span>
      </div>
    </>
  )
}

/* ─── page ───────────────────────────────────────────── */
export default function AssignmentNewPage() {
  const [form, setForm]       = useState<FormData>(DEFAULT)
  const [generated, setGen]   = useState(false)
  const [activeTab, setTab]   = useState(0)

  function set(field: keyof FormData, val: string) {
    setForm(prev => ({ ...prev, [field]: val }))
  }

  const policyLabel = AI_POLICIES.find(p => p.id === form.policy)?.name ?? ""

  function renderTab() {
    switch (activeTab) {
      case 0: return <PromptTab form={form} />
      case 1: return <PolicyTab form={form} />
      case 2: return <RubricTab form={form} />
      case 3: return <ReflectionTab form={form} />
      case 4: return <HumanlyTab form={form} />
      default: return null
    }
  }

  return (
    <div className="ap-page">
      {/* Nav */}
      <nav className="ws-nav" aria-label="Main navigation">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" className="ws-logo">
            <div className="ws-logo-mark"><Pencil /></div>
            <span className="ws-logo-text">Teacher Co-Pilot</span>
          </Link>
        </div>
        <div className="ws-nav-links">
          <Link href="/" className="ws-btn"><ArrowLeft /> Home</Link>
          <Link href="/lesson/new" className="ws-btn"><Plus /> New lesson</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="ap-hero">
        <p className="ap-hero-eyebrow">Writing &amp; Authentic Assessment</p>
        <h1 className="ap-hero-h">Create a Humanly-ready assignment packet</h1>
        <p className="ap-hero-sub">
          Design a writing assignment with a student prompt, AI-use policy, rubric, reflection questions,
          and Humanly task configuration — ready to deploy in one place.
        </p>
      </div>

      {/* Body */}
      <div className="ap-body">
        <div className="ap-split">
          {/* Left: form */}
          <div className="ap-form-card">
            <p className="ap-form-h">Assignment details</p>

            <div className="ap-field">
              <label className="ap-label" htmlFor="ap-grade">Grade level</label>
              <select id="ap-grade" className="ap-select" value={form.grade} onChange={e => set("grade", e.target.value)}>
                {["6","7","8","9","10","11","12"].map(g => <option key={g} value={g}>Grade {g}</option>)}
              </select>
            </div>

            <div className="ap-field">
              <label className="ap-label" htmlFor="ap-subject">Subject</label>
              <select id="ap-subject" className="ap-select" value={form.subject} onChange={e => set("subject", e.target.value)}>
                {["ELA","Science","Social Studies","Math","History","Health","Other"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="ap-field">
              <label className="ap-label" htmlFor="ap-topic">Writing topic / question</label>
              <input
                id="ap-topic"
                className="ap-input"
                value={form.topic}
                onChange={e => set("topic", e.target.value)}
                placeholder="e.g. Should schools allow AI tools?"
              />
            </div>

            <div className="ap-field">
              <label className="ap-label" htmlFor="ap-type">Writing type</label>
              <select id="ap-type" className="ap-select" value={form.writingType} onChange={e => set("writingType", e.target.value)}>
                <option value="argumentative">Argumentative</option>
                <option value="explanatory">Explanatory</option>
                <option value="research">Research-based</option>
                <option value="narrative">Narrative</option>
              </select>
            </div>

            <span className="ap-policy-label">AI use policy</span>
            <div className="ap-policy-grid" role="radiogroup" aria-label="AI use policy">
              {AI_POLICIES.map(p => (
                <button
                  key={p.id}
                  type="button"
                  className={`ap-policy-card${form.policy === p.id ? " on" : ""}`}
                  onClick={() => set("policy", p.id)}
                  aria-pressed={form.policy === p.id}
                >
                  <span className="ap-policy-name">{p.name}</span>
                  <span className="ap-policy-desc">{p.desc}</span>
                </button>
              ))}
            </div>

            <button
              className="ap-generate-btn"
              onClick={() => { setGen(true); setTab(0) }}
              type="button"
            >
              <FileText style={{ width: 14, height: 14 }} />
              Generate assignment packet
            </button>
          </div>

          {/* Right: packet or empty state */}
          {generated ? (
            <div className="ap-packet">
              <div className="ap-packet-head">
                <p className="ap-packet-title">{form.topic}</p>
                <div className="ap-packet-meta">
                  <span className="ap-packet-badge">Grade {form.grade}</span>
                  <span>{form.subject}</span>
                  <span>·</span>
                  <span style={{ textTransform: "capitalize" }}>{form.writingType}</span>
                  <span>·</span>
                  <span>{policyLabel}</span>
                </div>
              </div>

              <div className="ap-tab-row" role="tablist">
                {TABS.map((t, i) => (
                  <button
                    key={t}
                    className={`ap-tab${activeTab === i ? " on" : ""}`}
                    role="tab"
                    aria-selected={activeTab === i}
                    onClick={() => setTab(i)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="ap-section" role="tabpanel">
                {renderTab()}
              </div>

              <div className="ap-copy-bar">
                <button className="ap-copy-btn primary" type="button">
                  <FileText style={{ width: 12, height: 12 }} /> Export packet (PDF)
                </button>
                <button className="ap-copy-btn" type="button">
                  Copy to clipboard
                </button>
                <button className="ap-copy-btn" type="button" onClick={() => setTab(4)}>
                  View Humanly setup
                </button>
              </div>
            </div>
          ) : (
            <div className="ap-empty-state">
              <div className="ap-empty-icon">
                <FileText style={{ width: 22, height: 22 }} />
              </div>
              <p className="ap-empty-h">Your assignment packet will appear here</p>
              <p className="ap-empty-p">
                Fill in the assignment details on the left and click <em>Generate assignment packet</em> to build the full packet: student prompt, AI policy, rubric, reflection questions, and Humanly task setup.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

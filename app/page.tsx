import React from "react"
import Link from "next/link"
import { Pencil, Sparkles, ArrowRight, Plus, BookOpen, UserX, Download,
         Brain, Users, BarChart2, Layout, Shield, Eye, Lock, BookMarked,
         CheckCircle, FileText } from "lucide-react"

const WORKFLOW_STEPS = [
  { key: "plan",     label: "Plan",     sub: "Design your lesson",           cls: "plan" },
  { key: "simulate", label: "Simulate", sub: "Test with synthetic students",  cls: "simulate" },
  { key: "teach",    label: "Teach",    sub: "Facilitate with guidance",      cls: "teach" },
  { key: "reflect",  label: "Reflect",  sub: "Save classroom insights",       cls: "reflect" },
  { key: "improve",  label: "Improve",  sub: "Act on evidence",               cls: "improve" },
]

const PLATFORM_LAYERS = [
  { icon: Layout,    cls: "plan",     title: "Instructional Planning",            desc: "Teachers design age-appropriate AI literacy lessons using the Design → Create → Reflect framework, with context from curriculum, standards, and prior reflections." },
  { icon: Brain,     cls: "memory",   title: "Teacher Memory",                    desc: "The system remembers teacher-approved reflections, classroom context, prior misconceptions, and what instructional strategies worked before." },
  { icon: Users,     cls: "simulate", title: "Synthetic Student Simulation",      desc: "Teachers can test lessons with synthetic learner profiles before class to identify likely confusion points, unclear prompts, and supports to add." },
  { icon: BarChart2, cls: "evidence", title: "Evidence and Decision Dashboard",   desc: "Teacher reflections and classroom outcomes become structured evidence that answers: \"What should I do next?\" — with pedagogy rationale." },
  { icon: FileText,  cls: "assess",   title: "Writing & Authentic Assessment",    desc: "Teachers design writing assignments with AI-use policies, rubrics, and reflection questions, then review Humanly process certificates to see how students actually wrote — not just what they submitted." },
]

const SAMPLE_LESSONS = [
  {
    grade: "Grade 6 · Science",
    title: "Can Data Predict Tomorrow's Weather?",
    design: "Students understand that data can support predictions, but predictions can still be uncertain.",
    create: "Students compare two weather forecasts and identify why they may differ.",
    reflect: "What evidence helped students explain uncertainty?",
  },
  {
    grade: "Grade 8 · Social Studies",
    title: "Bias in Facial Recognition",
    design: "Students explore how AI systems can affect people differently depending on who the data represents.",
    create: "Students analyze a classroom-friendly case study about facial recognition and fairness.",
    reflect: "How did students distinguish technical accuracy from social impact?",
  },
  {
    grade: "Grade 7 · Math",
    title: "Recommendation Systems",
    design: "Students understand that recommendation systems use data patterns to rank options.",
    create: "Students build a simple paper-based recommendation algorithm.",
    reflect: "Where did students notice bias or missing information in the ranking?",
  },
]

const RESPONSIBLE_USE = [
  { icon: Eye,    title: "Teacher remains in control",     desc: "Teachers review, edit, and approve all recommendations before using them in the classroom." },
  { icon: UserX,  title: "No student accounts required",   desc: "The prototype supports teacher-led AI literacy activities without requiring students to log into AI tools." },
  { icon: Shield, title: "Age-appropriate AI literacy",    desc: "Lessons connect AI concepts to everyday examples, classroom discussion, and student reasoning — not technical jargon." },
  { icon: Lock,   title: "Editable classroom memory",      desc: "Memory is visible, teacher-approved, and can be revised or cleared at any time. Teachers control what the system remembers." },
]

const HUMANLY_ROWS = [
  { layer: "Assignment design",  cop: "Generates writing prompt, AI-use policy, rubric, and reflection questions", hum: "Receives task setup, enforces rules, provides source PDFs" },
  { layer: "AI policy",          cop: "Helps teacher choose off / polish / brainstorm / chat / full-access", hum: "Enforces AI and paste rules in the writing environment" },
  { layer: "Student writing",    cop: "Provides age-appropriate guidance and reflection scaffolds", hum: "Tracks typing, paste, revision, and AI use in real time" },
  { layer: "Review",             cop: "Summarizes class writing patterns, flags coaching needs", hum: "Generates certificate with session log, replay, and anomaly signals" },
  { layer: "AI literacy",        cop: "Turns writing process into a reflection and classroom discussion", hum: "Shows students how they used AI — not just the final output" },
]

const MEMORY_CHIPS = [
  "Students need help explaining uncertainty.",
  "Hands-on data activities increase engagement.",
  "Use simple examples before introducing technical terms.",
  "Connect AI ethics to everyday student experiences.",
  "Students benefit from comparing two AI outputs before discussing trust.",
  "English learners need vocabulary support before model-based activities.",
]

const EVIDENCE_STEPS = [
  { num: "1", label: "Recommendation" },
  { num: "2", label: "Teacher action" },
  { num: "3", label: "Classroom evidence" },
  { num: "4", label: "Reflection" },
  { num: "5", label: "Improved next lesson" },
]

const DASHBOARD_CARDS = [
  { type: "misconception", label: "Misconception detected",  insight: "Students think AI predictions are either correct or incorrect.", next: "Use examples where two models make different predictions from similar data.", tags: ["Metacognition", "Formative assessment", "Productive struggle"] },
  { type: "engagement",    label: "Engagement pattern",       insight: "Students were most engaged during hands-on comparison activities.", next: "Start the next lesson with a quick model-comparison challenge.", tags: ["Active learning", "Peer instruction", "Student explanation"] },
  { type: "support",       label: "Support need",             insight: "Multilingual learners struggled with: forecast, model, and uncertainty.", next: "Add vocabulary cards and sentence frames before the next activity.", tags: ["Scaffolding", "Accessibility", "Classroom discussion"] },
  { type: "evidence",      label: "Evidence gap",             insight: "Teacher reflection notes engagement but not learning evidence.", next: "Add a short exit ticket asking students to explain their reasoning.", tags: ["Formative assessment", "Evidence-based reasoning"] },
]

export default function HomePage() {
  return (
    <>
      {/* Nav */}
      <nav className="lp-nav" aria-label="Main navigation">
        <Link href="/" className="lp-nav-logo">
          <div className="lp-logo-mark" aria-hidden="true">
            <Pencil className="w-4 h-4 text-white" />
          </div>
          Teacher Co-Pilot
        </Link>
        <div className="lp-nav-links">
          <Link href="/lessons" className="lp-nav-link lp-nav-ghost">Sample Lessons</Link>
          <Link href="/library" className="lp-nav-link lp-nav-ghost">Library</Link>
          <Link href="/dashboard" className="lp-nav-link lp-nav-ghost">Dashboard</Link>
          <Link href="/assignment/new" className="lp-nav-link lp-nav-ghost">Assignments</Link>
          <Link href="/lesson/new" className="lp-nav-link primary">
            Plan lesson <ArrowRight className="w-[14px] h-[14px]" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="lp-hero" aria-labelledby="hero-heading">
          <div className="lp-hero-pill" aria-hidden="true">
            <Sparkles aria-hidden="true" />
            Built for K–12 educators
          </div>
          <h1 className="lp-h1" id="hero-heading">
            Design AI-era learning — <em>and prove students actually did it</em>
          </h1>
          <p className="lp-hero-p">
            Teacher Co-Pilot combines lesson planning, classroom memory, synthetic student testing,
            and authentic writing assessment so K–12 educators can make better instructional decisions
            and show how students learn — not just what they submit.
          </p>
          <div className="lp-hero-actions">
            <Link href="/assignment/new" className="lp-btn primary">
              <FileText className="w-[14px] h-[14px]" aria-hidden="true" /> Create assignment
            </Link>
            <Link href="/lesson/new" className="lp-btn ghost">
              <Plus className="w-[14px] h-[14px]" aria-hidden="true" /> Plan a lesson
            </Link>
          </div>

          {/* Demo panel */}
          <div className="lp-hero-demo" role="presentation">
            <div className="lp-demo-head">
              <div className="lp-demo-dots" aria-hidden="true">
                <span /><span /><span />
              </div>
              Teacher Co-Pilot · Instructional Workspace
            </div>
            <div className="lp-demo-body">
              <div className="lp-demo-msg teacher">
                <div className="lp-demo-avatar" aria-hidden="true">T</div>
                <div className="lp-demo-bubble">
                  Grade 6 science. I want students to learn how weather data can help make predictions,
                  while also understanding that AI predictions can be uncertain.
                </div>
              </div>
              <div className="lp-demo-msg ai">
                <div className="lp-demo-avatar" aria-hidden="true">AI</div>
                <div className="lp-demo-bubble">
                  Great. I&apos;ll help you plan the lesson, test it with synthetic student profiles,
                  identify likely misconceptions, and suggest evidence-informed next moves. We&apos;ll
                  connect weather data to prediction, include a hands-on activity, and add a reflection
                  prompt about when to trust AI forecasts.
                </div>
              </div>
            </div>
          </div>

          {/* Trust chips */}
          <div className="lp-trust-grid" aria-label="Platform features">
            {[
              { Icon: UserX,       label: "No student accounts needed" },
              { Icon: BookOpen,    label: "Works across subjects" },
              { Icon: Eye,         label: "Teacher-controlled memory" },
              { Icon: CheckCircle, label: "Evidence-informed recommendations" },
              { Icon: Users,       label: "Synthetic student testing" },
              { Icon: Download,    label: "Export-ready lesson plans" },
            ].map(({ Icon, label }) => (
              <span key={label} className="lp-trust-chip">
                <Icon aria-hidden="true" /> {label}
              </span>
            ))}
          </div>
        </section>

        <hr className="lp-divider" />

        {/* Platform layers */}
        <section className="lp-section" aria-labelledby="platform-heading">
          <p className="lp-eyebrow" aria-hidden="true">Platform layers</p>
          <h2 className="lp-section-title" id="platform-heading">From lesson planning to instructional intelligence</h2>
          <p className="lp-section-sub">
            Most AI tools help teachers generate content. Teacher Co-Pilot helps teachers improve
            instructional decisions over time — connecting planning, memory, simulation, evidence, and authentic writing assessment.
          </p>
          <div className="lp-platform-grid">
            {PLATFORM_LAYERS.map(({ icon: Icon, cls, title, desc }) => (
              <div key={title} className="lp-platform-card">
                <div className={`lp-platform-icon ${cls}`} aria-hidden="true"><Icon /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="lp-divider" />

        {/* Workflow */}
        <section className="lp-section" aria-labelledby="workflow-heading">
          <p className="lp-eyebrow" aria-hidden="true">How it works</p>
          <h2 className="lp-section-title" id="workflow-heading">A full instructional improvement loop</h2>
          <p className="lp-section-sub">
            Keep Design → Create → Reflect as your classroom language, while the platform supports
            a deeper five-step cycle from planning through evidence-driven improvement.
          </p>
          <div className="lp-workflow-row" role="list">
            {WORKFLOW_STEPS.map((step, i) => (
              <React.Fragment key={step.key}>
                <div className="lp-wf-step" role="listitem">
                  <span className={`lp-wf-badge ${step.cls}`}>{step.label}</span>
                  <span className="lp-wf-sub">{step.sub}</span>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <span className="lp-wf-arrow" aria-hidden="true">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <hr className="lp-divider" />

        {/* Sample lessons */}
        <section className="lp-section" aria-labelledby="samples-heading">
          <p className="lp-eyebrow" aria-hidden="true">Sample AI literacy lessons</p>
          <h2 className="lp-section-title" id="samples-heading">Ready to use in any K–12 classroom</h2>
          <p className="lp-section-sub">
            Three lessons across subjects, grades, and AI concepts — each following the Design → Create → Reflect framework.
          </p>
          <div className="lp-sl-grid">
            {SAMPLE_LESSONS.map(({ grade, title, design, create, reflect }) => (
              <div key={title} className="lp-sl-card">
                <div className="lp-sl-head">
                  <p className="lp-sl-meta">{grade}</p>
                  <p className="lp-sl-title">{title}</p>
                </div>
                <div className="lp-sl-phases">
                  <div className="lp-sl-phase"><span className="lp-sl-phase-label design">Design goal</span><p>{design}</p></div>
                  <div className="lp-sl-phase"><span className="lp-sl-phase-label create">Create activity</span><p>{create}</p></div>
                  <div className="lp-sl-phase"><span className="lp-sl-phase-label reflect">Reflect prompt</span><p>{reflect}</p></div>
                </div>
                <div className="lp-sl-foot">
                  <Link href="/lesson/new" className="lp-btn ghost" style={{ fontSize: 13, padding: "7px 16px" }}>
                    Open lesson <ArrowRight className="w-[12px] h-[12px]" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="lp-divider" />

        {/* Responsible use */}
        <section className="lp-section" aria-labelledby="responsible-heading">
          <p className="lp-eyebrow" aria-hidden="true">Designed for classrooms</p>
          <h2 className="lp-section-title" id="responsible-heading">Built for responsible classroom use</h2>
          <p className="lp-section-sub">
            Teacher Co-Pilot is designed to support teacher judgment, not replace it. It helps educators
            plan, revise, simulate, and reflect while keeping classroom context and responsible AI use visible.
          </p>
          <div className="lp-ru-grid">
            {RESPONSIBLE_USE.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="lp-ru-card">
                <div className="lp-ru-icon" aria-hidden="true"><Icon /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="lp-divider" />

        {/* Humanly integration */}
        <section className="lp-section" aria-labelledby="humanly-heading">
          <p className="lp-eyebrow" aria-hidden="true">Works with Humanly</p>
          <h2 className="lp-section-title" id="humanly-heading">From assignment design to process proof</h2>
          <p className="lp-section-sub">
            Teacher Co-Pilot is the instructional design layer. Humanly is the trusted writing layer.
            Together they answer the question every teacher now faces: not &ldquo;Did AI write this?&rdquo; but
            &ldquo;What did the student understand, decide, revise, and learn while using AI?&rdquo;
          </p>
          <div className="lp-hm-section">
            <p className="lp-hm-eyebrow">Integration overview</p>
            <h3 className="lp-hm-h">Process beats prediction.</h3>
            <p className="lp-hm-sub">
              Humanly moves away from unreliable AI-detection guessing and toward evidence of
              how the work happened — certificates, session logs, typing ratios, and revision patterns.
            </p>
            <table className="lp-hm-table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Teacher Co-Pilot</th>
                  <th>Humanly</th>
                </tr>
              </thead>
              <tbody>
                {HUMANLY_ROWS.map(row => (
                  <tr key={row.layer}>
                    <td><span className="lp-hm-layer">{row.layer}</span></td>
                    <td><span className="lp-hm-cop">{row.cop}</span></td>
                    <td><span className="lp-hm-hum">{row.hum}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="lp-hm-cta">
              <Link href="/assignment/new" className="lp-btn primary" style={{ fontSize: 13 }}>
                <FileText className="w-[13px] h-[13px]" aria-hidden="true" /> Create assignment packet
              </Link>
              <span className="lp-hm-badge">No backend required</span>
              <span className="lp-hm-badge">Works with Humanly free tier</span>
            </div>
          </div>
        </section>

        <hr className="lp-divider" />

        {/* Memory */}
        <section className="lp-section" aria-labelledby="memory-heading">
          <p className="lp-eyebrow" aria-hidden="true">Teacher memory</p>
          <h2 className="lp-section-title" id="memory-heading">What the co-pilot remembers</h2>
          <p className="lp-section-sub">
            The co-pilot remembers teacher-approved reflections, curriculum notes, classroom patterns,
            and instructional decisions — so future lessons build on what actually worked.
          </p>
          <div className="lp-mem-grid">
            {MEMORY_CHIPS.map(mem => (
              <span key={mem} className="lp-mem-chip">
                <BookMarked aria-hidden="true" /> {mem}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-tertiary)", fontStyle: "italic" }}>
            Memory is always visible, editable, and teacher-controlled.
          </p>
        </section>

        <hr className="lp-divider" />

        {/* Evidence loop */}
        <section className="lp-section" aria-labelledby="evidence-heading">
          <p className="lp-eyebrow" aria-hidden="true">Evidence loop</p>
          <h2 className="lp-section-title" id="evidence-heading">From recommendation to improved practice</h2>
          <p className="lp-section-sub">
            Teacher Co-Pilot collects structured evidence about which AI-supported recommendations
            actually improve teaching and learning — useful for teachers, districts, researchers, and foundations.
          </p>
          <div className="lp-ev-loop" aria-label="Evidence improvement loop">
            {EVIDENCE_STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="lp-ev-step">
                  <div className="lp-ev-dot" aria-hidden="true">{step.num}</div>
                  <span className="lp-ev-label">{step.label}</span>
                </div>
                {i < EVIDENCE_STEPS.length - 1 && (
                  <span className="lp-ev-arrow" aria-hidden="true">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <hr className="lp-divider" />

        {/* Dashboard preview */}
        <section className="lp-section" aria-labelledby="dashboard-heading">
          <p className="lp-eyebrow" aria-hidden="true">Teacher decision dashboard</p>
          <h2 className="lp-section-title" id="dashboard-heading">What should I do next?</h2>
          <p className="lp-section-sub">
            The dashboard turns classroom reflections and evidence into actionable next moves —
            with pedagogy rationale so teachers understand why, not just what.
          </p>
          <div className="lp-dash-grid">
            {DASHBOARD_CARDS.map(({ type, label, insight, next, tags }) => (
              <div key={label} className="lp-dash-card">
                <span className={`lp-dash-type ${type}`}>{label}</span>
                <h4>{insight}</h4>
                <div className="lp-dash-next">
                  <p className="lp-dash-next-label">Recommended next move</p>
                  <p>{next}</p>
                </div>
                <div className="lp-dash-tags">
                  {tags.map(t => <span key={t} className="lp-dash-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link href="/dashboard" className="lp-btn ghost">
              Open full dashboard <ArrowRight className="w-[13px] h-[13px]" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <hr className="lp-divider" />

        {/* Compare */}
        <section className="lp-section" aria-labelledby="compare-heading">
          <p className="lp-eyebrow" aria-hidden="true">What makes this different</p>
          <h2 className="lp-section-title" id="compare-heading">A teacher intelligence platform, not a plan printer</h2>
          <p className="lp-section-sub">The difference shows up in every interaction.</p>
          <div className="lp-compare-grid">
            <div className="lp-compare-card bad">
              <h4>Generic AI tools</h4>
              <ul>
                {["One-shot output, no revision", "No memory of what worked", "Ignores your curriculum context", "No student simulation or testing", "No evidence or decision support"].map(item => (
                  <li key={item} style={{ color: "var(--text-tertiary)", display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0 }}>✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lp-compare-card good">
              <h4>Teacher Co-Pilot</h4>
              <ul>
                {["Revise through natural conversation", "Saves teaching insights as classroom memory", "Uses your curriculum, standards, and policy", "Test with synthetic learner profiles", "Decision dashboard with pedagogy rationale"].map(item => (
                  <li key={item}><CheckCircle aria-hidden="true" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="lp-cta-wrap">
          <div className="lp-cta-block">
            <h2>Ready to design AI-era learning?</h2>
            <p>
              Create a writing assignment with a built-in AI policy and process certificate,
              or start with a lesson plan — both take less than two minutes.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/assignment/new" className="lp-btn primary">
                <FileText className="w-[14px] h-[14px]" aria-hidden="true" /> Create assignment
              </Link>
              <Link href="/lesson/new" className="lp-btn ghost">
                <Pencil className="w-[14px] h-[14px]" aria-hidden="true" /> Plan a lesson
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-row">
          <span>Teacher Co-Pilot · Plan · Simulate · Teach · Reflect · Improve · Assess</span>
          <span>Built for K–12 educators</span>
        </div>
        <div style={{ display: "flex", gap: "1.25rem", marginTop: 4 }}>
          <Link href="/lessons" style={{ color: "var(--text-tertiary)", textDecoration: "none", fontSize: 11 }}>Sample Lessons</Link>
          <Link href="/library" style={{ color: "var(--text-tertiary)", textDecoration: "none", fontSize: 11 }}>Library</Link>
          <Link href="/dashboard" style={{ color: "var(--text-tertiary)", textDecoration: "none", fontSize: 11 }}>Dashboard</Link>
          <Link href="/assignment/new" style={{ color: "var(--text-tertiary)", textDecoration: "none", fontSize: 11 }}>Assignments</Link>
        </div>
        <p className="lp-footer-cite">
          Lyublinskaya, I., &amp; Du, X. (2025). <em>Teaching AI literacy across the curriculum: A K–12 handbook.</em> Corwin.
        </p>
        <p className="lp-footer-contact">
          Questions or curriculum interests?{" "}
          <a href="mailto:xiaoxuedubamboo@gmail.com">xiaoxuedubamboo@gmail.com</a>
        </p>
      </footer>
    </>
  )
}

import Link from "next/link"
import { Pencil, BookOpen, Plus, Home } from "lucide-react"

const ACTIVE_INSIGHTS = [
  { type: "mc", typeLabel: "Misconception detected", title: "Students think AI predictions equal certainty", evidence: "Exit tickets from the weather unit showed students described forecasts as either 'right' or 'wrong' — not as probabilistic estimates.", next: "Use two different weather forecasts and ask students to compare what data each model may have used. Ask: 'Why might both be partially right?'", tags: ["Metacognition", "Formative assessment", "Productive struggle"], followUp: "Ask students to explain why two AI systems might make different predictions from similar data." },
  { type: "ep", typeLabel: "Engagement pattern", title: "Hands-on activities drive the most engagement", evidence: "Observation notes show off-task behavior nearly disappeared during the card sort. Paired work was significantly more productive than individual work.", next: "Start the next lesson with a quick model-comparison challenge before any direct instruction.", tags: ["Active learning", "Peer instruction", "Student explanation"], followUp: "Record whether starting with a hands-on hook affects engagement during subsequent direct instruction." },
  { type: "sn", typeLabel: "Support need", title: "Multilingual learners need vocabulary scaffolds", evidence: "Three English learner students paused at 'forecast model', 'uncertainty', and 'training data' during the activity.", next: "Add a visual vocabulary preview card and sentence frames to the next activity materials. Provide bilingual partner time before whole-group share.", tags: ["Scaffolding", "Accessibility", "Classroom discussion"], followUp: "Note whether vocabulary preview reduces vocabulary-related pauses during the next activity." },
  { type: "ev", typeLabel: "Evidence gap", title: "Reflection notes engagement, not learning evidence", evidence: "Post-lesson reflection describes student interest and activity enjoyment, but doesn't include evidence about learning goals.", next: "Add a structured 3-question exit ticket: (1) name one data pattern, (2) explain one forecast limitation, (3) ask one question about AI predictions.", tags: ["Formative assessment", "Evidence-based reasoning"], followUp: "Review exit tickets to identify which learning goal needs the most reinforcement next lesson." },
]

const NEXT_MOVES = [
  { insight: "Students are struggling with fractions.", next: "Use worked examples and peer explanation before independent practice.", tags: ["Worked examples", "Peer instruction"] },
  { insight: "Engagement dropped during independent work.", next: "Add a structured partner checkpoint and a short teacher-led model.", tags: ["Active learning", "Scaffolding"] },
  { insight: "English learners need additional scaffolds.", next: "Add vocabulary previews, visual supports, and sentence frames.", tags: ["Scaffolding", "Accessibility"] },
  { insight: "Students can use AI outputs but struggle to critique them.", next: "Add a compare-and-challenge activity: students identify what the AI got right, what it missed, and what evidence they used.", tags: ["Metacognition", "Critical thinking"] },
]

export default function DashboardPage() {
  return (
    <div className="db-page">
      <nav className="ws-nav" aria-label="Main navigation">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" className="ws-logo">
            <div className="ws-logo-mark"><Pencil /></div>
            <span className="ws-logo-text">Teacher Co-Pilot</span>
          </Link>
        </div>
        <div className="ws-nav-links">
          <Link href="/" className="ws-btn"><Home /> Home</Link>
          <Link href="/library" className="ws-btn"><BookOpen /> Library</Link>
          <Link href="/lesson/new" className="ws-btn cta"><Plus /> New lesson</Link>
        </div>
      </nav>

      <div className="db-hero">
        <p className="db-hero-eye">Teacher intelligence</p>
        <h1 className="db-hero-h">Teacher Decision Dashboard</h1>
        <p className="db-hero-sub">What should I do next? Evidence-informed recommendations based on your classroom reflections and lesson outcomes.</p>
      </div>

      <div className="db-body">
        <h2 className="db-section-title">Active insights</h2>
        <div className="db-grid">
          {ACTIVE_INSIGHTS.map(({ type, typeLabel, title, evidence, next, tags, followUp }) => (
            <div key={title} className="db-card">
              <span className={`db-card-type ${type}`}>{typeLabel}</span>
              <h3>{title}</h3>
              <p className="db-card-evidence">{evidence}</p>
              <div className="db-card-action">
                <p className="db-card-action-label">Recommended next move</p>
                <p>{next}</p>
                <div className="db-card-tags">
                  {tags.map(t => <span key={t} className="db-tag">{t}</span>)}
                </div>
                {followUp && (
                  <p style={{ fontSize: 11, color: "var(--t3)", marginTop: ".5rem", fontStyle: "italic" }}>
                    Follow-up check: {followUp}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2 className="db-section-title">Recommended next moves</h2>
        <div className="db-grid">
          {NEXT_MOVES.map(({ insight, next, tags }) => (
            <div key={insight} className="db-card">
              <p style={{ fontSize: 13, color: "var(--t2)", marginBottom: ".75rem", lineHeight: 1.55 }}>{insight}</p>
              <div className="db-card-action">
                <p className="db-card-action-label">Recommended next move</p>
                <p>{next}</p>
                <div className="db-card-tags">
                  {tags.map(t => <span key={t} className="db-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

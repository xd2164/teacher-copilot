"use client"
import { useState } from "react"
import Link from "next/link"
import { Pencil, BookOpen, FileText, Plus, Check, X, Home, BarChart2 } from "lucide-react"
import { DEMO_DOCUMENTS } from "@/lib/demo-data"
import { KnowledgeDocument } from "@/lib/types"

/* ─── filter config ─────────────────────────────────────────── */
const FILTER_OPTIONS = [
  { id: "all",  label: "All"             },
  { id: "curr", label: "Curriculum"      },
  { id: "std",  label: "Standards"       },
  { id: "fb2",  label: "Lesson feedback" },
  { id: "pol",  label: "AI policy"       },
  { id: "ev",   label: "Evidence"        },
]

const DOC_FILTER_MAP: Record<string, string> = {
  curriculum_map:        "curr",
  ai_literacy_framework: "curr",
  standard:              "std",
  prior_feedback:        "fb2",
  policy:                "pol",
  reflection:            "ev",
}

const DOC_DETAILS: Record<string, { pageInfo: string; sourceDate: string; lessonCount: string; badgeClass: "tl" | "nv" }> = {
  "doc-1": { pageInfo: "PDF · 12 pages",  sourceDate: "Current unit",       lessonCount: "3 lessons",    badgeClass: "tl" },
  "doc-2": { pageInfo: "DOCX · 4 pages",  sourceDate: "Spring 2024",        lessonCount: "1 lesson",     badgeClass: "tl" },
  "doc-3": { pageInfo: "PDF · 8 pages",   sourceDate: "Updated Sep 2024",   lessonCount: "5 lessons",    badgeClass: "tl" },
  "doc-4": { pageInfo: "PDF · 24 pages",  sourceDate: "AI4K12 Initiative",  lessonCount: "2 lessons",    badgeClass: "tl" },
  "doc-5": { pageInfo: "PDF · 18 pages",  sourceDate: "NGSS Lead States",   lessonCount: "Not yet used", badgeClass: "nv" },
  "doc-6": { pageInfo: "CSV · 48 rows",   sourceDate: "January 2025",       lessonCount: "2 lessons",    badgeClass: "tl" },
}

const EXTRA_DOCS: KnowledgeDocument[] = [
  {
    id: "doc-6",
    fileName: "Classroom Evidence Log — Unit 2.csv",
    sourceType: "reflection" as const,
    status: "ready" as const,
    gradeBand: "6-8",
    subject: "Science",
    trustLevel: "high",
    includeInSearch: true,
  },
]

function getDocType(sourceType: string): { label: string; iconClass: "pdf" | "doc" } {
  switch (sourceType) {
    case "curriculum_map":        return { label: "Curriculum Map",        iconClass: "doc" }
    case "prior_feedback":        return { label: "Past Lesson Feedback",  iconClass: "doc" }
    case "policy":                return { label: "School AI Policy",      iconClass: "pdf" }
    case "ai_literacy_framework": return { label: "AI Literacy Framework", iconClass: "pdf" }
    case "standard":              return { label: "Academic Standards",    iconClass: "pdf" }
    case "reflection":            return { label: "Evidence Log",          iconClass: "doc" }
    default:                      return { label: sourceType,              iconClass: "doc" }
  }
}

/* ─── co-pilot analysis per doc ────────────────────────────── */
const DOC_ANALYSIS: Record<string, {
  memoryExtracted: string
  howUsed: string
  evidenceValue: string
  relatedLessons: string[]
}> = {
  "doc-1": {
    memoryExtracted: "Unit 4 covers weather prediction and data patterns across 4 weeks. Lesson 8 (card sort) is the natural anchor for the AI literacy connection. Students compare forecast rules in Week 2.",
    howUsed: "Aligns lesson plans to unit sequence, ensuring lesson topics appear at the right point in the unit. Informs which prior knowledge students already have.",
    evidenceValue: "High — sets the curriculum context for every lesson in the unit.",
    relatedLessons: ["Can Data Predict Tomorrow's Weather?", "AI and Weather Forecasting"],
  },
  "doc-2": {
    memoryExtracted: "Students confused prediction with fact. The card sort worked well. Multilingual learners needed vocabulary support. Exit ticket Q2 (uncertainty) had weak responses.",
    howUsed: "Surfaces prior student misconceptions before lesson planning begins. Triggers uncertainty-focused activities and sentence frames for multilingual learners.",
    evidenceValue: "High — directly informs next instructional move recommendations.",
    relatedLessons: ["Can Data Predict Tomorrow's Weather?"],
  },
  "doc-3": {
    memoryExtracted: "No student AI accounts. Teacher-led demos are permitted. All AI outputs must be disclosed. Students must provide their own reasoning.",
    howUsed: "Adds responsible-use boundaries and disclosure language to all lessons. Ensures lesson design stays within school policy.",
    evidenceValue: "Medium — used for compliance framing and ethics scaffolding.",
    relatedLessons: ["Can Data Predict Tomorrow's Weather?", "Bias in Facial Recognition", "Recommendation Systems"],
  },
  "doc-4": {
    memoryExtracted: "Big Idea 3 (Learning from data) is most relevant. Lessons should connect AI to everyday examples. Uncertainty and fairness are key middle school concepts.",
    howUsed: "Ensures age-appropriate AI literacy framing. Provides discussion questions and concept sequencing for each lesson.",
    evidenceValue: "Medium — used for AI literacy concept framing.",
    relatedLessons: ["Bias in Facial Recognition", "Recommendation Systems"],
  },
  "doc-5": {
    memoryExtracted: "MS-ESS2-5 requires collecting data and identifying patterns to explain weather. Students must use evidence to construct explanations, not just name facts.",
    howUsed: "Aligns learning goals, formative checks, and exit tickets to NGSS practices. Ensures lesson objectives meet grade-level expectations.",
    evidenceValue: "High — used to verify standards alignment before lessons are finalized.",
    relatedLessons: [],
  },
  "doc-6": {
    memoryExtracted: "64% of students can name a data pattern; only 29% can explain forecast uncertainty. One-third reported full trust in AI forecasts with no skepticism.",
    howUsed: "Primary input to the Teacher Decision Dashboard. Triggers 'misconception detected' and 'evidence gap' recommendations for the next lesson.",
    evidenceValue: "High — the most direct evidence source for instructional decisions.",
    relatedLessons: ["Can Data Predict Tomorrow's Weather?", "AI and Weather Forecasting"],
  },
}

/* ─── full document content components ─────────────────────── */
function Doc1Content() {
  return (
    <>
      <h2>Unit 4: Weather, Climate, and Data Systems</h2>
      <p><strong>Grade 6 Science · 4 Weeks · 20 Lessons</strong></p>

      <h2>Standards Addressed</h2>
      <ul>
        <li><strong>MS-ESS2-5</strong> — Collect data to provide evidence for how motions and interactions of air masses result in changes in weather conditions.</li>
        <li><strong>MS-ESS2-6</strong> — Develop and use a model to describe how unequal heating of the Earth causes patterns of atmospheric and oceanic circulation.</li>
        <li><strong>MS-ETS1-3</strong> — Analyze data from tests to determine similarities and differences among several design solutions to identify the best characteristics of each.</li>
      </ul>

      <h2>Unit Overview</h2>
      <p>Students investigate how scientists use data patterns to make weather predictions, then connect this to how AI systems learn from data. The unit builds toward an understanding that predictions are probabilistic — not certain — and that data quality affects prediction quality.</p>

      <h2>Lesson Sequence</h2>
      <p className="lib-doc-week">Week 1 — Weather Data Collection</p>
      <div className="lib-doc-row">L1: What is weather data? Reading tables and graphs</div>
      <div className="lib-doc-row">L2: Collecting classroom weather data (temperature, humidity, wind, cloud cover)</div>
      <div className="lib-doc-row">L3: Looking for patterns in a week of weather observations</div>
      <div className="lib-doc-row">L4: What makes a pattern useful for prediction?</div>
      <div className="lib-doc-row">L5: Mini-assessment — identifying patterns in provided data sets</div>

      <p className="lib-doc-week">Week 2 — Weather Prediction and Uncertainty</p>
      <div className="lib-doc-row">L6: How do forecasters use data to predict weather?</div>
      <div className="lib-doc-row">L7: Building a forecast rule from data patterns</div>
      <div className="lib-doc-row star">L8: Card sort — testing forecast rules against mystery data ← Co-Pilot lesson</div>
      <div className="lib-doc-row">L9: Why do forecasts fail? Data gaps and model differences</div>
      <div className="lib-doc-row">L10: Comparing two weather apps — why might they disagree?</div>

      <p className="lib-doc-week">Week 3 — Climate vs. Weather; Long-Term Patterns</p>
      <div className="lib-doc-row">L11: Climate vs. weather — what&apos;s the difference?</div>
      <div className="lib-doc-row">L12: Reading climate graphs for our region</div>
      <div className="lib-doc-row">L13: How do long-term patterns change prediction reliability?</div>
      <div className="lib-doc-row">L14: Who benefits from accurate forecasts?</div>
      <div className="lib-doc-row">L15: Guest read-aloud — a meteorologist&apos;s job</div>

      <p className="lib-doc-week">Week 4 — AI, Data, and Prediction</p>
      <div className="lib-doc-row">L16: How does AI use data to make predictions?</div>
      <div className="lib-doc-row star">L17: AI weather tools — demo and class discussion</div>
      <div className="lib-doc-row">L18: What happens when training data is unequal?</div>
      <div className="lib-doc-row">L19: Who gets worse forecasts, and why does that matter?</div>
      <div className="lib-doc-row">L20: Culminating task — design a &ldquo;fair forecast&rdquo; system</div>

      <h2>Essential Questions</h2>
      <ul>
        <li>How can data patterns help us predict future events — and why are predictions never certain?</li>
        <li>Who benefits from having accurate weather predictions, and who doesn&apos;t?</li>
        <li>What does it mean to &ldquo;trust&rdquo; an AI system&apos;s output?</li>
      </ul>

      <h2>Key Vocabulary</h2>
      <p>forecast · prediction · uncertainty · data pattern · evidence · model · training data · bias · probabilistic</p>

      <h2>Assessment Plan</h2>
      <ul>
        <li><strong>Formative:</strong> Exit tickets after L4, L8, L13</li>
        <li><strong>Performance task:</strong> Design and test a forecast rule (L8)</li>
        <li><strong>Summative:</strong> Culminating task (L20) + written reflection</li>
      </ul>
    </>
  )
}

function Doc2Content() {
  return (
    <>
      <h2>Teacher Reflection — Weather Prediction Unit</h2>
      <p><strong>Ms. Rivera · 6th Grade Science · Spring Semester 2024</strong></p>

      <h2>What Worked Well</h2>
      <ul>
        <li><span className="lib-doc-ok">✓</span> The card sort (Lesson 8) engaged nearly all students — even students who rarely participate were sorting and discussing with their groups</li>
        <li><span className="lib-doc-ok">✓</span> Comparing two weather apps generated genuine curiosity: &ldquo;why are they different?&rdquo;</li>
        <li><span className="lib-doc-ok">✓</span> Students made strong personal connections: &ldquo;my dad checks three apps before a road trip&rdquo;</li>
        <li><span className="lib-doc-ok">✓</span> The forecast rule writing was a good formative check — I could see exactly what students understood</li>
        <li><span className="lib-doc-ok">✓</span> Groups of 3 worked better than groups of 4 for the card sort task</li>
      </ul>

      <h2>Where Students Struggled</h2>
      <ul>
        <li><span className="lib-doc-no">✗</span> Many students used &ldquo;prediction&rdquo; and &ldquo;fact&rdquo; interchangeably — came up repeatedly in discussion</li>
        <li><span className="lib-doc-no">✗</span> Common misconception: &ldquo;more data always means better predictions&rdquo; — hard for students to accept</li>
        <li><span className="lib-doc-no">✗</span> Students struggled to explain uncertainty in words, even when they seemed to understand it in the activity</li>
        <li><span className="lib-doc-no">✗</span> The transition from the card sort to the AI connection was too abrupt — needed more scaffolding</li>
        <li><span className="lib-doc-no">✗</span> Exit ticket Q2 (&ldquo;why might your forecast be wrong?&rdquo;) had very weak responses</li>
      </ul>

      <h2>Student Observations</h2>
      <ul>
        <li>6 of 28 students wrote something about AI in exit tickets without being prompted — good sign of transfer</li>
        <li>3 multilingual learners needed clarification on &ldquo;forecast&rdquo; vs. &ldquo;prediction&rdquo; — similar meanings in home language</li>
        <li>One group created a forecast rule better than the one I planned — let them share first next time</li>
        <li>The ethical discussion at the end felt rushed; students had more to say</li>
      </ul>

      <h2>Exit Ticket Results (n=28)</h2>
      <table className="lib-doc-table">
        <thead><tr><th>Question</th><th>Adequate response</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Q1: Name a data pattern</td><td>18 / 28 <span className="lib-doc-badge ok">64%</span></td><td>Strong — build on this</td></tr>
          <tr><td>Q2: Why might forecast be wrong</td><td>8 / 28 <span className="lib-doc-badge warn">29%</span></td><td>Priority for next lesson</td></tr>
          <tr><td>Q3: Question about AI forecast</td><td>11 / 28 <span className="lib-doc-badge warn">39%</span></td><td>Needs more modeling</td></tr>
        </tbody>
      </table>

      <h2>Revisions for Next Time</h2>
      <ul>
        <li>Pre-teach vocabulary with a comparison chart: forecast / prediction / estimate / guess</li>
        <li>Add a discussion question before the card sort: &ldquo;Can you know something for certain from data alone?&rdquo;</li>
        <li>Slow down the AI connection — use think-pair-share before full group discussion</li>
        <li>Extend ethical discussion to its own closing session (don&apos;t rush it at the end)</li>
        <li>Add sentence frames for multilingual learners: &ldquo;I notice a pattern that… / This could be wrong if…&rdquo;</li>
        <li>Give students one mystery card first (not two) to reduce cognitive load</li>
      </ul>

      <div className="lib-doc-hl">
        Priority for next unit: build vocabulary around prediction and uncertainty before any data activities.
      </div>
    </>
  )
}

function Doc3Content() {
  return (
    <>
      <h2>Green Valley Middle School — AI Use Policy</h2>
      <p><strong>Effective: September 2024 · Review: June 2025</strong></p>

      <h2>Purpose</h2>
      <p>This policy guides the appropriate use of AI tools by students and teachers. It is designed to support learning, protect student privacy, and ensure that AI use reflects our commitment to academic integrity and responsible technology use.</p>

      <h2>Permitted Teacher Uses</h2>
      <ul>
        <li><span className="lib-doc-ok">✓</span> Teachers may demonstrate AI tools to the whole class as an instructional activity</li>
        <li><span className="lib-doc-ok">✓</span> Teachers may use AI tools to generate lesson draft content for their own review and revision</li>
        <li><span className="lib-doc-ok">✓</span> Teachers may display AI-generated content for class analysis and critique</li>
        <li><span className="lib-doc-ok">✓</span> AI literacy instruction is encouraged across all subjects and grade levels</li>
      </ul>

      <h2>Permitted Student Uses (with teacher supervision)</h2>
      <ul>
        <li><span className="lib-doc-ok">✓</span> Students may interact with teacher-selected AI tools during class with direct oversight</li>
        <li><span className="lib-doc-ok">✓</span> Students may compare and analyze AI outputs as part of a lesson activity</li>
        <li><span className="lib-doc-ok">✓</span> Students may use AI as a subject of study: &ldquo;How does this work?&rdquo; and &ldquo;Is this reliable?&rdquo;</li>
      </ul>

      <h2>Not Permitted</h2>
      <ul>
        <li><span className="lib-doc-no">✗</span> Students may not use AI tools to complete, write, or substantially revise assignments</li>
        <li><span className="lib-doc-no">✗</span> Students may not create personal accounts on AI platforms without parent/guardian consent</li>
        <li><span className="lib-doc-no">✗</span> Student names, work, or identifiable information may not be submitted to AI systems</li>
        <li><span className="lib-doc-no">✗</span> Teachers may not use AI-generated content in student-facing materials without reviewing it</li>
      </ul>

      <h2>Disclosure Requirements</h2>
      <ul>
        <li>Any lesson that includes AI output must note this in the lesson materials</li>
        <li>Students must disclose if they used AI assistance on any submitted work</li>
        <li>This prototype (Teacher Co-Pilot) is approved for <strong>teacher-only use</strong> — no student logins required</li>
      </ul>

      <h2>Privacy and Data</h2>
      <p>No AI tools that collect student data may be used without district Data Privacy Officer approval. All AI-generated lesson content must be reviewed and approved by the teacher before student use.</p>

      <h2>Recommended Discussion Questions for Students</h2>
      <ul>
        <li>&ldquo;Why might a school have rules about AI?&rdquo;</li>
        <li>&ldquo;What would happen if AI wrote your assignments for you?&rdquo;</li>
        <li>&ldquo;How do you decide when to trust an AI output?&rdquo;</li>
      </ul>

      <div className="lib-doc-note">
        <strong>Teacher Co-Pilot note:</strong> This policy is automatically applied to all lesson plans generated for this school. Responsible-use language and disclosure notes are added to every lesson by default.
      </div>
    </>
  )
}

function Doc4Content() {
  return (
    <>
      <h2>Day of AI — Middle School Framework</h2>
      <p><strong>AI4K12 Initiative · Updated for Classroom Use 2024</strong></p>

      <h2>Framework Overview</h2>
      <p>Day of AI provides structured, accessible AI literacy experiences for grades 6–8. The framework builds on the Five Big Ideas in AI and connects them to everyday contexts students already understand — without requiring technical expertise.</p>

      <h2>The Five Big Ideas in AI</h2>
      <h3>1. Perception — Computers perceive the world differently than humans</h3>
      <p><em>Middle school focus:</em> How do computers &ldquo;see&rdquo; images? What do they miss that humans notice automatically?</p>

      <h3>2. Representation and Reasoning — Agents maintain representations of the world</h3>
      <p><em>Middle school focus:</em> How do AI systems organize what they &ldquo;know&rdquo;? What happens when their model of the world is wrong?</p>

      <h3>3. Learning — Computers can learn from data <span className="lib-doc-badge info">Most relevant for this unit</span></h3>
      <p><em>Middle school focus:</em> How does training data shape what an AI can do? What happens when the training data is incomplete or biased?</p>
      <div className="lib-doc-hl">
        AI learns patterns the same way students use weather data cards — it finds correlations and uses them to predict. The key difference: AI can process vastly more data, but it can&apos;t reason about why the pattern exists.
      </div>

      <h3>4. Natural Interaction — AI requires many kinds of knowledge to interact naturally</h3>
      <p><em>Middle school focus:</em> Why is it hard for AI to understand language the way humans do? What does this mean for AI tools students use?</p>

      <h3>5. Societal Impact — AI can impact society in positive and negative ways</h3>
      <p><em>Middle school focus:</em> Who benefits from AI systems? Who is harmed? Who decides how AI is used?</p>

      <h2>Recommended Lesson Structure</h2>
      <ul>
        <li><strong>Warm-up:</strong> A relatable scenario connecting everyday experience to AI (5 min)</li>
        <li><strong>Core activity:</strong> Hands-on exploration — card sort, role-play, or data analysis (20–25 min)</li>
        <li><strong>Discussion:</strong> Guided questions about AI limitations and social impact (10 min)</li>
        <li><strong>Exit:</strong> A student-generated question about AI — not a recall question (5 min)</li>
      </ul>

      <h2>Discussion Questions (Framework-Provided)</h2>
      <ul>
        <li>&ldquo;How is what you just did similar to how AI learns?&rdquo;</li>
        <li>&ldquo;What data would make an AI weather system less fair?&rdquo;</li>
        <li>&ldquo;When should we trust AI predictions, and when should we be skeptical?&rdquo;</li>
        <li>&ldquo;Who benefits most from accurate weather forecasts? Who has historically been left out?&rdquo;</li>
      </ul>

      <h2>Age-Appropriate Boundaries</h2>
      <ul>
        <li><span className="lib-doc-ok">✓</span> Middle schoolers can understand pattern recognition, training data, and fairness</li>
        <li><span className="lib-doc-no">✗</span> Avoid deep technical detail about neural networks or backpropagation</li>
        <li>Focus on inputs, outputs, and consequences — not mechanisms</li>
        <li>Always connect to student experience: weather apps, music recommendations, search results</li>
      </ul>
    </>
  )
}

function Doc5Content() {
  return (
    <>
      <h2>NGSS Performance Expectations — Grade 6</h2>
      <p><strong>Earth and Space Science: Earth&apos;s Systems · Relevant to Weather Unit</strong></p>

      <h2>Primary Standard: MS-ESS2-5</h2>
      <p>Students who demonstrate understanding can: <strong>Collect data to provide evidence for how the motions and complex interactions of air masses result in changes in weather conditions.</strong></p>

      <h3>Clarification Statement</h3>
      <p>Emphasis is on how changes in the interactions of air masses produce various weather conditions, including types of precipitation. Examples of data could include temperature, humidity, wind speed and direction, and cloud cover. Assessment of climate is limited to local geographic scales.</p>

      <h3>Evidence Statements — What students must be able to do</h3>
      <ul>
        <li>Collect multiple types of data about weather conditions over time</li>
        <li>Identify patterns in the data that correlate with changes in weather</li>
        <li>Use patterns to construct a simple predictive model or rule</li>
        <li>Identify limitations in the data that affect reliability of predictions</li>
        <li>Use evidence to explain why a prediction could be correct <em>and</em> still be uncertain</li>
      </ul>

      <h2>Secondary Standard: MS-ESS2-6</h2>
      <p>Students who demonstrate understanding can: <strong>Develop and use a model to describe how unequal heating and rotation of the Earth cause patterns of atmospheric and oceanic circulation.</strong></p>

      <h2>AI Literacy Alignment</h2>
      <div className="lib-doc-hl">
        MS-ESS2-5 is a natural partner for AI literacy instruction. Both science and AI involve: data → pattern recognition → prediction. Both require students to explain <em>why</em> predictions can be uncertain, not just accept that they are.
      </div>

      <h2>Assessment Rubric (MS-ESS2-5)</h2>
      <table className="lib-doc-table">
        <thead>
          <tr><th>Level</th><th>What students do</th></tr>
        </thead>
        <tbody>
          <tr><td><span className="lib-doc-badge ok">4</span></td><td>Names a specific pattern, explains a prediction with evidence, and identifies a genuine limitation of their forecast rule</td></tr>
          <tr><td><span className="lib-doc-badge info">3</span></td><td>Names a pattern and makes a prediction; limitation is vague (&ldquo;weather changes&rdquo;)</td></tr>
          <tr><td><span className="lib-doc-badge warn">2</span></td><td>Identifies data but does not explain a pattern or connect to prediction</td></tr>
          <tr><td><span className="lib-doc-badge na">1</span></td><td>Response does not use evidence from the data</td></tr>
        </tbody>
      </table>

      <h2>Exit Ticket Stem (Aligned to MS-ESS2-5)</h2>
      <p><em>&ldquo;Using evidence from the data cards, explain one pattern you noticed and describe one reason your prediction might be wrong.&rdquo;</em></p>

      <h2>Standards Not Addressed in This Unit</h2>
      <ul>
        <li>MS-ESS1 (Earth&apos;s Place in Universe) — not covered</li>
        <li>MS-ESS3 (Earth and Human Activity) — partially addressed in ethical discussion</li>
        <li>MS-PS (Physical Science) — not covered in this unit</li>
      </ul>
    </>
  )
}

function Doc6Content() {
  return (
    <>
      <h2>Classroom Evidence Log — Unit 2</h2>
      <p><strong>Grade 6 Science · Ms. Rivera · January 2025</strong><br />
      Exit Ticket Analysis — Lesson 8: Can Data Predict Tomorrow&apos;s Weather?</p>

      <h2>Data Collection</h2>
      <p>28 students completed a 3-question exit ticket after Lesson 8. Responses were reviewed and coded using the lesson rubric within 24 hours of instruction.</p>

      <h2>Exit Ticket Questions</h2>
      <ul>
        <li><strong>Q1:</strong> &ldquo;Name one pattern in the weather data that helped you make a prediction.&rdquo;</li>
        <li><strong>Q2:</strong> &ldquo;Name one reason your forecast might be wrong.&rdquo;</li>
        <li><strong>Q3:</strong> &ldquo;What is one question you would ask before trusting an AI weather forecast?&rdquo;</li>
      </ul>

      <h2>Summary Results (n = 28)</h2>
      <table className="lib-doc-table">
        <thead><tr><th>Question</th><th>Adequate</th><th>Partial</th><th>Inadequate</th></tr></thead>
        <tbody>
          <tr>
            <td>Q1 — Data pattern</td>
            <td>18 / 28 <span className="lib-doc-badge ok">64%</span></td>
            <td>7 / 28</td>
            <td>3 / 28</td>
          </tr>
          <tr>
            <td>Q2 — Forecast uncertainty</td>
            <td>8 / 28 <span className="lib-doc-badge warn">29%</span></td>
            <td>12 / 28</td>
            <td>8 / 28</td>
          </tr>
          <tr>
            <td>Q3 — Critical AI question</td>
            <td>11 / 28 <span className="lib-doc-badge warn">39%</span></td>
            <td>9 / 28</td>
            <td>8 / 28</td>
          </tr>
        </tbody>
      </table>

      <h2>Common Student Responses — Q1 (Data Pattern)</h2>
      <ul>
        <li>&ldquo;When humidity goes up and temperature drops, it usually rains&rdquo; — 9 students</li>
        <li>&ldquo;Wind speed increases before storms&rdquo; — 6 students</li>
        <li>&ldquo;Cloud cover above 80% correlates with rain&rdquo; — 3 students</li>
      </ul>

      <h2>Common Student Responses — Q2 (Uncertainty)</h2>
      <ul>
        <li>&ldquo;The app is just wrong sometimes&rdquo; — 8 students <span className="lib-doc-badge warn">misconception</span></li>
        <li>&ldquo;Because weather changes&rdquo; — 7 students (surface level)</li>
        <li>&ldquo;We didn&apos;t have all the data we needed&rdquo; — 5 students <span className="lib-doc-badge ok">strong</span></li>
        <li>&ldquo;The model might have been trained on different weather&rdquo; — 3 students <span className="lib-doc-badge ok">strong</span></li>
      </ul>
      <p>Students using probabilistic language (&ldquo;might,&rdquo; &ldquo;probably,&rdquo; &ldquo;could&rdquo;): only <strong>5 of 28</strong></p>

      <h2>Notable Student Questions — Q3 (AI Critique)</h2>
      <ul>
        <li>&ldquo;Where does the data come from and how old is it?&rdquo; <span className="lib-doc-badge ok">strong</span></li>
        <li>&ldquo;Was it trained on weather from this region or somewhere else?&rdquo; <span className="lib-doc-badge ok">strong</span></li>
        <li>&ldquo;What happens when the AI is wrong — does it learn?&rdquo; <span className="lib-doc-badge ok">strong</span></li>
        <li>&ldquo;Is it accurate?&rdquo; — 9 students (surface level)</li>
        <li>&ldquo;I trust it&rdquo; — 8 students <span className="lib-doc-badge warn">concern</span></li>
      </ul>

      <h2>Key Findings for Instructional Planning</h2>
      <ul>
        <li><strong>Priority:</strong> Students cannot yet explain why predictions can be uncertain — need explicit instruction on probabilistic reasoning before next lesson</li>
        <li><strong>Strength:</strong> Most students can identify data patterns — build on this in the next unit</li>
        <li><strong>Concern:</strong> One-third of students reported full trust in AI weather apps with no skepticism</li>
        <li><strong>Action:</strong> Open next lesson with a case study of a failed weather prediction and ask students to explain why</li>
      </ul>

      <div className="lib-doc-hl">
        Co-Pilot recommendation: Add &ldquo;understanding uncertainty&rdquo; as the primary learning goal for the next lesson. Use two conflicting AI weather forecasts as an anchor phenomenon.
      </div>
    </>
  )
}

function DocContent({ docId }: { docId: string }) {
  switch (docId) {
    case "doc-1": return <Doc1Content />
    case "doc-2": return <Doc2Content />
    case "doc-3": return <Doc3Content />
    case "doc-4": return <Doc4Content />
    case "doc-5": return <Doc5Content />
    case "doc-6": return <Doc6Content />
    default:      return <p style={{ color: "var(--t3)", fontStyle: "italic" }}>No preview available.</p>
  }
}

/* ─── recent lessons ────────────────────────────────────────── */
const RECENT_LESSONS = [
  { title: "Can Data Predict Tomorrow's Weather?", meta: "Gr. 6 · Science · Jan 15" },
  { title: "Bias in Facial Recognition",           meta: "Gr. 8 · Social Studies · Jan 10" },
  { title: "Recommendation Systems",               meta: "Gr. 7 · Math · Jan 4" },
]

/* ─── page ──────────────────────────────────────────────────── */
export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)

  const allDocs = [...DEMO_DOCUMENTS, ...EXTRA_DOCS]
  const filtered = allDocs.filter(d => {
    if (activeFilter === "all") return true
    return DOC_FILTER_MAP[d.sourceType] === activeFilter
  })

  const selectedDoc = selectedDocId ? allDocs.find(d => d.id === selectedDocId) ?? null : null
  const analysis    = selectedDocId ? DOC_ANALYSIS[selectedDocId] : null

  function selectDoc(id: string) {
    setSelectedDocId(prev => prev === id ? null : id)
  }

  return (
    <div className="lib-page">
      {/* Nav */}
      <nav className="ws-nav" aria-label="Main navigation">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" className="ws-logo">
            <div className="ws-logo-mark"><Pencil /></div>
            <span className="ws-logo-text">Teacher Co-Pilot</span>
          </Link>
        </div>
        <div className="ws-nav-links">
          <Link href="/" className="ws-btn"><Home /> Home</Link>
          <button className="ws-btn on"><BookOpen /> Library</button>
          <Link href="/dashboard" className="ws-btn"><BarChart2 /> Dashboard</Link>
          <Link href="/lesson/new" className="ws-btn cta"><Plus /> New lesson</Link>
        </div>
      </nav>

      {/* Main */}
      <div className="lib-main-full">
        <span className="lib-chap">Knowledge Library</span>
        <h1 className="lib-h">Your teaching resources</h1>
        <p className="lib-sub">Click any resource to read its contents and see how the co-pilot uses it.</p>

        {/* Filters */}
        <div className="lib-fltrs">
          {FILTER_OPTIONS.map(f => (
            <button
              key={f.id}
              className={`lib-fb${activeFilter === f.id ? " on" : ""}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Document grid */}
        <div className="lib-dgrid">
          {filtered.map(doc => {
            const { label, iconClass } = getDocType(doc.sourceType)
            const detail = DOC_DETAILS[doc.id]
            const isSel  = selectedDocId === doc.id
            return (
              <div
                key={doc.id}
                className={`lib-dc${isSel ? " sel" : ""}`}
                onClick={() => selectDoc(doc.id)}
                role="button"
                tabIndex={0}
                aria-pressed={isSel}
                onKeyDown={e => e.key === "Enter" && selectDoc(doc.id)}
              >
                <div className="lib-dc-check" aria-hidden="true"><Check /></div>
                <div className={`lib-d-ic ${iconClass}`} aria-hidden="true"><FileText /></div>
                <div className="lib-d-name">{doc.fileName}</div>
                <div className="lib-d-type">{label}</div>
                <div className="lib-d-foot">
                  <span className={`ws-bdg ${detail?.badgeClass ?? "tl"}`}>
                    {detail?.badgeClass === "nv" ? "Available" : "Ready"}
                  </span>
                  <span style={{ fontSize: 10, color: "var(--t3)" }}>{detail?.lessonCount ?? ""}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Document viewer */}
        {selectedDoc && analysis && (
          <div className="lib-viewer" role="region" aria-label={`Preview: ${selectedDoc.fileName}`}>
            {/* Viewer header */}
            <div className="lib-viewer-head">
              <div className="lib-viewer-head-left">
                <p className="lib-viewer-title">{selectedDoc.fileName}</p>
                <div className="lib-viewer-meta">
                  <span className="ws-bdg tl">{getDocType(selectedDoc.sourceType).label}</span>
                  <span style={{ fontSize: 11, color: "var(--t2)" }}>{DOC_DETAILS[selectedDoc.id]?.pageInfo}</span>
                  <span style={{ fontSize: 11, color: "var(--t3)" }}>{DOC_DETAILS[selectedDoc.id]?.sourceDate}</span>
                  <span style={{ fontSize: 11, color: "var(--nv)", fontWeight: 500 }}>
                    {DOC_DETAILS[selectedDoc.id]?.lessonCount !== "Not yet used"
                      ? `Used in ${DOC_DETAILS[selectedDoc.id]?.lessonCount}`
                      : "Not yet used in a lesson"}
                  </span>
                </div>
              </div>
              <button
                className="lib-viewer-close"
                onClick={() => setSelectedDocId(null)}
                aria-label="Close preview"
              >
                <X style={{ width: 12, height: 12, display: "inline", marginRight: 4 }} />
                Close
              </button>
            </div>

            {/* Viewer body: doc content + analysis */}
            <div className="lib-viewer-body">
              {/* Document content */}
              <div className="lib-doc-content">
                <DocContent docId={selectedDoc.id} />
              </div>

              {/* Co-pilot analysis */}
              <div className="lib-doc-analysis">
                <p className="sb-lbl" style={{ marginBottom: ".25rem" }}>Co-Pilot Analysis</p>

                <div className="lib-analysis-block">
                  <p className="lib-analysis-label">Memory extracted</p>
                  <p className="lib-analysis-mem">{analysis.memoryExtracted}</p>
                </div>

                <div className="lib-analysis-block">
                  <p className="lib-analysis-label">How the co-pilot uses it</p>
                  <p className="lib-analysis-val">{analysis.howUsed}</p>
                </div>

                <div className="lib-analysis-block">
                  <p className="lib-analysis-label">Evidence value</p>
                  <p className="lib-analysis-val">{analysis.evidenceValue}</p>
                </div>

                {analysis.relatedLessons.length > 0 && (
                  <div className="lib-analysis-block">
                    <p className="lib-analysis-label">Related lessons</p>
                    <div>
                      {analysis.relatedLessons.map(l => (
                        <span key={l} className="lib-analysis-tag">{l}</span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/lesson/new"
                  className="ws-btn cta"
                  style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
                >
                  <Plus /> Use in new lesson
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent lessons strip */}
      <div className="lib-recent-row">
        <span className="lib-recent-label">Recent lessons</span>
        {RECENT_LESSONS.map((l, i) => (
          <div key={i} className="lib-recent-item">
            <FileText aria-hidden="true" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--tx)" }}>{l.title}</div>
              <div style={{ fontSize: 10.5, color: "var(--t3)" }}>{l.meta}</div>
            </div>
          </div>
        ))}
        <Link href="/lesson/new" className="ws-btn cta" style={{ marginLeft: "auto" }}>
          <Plus /> New lesson
        </Link>
      </div>
    </div>
  )
}

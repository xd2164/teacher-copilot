import { LessonDraft, KnowledgeDocument, ChatMessage, TeacherMove, DraftRevision, QualityReview } from "./types"

export const DEMO_TEACHER = {
  id: "demo-teacher-1",
  name: "Ms. Rivera",
  email: "rivera@greenvalleyms.edu",
  aiConfidenceLevel: "beginner" as const,
  gradesBand: "6-8",
  subjects: ["Science", "STEM"],
}

export const DEMO_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "doc-1",
    fileName: "6th Grade Science Curriculum Map.pdf",
    sourceType: "curriculum_map",
    status: "ready",
    gradeBand: "6-8",
    subject: "Science",
    trustLevel: "high",
    includeInSearch: true,
    usedInCurrentLesson: true,
  },
  {
    id: "doc-2",
    fileName: "Prior Lesson Feedback — Weather Unit.docx",
    sourceType: "prior_feedback",
    status: "ready",
    gradeBand: "6-8",
    subject: "Science",
    trustLevel: "high",
    includeInSearch: true,
    usedInCurrentLesson: true,
  },
  {
    id: "doc-3",
    fileName: "Green Valley MS AI Policy 2024.pdf",
    sourceType: "policy",
    status: "ready",
    trustLevel: "high",
    includeInSearch: true,
    usedInCurrentLesson: true,
  },
  {
    id: "doc-4",
    fileName: "Day of AI — Middle School Framework.pdf",
    sourceType: "ai_literacy_framework",
    status: "ready",
    trustLevel: "high",
    includeInSearch: true,
  },
  {
    id: "doc-5",
    fileName: "NGSS Performance Expectations Grade 6.pdf",
    sourceType: "standard",
    status: "ready",
    gradeBand: "6-8",
    subject: "Science",
    trustLevel: "high",
    includeInSearch: true,
  },
]

export const DEMO_LESSON: LessonDraft = {
  id: "draft-1",
  versionNumber: 3,
  lessonTitle: "Can Data Predict Tomorrow's Weather?",
  gradeLevel: "Grade 6",
  subject: "Science",
  duration: "45 minutes",
  topic: "Weather prediction and data patterns",
  subjectLearningGoals: [
    "Explain how patterns in weather data can support forecasts",
    "Use evidence to make and evaluate predictions",
  ],
  aiLiteracyGoals: [
    "Understand that AI systems use data patterns to make predictions",
    "Recognize that predictions can be uncertain or wrong",
    "Discuss what happens when training data is incomplete or unequal",
  ],
  bigAiIdea: "AI systems learn from patterns in data — just like scientists use patterns in weather data to make forecasts.",
  designPhase: {
    teacherGoal: "Help students connect the idea of using evidence to predict weather with how AI systems use data to make predictions.",
    studentQuestion: "How can looking at patterns in data help us predict what will happen next — and what are the limits of prediction?",
    priorKnowledge: "Students have studied weather systems and basic data analysis. They can read tables and graphs.",
    activity: "Students examine a weather data table and make initial predictions before any instruction.",
    misconceptionsToSurface: [
      "Prediction = certainty (students may think forecasts are always right)",
      "More data always means better predictions",
      "AI 'knows' the answer rather than estimating from patterns",
    ],
  },
  createPhase: {
    activityOverview: "Weather Data Card Sort: Students work in groups to organize weather data cards and create a forecast rule, then compare their rules with AI forecasting logic.",
    studentSteps: [
      "Receive a set of 12 weather data cards (temperature, humidity, wind, cloud cover for 3 locations, 4 days each)",
      "Sort the cards to find patterns that predict rain vs. no rain",
      "Write your group's 'forecast rule' as an if-then statement",
      "Share your rule with another group and test it against 2 mystery data cards",
      "Discuss: What would make your rule less reliable?",
    ],
    teacherMoves: [
      "Circulate and ask: 'What pattern do you notice?'",
      "When groups get stuck: 'Which cards feel most important? Why?'",
      "Before share-out: 'What would make your forecast rule wrong?'",
      "Connection question: 'How is this similar to how AI makes predictions from data?'",
    ],
    materials: [
      "Weather data card sets (1 per group of 3-4)",
      "Large paper or whiteboard space for sorting",
      "Markers",
      "Forecast Rule recording sheet",
      "2 mystery data cards per group (reveal at end)",
    ],
  },
  reflectPhase: {
    discussionPrompts: [
      "What patterns helped you make the best predictions?",
      "When did your rule fail? What data was missing or surprising?",
      "How is making a forecast rule similar to training an AI system on weather data?",
      "What could happen if the weather data only came from wealthy neighborhoods with good weather stations?",
      "Should we trust an AI weather app more or less than a meteorologist? Why?",
    ],
    ethicalReflection: "What could happen if an AI weather system had less data from some neighborhoods than others? Who gets worse forecasts, and does that matter?",
    exitTicket: "Name one way data patterns help make predictions. Name one reason predictions can be wrong. Name one question you'd ask before trusting an AI forecast.",
  },
  assessment: {
    successCriteria: [
      "Can explain what pattern they used to make a forecast",
      "Can identify at least one reason their forecast could be wrong",
      "Can connect the card sort activity to how AI learns from data",
      "Engages with the ethical question about unequal data",
    ],
    rubric: [
      {
        criterion: "Data pattern reasoning",
        levels: ["No pattern identified", "Pattern named but not explained", "Pattern explained with evidence", "Pattern explained with multiple examples and limitations"],
      },
      {
        criterion: "AI literacy connection",
        levels: ["No connection made", "Surface connection (AI uses data)", "Explains training and prediction", "Discusses uncertainty and data quality"],
      },
      {
        criterion: "Ethical thinking",
        levels: ["Not engaged", "Identifies issue", "Explains impact", "Connects to real equity implications"],
      },
    ],
  },
  differentiation: {
    multilingualLearners: [
      "Provide sentence frames: 'I notice a pattern that... / My forecast rule is... / This could be wrong if...'",
      "Pre-teach vocabulary: forecast, prediction, evidence, pattern, uncertainty",
      "Allow bilingual pair discussions before whole-group share",
      "Provide weather data cards with simple visual icons alongside numbers",
    ],
    studentsNeedingSupport: [
      "Start with a 6-card set (instead of 12) to reduce cognitive load",
      "Provide a sample forecast rule as a model",
      "Partner with a student who can explain their thinking aloud",
    ],
    extension: [
      "Research how real weather models are trained and what data they use",
      "Find a news story about a weather forecast that was significantly wrong and investigate why",
      "Design a data collection system that would give better forecasts to underserved areas",
    ],
  },
  rationale: {
    whyThisActivity: "The card sort makes pattern recognition physical and collaborative. Your prior reflection noted students confused prediction with certainty — this activity directly surfaces that misconception by having students test their own rules.",
    whyThisAiConnection: "Weather forecasting is a natural, concrete analog to AI prediction. It avoids abstract AI talk and grounds the concept in a domain students already understand.",
    whyThisAssessment: "The exit ticket checks three distinct things: scientific reasoning, AI literacy, and epistemic humility. The rubric allows you to see where students are across these dimensions without a long test.",
  },
  teacherDecisionPoints: [
    "Review the mystery data cards before class — make sure they genuinely test the edge cases in the data",
    "Decide whether the ethical discussion happens in the main activity or as a separate closing — it can go deep",
    "Consider whether you want to show a real AI weather app during the connection question",
    "Confirm grouping strategy: heterogeneous by reading level recommended for card sort",
    "The forecast rule sheet is a formative check — decide whether to collect it",
  ],
  sourceUseSummary: [
    "Used your curriculum map: weather systems unit, data patterns standard",
    "Used your prior feedback: students confused prediction and certainty in prior unit",
    "Used school AI policy: no student AI accounts required — lesson is fully unplugged",
    "Used Day of AI framework: patterns and prediction as AI literacy concept",
  ],
  revisionSuggestions: [
    "Add sentence frames for multilingual learners (revision 3 added these)",
    "Consider adding a real-world AI weather app demo",
    "The ethical discussion could be extended into a full next lesson",
  ],
  changeRationale: "Draft 3 added multilingual learner supports and strengthened the ethical discussion based on teacher request.",
  createdAt: new Date("2024-01-15T10:30:00"),
}

export function makeBlankLesson(): LessonDraft {
  return {
    id: `lesson-${Date.now()}`,
    versionNumber: 1,
    lessonTitle: "",
    gradeLevel: "",
    subject: "",
    duration: "",
    topic: "",
    subjectLearningGoals: [],
    aiLiteracyGoals: [],
    bigAiIdea: "",
    designPhase: { teacherGoal: "", studentQuestion: "", priorKnowledge: "", activity: "", misconceptionsToSurface: [] },
    createPhase: { activityOverview: "", studentSteps: [], teacherMoves: [], materials: [] },
    reflectPhase: { discussionPrompts: [], ethicalReflection: "", exitTicket: "" },
    assessment: { successCriteria: [], rubric: [] },
    differentiation: { multilingualLearners: [], studentsNeedingSupport: [], extension: [] },
    rationale: { whyThisActivity: "", whyThisAiConnection: "", whyThisAssessment: "" },
    teacherDecisionPoints: [],
    sourceUseSummary: [],
    revisionSuggestions: [],
    createdAt: new Date(),
  }
}

export function makeWelcomeMessages(): ChatMessage[] {
  return [
    {
      id: "welcome-1",
      role: "assistant",
      content: "Hi! I'm your AI literacy lesson co-pilot.\n\nLet's design a lesson together. To get started, tell me:\n- **Grade level** (e.g. Grade 5, Grade 9–10)\n- **Subject** (e.g. Science, English, Math, Art)\n- **Topic or unit** you're working on\n\nIf you have an AI concept in mind — like how AI makes decisions, what training data is, or AI and fairness — mention that too. Otherwise I'll help you find a natural connection for your topic.",
      timestamp: new Date(),
      stage: "understand",
    }
  ]
}

export const DEMO_TEACHER_MOVES: TeacherMove[] = [
  {
    type: "misconception_probe",
    label: "Misconception Probe",
    whenToUse: "After students share their forecast rule",
    whatToSay: "What evidence supports your prediction? What might make your forecast rule wrong?",
    whyItHelps: "This helps students distinguish prediction from certainty — a key idea in understanding how AI systems work and fail.",
  },
  {
    type: "guiding_question",
    label: "Guiding Question",
    whenToUse: "When groups are sorting cards without clear criteria",
    whatToSay: "Which cards feel most important to your forecast? What would you need to know to be more confident?",
    whyItHelps: "Moves students from random sorting to evidence-based reasoning without giving away the pattern.",
  },
  {
    type: "ethical_dilemma",
    label: "Ethical Dilemma",
    whenToUse: "During the Reflect Phase discussion",
    whatToSay: "What might happen if the weather data used to train an AI system left out some neighborhoods?",
    whyItHelps: "Connects the lesson to AI fairness and equity without requiring technical background. All students can engage with this.",
  },
  {
    type: "think_aloud",
    label: "Think-Aloud Prompt",
    whenToUse: "Before groups share their rules",
    whatToSay: "I'm going to think aloud about this card: high humidity, dropping temperature, increasing wind. I'm noticing these three things often happen before rain in the data...",
    whyItHelps: "Models the reasoning process before students share their own thinking. Reduces anxiety for reluctant participants.",
  },
  {
    type: "evidence_check",
    label: "Evidence Check",
    whenToUse: "When a student makes a strong claim",
    whatToSay: "That's a strong claim. What's the evidence from your data cards? Is there any card that contradicts it?",
    whyItHelps: "Builds the habit of backing claims with evidence — critical for both science and AI literacy.",
  },
  {
    type: "pair_discussion",
    label: "Pair Discussion",
    whenToUse: "Before the whole-group ethical discussion",
    whatToSay: "Turn to a partner and share: should we trust an AI forecast more or less than a human forecaster? Be ready to explain your reasoning.",
    whyItHelps: "Ensures every student formulates a position before the whole-group discussion, increasing participation.",
  },
]

export const DEMO_REVISIONS: DraftRevision[] = [
  {
    versionNumber: 1,
    summary: "Initial weather prediction lesson with basic card sort",
    whatChanged: ["Created lesson structure", "Designed card sort activity", "Added teacher moves"],
    whyChanged: "Initial draft from teacher's lesson request",
    teacherDecision: "Review card data for accuracy",
    timestamp: new Date("2024-01-15T09:00:00"),
  },
  {
    versionNumber: 2,
    summary: "Added ethical discussion and strengthened AI connection",
    whatChanged: ["Added ethical discussion prompts about unequal data", "Strengthened AI literacy goals", "Added exit ticket"],
    whyChanged: "Teacher asked to add AI literacy connections and ethical discussion",
    teacherDecision: "Decide whether ethical discussion is separate lesson",
    timestamp: new Date("2024-01-15T09:45:00"),
  },
  {
    versionNumber: 3,
    summary: "Added multilingual learner supports and extension activities",
    whatChanged: ["Added sentence frames for multilingual learners", "Added vocabulary pre-teaching", "Added extension activities"],
    whyChanged: "Teacher requested support for multilingual learners",
    teacherDecision: "Confirm grouping strategy for card sort",
    timestamp: new Date("2024-01-15T10:30:00"),
  },
]

export const DEMO_QUALITY_REVIEW: QualityReview = {
  readiness: "ready",
  strengths: [
    "Age-appropriate: Card sort is concrete and accessible for grade 6",
    "Strong AI literacy: Connects weather prediction to AI pattern recognition",
    "Ethical reflection: Includes equity discussion about data representation",
    "Differentiation: Multilingual learner supports are specific and practical",
    "Teacher usability: Clear teacher moves with timing",
  ],
  weaknesses: [
    "The mystery data cards are not included — teacher needs to create them",
    "The rubric could include clearer level descriptors",
  ],
  requiredRevisions: [
    "Create the mystery data cards (2 per group) before classroom use",
  ],
  safetyNotes: [
    "Lesson is fully unplugged — no student AI account issues",
    "Ethical discussion is age-appropriate and does not require sensitive personal data",
  ],
  teacherDecisions: [
    "Confirm mystery data cards are ready",
    "Decide on ethical discussion format: embedded or closing activity",
    "Set grouping strategy before class",
  ],
}

export const DEMO_INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-0",
    role: "assistant",
    content: "Hi! I'm your Design–Create–Reflect Co-Pilot.\n\nYour lesson plan builds in the panel on the right ↗ as we chat. Try the suggestions below, or tell me what you're teaching.",
    timestamp: new Date("2024-01-15T09:00:00"),
    stage: "understand",
  },
  {
    id: "msg-1",
    role: "user",
    content: "6th grade science — weather prediction and how patterns in data are used to make forecasts.",
    timestamp: new Date("2024-01-15T09:01:00"),
  },
  {
    id: "msg-2",
    role: "assistant",
    content: `A few quick questions:
- How long is the lesson?
- Student devices, or unplugged?
- Use your curriculum map and past feedback?`,
    timestamp: new Date("2024-01-15T09:01:30"),
    stage: "understand",
  },
  {
    id: "msg-3",
    role: "user",
    content: "45 minutes, unplugged, yes use my curriculum map.",
    timestamp: new Date("2024-01-15T09:02:00"),
  },
  {
    id: "msg-4",
    role: "assistant",
    content: "Found 3 relevant pieces. Generating your first draft now…",
    timestamp: new Date("2024-01-15T09:02:30"),
    stage: "retrieve",
    retrievalSummary: [
      "Curriculum: weather systems & data patterns",
      "Feedback: students confused prediction with certainty",
      "Policy: no student AI accounts",
    ],
  },
  {
    id: "msg-5",
    role: "user",
    content: "Make it more hands-on and add support for multilingual learners.",
    timestamp: new Date("2024-01-15T10:15:00"),
  },
  {
    id: "msg-6",
    role: "assistant",
    content: `Revised: (1) card sort is now physically interactive; (2) sentence frames + bilingual pair discussion for ELL.

**Decision needed:** Group size — pairs, 3s, or 4s?`,
    timestamp: new Date("2024-01-15T10:16:00"),
    stage: "revise",
  },
]

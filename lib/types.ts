export type TeacherProfile = {
  id: string
  name: string
  email: string
  aiConfidenceLevel: "beginner" | "intermediate" | "advanced"
  gradesBand?: string
  subjects?: string[]
}

export type DocumentStatus = "uploading" | "processing" | "ready" | "needs_review"

export type KnowledgeDocument = {
  id: string
  fileName: string
  sourceType: "curriculum_map" | "prior_feedback" | "policy" | "lesson_plan" | "standard" | "student_work" | "ai_literacy_framework" | "reflection"
  status: DocumentStatus
  gradeBand?: string
  subject?: string
  trustLevel: "high" | "medium" | "low"
  includeInSearch: boolean
  usedInCurrentLesson?: boolean
}

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  stage?: ConversationStage
  retrievalSummary?: string[]
}

export type ConversationStage = "understand" | "retrieve" | "generate" | "revise" | "reflect"

export type LessonDraft = {
  id: string
  versionNumber: number
  lessonTitle: string
  gradeLevel: string
  subject: string
  duration: string
  topic: string
  subjectLearningGoals: string[]
  aiLiteracyGoals: string[]
  bigAiIdea: string
  designPhase: {
    teacherGoal: string
    studentQuestion: string
    priorKnowledge: string
    activity: string
    misconceptionsToSurface: string[]
  }
  createPhase: {
    activityOverview: string
    studentSteps: string[]
    teacherMoves: string[]
    materials: string[]
  }
  reflectPhase: {
    discussionPrompts: string[]
    ethicalReflection: string
    exitTicket: string
  }
  assessment: {
    successCriteria: string[]
    rubric: Array<{ criterion: string; levels: string[] }>
  }
  differentiation: {
    multilingualLearners: string[]
    studentsNeedingSupport: string[]
    extension: string[]
  }
  rationale: {
    whyThisActivity: string
    whyThisAiConnection: string
    whyThisAssessment: string
  }
  teacherDecisionPoints: string[]
  sourceUseSummary: string[]
  revisionSuggestions: string[]
  changeRationale?: string
  createdAt: Date
}

export type TeacherMove = {
  type: "guiding_question" | "misconception_probe" | "think_aloud" | "pair_discussion" | "evidence_check" | "ethical_dilemma" | "student_reflection"
  label: string
  whenToUse: string
  whatToSay: string
  whyItHelps: string
}

export type DraftRevision = {
  versionNumber: number
  summary: string
  whatChanged: string[]
  whyChanged: string
  teacherDecision: string
  timestamp: Date
}

export type QualityReview = {
  readiness: "ready" | "needs_revision" | "not_ready"
  strengths: string[]
  weaknesses: string[]
  requiredRevisions: string[]
  safetyNotes: string[]
  teacherDecisions: string[]
}

export type LessonDesignSpace = {
  taskStage: string
  teacherExpertise: string
  interactionMode: string
  aiRole: string
  knowledgeSources: string[]
  studentMode: string
  ethicalFocus: string
  outputType: string[]
  teacherDecisionPoints: string[]
}

export type MemoryItem = {
  id: string
  category: string
  insight: string
  tags: string[]
  active: boolean
}

export type InteractionMode = "quick_draft" | "guided_planning" | "revision" | "reflection" | "standards_alignment" | "ethical_discussion" | "student_materials"

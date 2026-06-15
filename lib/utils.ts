import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

export function sourceTypeLabel(sourceType: string): string {
  const labels: Record<string, string> = {
    curriculum_map: "Curriculum Map",
    prior_feedback: "Past Lesson Feedback",
    policy: "School AI Policy",
    lesson_plan: "Prior Lesson Plan",
    standard: "Academic Standards",
    student_work: "Student Work Examples",
    ai_literacy_framework: "AI Literacy Framework",
    reflection: "Teaching Reflection",
  }
  return labels[sourceType] || sourceType
}

export function readinessColor(readiness: string): string {
  if (readiness === "ready") return "text-green-600 bg-green-50 border-green-200"
  if (readiness === "needs_revision") return "text-amber-600 bg-amber-50 border-amber-200"
  return "text-red-600 bg-red-50 border-red-200"
}

export function confidenceLabel(level: string): string {
  const labels: Record<string, string> = {
    beginner: "AI-Curious Beginner",
    intermediate: "Subject-Area Teacher",
    advanced: "AI-Literate Teacher",
  }
  return labels[level] || level
}

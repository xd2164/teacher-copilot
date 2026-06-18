declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export type TrackEvent =
  | "suggestion_clicked"
  | "lesson_updated"
  | "document_uploaded"
  | "feedback_submitted"
  | "lesson_exported"
  | "lesson_copied"
  | "lesson_shared"
  | "community_lesson_adapted"
  | "community_submission"
  | "tab_changed"

export function track(event: TrackEvent, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params ?? {})
  }
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event, params)
  }
}

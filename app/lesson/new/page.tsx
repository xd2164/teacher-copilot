"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"

function NewLessonContent() {
  const params = useSearchParams()
  const t = params.get("t") ?? "0"
  return <AppShell key={t} isNew={t !== "0"} />
}

export default function NewLessonPage() {
  return (
    <Suspense>
      <NewLessonContent />
    </Suspense>
  )
}

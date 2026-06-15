import Link from "next/link"
import { ArrowLeft, BookOpen, Plus } from "lucide-react"
import { DEMO_DOCUMENTS } from "@/lib/demo-data"
import { sourceTypeLabel } from "@/lib/utils"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Knowledge Library</h1>
            <p className="text-sm text-gray-500">Your uploaded curriculum resources, standards, and policy documents</p>
          </div>
        </div>

        <div className="grid gap-4">
          {DEMO_DOCUMENTS.map(doc => (
            <div key={doc.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.fileName}</p>
                  <p className="text-xs text-gray-500">{sourceTypeLabel(doc.sourceType)}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                doc.status === "ready" ? "bg-green-50 text-green-700" :
                doc.status === "processing" ? "bg-amber-50 text-amber-700" :
                "bg-gray-50 text-gray-600"
              }`}>
                {doc.status === "ready" ? "Ready to use" : doc.status}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/lesson/new"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Start a New Lesson
        </Link>
      </div>
    </div>
  )
}

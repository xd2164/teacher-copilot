import Link from "next/link"
import { BookOpen, MessageSquare, Sparkles, Brain, RefreshCw, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Design · Create · Reflect
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Teacher Co-Pilot for AI Literacy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A chat-based, memory-enabled instructional design assistant that helps K–12 teachers co-create AI literacy lessons through Design–Create–Reflect.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/lesson/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start a New Lesson
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              View Library
            </Link>
          </div>
        </div>

        {/* Three-phase framework */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Design</h3>
            <p className="text-sm text-gray-600">
              Frame the learning goal, surface student questions, identify prior knowledge, and plan the activity.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-indigo-100 shadow-sm">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Create</h3>
            <p className="text-sm text-gray-600">
              Build the activity, student steps, teacher moves, and materials. Revise through conversation.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <RefreshCw className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reflect</h3>
            <p className="text-sm text-gray-600">
              Save post-lesson insights as reusable memory. Future lessons improve from what you learn.
            </p>
          </div>
        </div>

        {/* Key differentiator */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-16">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Why this is different</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium text-red-600 mb-2">Not this</p>
              <p className="text-sm text-gray-500 italic">"A chatbot that writes lesson plans for teachers."</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-600 mb-2">This</p>
              <p className="text-sm text-gray-700">"A planning partner that supports the full instructional design process: planning, creating, revising, teaching, reflecting, and reusing knowledge over time."</p>
            </div>
          </div>
        </div>

        {/* Quick start steps */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Get started in 3 steps</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">1</div>
              <p className="text-sm text-gray-600">Upload your curriculum<br />map or standards</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">2</div>
              <p className="text-sm text-gray-600">Tell the co-pilot what<br />lesson you are planning</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">3</div>
              <p className="text-sm text-gray-600">Revise, export, teach,<br />and save reflections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

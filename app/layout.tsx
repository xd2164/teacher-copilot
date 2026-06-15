import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Design–Create–Reflect Teacher Co-Pilot",
  description: "A chat-based, memory-enabled instructional design assistant for K–12 teachers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

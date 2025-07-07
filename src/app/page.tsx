"use client"

import { useState } from "react"
import { ChatPanel } from "@/components/chat-panel"
import { OutputDisplay } from "@/components/output-display"

export type GenerationType = "script" | "image" | "video" | "voice"

export interface GenerationResult {
  id: string
  type: GenerationType
  model: string
  systemPrompt: string
  userPrompt: string
  result: any
  timestamp: Date
  isGenerating: boolean
}

export interface AgentExecution {
  id: string
  agentType: string
  tool: string
  status: "running" | "completed" | "pending" | "deciding"
  timestamp: Date
  reasoning?: string
  decidedBy?: string
}

export default function VideoGenerationApp() {
  const [results, setResults] = useState<GenerationResult[]>([])

  const handleGenerate = async (type: GenerationType, model: string, systemPrompt: string, userPrompt: string) => {
    const newResult: GenerationResult = {
      id: Date.now().toString(),
      type,
      model,
      systemPrompt,
      userPrompt,
      result: null,
      timestamp: new Date(),
      isGenerating: true,
    }

    setResults((prev) => [newResult, ...prev])

    // Simulate generation
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

    // Generate mock result
    const mockResult = generateMockResult(type, model, userPrompt)

    setResults((prev) =>
      prev.map((result) =>
        result.id === newResult.id ? { ...result, result: mockResult, isGenerating: false } : result,
      ),
    )
  }

  const generateMockResult = (type: GenerationType, model: string, prompt: string) => {
    switch (type) {
      case "script":
        return `# Generated Script

## Opening Scene
${prompt}

FADE IN:

The camera opens with a compelling visual that immediately draws the viewer's attention. This approach establishes the narrative tone and sets expectations for the content that follows.

**NARRATOR (V.O.)**
In a world where stories come to life through the power of artificial intelligence...

## Development
We explore the core themes and messages, building engagement through carefully crafted dialogue and visual storytelling techniques.

**CHARACTER**
This is where our journey truly begins, and possibilities become reality.

## Climax
The pivotal moment that brings all narrative elements together in a powerful and memorable crescendo.

## Resolution
A satisfying conclusion that leaves the audience with a clear understanding and lasting impression.

FADE OUT.

---
*Generated using ${model}*
*Estimated runtime: 2-3 minutes*`

      case "image":
        return [
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ]

      case "video":
        return {
          url: "/placeholder.svg?height=300&width=500",
          duration: "2:34",
          resolution: "1920x1080",
          format: "MP4",
        }

      case "voice":
        return {
          url: "data:audio/wav;base64,mock-audio-data",
          duration: "2:15",
          voice: "Professional Male",
          language: "English (US)",
          speed: "1.0x",
        }

      default:
        return null
    }
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Output Display - Left Side */}
      <div className="flex-1 overflow-hidden border-r">
        <OutputDisplay results={results} />
      </div>

      {/* Chat Panel - Right Side */}
      <div className="w-96 border-l bg-card overflow-hidden">
        <ChatPanel onGenerate={handleGenerate} />
      </div>
    </div>
  )
}

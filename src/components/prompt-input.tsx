"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PromptInputProps {
  prompt: string
  setPrompt: (prompt: string) => void
  onStyleRecognition: () => void
}

export function PromptInput({ prompt, setPrompt, onStyleRecognition }: PromptInputProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Prompt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your video generation prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />
        <Button onClick={onStyleRecognition} disabled={!prompt.trim()} className="w-full">
          Recognize Style
        </Button>
      </CardContent>
    </Card>
  )
}

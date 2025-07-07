"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Square } from "lucide-react"

interface GenerationControlsProps {
  canStart: boolean
  isGenerating: boolean
  onStart: () => void
  onStop: () => void
}

export function GenerationControls({ canStart, isGenerating, onStart, onStop }: GenerationControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation Control</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isGenerating ? (
          <Button onClick={onStart} disabled={!canStart} className="w-full" size="lg">
            <Play className="w-4 h-4 mr-2" />
            Start Autonomous Generation
          </Button>
        ) : (
          <Button onClick={onStop} variant="destructive" className="w-full" size="lg">
            <Square className="w-4 h-4 mr-2" />
            Stop Generation
          </Button>
        )}

        {!canStart && (
          <p className="text-sm text-muted-foreground text-center">
            Please complete prompt, style recognition, and select all agent models
          </p>
        )}
      </CardContent>
    </Card>
  )
}

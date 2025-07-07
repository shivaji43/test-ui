"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Mic, ChevronDown, ChevronRight, Play, Pause, Volume2, Loader2 } from "lucide-react"

interface VoiceAgentProps {
  selectedTool: string
  setSelectedTool: (tool: string) => void
  result?: string
  isActive?: boolean
}

export function VoiceAgent({ selectedTool, setSelectedTool, result, isActive }: VoiceAgentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const voiceTools = [
    { value: "openai-tts", label: "OpenAI TTS" },
    { value: "elevenlabs", label: "ElevenLabs" },
    { value: "azure-speech", label: "Azure Speech Services" },
    { value: "google-tts", label: "Google Text-to-Speech" },
    { value: "amazon-polly", label: "Amazon Polly" },
    { value: "murf", label: "Murf AI" },
    { value: "speechify", label: "Speechify" },
  ]

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Card className={`w-full transition-all duration-200 ${isActive ? "ring-2 ring-blue-500 shadow-lg" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Voice Agent
            {isActive && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
          </CardTitle>
          <div className="w-64">
            <Select value={selectedTool} onValueChange={setSelectedTool}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice generation tool" />
              </SelectTrigger>
              <SelectContent>
                {voiceTools.map((tool) => (
                  <SelectItem key={tool.value} value={tool.value}>
                    {tool.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              {result ? "View Generated Voice" : "Voice Output"}
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="bg-muted p-4 rounded-lg">
              {result ? (
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <Volume2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Generated Voiceover</h4>
                      <p className="text-sm text-muted-foreground">Duration: 2:15</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={togglePlay} variant="outline">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <div className="flex-1 bg-background rounded-full h-2 relative">
                        <div className="bg-primary rounded-full h-2 w-1/4"></div>
                        <div className="absolute top-0 left-1/4 w-3 h-3 bg-primary rounded-full -translate-y-0.5 -translate-x-1.5"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">0:32 / 2:15</span>
                    </div>

                    <div className="text-sm space-y-1 text-center">
                      <p>
                        <strong>Voice:</strong> Professional Male | <strong>Language:</strong> English (US) |{" "}
                        <strong>Speed:</strong> 1.0x
                      </p>
                      <p>
                        <strong>Generated with:</strong> {selectedTool}
                      </p>
                    </div>
                  </div>

                  <div className="bg-background p-4 rounded-lg">
                    <h5 className="font-medium mb-2 text-center">Audio Waveform</h5>
                    <div className="flex items-end justify-center gap-1 h-16">
                      {Array.from({ length: 50 }, (_, i) => (
                        <div
                          key={i}
                          className={`bg-primary/60 rounded-t ${i < 12 ? "bg-primary" : ""}`}
                          style={{
                            height: `${Math.random() * 100}%`,
                            minHeight: "4px",
                            width: "3px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Mic className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Please provide an input</p>
                  <p className="text-xs mt-1">Generated voice will appear here</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

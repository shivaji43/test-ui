"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Video, ChevronDown, ChevronRight, Play, Pause, Loader2 } from "lucide-react"

interface VideoAgentProps {
  selectedTool: string
  setSelectedTool: (tool: string) => void
  result?: string
  isActive?: boolean
}

export function VideoAgent({ selectedTool, setSelectedTool, result, isActive }: VideoAgentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const videoTools = [
    { value: "sora", label: "OpenAI Sora" },
    { value: "runway-gen2", label: "Runway Gen-2" },
    { value: "runway-gen3", label: "Runway Gen-3" },
    { value: "pika-labs", label: "Pika Labs" },
    { value: "stable-video", label: "Stable Video Diffusion" },
    { value: "google-lumiere", label: "Google Lumiere" },
    { value: "meta-emu", label: "Meta Emu Video" },
  ]

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Card className={`w-full transition-all duration-200 ${isActive ? "ring-2 ring-blue-500 shadow-lg" : ""}`} >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video Agent
            {isActive && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
          </CardTitle>
          <div className="w-64">
            <Select value={selectedTool} onValueChange={setSelectedTool}>
              <SelectTrigger>
                <SelectValue placeholder="Select video generation tool" />
              </SelectTrigger>
              <SelectContent>
                {videoTools.map((tool) => (
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
              {result ? "View Generated Video" : "Video Output"}
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="bg-muted p-4 rounded-lg">
              {result ? (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p className="text-sm opacity-75">Generated Video Preview</p>
                        <p className="text-xs opacity-50">Duration: 2:34</p>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={togglePlay}
                        className="bg-black/50 hover:bg-black/70"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <div className="flex-1 bg-white/20 rounded-full h-1">
                        <div className="bg-white rounded-full h-1 w-1/3"></div>
                      </div>
                      <span className="text-white text-xs">0:45 / 2:34</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    <p>
                      <strong>Resolution:</strong> 1920x1080 | <strong>Format:</strong> MP4 |{" "}
                      <strong>Generated with:</strong> {selectedTool}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Please provide an input</p>
                  <p className="text-xs mt-1">Generated video will appear here</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

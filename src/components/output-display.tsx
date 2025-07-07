"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, FileText, ImageIcon, Video, Mic, Play, Pause, Copy, Download } from "lucide-react"
import type { GenerationResult } from "@/app/page"

interface OutputDisplayProps {
  results: GenerationResult[]
}

export function OutputDisplay({ results }: OutputDisplayProps) {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "script":
        return <FileText className="w-5 h-5" />
      case "image":
        return <ImageIcon className="w-5 h-5" />
      case "video":
        return <Video className="w-5 h-5" />
      case "voice":
        return <Mic className="w-5 h-5" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "script":
        return "bg-blue-500"
      case "image":
        return "bg-green-500"
      case "video":
        return "bg-purple-500"
      case "voice":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleAudio = (id: string) => {
    setPlayingAudio(playingAudio === id ? null : id)
  }

  const toggleVideo = (id: string) => {
    setPlayingVideo(playingVideo === id ? null : id)
  }

  if (results.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <FileText className="w-12 h-12 opacity-50" />
          </div>
          <h3 className="text-lg font-medium mb-2">No generations yet</h3>
          <p className="text-sm">Use the panel on the right to generate content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Generated Content</h2>
        <p className="text-sm text-muted-foreground">{results.length} generation(s)</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {results.map((result) => (
            <Card key={result.id} className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${getTypeColor(result.type)} flex items-center justify-center text-white`}
                    >
                      {getTypeIcon(result.type)}
                    </div>
                    <div>
                      <CardTitle className="text-base capitalize">{result.type} Generation</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{result.model}</Badge>
                        <span className="text-xs text-muted-foreground">{result.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  {result.isGenerating && <Loader2 className="w-5 h-5 animate-spin text-blue-500" />}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {result.systemPrompt && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">System Prompt:</p>
                    <p className="text-sm text-muted-foreground">{result.systemPrompt}</p>
                  </div>
                )}

                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">User Prompt:</p>
                  <p className="text-sm">{result.userPrompt}</p>
                </div>

                {result.isGenerating ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    <span className="text-sm text-muted-foreground">Generating {result.type}...</span>
                  </div>
                ) : result.result ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Generated Result:</h4>
                      <div className="flex gap-2">
                        {result.type === "script" && (
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(result.result)}>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {result.type === "script" && (
                      <div className="bg-background p-4 rounded-lg border max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm font-mono">{result.result}</pre>
                      </div>
                    )}

                    {result.type === "image" && (
                      <div className="grid grid-cols-2 gap-4">
                        {result.result.map((image: string, index: number) => (
                          <div key={index} className="relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Generated image ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg border"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Image {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.type === "video" && (
                      <div className="space-y-3">
                        <div className="relative bg-black rounded-lg overflow-hidden">
                          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <div className="text-center text-white">
                              <Video className="w-16 h-16 mx-auto mb-2 opacity-50" />
                              <p className="text-sm opacity-75">Generated Video</p>
                              <p className="text-xs opacity-50">Duration: {result.result.duration}</p>
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => toggleVideo(result.id)}
                              className="bg-black/50 hover:bg-black/70"
                            >
                              {playingVideo === result.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            <div className="flex-1 bg-white/20 rounded-full h-1">
                              <div className="bg-white rounded-full h-1 w-1/3"></div>
                            </div>
                            <span className="text-white text-xs">0:45 / {result.result.duration}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            <strong>Resolution:</strong> {result.result.resolution} | <strong>Format:</strong>{" "}
                            {result.result.format}
                          </p>
                        </div>
                      </div>
                    )}

                    {result.type === "voice" && (
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                              <Mic className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">Generated Voice</h4>
                              <p className="text-sm text-muted-foreground">Duration: {result.result.duration}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Button size="sm" onClick={() => toggleAudio(result.id)} variant="outline">
                                {playingAudio === result.id ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </Button>
                              <div className="flex-1 bg-background rounded-full h-2 relative">
                                <div className="bg-primary rounded-full h-2 w-1/4"></div>
                                <div className="absolute top-0 left-1/4 w-3 h-3 bg-primary rounded-full -translate-y-0.5 -translate-x-1.5"></div>
                              </div>
                              <span className="text-xs text-muted-foreground">0:32 / {result.result.duration}</span>
                            </div>

                            <div className="text-sm space-y-1">
                              <p>
                                <strong>Voice:</strong> {result.result.voice} | <strong>Language:</strong>{" "}
                                {result.result.language} | <strong>Speed:</strong> {result.result.speed}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

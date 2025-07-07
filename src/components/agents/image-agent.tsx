"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ImageIcon, ChevronDown, ChevronRight, Loader2 } from "lucide-react"

interface ImageAgentProps {
  selectedTool: string
  setSelectedTool: (tool: string) => void
  result?: string[]
  isActive?: boolean
}

export function ImageAgent({ selectedTool, setSelectedTool, result, isActive }: ImageAgentProps) {
  const [isOpen, setIsOpen] = useState(false)

  const imageTools = [
    { value: "dalle-3", label: "DALL-E 3" },
    { value: "dalle-2", label: "DALL-E 2" },
    { value: "midjourney", label: "Midjourney" },
    { value: "stable-diffusion", label: "Stable Diffusion" },
    { value: "firefly", label: "Adobe Firefly" },
    { value: "imagen", label: "Google Imagen" },
  ]

  return (
    <Card className={`w-full transition-all duration-200 ${isActive ? "ring-2 ring-blue-500 shadow-lg" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Image Agent
            {isActive && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
          </CardTitle>
          <div className="w-64">
            <Select value={selectedTool} onValueChange={setSelectedTool}>
              <SelectTrigger>
                <SelectValue placeholder="Select image generation tool" />
              </SelectTrigger>
              <SelectContent>
                {imageTools.map((tool) => (
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
              {result && result.length > 0 ? `View Generated Images (${result.length})` : "Image Output"}
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
              {result && result.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Please provide an input</p>
                  <p className="text-xs mt-1">Generated images will appear here</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

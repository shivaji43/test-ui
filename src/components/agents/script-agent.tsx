"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { FileText, ChevronDown, ChevronRight, Loader2 } from "lucide-react"

interface ScriptAgentProps {
  selectedTool: string
  setSelectedTool: (tool: string) => void
  result?: string
  isActive?: boolean
}

export function ScriptAgent({ selectedTool, setSelectedTool, result, isActive }: ScriptAgentProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scriptTools = [
    { value: "openai-gpt4", label: "OpenAI GPT-4" },
    { value: "openai-gpt3.5", label: "OpenAI GPT-3.5" },
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  ]

  return (
    <Card className={`w-full transition-all duration-200 ${isActive ? "ring-2 ring-blue-500 shadow-lg" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Script Agent
            {isActive && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
          </CardTitle>
          <div className="w-64">
            <Select value={selectedTool} onValueChange={setSelectedTool}>
              <SelectTrigger>
                <SelectValue placeholder="Select script generation tool" />
              </SelectTrigger>
              <SelectContent>
                {scriptTools.map((tool) => (
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
              {result ? "View Generated Script" : "Script Output"}
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
              {result ? (
                <pre className="whitespace-pre-wrap text-sm font-mono">{result}</pre>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Please provide an input</p>
                  <p className="text-xs mt-1">Generated script will appear here</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

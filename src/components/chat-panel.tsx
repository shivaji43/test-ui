"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Play, Moon, Sun } from "lucide-react"
import type { GenerationType } from "@/app/page"
import { useTheme } from "next-themes"

interface ChatPanelProps {
  onGenerate: (type: GenerationType, model: string, systemPrompt: string, userPrompt: string) => Promise<void>
}

export function ChatPanel({ onGenerate }: ChatPanelProps) {
  const [generationType, setGenerationType] = useState<GenerationType | "">("")
  const [selectedModel, setSelectedModel] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [userPrompt, setUserPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const generationTypes = [
    { value: "triage", label: "Triage Agent" },
    { value: "script", label: "Script Generation" },
    { value: "image", label: "Image Generation" },
    { value: "video", label: "Video Generation" },
    { value: "voice", label: "Voice Generation" },
  ]

  const modelOptions = {
    triage: [{ value: "triage-agent", label: "Triage Agent" }],
    script: [
      { value: "openai-gpt4", label: "OpenAI GPT-4" },
      { value: "openai-gpt3.5", label: "OpenAI GPT-3.5" },
      { value: "claude-3-opus", label: "Claude 3 Opus" },
      { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
      { value: "claude-3-haiku", label: "Claude 3 Haiku" },
    ],
    image: [
      { value: "dalle-3", label: "DALL-E 3" },
      { value: "dalle-2", label: "DALL-E 2" },
      { value: "midjourney", label: "Midjourney" },
      { value: "stable-diffusion", label: "Stable Diffusion" },
      { value: "firefly", label: "Adobe Firefly" },
      { value: "imagen", label: "Google Imagen" },
    ],
    video: [
      { value: "sora", label: "OpenAI Sora" },
      { value: "runway-gen2", label: "Runway Gen-2" },
      { value: "runway-gen3", label: "Runway Gen-3" },
      { value: "pika-labs", label: "Pika Labs" },
      { value: "stable-video", label: "Stable Video Diffusion" },
      { value: "google-lumiere", label: "Google Lumiere" },
      { value: "meta-emu", label: "Meta Emu Video" },
    ],
    voice: [
      { value: "openai-tts", label: "OpenAI TTS" },
      { value: "elevenlabs", label: "ElevenLabs" },
      { value: "azure-speech", label: "Azure Speech Services" },
      { value: "google-tts", label: "Google Text-to-Speech" },
      { value: "amazon-polly", label: "Amazon Polly" },
      { value: "murf", label: "Murf AI" },
      { value: "speechify", label: "Speechify" },
    ],
  }

  const getDefaultSystemPrompt = (type: GenerationType) => {
    switch (type) {
      case "triage":
        return `You are a content style selector. Based on the user's request, you need to determine which content style agent is most appropriate.
    Here are the available styles and when to use them:
    - 'Hype Style Agent': Use when the user wants something to sound exciting, generate buzz, or create urgency.
    - 'Ad Style Agent': Use when the user wants short, persuasive copy for an advertisement, focusing on benefits.
    - 'Launch Style Agent': Use when the user wants an announcement for a new product, service, or major event.
    - 'Talking Head Agent': Use when the user wants a script for a video where a person speaks directly to the camera, focusing on explanation and a conversational tone.
    Your task is to analyze the user's prompt and hand off to the most suitable agent`
      case "script":
        return "You are a professional scriptwriter. Create engaging, well-structured scripts with clear scene descriptions, dialogue, and narrative flow."
      case "image":
        return "You are a creative visual artist. Generate high-quality, detailed images that match the user's description with artistic flair and technical precision."
      case "video":
        return "You are a video production expert. Create compelling video content with smooth transitions, engaging visuals, and professional quality."
      case "voice":
        return "You are a voice synthesis specialist. Generate clear, natural-sounding speech with appropriate tone, pace, and emotional expression."
      default:
        return ""
    }
  }

  const handleGenerationTypeChange = (type: GenerationType) => {
    setGenerationType(type)
    setSelectedModel("")
    setSystemPrompt(getDefaultSystemPrompt(type))

    // Auto-select model for triage agent
    if (type === "triage") {
      setSelectedModel("triage-agent")
    }
  }

  const handleGenerate = async () => {
    if (!generationType || !selectedModel || !userPrompt.trim()) return

    setIsGenerating(true)
    try {
      await onGenerate(generationType, selectedModel, systemPrompt, userPrompt)
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const canGenerate = generationType && selectedModel && userPrompt.trim() && !isGenerating

  if (!mounted) {
    return null
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">AI Generation Studio</h2>
            <p className="text-sm text-muted-foreground">Create content with AI models</p>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generation Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>What do you want to generate?</Label>
              <Select value={generationType} onValueChange={handleGenerationTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select generation type" />
                </SelectTrigger>
                <SelectContent>
                  {generationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {generationType && generationType !== "triage" && (
              <div className="space-y-2">
                <Label>Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {modelOptions[generationType]?.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {generationType && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter system prompt..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>
        )}

        {generationType && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">User Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your prompt here..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="p-4 border-t">
        <Button onClick={handleGenerate} disabled={!canGenerate} className="w-full" size="lg">
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Generate
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

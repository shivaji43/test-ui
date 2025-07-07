import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, Clock, Brain } from "lucide-react"
import type { AgentExecution } from "@/app/page"

interface ExecutionFlowProps {
  executions: AgentExecution[]
  currentAgent: string | null
  isGenerating: boolean
}

export function ExecutionFlow({ executions, currentAgent, isGenerating }: ExecutionFlowProps) {
  if (executions.length === 0 && !isGenerating) return null

  const getStatusIcon = (status: AgentExecution["status"]) => {
    switch (status) {
      case "running":
        return <Loader2 className="w-4 h-4 animate-spin" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "deciding":
        return <Brain className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: AgentExecution["status"]) => {
    switch (status) {
      case "running":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "deciding":
        return "bg-purple-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Autonomous Execution Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {executions.map((execution, index) => (
            <div key={execution.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${getStatusColor(execution.status)} flex items-center justify-center text-white text-sm font-bold`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(execution.status)}
                      <span className="font-semibold">{execution.agentType} Agent</span>
                      <Badge variant="outline">{execution.tool}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{execution.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
                <Badge variant={execution.status === "completed" ? "default" : "secondary"}>
                  {execution.status === "deciding" ? "Deciding Next" : execution.status}
                </Badge>
              </div>

              {execution.reasoning && (
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">
                      {execution.decidedBy ? `${execution.decidedBy} Agent Decision: ` : "Initial Decision: "}
                    </span>
                    {execution.reasoning}
                  </p>
                </div>
              )}
            </div>
          ))}

          {isGenerating && executions.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Initializing autonomous generation...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

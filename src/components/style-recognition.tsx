import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StyleRecognitionProps {
  recognizedStyle: string
}

export function StyleRecognition({ recognizedStyle }: StyleRecognitionProps) {
  if (!recognizedStyle) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recognized Style</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {recognizedStyle}
        </Badge>
      </CardContent>
    </Card>
  )
}

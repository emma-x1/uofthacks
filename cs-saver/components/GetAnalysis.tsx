"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function GetAnalysis() {
  const [analysis, setAnalysis] = useState<string | null>(null)

  const handleGetAnalysis = () => {
    // In a real application, you would fetch the analysis from an API
    setAnalysis("Based on the temperature data and event journal entries, there seems to be a correlation between higher temperatures and increased outdoor activities. The temperature fluctuations appear to have a noticeable impact on daily experiences.")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {analysis ? (
          <p className="text-lg">{analysis}</p>
        ) : (
          <Button onClick={handleGetAnalysis} className="w-full">Get Analysis</Button>
        )}
      </CardContent>
    </Card>
  )
}


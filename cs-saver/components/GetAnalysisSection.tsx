"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TYPING_SPEED = 30 // milliseconds per character

export default function GetAnalysisSection() {

  
  const [analysis, setAnalysis] = useState('')
  const [displayedAnalysis, setDisplayedAnalysis] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const fullAnalysis = "Based on the temperature data and events, we can observe a correlation between temperature changes and significant events. The temperature tends to rise during celebratory events, possibly due to increased human activity or seasonal changes coinciding with these events."

  useEffect(() => {
    if (isTyping && displayedAnalysis.length < analysis.length) {
      const timer = setTimeout(() => {
        setDisplayedAnalysis(analysis.slice(0, displayedAnalysis.length + 1))
      }, TYPING_SPEED)
      return () => clearTimeout(timer)
    } else if (displayedAnalysis.length === analysis.length) {
      setIsTyping(false)
    }
  }, [isTyping, displayedAnalysis, analysis])

  const handleGetAnalysis = () => {

    fetch ('http://localhost:5000/analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'temperature', 
        title: 'some title'
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        setAnalysis(data.gpt)
        setDisplayedAnalysis('')
        setIsTyping(true)
      })
      .catch((error) => {
        console.error('Error:', error)
      })

  }

  return (
    <Card className="bg-white p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 font-proxima-nova">Get Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {analysis === '' ? (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-roboto" 
            onClick={handleGetAnalysis}
          >
            Get Analysis
          </Button>
        ) : (
          <div className="relative">
            <p className="text-gray-700 font-roboto min-h-[100px]">{displayedAnalysis}</p>
            {isTyping && (
              <span className="absolute bottom-0 right-0 animate-blink">|</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


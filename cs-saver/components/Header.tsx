"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <header className="h-screen bg-gradient-to-br from-blue-400 to-pink-400 flex flex-col justify-center items-center">
      <h1 
        className={`text-6xl font-bold text-white mb-8 transition-all duration-1000 ease-out font-proxima-nova ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        Temperature Analysis
      </h1>
      <Button 
        size="lg" 
        className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-lg text-lg font-roboto"
      >
        Start Session
      </Button>
    </header>
  )
}


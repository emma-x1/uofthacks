import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useEffect, useState } from "react"

const events = [
  { date: '2023-05-01', entry: 'Felt unusually warm today.' },
  { date: '2023-05-03', entry: 'Slight chill in the morning.' },
  { date: '2023-05-05', entry: 'Perfect weather for outdoor activities.' },
  { date: '2023-05-07', entry: 'Unexpectedly cool day.' },
]

export default function EventList() {

  const [events, setEvents] = useState([])


  useEffect(() => {
  fetch ('http://localhost:5000/get_sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', JSON.stringify(data))
      setEvents(data)
    })
    .catch((error) => {
      console.error('Error:', error)
    }), 
  [  ]
  }) 
  
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Journal</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold">{event.date}</p>
              <p>{event.entry}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


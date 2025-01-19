"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { EventModal } from './EventModal'
import { checkDomainOfScale } from 'recharts/types/util/ChartUtils'

// Mock data - replace this with actual API call in a real application
const mockData = [
  {
    date: '2023-01-01',
    temperature: 20,
    humidity: 65,
    event: 'New Year celebration',
    description: 'The city came alive with fireworks and festivities as people gathered to welcome the new year. Despite the chilly temperature, the excitement in the air was palpable.'
  },
  {
    date: '2023-02-14',
    temperature: 22,
    humidity: 60,
    event: 'Valentine\'s Day',
    description: 'Love was in the air as couples enjoyed the mild weather, perfect for outdoor dates and romantic walks in the park. Restaurants were bustling with activity.'
  },
  {
    date: '2023-03-17',
    temperature: 18,
    humidity: 70,
    event: 'St. Patrick\'s Day',
    description: 'The streets were a sea of green as revelers celebrated St. Patrick\'s Day. The cooler temperature and higher humidity didn\'t dampen the festive spirit.'
  },
  {
    date: '2023-04-22',
    temperature: 25,
    humidity: 55,
    event: 'Earth Day',
    description: 'Perfect weather conditions encouraged large turnouts for Earth Day events. Many people participated in outdoor clean-up activities and environmental awareness programs.'
  },
  {
    date: '2023-05-01',
    temperature: 28,
    humidity: 50,
    event: 'May Day',
    description: 'The warm and dry conditions made for an ideal May Day celebration. Parks and public spaces were filled with people enjoying picnics and outdoor performances.'
  },
]

export default function AnalysisSection() {
  const [data, setData] = useState([])
  const [temperatures, setTemperatures] = useState([])
  const [humidity, setHumidity] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState([])

  // code that runs every 5 seconds to fetch new data
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5000/current_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      })
        .then(response => response.json())
        .then(data => {
          setData(data)
          console.log('Success:', data)
          console.log(JSON.stringify(data))

          // Combine date and temperature arrays into an array of objects
          const combinedData = data.date.map((date, index) => ({
            date,
            temperature: parseFloat(data.temperature[index])
          }))

          const combinedHumid = data.date.map((date, index) => ({
            date,
            humidity: parseFloat(data.humidity[index])
          }))
          
          console.log('Combined Data:', combinedData)
          setTemperatures(combinedData)
          setHumidity(combinedHumid)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }, 100000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Initial fetch of data
    fetch('http://localhost:5000/get_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', JSON.stringify(data))
        setEvents(data.sessions)
      })
      .catch((error) => {
        console.error('Error:', error)
      })}, [])

  function handleEventClick(it : any) {
    setSelectedEvent(it)
    setIsModalOpen(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

      <Card className="bg-white p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 font-proxima-nova">Temperature Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatures}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 font-proxima-nova">Humidity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={humidity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white p-6 shadow-lg rounded-lg lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 font-proxima-nova">Event Journal</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 font-roboto">
            {events.map((item, index) => (
              <li
                key={index}
                className="border-b pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                onClick={() => handleEventClick(item)}
              >
                <span className="font-semibold">{item.title}:</span> {item.event}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  )
}


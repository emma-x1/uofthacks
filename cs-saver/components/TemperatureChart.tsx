"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: '2023-05-01', temperature: 22 },
  { date: '2023-05-02', temperature: 23 },
  { date: '2023-05-03', temperature: 21 },
  { date: '2023-05-04', temperature: 24 },
  { date: '2023-05-05', temperature: 25 },
  { date: '2023-05-06', temperature: 22 },
  { date: '2023-05-07', temperature: 20 },
]

export default function TemperatureChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            temperature: {
              label: "Temperature",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="var(--color-temperature)" name="Temperature" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const events = [
  { date: '2023-05-01', entry: 'Felt unusually warm today.' },
  { date: '2023-05-03', entry: 'Slight chill in the morning.' },
  { date: '2023-05-05', entry: 'Perfect weather for outdoor activities.' },
  { date: '2023-05-07', entry: 'Unexpectedly cool day.' },
]

export default function EventList() {
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


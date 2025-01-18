import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    date: string
    temperature: number
    humidity: number
    event: string
    description: string
  } | null
}

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 font-proxima-nova">{event.date}</DialogTitle>
          <DialogDescription className="text-gray-600 font-roboto">{event.event}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-proxima-nova">Weather Data</CardTitle>
            </CardHeader>
            <CardContent className="font-roboto">
              <p>Temperature: {event.temperature}°C</p>
              <p>Humidity: {event.humidity}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-proxima-nova">Extended Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-roboto">{event.description}</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}


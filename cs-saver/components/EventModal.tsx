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
  
  console.log("TEMPERATURE", event.temperature)

  function findMinMax(arr: number[]) {
    let min = arr[0], max = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) min = arr[i]
      if (arr[i] > max) max = arr[i]
    }
    return { min, max } 
  }

  console.log("MINMAX", findMinMax(event.temperature))

  // go through the temperature 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 font-proxima-nova">{event.date[0]}</DialogTitle>
          <DialogDescription className="text-gray-600 font-roboto">{event.title}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-proxima-nova">Weather Data</CardTitle>
            </CardHeader>
            <CardContent className="font-roboto">
              <p>Temperature: Min: {findMinMax(event.temperature).min}°C Max: {findMinMax(event.temperature).max}°C</p>
              <p>Humidity:    Min: {findMinMax(event.humidity).min}%  Max: {findMinMax(event.humidity).max}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-proxima-nova">Extended Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-roboto">{event.event}</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
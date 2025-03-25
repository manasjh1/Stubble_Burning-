"use client"

import type { TemperaturePoint } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, MapPin } from "lucide-react"

interface LocationDetailsProps {
  selectedPoint: TemperaturePoint | null
}

export function LocationDetails({ selectedPoint }: LocationDetailsProps) {
  if (!selectedPoint) {
    return (
      <div className="p-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">No Location Selected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Click on a heatmap point to view location details.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {selectedPoint.location}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-muted-foreground">Coordinates:</div>
            <div className="font-medium">
              {selectedPoint.lat.toFixed(4)}, {selectedPoint.lng.toFixed(4)}
            </div>

            <div className="text-muted-foreground flex items-center">
              <Thermometer className="mr-1 h-3 w-3" />
              Temperature:
            </div>
            <div className="font-medium">{selectedPoint.temperature}°C</div>
          </div>

          <div className="mt-2 text-xs">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-red-500"
              style={{
                background: getTemperatureColor(selectedPoint.temperature, 33, 38),
              }}
            />
            <div className="mt-1 text-muted-foreground">{getTemperatureDescription(selectedPoint.temperature)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to get a color based on temperature
function getTemperatureColor(temp: number, min: number, max: number): string {
  // Normalize temperature to 0-1 range
  const normalized = Math.max(0, Math.min(1, (temp - min) / (max - min)))

  // Create color gradient from blue (cool) to red (hot)
  if (normalized < 0.2) {
    return "#3b82f6" // blue-500
  } else if (normalized < 0.4) {
    return "#10b981" // green-500
  } else if (normalized < 0.6) {
    return "#84cc16" // lime-500
  } else if (normalized < 0.8) {
    return "#eab308" // yellow-500
  } else {
    return "#ef4444" // red-500
  }
}

// Helper function to get a description based on temperature
function getTemperatureDescription(temp: number): string {
  if (temp < 34) return "Cool relative to surrounding areas"
  if (temp < 35) return "Moderately warm"
  if (temp < 36) return "Warm"
  if (temp < 37) return "Very warm"
  return "Hot"
}


"use client"

import { Card } from "@/components/ui/card"

interface TemperatureScaleProps {
  minTemp: number
  maxTemp: number
}

export function TemperatureScale({ minTemp, maxTemp }: TemperatureScaleProps) {
  // Generate gradient colors for the scale
  const colors = ["from-blue-500", "via-green-500", "via-yellow-500", "to-red-500"]

  return (
    <div className="p-2">
      <Card className="p-4">
        <div className="space-y-4">
          <div className={`h-6 w-full rounded-md bg-gradient-to-r ${colors.join(" ")}`} />
          <div className="flex justify-between text-xs">
            <span>{minTemp}°C</span>
            <span>{Math.round((minTemp + maxTemp) / 2)}°C</span>
            <span>{maxTemp}°C</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>The color gradient represents temperature intensity:</p>
            <ul className="mt-1 list-disc pl-4">
              <li>Blue: Cooler temperatures</li>
              <li>Green/Yellow: Moderate temperatures</li>
              <li>Red: Higher temperatures</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}


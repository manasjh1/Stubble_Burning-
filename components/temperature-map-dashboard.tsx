"use client"

import { MapContainer } from "@/components/map-container"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useState } from "react"
import type { TemperaturePoint } from "@/lib/types"

// Sample data for the heatmap
const initialTemperatureData: TemperaturePoint[] = [
  { id: 1, lat: 28.6139, lng: 77.209, temperature: 36.5, location: "New Delhi" },
  { id: 2, lat: 28.5621, lng: 77.2841, temperature: 35.2, location: "Defence Colony" },
  { id: 3, lat: 28.5735, lng: 77.313, temperature: 34.8, location: "Noida" },
  { id: 4, lat: 28.5183, lng: 77.1828, temperature: 36.1, location: "Green Park" },
  { id: 5, lat: 28.5246, lng: 77.1915, temperature: 35.7, location: "Hauz Khas" },
  { id: 6, lat: 28.4922, lng: 77.2258, temperature: 34.9, location: "Saket" },
  { id: 7, lat: 28.4595, lng: 77.0266, temperature: 33.8, location: "Gurugram" },
  { id: 8, lat: 28.6304, lng: 77.2177, temperature: 37.2, location: "Connaught Place" },
  { id: 9, lat: 28.7041, lng: 77.1025, temperature: 35.5, location: "Rohini" },
]

export function TemperatureMapDashboard() {
  const [selectedPoint, setSelectedPoint] = useState<TemperaturePoint | null>(null)
  const [temperatureData] = useState<TemperaturePoint[]>(initialTemperatureData)

  return (
    <SidebarProvider>
      <AppSidebar temperatureData={temperatureData} selectedPoint={selectedPoint} />
      <SidebarInset className="p-0">
        <MapContainer
          temperatureData={temperatureData}
          onPointSelect={setSelectedPoint}
          selectedPoint={selectedPoint}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}


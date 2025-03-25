"use client"

import { useEffect, useRef } from "react"
import type { TemperaturePoint } from "@/lib/types"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface MapContainerProps {
  temperatureData: TemperaturePoint[]
  onPointSelect: (point: TemperaturePoint) => void
  selectedPoint: TemperaturePoint | null
}

export function MapContainer({ temperatureData, onPointSelect, selectedPoint }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const heatLayerRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    // Only run this on the client side
    if (typeof window === "undefined") return

    // Dynamically import Leaflet
    const loadLeaflet = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      // Import heatmap plugin
      const HeatLayer = (await import("leaflet.heat")).default

      // Initialize map if it doesn't exist
      if (!mapInstanceRef.current && mapRef.current) {
        // Create map instance
        const map = L.map(mapRef.current).setView([28.6139, 77.209], 12)

        // Add tile layer (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        mapInstanceRef.current = map

        // Create heatmap layer
        const heatData = temperatureData.map((point) => [
          point.lat,
          point.lng,
          (point.temperature - 30) / 10, // Normalize intensity
        ])

        heatLayerRef.current = L.heatLayer(heatData, {
          radius: 25,
          blur: 15,
          maxZoom: 17,
          gradient: { 0.4: "blue", 0.6: "lime", 0.7: "yellow", 0.8: "orange", 1: "red" },
        }).addTo(map)

        // Add markers for each point
        temperatureData.forEach((point) => {
          const marker = L.circleMarker([point.lat, point.lng], {
            radius: 8,
            fillColor: getTemperatureColor(point.temperature, 33, 38),
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          }).addTo(map)

          // Add click handler
          marker.on("click", () => {
            onPointSelect(point)
          })

          markersRef.current.push(marker)
        })

        // Add click handler to map
        map.on("click", () => {
          onPointSelect(null)
        })
      }
    }

    loadLeaflet()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [temperatureData, onPointSelect])

  // Update selected marker style when selection changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Reset all markers
    markersRef.current.forEach((marker, index) => {
      const point = temperatureData[index]
      marker.setStyle({
        radius: 8,
        fillColor: getTemperatureColor(point.temperature, 33, 38),
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      })
    })

    // Highlight selected marker
    if (selectedPoint) {
      const selectedIndex = temperatureData.findIndex((p) => p.id === selectedPoint.id)
      if (selectedIndex >= 0 && markersRef.current[selectedIndex]) {
        markersRef.current[selectedIndex].setStyle({
          radius: 12,
          fillColor: getTemperatureColor(selectedPoint.temperature, 33, 38),
          color: "#fff",
          weight: 3,
          opacity: 1,
          fillOpacity: 1,
        })
      }
    }
  }, [selectedPoint, temperatureData])

  return (
    <div className="relative h-screen w-full">
      <div className="absolute left-4 top-4 z-10">
        <Card className="p-2 shadow-md">
          <SidebarTrigger />
        </Card>
      </div>

      {/* Map container */}
      <div ref={mapRef} className="h-full w-full">
        {/* Loading indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
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


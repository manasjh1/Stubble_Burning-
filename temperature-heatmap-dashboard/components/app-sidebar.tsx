"use client"

import type { TemperaturePoint } from "@/lib/types"
import { Thermometer, MapPin, Info } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { TemperatureScale } from "@/components/temperature-scale"
import { LocationDetails } from "@/components/location-details"

interface AppSidebarProps {
  temperatureData: TemperaturePoint[]
  selectedPoint: TemperaturePoint | null
}

export function AppSidebar({ temperatureData, selectedPoint }: AppSidebarProps) {
  // Calculate min and max temperatures for the scale
  const temperatures = temperatureData.map((point) => point.temperature)
  const minTemp = Math.floor(Math.min(...temperatures))
  const maxTemp = Math.ceil(Math.max(...temperatures))

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Thermometer className="text-primary" />
              <span className="font-semibold">Temperature Heatmap</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Thermometer size={16} className="mr-2" />
            Temperature Scale
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <TemperatureScale minTemp={minTemp} maxTemp={maxTemp} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-0" />

        <SidebarGroup>
          <SidebarGroupLabel>
            <MapPin size={16} className="mr-2" />
            Location Details
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <LocationDetails selectedPoint={selectedPoint} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-0" />

        <SidebarGroup>
          <SidebarGroupLabel>
            <Info size={16} className="mr-2" />
            About
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-1 text-sm text-sidebar-foreground/80">
              <p>This dashboard visualizes temperature data across different locations in New Delhi, India.</p>
              <p className="mt-2">Click on any heatmap point to view detailed information.</p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-sidebar-foreground/60">© 2025 Temperature Heatmap Dashboard</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


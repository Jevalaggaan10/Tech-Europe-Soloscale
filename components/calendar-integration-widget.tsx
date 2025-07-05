"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar, Users, Zap, Settings, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react"

interface IntegrationStatus {
  name: string
  connected: boolean
  lastSync: string
  eventsCount: number
  icon: React.ReactNode
}

export function CalendarIntegrationWidget() {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    {
      name: "Google Calendar",
      connected: true,
      lastSync: "2 minutes ago",
      eventsCount: 12,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "Outlook Calendar",
      connected: false,
      lastSync: "Never",
      eventsCount: 0,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "Zoom Meetings",
      connected: true,
      lastSync: "5 minutes ago",
      eventsCount: 8,
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "Slack Status",
      connected: true,
      lastSync: "1 minute ago",
      eventsCount: 0,
      icon: <Zap className="h-4 w-4" />,
    },
  ])

  const [autoOptimization, setAutoOptimization] = useState(true)
  const [smartScheduling, setSmartScheduling] = useState(false)

  const toggleConnection = (index: number) => {
    setIntegrations((prev) =>
      prev.map((integration, i) => (i === index ? { ...integration, connected: !integration.connected } : integration)),
    )
  }

  const connectedIntegrations = integrations.filter((i) => i.connected).length

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-gray-600" />
          Calendar Integrations
        </CardTitle>
        <CardDescription>Connect your daily apps for comprehensive time analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {connectedIntegrations} of {integrations.length} apps connected
            </span>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        </div>

        <div className="space-y-3">
          {integrations.map((integration, index) => (
            <div key={integration.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {integration.icon}
                <div>
                  <div className="text-sm font-medium">{integration.name}</div>
                  <div className="text-xs text-gray-600">
                    {integration.connected ? (
                      <>
                        Last sync: {integration.lastSync}
                        {integration.eventsCount > 0 && ` • ${integration.eventsCount} events`}
                      </>
                    ) : (
                      "Not connected"
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {integration.connected ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                )}
                <Switch checked={integration.connected} onCheckedChange={() => toggleConnection(index)} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-3 border-t">
          <h4 className="text-sm font-medium">AI Optimization Settings</h4>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-optimization" className="text-sm">
                Auto-optimize schedule
              </Label>
              <p className="text-xs text-gray-600">Automatically suggest meeting consolidation and focus time blocks</p>
            </div>
            <Switch id="auto-optimization" checked={autoOptimization} onCheckedChange={setAutoOptimization} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="smart-scheduling" className="text-sm">
                Smart scheduling assistant
              </Label>
              <p className="text-xs text-gray-600">AI suggests optimal meeting times based on productivity patterns</p>
            </div>
            <Switch id="smart-scheduling" checked={smartScheduling} onCheckedChange={setSmartScheduling} />
          </div>
        </div>

        <div className="space-y-2 pt-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect More Apps
          </Button>
          <p className="text-xs text-gray-600 text-center">
            Supports Google Calendar, Outlook, Zoom, Teams, Slack, and more
          </p>
        </div>

        {autoOptimization && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Auto-Optimization Active</span>
            </div>
            <p className="text-xs text-blue-700">
              AI will analyze your calendar patterns and suggest optimizations every Monday morning.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

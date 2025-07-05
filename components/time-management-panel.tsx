"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, Users, Target, TrendingDown, AlertCircle, CheckCircle, Zap, Brain } from "lucide-react"
import {
  mockCalendarEvents,
  analyzeTimeUsage,
  generateProductivityInsights,
  getMeetingTypeDistribution,
  type CalendarEvent,
  type TimeAnalytics,
  type ProductivityInsight,
} from "../lib/calendar-integration"

export function TimeManagementPanel() {
  const [events] = useState<CalendarEvent[]>(mockCalendarEvents)
  const [analytics, setAnalytics] = useState<TimeAnalytics | null>(null)
  const [insights, setInsights] = useState<ProductivityInsight[]>([])
  const [meetingDistribution, setMeetingDistribution] = useState<any[]>([])

  useEffect(() => {
    const timeAnalytics = analyzeTimeUsage(events)
    const productivityInsights = generateProductivityInsights(events, timeAnalytics)
    const distribution = getMeetingTypeDistribution(events)

    setAnalytics(timeAnalytics)
    setInsights(productivityInsights)
    setMeetingDistribution(distribution)
  }, [events])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "meeting-reduction":
        return <TrendingDown className="h-4 w-4 text-orange-600" />
      case "focus-time":
        return <Brain className="h-4 w-4 text-purple-600" />
      case "time-block":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "scheduling":
        return <Calendar className="h-4 w-4 text-green-600" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getEfficiencyColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (!analytics) return null

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Time Management & Calendar Insights
        </CardTitle>
        <CardDescription>AI-powered analysis of your meeting patterns and productivity</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analytics.totalMeetingHours}h</div>
                <div className="text-xs text-gray-600">Meeting Time</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analytics.focusTimeHours}h</div>
                <div className="text-xs text-gray-600">Focus Time</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{analytics.meetingsPerDay}</div>
                <div className="text-xs text-gray-600">Meetings/Day</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{analytics.averageMeetingDuration}m</div>
                <div className="text-xs text-gray-600">Avg Duration</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Meeting Efficiency Score</span>
                <span className={`text-sm font-bold ${getEfficiencyColor(analytics.meetingEfficiencyScore)}`}>
                  {analytics.meetingEfficiencyScore}/100
                </span>
              </div>
              <Progress value={analytics.meetingEfficiencyScore} className="h-2" />
              <p className="text-xs text-gray-600">Based on meeting duration, frequency, and scheduling patterns</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Meeting Distribution</h4>
              <div className="grid grid-cols-2 gap-2">
                {meetingDistribution.map((item) => (
                  <div key={item.type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-xs capitalize">{item.type}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.count} ({item.percentage}%)
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Most Productive Hours</h4>
              <div className="flex gap-2">
                {analytics.mostProductiveHours.map((hour) => (
                  <Badge key={hour} variant="secondary" className="text-xs">
                    {hour}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-600">Hours with fewer scheduled meetings</p>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getImpactColor(insight.impact)} className="text-xs">
                      {insight.impact} impact
                    </Badge>
                    <Badge variant="outline" className="text-xs text-green-600">
                      Save {insight.timesSaved}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
                <div className="space-y-1">
                  <h5 className="text-xs font-medium text-gray-700">Action Items:</h5>
                  <ul className="space-y-1">
                    {insight.actionItems.map((action, actionIndex) => (
                      <li key={actionIndex} className="text-xs text-gray-600 flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Upcoming Meetings</h4>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Sync Calendar
                </Button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {events
                  .sort((a, b) => a.start.getTime() - b.start.getTime())
                  .slice(0, 6)
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium">{event.title}</h5>
                          <Badge variant={event.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {event.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-600">
                            {event.start.toLocaleDateString()}{" "}
                            {event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees.length}
                          </span>
                          <span className="text-xs text-gray-600">
                            {Math.round((event.end.getTime() - event.start.getTime()) / (1000 * 60))}m
                          </span>
                        </div>
                      </div>
                      {event.isRecurring && (
                        <AlertCircle className="h-4 w-4 text-orange-500" title="Recurring meeting" />
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Quick Optimization</span>
              </div>
              <p className="text-xs text-blue-700 mb-2">Based on your schedule, here are immediate improvements:</p>
              <ul className="space-y-1">
                <li className="text-xs text-blue-700">• Block 9-11 AM tomorrow for deep work</li>
                <li className="text-xs text-blue-700">• Combine two 30-min standups into one</li>
                <li className="text-xs text-blue-700">• Move afternoon calls to reduce context switching</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

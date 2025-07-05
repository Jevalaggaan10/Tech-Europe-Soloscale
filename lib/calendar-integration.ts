export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  attendees: string[]
  type: "meeting" | "call" | "workshop" | "review" | "standup" | "interview"
  location?: string
  isRecurring: boolean
  priority: "high" | "medium" | "low"
  status: "confirmed" | "tentative" | "cancelled"
}

export interface TimeAnalytics {
  totalMeetingHours: number
  averageMeetingDuration: number
  meetingsPerDay: number
  focusTimeHours: number
  mostProductiveHours: string[]
  meetingEfficiencyScore: number
}

export interface ProductivityInsight {
  type: "time-block" | "meeting-reduction" | "focus-time" | "scheduling"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  timesSaved: string
  actionItems: string[]
}

// Mock calendar data - in real implementation, this would come from Google Calendar, Outlook, etc.
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Daily Standup",
    start: new Date(2024, 5, 10, 9, 0),
    end: new Date(2024, 5, 10, 9, 30),
    attendees: ["team@startup.com"],
    type: "standup",
    isRecurring: true,
    priority: "medium",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Product Strategy Review",
    start: new Date(2024, 5, 10, 14, 0),
    end: new Date(2024, 5, 10, 15, 30),
    attendees: ["sarah@startup.com", "mike@startup.com", "alex@startup.com"],
    type: "review",
    isRecurring: false,
    priority: "high",
    status: "confirmed",
  },
  {
    id: "3",
    title: "Client Call - TechCorp",
    start: new Date(2024, 5, 10, 16, 0),
    end: new Date(2024, 5, 10, 17, 0),
    attendees: ["client@techcorp.com"],
    type: "call",
    isRecurring: false,
    priority: "high",
    status: "confirmed",
  },
  {
    id: "4",
    title: "Weekly Team Sync",
    start: new Date(2024, 5, 11, 10, 0),
    end: new Date(2024, 5, 11, 11, 0),
    attendees: ["team@startup.com"],
    type: "meeting",
    isRecurring: true,
    priority: "medium",
    status: "confirmed",
  },
  {
    id: "5",
    title: "Investor Update Meeting",
    start: new Date(2024, 5, 11, 15, 0),
    end: new Date(2024, 5, 11, 16, 0),
    attendees: ["investor@vc.com"],
    type: "meeting",
    isRecurring: false,
    priority: "high",
    status: "confirmed",
  },
  {
    id: "6",
    title: "Engineering Deep Dive",
    start: new Date(2024, 5, 12, 13, 0),
    end: new Date(2024, 5, 12, 15, 0),
    attendees: ["dev-team@startup.com"],
    type: "workshop",
    isRecurring: false,
    priority: "medium",
    status: "confirmed",
  },
  {
    id: "7",
    title: "Candidate Interview",
    start: new Date(2024, 5, 12, 11, 0),
    end: new Date(2024, 5, 12, 12, 0),
    attendees: ["hr@startup.com"],
    type: "interview",
    isRecurring: false,
    priority: "high",
    status: "confirmed",
  },
]

export function analyzeTimeUsage(events: CalendarEvent[]): TimeAnalytics {
  const totalMeetingMinutes = events.reduce((total, event) => {
    const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60)
    return total + duration
  }, 0)

  const totalMeetingHours = totalMeetingMinutes / 60
  const averageMeetingDuration = totalMeetingMinutes / events.length
  const uniqueDays = new Set(events.map((event) => event.start.toDateString())).size
  const meetingsPerDay = events.length / uniqueDays

  // Calculate focus time (assuming 8-hour workday minus meetings)
  const workingHoursPerDay = 8
  const totalWorkingHours = uniqueDays * workingHoursPerDay
  const focusTimeHours = totalWorkingHours - totalMeetingHours

  // Analyze most productive hours (hours with fewer meetings)
  const hourCounts: { [hour: number]: number } = {}
  events.forEach((event) => {
    const hour = event.start.getHours()
    hourCounts[hour] = (hourCounts[hour] || 0) + 1
  })

  const mostProductiveHours = Object.entries(hourCounts)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([hour]) => `${hour}:00`)

  // Calculate efficiency score based on meeting patterns
  const shortMeetings = events.filter((e) => e.end.getTime() - e.start.getTime() <= 30 * 60 * 1000).length
  const longMeetings = events.filter((e) => e.end.getTime() - e.start.getTime() > 90 * 60 * 1000).length
  const recurringMeetings = events.filter((e) => e.isRecurring).length

  const meetingEfficiencyScore = Math.max(0, 100 - longMeetings * 10 - recurringMeetings * 5 + shortMeetings * 5)

  return {
    totalMeetingHours: Math.round(totalMeetingHours * 10) / 10,
    averageMeetingDuration: Math.round(averageMeetingDuration),
    meetingsPerDay: Math.round(meetingsPerDay * 10) / 10,
    focusTimeHours: Math.round(focusTimeHours * 10) / 10,
    mostProductiveHours,
    meetingEfficiencyScore: Math.round(meetingEfficiencyScore),
  }
}

export function generateProductivityInsights(events: CalendarEvent[], analytics: TimeAnalytics): ProductivityInsight[] {
  const insights: ProductivityInsight[] = []

  // Meeting reduction insights
  const recurringMeetings = events.filter((e) => e.isRecurring)
  if (recurringMeetings.length > 3) {
    insights.push({
      type: "meeting-reduction",
      title: "Reduce Recurring Meetings",
      description: `You have ${recurringMeetings.length} recurring meetings. Consider consolidating or reducing frequency.`,
      impact: "high",
      timesSaved: "2-4 hours/week",
      actionItems: [
        "Audit all recurring meetings for necessity",
        "Combine similar meetings into one session",
        "Switch some meetings to async updates",
        "Reduce meeting frequency from weekly to bi-weekly",
      ],
    })
  }

  // Long meeting insights
  const longMeetings = events.filter((e) => e.end.getTime() - e.start.getTime() > 90 * 60 * 1000)
  if (longMeetings.length > 2) {
    insights.push({
      type: "meeting-reduction",
      title: "Optimize Long Meetings",
      description: `${longMeetings.length} meetings are over 90 minutes. Break them down for better focus.`,
      impact: "medium",
      timesSaved: "1-2 hours/week",
      actionItems: [
        "Set strict agendas for long meetings",
        "Break 2+ hour meetings into multiple sessions",
        "Use timeboxing for each agenda item",
        "End meetings early when objectives are met",
      ],
    })
  }

  // Focus time insights
  if (analytics.focusTimeHours < 20) {
    insights.push({
      type: "focus-time",
      title: "Increase Deep Work Time",
      description: `Only ${analytics.focusTimeHours} hours of focus time this week. Aim for 25+ hours.`,
      impact: "high",
      timesSaved: "5+ hours/week",
      actionItems: [
        "Block 2-4 hour focus time slots daily",
        "Decline non-essential meetings",
        "Use 'Do Not Disturb' during focus blocks",
        "Batch similar meetings together",
      ],
    })
  }

  // Time blocking insights
  const meetingGaps = analyzeMeetingGaps(events)
  if (meetingGaps.shortGaps > 3) {
    insights.push({
      type: "time-block",
      title: "Optimize Meeting Scheduling",
      description: `${meetingGaps.shortGaps} gaps under 30 minutes between meetings reduce productivity.`,
      impact: "medium",
      timesSaved: "30-60 minutes/day",
      actionItems: [
        "Schedule meetings back-to-back when possible",
        "Leave 15-minute buffers between meetings",
        "Group meetings by type or topic",
        "Use calendar blocking for transition time",
      ],
    })
  }

  // Scheduling optimization
  const morningMeetings = events.filter((e) => e.start.getHours() < 10).length
  const afternoonMeetings = events.filter((e) => e.start.getHours() >= 14).length

  if (morningMeetings > afternoonMeetings * 1.5) {
    insights.push({
      type: "scheduling",
      title: "Protect Morning Focus Time",
      description: "Too many morning meetings. Mornings are typically most productive for deep work.",
      impact: "high",
      timesSaved: "2-3 hours/day",
      actionItems: [
        "Move routine meetings to afternoons",
        "Block 9-11 AM for deep work",
        "Schedule creative work in the morning",
        "Use afternoons for collaborative meetings",
      ],
    })
  }

  return insights.slice(0, 4) // Return top 4 insights
}

function analyzeMeetingGaps(events: CalendarEvent[]) {
  const sortedEvents = events.sort((a, b) => a.start.getTime() - b.start.getTime())
  let shortGaps = 0
  let longGaps = 0

  for (let i = 0; i < sortedEvents.length - 1; i++) {
    const currentEnd = sortedEvents[i].end.getTime()
    const nextStart = sortedEvents[i + 1].start.getTime()
    const gap = (nextStart - currentEnd) / (1000 * 60) // Gap in minutes

    if (gap > 0 && gap < 30) {
      shortGaps++
    } else if (gap >= 120) {
      longGaps++
    }
  }

  return { shortGaps, longGaps }
}

export function getMeetingTypeDistribution(events: CalendarEvent[]) {
  const distribution: { [key: string]: number } = {}

  events.forEach((event) => {
    distribution[event.type] = (distribution[event.type] || 0) + 1
  })

  return Object.entries(distribution).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / events.length) * 100),
  }))
}

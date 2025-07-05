export interface BusinessMetric {
  name: string
  value: number | string
  change: string
  trend: "positive" | "negative" | "neutral"
}

export interface BusinessData {
  revenue: Array<{ month: string; revenue: number; expenses: number }>
  customers: Array<{ month: string; customers: number; churn: number }>
  metrics: BusinessMetric[]
  activities: Array<{ user: string; action: string; type: string; time: string }>
  calendar?: {
    totalMeetingHours: number
    focusTimeHours: number
    meetingsPerDay: number
    efficiencyScore: number
  }
}

export function generateInsightPrompt(data: BusinessData, userQuestion?: string): string {
  const latestRevenue = data.revenue[data.revenue.length - 1]
  const latestCustomers = data.customers[data.customers.length - 1]
  const revenueGrowth =
    data.revenue.length > 1
      ? (
          ((latestRevenue.revenue - data.revenue[data.revenue.length - 2].revenue) /
            data.revenue[data.revenue.length - 2].revenue) *
          100
        ).toFixed(1)
      : "0"

  const customerGrowth =
    data.customers.length > 1
      ? (
          ((latestCustomers.customers - data.customers[data.customers.length - 2].customers) /
            data.customers[data.customers.length - 2].customers) *
          100
        ).toFixed(1)
      : "0"

  const context = `
You are an AI business advisor for a startup. Here's the current business data:

FINANCIAL METRICS:
- Latest Monthly Revenue: $${latestRevenue.revenue.toLocaleString()}
- Latest Monthly Expenses: $${latestRevenue.expenses.toLocaleString()}
- Monthly Profit: $${(latestRevenue.revenue - latestRevenue.expenses).toLocaleString()}
- Revenue Growth: ${revenueGrowth}%
- Profit Margin: ${(((latestRevenue.revenue - latestRevenue.expenses) / latestRevenue.revenue) * 100).toFixed(1)}%

CUSTOMER METRICS:
- Total Customers: ${latestCustomers.customers}
- Customer Growth: ${customerGrowth}%
- Current Churn Rate: ${latestCustomers.churn}%

KEY PERFORMANCE INDICATORS:
${data.metrics.map((metric) => `- ${metric.name}: ${metric.value} (${metric.change})`).join("\n")}

RECENT REVENUE TREND (Last 6 months):
${data.revenue.map((r) => `${r.month}: $${r.revenue.toLocaleString()}`).join(", ")}

RECENT CUSTOMER TREND (Last 6 months):
${data.customers.map((c) => `${c.month}: ${c.customers} customers`).join(", ")}

CALENDAR & TIME MANAGEMENT:
${
  data.calendar
    ? `
- Weekly Meeting Hours: ${data.calendar.totalMeetingHours}h
- Focus Time Available: ${data.calendar.focusTimeHours}h  
- Average Meetings per Day: ${data.calendar.meetingsPerDay}
- Meeting Efficiency Score: ${data.calendar.efficiencyScore}/100
`
    : ""
}

${userQuestion ? `USER QUESTION: ${userQuestion}` : ""}

Please provide actionable insights and recommendations based on this data. Focus on:
1. Key areas for improvement
2. Growth opportunities
3. Risk factors to address
4. Specific action items

Be concise, data-driven, and practical in your recommendations.
`

  return context
}

export const predefinedInsights = [
  {
    id: "revenue-optimization",
    title: "Revenue Optimization",
    question: "How can I optimize my revenue streams and increase profitability?",
  },
  {
    id: "customer-retention",
    title: "Customer Retention",
    question: "What strategies should I implement to reduce churn and improve customer retention?",
  },
  {
    id: "growth-strategy",
    title: "Growth Strategy",
    question: "Based on my current metrics, what's the best growth strategy for the next quarter?",
  },
  {
    id: "cost-management",
    title: "Cost Management",
    question: "How can I optimize my expenses while maintaining growth momentum?",
  },
  {
    id: "market-expansion",
    title: "Market Expansion",
    question: "When and how should I consider expanding to new markets or customer segments?",
  },
]

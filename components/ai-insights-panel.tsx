"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertTriangle, Target, Sparkles } from "lucide-react"
import type { BusinessData } from "../lib/ai-insights"

interface AIInsightsPanelProps {
  businessData: BusinessData
}

export function AIInsightsPanel({ businessData }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<
    Array<{
      type: "opportunity" | "warning" | "recommendation"
      title: string
      description: string
      priority: "high" | "medium" | "low"
    }>
  >([])

  useEffect(() => {
    // Generate AI insights based on business data
    const generatedInsights = generateInsights(businessData)
    setInsights(generatedInsights)
  }, [businessData])

  const generateInsights = (data: BusinessData) => {
    const insights = []
    const latestRevenue = data.revenue[data.revenue.length - 1]
    const latestCustomers = data.customers[data.customers.length - 1]

    // Revenue insights
    if (data.revenue.length > 1) {
      const revenueGrowth =
        ((latestRevenue.revenue - data.revenue[data.revenue.length - 2].revenue) /
          data.revenue[data.revenue.length - 2].revenue) *
        100

      if (revenueGrowth > 20) {
        insights.push({
          type: "opportunity",
          title: "Strong Revenue Growth",
          description: `Your revenue grew ${revenueGrowth.toFixed(1)}% last month. Consider scaling your successful strategies.`,
          priority: "high",
        })
      } else if (revenueGrowth < 0) {
        insights.push({
          type: "warning",
          title: "Revenue Decline",
          description: `Revenue decreased by ${Math.abs(revenueGrowth).toFixed(1)}%. Review your sales funnel and customer acquisition.`,
          priority: "high",
        })
      }
    }

    // Profit margin insights
    const profitMargin = ((latestRevenue.revenue - latestRevenue.expenses) / latestRevenue.revenue) * 100
    if (profitMargin < 20) {
      insights.push({
        type: "warning",
        title: "Low Profit Margin",
        description: `Your profit margin is ${profitMargin.toFixed(1)}%. Consider optimizing costs or increasing prices.`,
        priority: "medium",
      })
    }

    // Churn rate insights
    if (latestCustomers.churn > 10) {
      insights.push({
        type: "warning",
        title: "High Churn Rate",
        description: `Customer churn is at ${latestCustomers.churn}%. Focus on customer success and retention strategies.`,
        priority: "high",
      })
    } else if (latestCustomers.churn < 5) {
      insights.push({
        type: "opportunity",
        title: "Excellent Retention",
        description: `Low churn rate of ${latestCustomers.churn}%. Your customers are happy - consider upselling opportunities.`,
        priority: "medium",
      })
    }

    // Customer growth insights
    if (data.customers.length > 1) {
      const customerGrowth =
        ((latestCustomers.customers - data.customers[data.customers.length - 2].customers) /
          data.customers[data.customers.length - 2].customers) *
        100

      if (customerGrowth > 15) {
        insights.push({
          type: "opportunity",
          title: "Rapid Customer Growth",
          description: `Customer base grew ${customerGrowth.toFixed(1)}% last month. Ensure your infrastructure can scale.`,
          priority: "medium",
        })
      }
    }

    // General recommendations
    insights.push({
      type: "recommendation",
      title: "Focus on Customer Lifetime Value",
      description: "Implement strategies to increase CLV through upselling, cross-selling, and retention programs.",
      priority: "medium",
    })

    return insights.slice(0, 4) // Limit to 4 insights
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "recommendation":
        return <Target className="h-4 w-4 text-blue-600" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-orange-50 border-orange-200"
      case "recommendation":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Insights
        </CardTitle>
        <CardDescription>Automated analysis and recommendations based on your business data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                </div>
                <Badge variant={getPriorityColor(insight.priority)} className="text-xs">
                  {insight.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Insights update automatically based on your latest metrics
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

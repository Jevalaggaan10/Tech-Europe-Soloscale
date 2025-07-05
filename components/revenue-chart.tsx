"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ExportMenu } from "./export-menu"

const revenueData = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 15000, expenses: 9000 },
  { month: "Mar", revenue: 18000, expenses: 10000 },
  { month: "Apr", revenue: 22000, expenses: 11000 },
  { month: "May", revenue: 28000, expenses: 13000 },
  { month: "Jun", revenue: 35000, expenses: 15000 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue and expenses for the last 6 months</CardDescription>
        </div>
        <ExportMenu revenueData={revenueData} customerData={[]} activitiesData={[]} metricsData={[]} />
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            expenses: {
              label: "Expenses",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="var(--color-revenue)"
                fill="var(--color-revenue)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="var(--color-expenses)"
                fill="var(--color-expenses)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

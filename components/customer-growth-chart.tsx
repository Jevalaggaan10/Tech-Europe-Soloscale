"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ExportMenu } from "./export-menu"

const customerData = [
  { month: "Jan", customers: 120, churn: 5 },
  { month: "Feb", customers: 145, churn: 8 },
  { month: "Mar", customers: 178, churn: 6 },
  { month: "Apr", customers: 210, churn: 12 },
  { month: "May", customers: 245, churn: 9 },
  { month: "Jun", customers: 289, churn: 7 },
]

export function CustomerGrowthChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Customer Growth</CardTitle>
          <CardDescription>Total customers and churn rate over time</CardDescription>
        </div>
        <ExportMenu revenueData={[]} customerData={customerData} activitiesData={[]} metricsData={[]} />
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            customers: {
              label: "Total Customers",
              color: "hsl(var(--chart-1))",
            },
            churn: {
              label: "Churn Rate",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={customerData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="customers" stroke="var(--color-customers)" strokeWidth={2} />
              <Line type="monotone" dataKey="churn" stroke="var(--color-churn)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

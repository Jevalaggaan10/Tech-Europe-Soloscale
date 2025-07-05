"use client"

import { AppSidebar } from "./components/app-sidebar"
import { MetricCard } from "./components/metric-card"
import { RevenueChart } from "./components/revenue-chart"
import { CustomerGrowthChart } from "./components/customer-growth-chart"
import { RecentActivities } from "./components/recent-activities"
import { TopCustomers } from "./components/top-customers"
import { QuickActions } from "./components/quick-actions"
import { ExportMenu } from "./components/export-menu"
import { AIChatbot } from "./components/ai-chatbot"
import { AIInsightsPanel } from "./components/ai-insights-panel"
import { TimeManagementPanel } from "./components/time-management-panel"
import { CalendarIntegrationWidget } from "./components/calendar-integration-widget"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DollarSign, Users, TrendingUp, Target, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const revenueData = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 15000, expenses: 9000 },
  { month: "Mar", revenue: 18000, expenses: 10000 },
  { month: "Apr", revenue: 22000, expenses: 11000 },
  { month: "May", revenue: 28000, expenses: 13000 },
  { month: "Jun", revenue: 35000, expenses: 15000 },
]

const customerData = [
  { month: "Jan", customers: 120, churn: 5 },
  { month: "Feb", customers: 145, churn: 8 },
  { month: "Mar", customers: 178, churn: 6 },
  { month: "Apr", customers: 210, churn: 12 },
  { month: "May", customers: 245, churn: 9 },
  { month: "Jun", customers: 289, churn: 7 },
]

const activitiesData = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "completed project milestone",
    project: "Mobile App Launch",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "closed deal worth",
    amount: "$15,000",
    time: "4 hours ago",
    type: "revenue",
  },
  {
    id: 3,
    user: "Emma Davis",
    action: "onboarded new customer",
    customer: "TechCorp Inc.",
    time: "6 hours ago",
    type: "customer",
  },
  {
    id: 4,
    user: "Alex Rodriguez",
    action: "launched marketing campaign",
    campaign: "Q2 Growth Initiative",
    time: "1 day ago",
    type: "marketing",
  },
  {
    id: 5,
    user: "Lisa Wang",
    action: "resolved critical bug",
    severity: "High Priority",
    time: "2 days ago",
    type: "technical",
  },
]

const metricsData = [
  { title: "Total Revenue", value: "$45,231", change: "+20.1%" },
  { title: "Active Customers", value: "289", change: "+15.3%" },
  { title: "Growth Rate", value: "12.5%", change: "+2.4%" },
  { title: "Conversion Rate", value: "3.2%", change: "-0.5%" },
  { title: "Monthly Recurring Revenue", value: "$28,450", change: "+18.2%" },
  { title: "Customer Lifetime Value", value: "$1,250", change: "+8.7%" },
  { title: "Churn Rate", value: "2.4%", change: "-1.2%" },
]

const businessData = {
  revenue: revenueData,
  customers: customerData,
  activities: activitiesData,
  metrics: metricsData,
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">StartupCo</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8" />
            </div>
            <ExportMenu
              revenueData={revenueData}
              customerData={customerData}
              activitiesData={activitiesData}
              metricsData={metricsData}
            />
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Revenue" value="$45,231" change="+20.1%" changeType="positive" icon={DollarSign} />
            <MetricCard title="Active Customers" value="289" change="+15.3%" changeType="positive" icon={Users} />
            <MetricCard title="Growth Rate" value="12.5%" change="+2.4%" changeType="positive" icon={TrendingUp} />
            <MetricCard title="Conversion Rate" value="3.2%" change="-0.5%" changeType="negative" icon={Target} />
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <RevenueChart />
            <CustomerGrowthChart />
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <TimeManagementPanel />
            <AIInsightsPanel businessData={businessData} />
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <TopCustomers />
            <CalendarIntegrationWidget />
            <RecentActivities />
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <QuickActions />
            <div className="col-span-2">
              <div className="grid gap-4">
                <MetricCard
                  title="Monthly Recurring Revenue"
                  value="$28,450"
                  change="+18.2%"
                  changeType="positive"
                  icon={DollarSign}
                />
                <MetricCard
                  title="Customer Lifetime Value"
                  value="$1,250"
                  change="+8.7%"
                  changeType="positive"
                  icon={Users}
                />
              </div>
            </div>
          </div>
        </div>
        <AIChatbot businessData={businessData} />
      </SidebarInset>
    </SidebarProvider>
  )
}

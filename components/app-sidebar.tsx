"use client"

import {
  BarChart3,
  Building2,
  Calendar,
  DollarSign,
  Home,
  MessageSquare,
  Settings,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "#", icon: Home, isActive: true },
      { title: "Analytics", url: "#", icon: BarChart3 },
      { title: "Revenue", url: "#", icon: DollarSign },
    ],
  },
  {
    title: "Business",
    items: [
      { title: "Customers", url: "#", icon: Users },
      { title: "Marketing", url: "#", icon: Target },
      { title: "Growth", url: "#", icon: TrendingUp },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "Team", url: "#", icon: Building2 },
      { title: "Tasks", url: "#", icon: Calendar },
      { title: "Feedback", url: "#", icon: MessageSquare },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Automation", url: "#", icon: Zap },
      { title: "Settings", url: "#", icon: Settings },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">StartupCo</span>
            <span className="truncate text-xs text-muted-foreground">Dashboard</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

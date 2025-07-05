import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Send, FileText, Users, Target, Calendar } from "lucide-react"

const quickActions = [
  { icon: Plus, label: "Add Customer", description: "Register new customer" },
  { icon: Send, label: "Send Invoice", description: "Create and send invoice" },
  { icon: FileText, label: "New Report", description: "Generate business report" },
  { icon: Users, label: "Team Meeting", description: "Schedule team sync" },
  { icon: Target, label: "Set Goal", description: "Define new objective" },
  { icon: Calendar, label: "Book Demo", description: "Schedule product demo" },
]

export function QuickActions() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button key={index} variant="outline" className="h-auto flex-col items-start p-3 text-left">
              <action.icon className="h-4 w-4 mb-2" />
              <div className="text-sm font-medium">{action.label}</div>
              <div className="text-xs text-muted-foreground">{action.description}</div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

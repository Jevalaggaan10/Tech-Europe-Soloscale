import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
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

export function RecentActivities() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest updates from your team and business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                  {activity.project && <span className="font-semibold"> {activity.project}</span>}
                  {activity.amount && <span className="font-semibold text-green-600"> {activity.amount}</span>}
                  {activity.customer && <span className="font-semibold"> {activity.customer}</span>}
                  {activity.campaign && <span className="font-semibold"> {activity.campaign}</span>}
                  {activity.severity && <span className="font-semibold text-red-600"> {activity.severity}</span>}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant={activity.type === "success" ? "default" : "secondary"}>{activity.type}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

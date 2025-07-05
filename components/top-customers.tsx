import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const topCustomers = [
  {
    name: "Acme Corporation",
    email: "contact@acme.com",
    revenue: "$45,000",
    status: "Active",
    lastOrder: "2 days ago",
  },
  {
    name: "TechStart Inc.",
    email: "hello@techstart.com",
    revenue: "$32,000",
    status: "Active",
    lastOrder: "1 week ago",
  },
  {
    name: "Global Solutions",
    email: "info@globalsol.com",
    revenue: "$28,500",
    status: "Pending",
    lastOrder: "3 days ago",
  },
  {
    name: "Innovation Labs",
    email: "team@innovlabs.com",
    revenue: "$22,000",
    status: "Active",
    lastOrder: "5 days ago",
  },
  {
    name: "Future Systems",
    email: "contact@futuresys.com",
    revenue: "$18,750",
    status: "Inactive",
    lastOrder: "2 weeks ago",
  },
]

export function TopCustomers() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
        <CardDescription>Your highest value customers by revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCustomers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.email}</div>
                </TableCell>
                <TableCell className="font-medium">{customer.revenue}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      customer.status === "Active"
                        ? "default"
                        : customer.status === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.lastOrder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

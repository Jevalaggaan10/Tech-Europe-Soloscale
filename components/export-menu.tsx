"use client"

import { useState } from "react"
import { Download, FileText, Table } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { exportToCSV, exportToPDF, formatDataForExport, type ExportData } from "../lib/export-utils"

interface ExportMenuProps {
  revenueData: any[]
  customerData: any[]
  activitiesData: any[]
  metricsData: any[]
}

export function ExportMenu({ revenueData, customerData, activitiesData, metricsData }: ExportMenuProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleCSVExport = async (type: string) => {
    setIsExporting(true)

    try {
      let exportData: ExportData

      switch (type) {
        case "revenue":
          exportData = {
            title: "Revenue Report",
            data: formatDataForExport("revenue", revenueData),
            type: "revenue",
          }
          break

        case "customers":
          exportData = {
            title: "Customer Growth Report",
            data: formatDataForExport("customers", customerData),
            type: "customers",
          }
          break

        case "activities":
          exportData = {
            title: "Recent Activities Report",
            data: activitiesData,
            type: "activities",
          }
          break

        case "metrics":
          exportData = {
            title: "Key Metrics Report",
            data: metricsData,
            type: "metrics",
          }
          break

        default:
          return
      }

      exportToCSV(exportData)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handlePDFExport = async () => {
    setIsExporting(true)

    try {
      const exportSections: ExportData[] = [
        {
          title: "Key Metrics",
          data: metricsData,
          type: "metrics",
        },
        {
          title: "Revenue Overview",
          data: revenueData,
          type: "revenue",
        },
        {
          title: "Customer Growth",
          data: customerData,
          type: "customers",
        },
        {
          title: "Recent Activities",
          data: activitiesData.slice(0, 10), // Limit to recent 10 activities
          type: "activities",
        },
      ]

      exportToPDF(exportSections)
    } catch (error) {
      console.error("PDF export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center justify-between">
          Export Reports
          <Badge variant="secondary" className="text-xs">
            New
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handlePDFExport}>
          <FileText className="h-4 w-4 mr-2" />
          Complete Report (PDF)
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">CSV Exports</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => handleCSVExport("revenue")}>
          <Table className="h-4 w-4 mr-2" />
          Revenue Data
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleCSVExport("customers")}>
          <Table className="h-4 w-4 mr-2" />
          Customer Data
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleCSVExport("activities")}>
          <Table className="h-4 w-4 mr-2" />
          Activities Log
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleCSVExport("metrics")}>
          <Table className="h-4 w-4 mr-2" />
          Key Metrics
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

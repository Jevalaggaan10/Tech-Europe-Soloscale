import jsPDF from "jspdf"
import "jspdf-autotable"

// Extend jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export interface ExportData {
  title: string
  data: any[]
  headers?: string[]
  type: "revenue" | "customers" | "activities" | "metrics"
}

export function exportToCSV(exportData: ExportData) {
  const { title, data, headers } = exportData

  // Generate CSV content
  let csvContent = ""

  // Add title
  csvContent += `${title}\n`
  csvContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`

  if (headers && headers.length > 0) {
    csvContent += headers.join(",") + "\n"
  }

  // Add data rows
  data.forEach((row) => {
    if (typeof row === "object") {
      const values = Object.values(row).map((value) => {
        // Handle values that might contain commas
        if (typeof value === "string" && value.includes(",")) {
          return `"${value}"`
        }
        return value
      })
      csvContent += values.join(",") + "\n"
    } else {
      csvContent += row + "\n"
    }
  })

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute(
    "download",
    `${title.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`,
  )
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPDF(exportData: ExportData[]) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  let yPosition = 20

  // Add header
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("StartupCo Dashboard Report", pageWidth / 2, yPosition, { align: "center" })

  yPosition += 10
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: "center" })

  yPosition += 20

  exportData.forEach((section, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    // Section title
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(section.title, 20, yPosition)
    yPosition += 10

    // Prepare table data based on section type
    let tableData: any[] = []
    let tableHeaders: string[] = []

    switch (section.type) {
      case "revenue":
        tableHeaders = ["Month", "Revenue", "Expenses", "Profit"]
        tableData = section.data.map((item) => [
          item.month,
          `$${item.revenue.toLocaleString()}`,
          `$${item.expenses.toLocaleString()}`,
          `$${(item.revenue - item.expenses).toLocaleString()}`,
        ])
        break

      case "customers":
        tableHeaders = ["Month", "Total Customers", "Churn Rate"]
        tableData = section.data.map((item) => [item.month, item.customers.toString(), `${item.churn}%`])
        break

      case "activities":
        tableHeaders = ["User", "Action", "Time", "Type"]
        tableData = section.data.map((item) => [
          item.user,
          `${item.action} ${item.project || item.amount || item.customer || item.campaign || item.severity || ""}`.trim(),
          item.time,
          item.type,
        ])
        break

      case "metrics":
        tableHeaders = ["Metric", "Value", "Change"]
        tableData = section.data.map((item) => [item.title, item.value, item.change])
        break
    }

    // Add table
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: yPosition,
      theme: "grid",
      headStyles: {
        fillColor: [59, 130, 246], // Blue color
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      margin: { left: 20, right: 20 },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 15
  })

  // Save the PDF
  doc.save(`startup_dashboard_report_${new Date().toISOString().split("T")[0]}.pdf`)
}

// Utility function to format data for export
export function formatDataForExport(type: string, rawData: any[]) {
  switch (type) {
    case "revenue":
      return rawData.map((item) => ({
        Month: item.month,
        Revenue: item.revenue,
        Expenses: item.expenses,
        Profit: item.revenue - item.expenses,
        "Profit Margin": `${(((item.revenue - item.expenses) / item.revenue) * 100).toFixed(1)}%`,
      }))

    case "customers":
      return rawData.map((item) => ({
        Month: item.month,
        "Total Customers": item.customers,
        "Churn Rate": `${item.churn}%`,
        "Growth Rate":
          item.customers > 0
            ? `${((item.customers / (rawData[rawData.indexOf(item) - 1]?.customers || item.customers) - 1) * 100).toFixed(1)}%`
            : "0%",
      }))

    default:
      return rawData
  }
}

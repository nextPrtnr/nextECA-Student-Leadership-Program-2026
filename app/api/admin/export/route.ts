import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ambassadorApplications } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import * as XLSX from "xlsx"

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || "admin-key-change-me"

export async function GET(request: NextRequest) {
  try {
    // Check admin key from header
    const adminKey = request.headers.get("x-admin-key")
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get export format from query params
    const format = request.nextUrl.searchParams.get("format") || "csv"

    // Fetch all applications
    const applications = await db
      .select()
      .from(ambassadorApplications)
      .orderBy(desc(ambassadorApplications.createdAt))

    // Transform data for export
    const exportData = applications.map((app) => ({
      ID: app.id,
      "Full Name": app.fullName,
      Email: app.email,
      Phone: app.phone,
      City: app.city,
      University: app.university,
      "Field of Study": app.fieldOfStudy,
      "Year of Study": app.yearOfStudy,
      "Graduation Year": app.graduationYear,
      "About You": app.aboutYou,
      "Why Join": app.whyJoin,
      "Leadership Experience": app.leadershipExperience,
      "Willing for Events": app.willingEvents,
      "Justify Events": app.justifyEvents,
      "Hours Per Week": app.hoursPerWeek,
      "Future Leadership": app.futureLeadership,
      "Interest Area": app.interestArea,
      "T-Shirt Size": app.tshirtSize,
      "T-Shirt Color": app.tshirtColor,
      Status: app.status,
      "Created At": new Date(app.createdAt).toISOString(),
    }))

    if (format === "xlsx") {
      // Export to Excel
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(exportData)

      // Set column widths
      const colWidths = [
        { wch: 8 },
        { wch: 20 },
        { wch: 25 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 20 },
        { wch: 12 },
        { wch: 15 },
        { wch: 30 },
        { wch: 30 },
        { wch: 30 },
        { wch: 15 },
        { wch: 30 },
        { wch: 15 },
        { wch: 30 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 10 },
        { wch: 20 },
      ]
      worksheet["!cols"] = colWidths

      XLSX.utils.book_append_sheet(workbook, worksheet, "Applications")
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" })

      return new NextResponse(buffer, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition":
            'attachment; filename="applications_' +
            new Date().toISOString().split("T")[0] +
            '.xlsx"',
        },
      })
    } else {
      // Export to CSV
      const csv = [
        Object.keys(exportData[0] || {}).join(","),
        ...exportData.map((row) =>
          Object.values(row)
            .map((val) => `"${String(val).replace(/"/g, '""')}"`)
            .join(","),
        ),
      ].join("\n")

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition":
            'attachment; filename="applications_' +
            new Date().toISOString().split("T")[0] +
            '.csv"',
        },
      })
    }
  } catch (error) {
    console.error("Error exporting applications:", error)
    return NextResponse.json(
      { error: "Failed to export applications" },
      { status: 500 },
    )
  }
}

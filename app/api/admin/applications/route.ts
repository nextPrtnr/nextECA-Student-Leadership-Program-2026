import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ambassadorApplications } from "@/lib/db/schema"
import { desc } from "drizzle-orm"

// Simple admin key check - in production, use proper auth
const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || "admin-key-change-me"

export async function GET(request: NextRequest) {
  try {
    // Check admin key from header
    const adminKey = request.headers.get("x-admin-key")
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch all applications
    const applications = await db
      .select()
      .from(ambassadorApplications)
      .orderBy(desc(ambassadorApplications.createdAt))

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    )
  }
}

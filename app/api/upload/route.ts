import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 })
    }

    const blob = await put(`applications/${Date.now()}-${file.name}`, file, {
      access: "private",
      addRandomSuffix: true,
    })

    // Private store: return the pathname, not the URL.
    return NextResponse.json({ pathname: blob.pathname })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

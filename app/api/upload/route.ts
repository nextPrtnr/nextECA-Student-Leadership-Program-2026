import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

const HARD_MAX_MB = 4 // absolute server-side cap regardless of client request

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const requestedMB = Number(formData.get("maxSizeMB")) || HARD_MAX_MB
    const limitMB = Math.min(requestedMB, HARD_MAX_MB)

    if (file.size > limitMB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File must be under ${limitMB} MB` },
        { status: 400 },
      )
    }

    const blob = await put(`applications/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    })

    // Return the public URL so it can be accessed directly
    return NextResponse.json({ pathname: blob.url })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

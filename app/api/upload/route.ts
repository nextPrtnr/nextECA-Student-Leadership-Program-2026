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
      access: "private",
      addRandomSuffix: true,
    })

    // Return the pathname for private blobs (will need token to access)
    return NextResponse.json({ pathname: blob.pathname })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[v0] Upload error:", errorMessage)
    return NextResponse.json({ error: `Upload failed: ${errorMessage}` }, { status: 500 })
  }
}

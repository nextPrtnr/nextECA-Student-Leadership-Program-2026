import { NextRequest, NextResponse } from "next/server"

// Map file extensions to MIME types
const MIME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  txt: "text/plain",
  csv: "text/csv",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel",
}

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()
  if (!ext) return "application/octet-stream"
  return MIME_TYPES[ext] || "application/octet-stream"
}

export async function GET(request: NextRequest) {
  const fileUrl = request.nextUrl.searchParams.get("url")
  const adminKey = request.nextUrl.searchParams.get("key")

  // Verify admin key
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  if (!fileUrl) {
    return new NextResponse("Missing file URL", { status: 400 })
  }

  try {
    // Fetch the file from Vercel Blob
    const response = await fetch(decodeURIComponent(fileUrl))
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    
    // Determine filename and MIME type from URL
    const urlObj = new URL(decodeURIComponent(fileUrl))
    const pathname = urlObj.pathname
    let filename = pathname.split("/").pop() || "download"
    
    // Remove query parameters from filename
    filename = filename.split("?")[0]
    
    // Get proper MIME type based on extension
    const mimeType = getMimeType(filename)

    // Return the file with appropriate headers
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
      },
    })
  } catch (error) {
    console.error("[v0] Download error:", error)
    return new NextResponse("Failed to download file", { status: 500 })
  }
}

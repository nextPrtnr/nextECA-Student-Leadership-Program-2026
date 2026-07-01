import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const fileUrl = request.nextUrl.searchParams.get("url")
  const adminKey = request.nextUrl.searchParams.get("key")
  const filename = request.nextUrl.searchParams.get("filename")

  // Verify admin key
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  if (!fileUrl) {
    return new NextResponse("Missing file URL", { status: 400 })
  }

  try {
    const decodedUrl = decodeURIComponent(fileUrl)
    console.log("[v0] Downloading file:", decodedUrl.substring(0, 100))
    
    // Fetch the file from Vercel Blob storage
    const response = await fetch(decodedUrl, {
      method: "GET",
    })

    if (!response.ok) {
      console.error("[v0] Fetch failed:", response.status, response.statusText)
      throw new Error(`Failed to fetch file: ${response.statusText}`)
    }

    // Get the blob data
    const blob = await response.blob()
    console.log("[v0] Blob size:", blob.size, "Blob type:", blob.type)

    // Return the file as binary with proper download headers
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": blob.type || "application/octet-stream",
        "Content-Disposition": filename ? `attachment; filename="${filename}"` : "attachment",
        "Content-Length": blob.size.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("[v0] Download error:", error instanceof Error ? error.message : String(error))
    return new NextResponse("Failed to process download", { status: 500 })
  }
}

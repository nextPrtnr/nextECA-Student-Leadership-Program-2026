import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const fileUrl = request.nextUrl.searchParams.get("url")
  const adminKey = request.headers.get("x-admin-key")

  // Verify admin key
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  if (!fileUrl) {
    return new NextResponse("Missing file URL", { status: 400 })
  }

  try {
    // Fetch the file from Vercel Blob
    const response = await fetch(fileUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`)
    }

    const blob = await response.blob()
    
    // Determine filename from URL
    const urlObj = new URL(fileUrl)
    const pathname = urlObj.pathname
    const filename = pathname.split("/").pop() || "download"

    // Return the file with appropriate headers
    return new NextResponse(blob, {
      headers: {
        "Content-Type": blob.type || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("[v0] Download error:", error)
    return new NextResponse("Failed to download file", { status: 500 })
  }
}

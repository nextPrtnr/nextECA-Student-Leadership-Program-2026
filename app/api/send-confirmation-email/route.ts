import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import { ConfirmationEmail } from "@/components/emails/confirmation"
import React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, university, facebook, city, submissionDate } = body

    if (!email || !fullName || !university) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log("[v0] Sending confirmation email to:", email)

    // Render the email component to HTML
    const emailContent = React.createElement(ConfirmationEmail, {
      fullName,
      email,
      university,
      facebook,
      city,
      submissionDate,
    })

    // Send email using Resend
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Welcome to next ECA! 🎉 Your Application Has Been Received",
      react: emailContent,
    })

    if (response.error) {
      console.error("[v0] Email send error:", response.error)
      return NextResponse.json(
        { error: "Failed to send email", details: response.error },
        { status: 500 }
      )
    }

    console.log("[v0] Email sent successfully:", response.data?.id)
    return NextResponse.json({
      success: true,
      messageId: response.data?.id,
    })
  } catch (error) {
    console.error("[v0] Email API error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

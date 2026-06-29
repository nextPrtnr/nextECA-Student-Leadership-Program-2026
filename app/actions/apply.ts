"use server"

import { db } from "@/lib/db"
import { ambassadorApplications } from "@/lib/db/schema"

export type ApplyState = {
  success: boolean
  message: string
  errors?: Record<string, string>
}

function str(formData: FormData, key: string) {
  const v = formData.get(key)
  return typeof v === "string" ? v.trim() : ""
}

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const fullName = str(formData, "fullName")
  const email = str(formData, "email")
  const phone = str(formData, "phone")
  const university = str(formData, "university")
  const whyJoin = str(formData, "whyJoin")

  const errors: Record<string, string> = {}
  if (!fullName) errors.fullName = "Please enter your full name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address."
  if (!phone) errors.phone = "Please enter your phone number."
  if (!university) errors.university = "Please enter your university."
  if (whyJoin.length < 30) errors.whyJoin = "Tell us a bit more (at least 30 characters)."

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the highlighted fields.", errors }
  }

  try {
    await db.insert(ambassadorApplications).values({
      fullName,
      email,
      phone,
      university,
      fieldOfStudy: str(formData, "fieldOfStudy") || null,
      yearOfStudy: str(formData, "yearOfStudy") || null,
      city: str(formData, "city") || null,
      linkedin: str(formData, "linkedin") || null,
      socialHandle: str(formData, "socialHandle") || null,
      whyJoin,
      experience: str(formData, "experience") || null,
      hoursPerWeek: str(formData, "hoursPerWeek") || null,
      hearAbout: str(formData, "hearAbout") || null,
    })
  } catch (err) {
    console.log("[v0] submitApplication error:", err)
    return { success: false, message: "Something went wrong. Please try again." }
  }

  return {
    success: true,
    message: "Your application has been received. Welcome to the next ECA journey!",
  }
}

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

function orNull(formData: FormData, key: string) {
  return str(formData, key) || null
}

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const fullName = str(formData, "fullName")
  const email = str(formData, "email")
  const phone = str(formData, "phone")
  const facebook = str(formData, "facebook")
  const city = str(formData, "city")
  const university = str(formData, "university")
  const fieldOfStudy = str(formData, "fieldOfStudy")
  const yearOfStudy = str(formData, "yearOfStudy")
  const graduationYear = str(formData, "graduationYear")
  const aboutYou = str(formData, "aboutYou")
  const whyJoin = str(formData, "whyJoin")
  const representImpact = str(formData, "representImpact")
  const willingEvents = str(formData, "willingEvents")
  const futureLeadership = str(formData, "futureLeadership")
  const confirmAccurate = formData.get("confirmAccurate") === "on"
  const agreeGuidelines = formData.get("agreeGuidelines") === "on"

  const errors: Record<string, string> = {}
  if (!fullName) errors.fullName = "Please enter your full name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address."
  if (!phone) errors.phone = "Please enter your phone number."
  if (!facebook) errors.facebook = "Please share your Facebook profile."
  if (!city) errors.city = "Please enter your city."
  if (!university) errors.university = "Please enter your university."
  if (!fieldOfStudy) errors.fieldOfStudy = "Please enter your department."
  if (!yearOfStudy) errors.yearOfStudy = "Please enter your current year/semester."
  if (!graduationYear) errors.graduationYear = "Please enter your graduation year."
  if (aboutYou.length < 20) errors.aboutYou = "Tell us a little more about yourself."
  if (whyJoin.length < 30) errors.whyJoin = "Tell us a bit more (at least 30 characters)."
  if (representImpact.length < 20) errors.representImpact = "Please share how you'd create impact."
  if (!willingEvents) errors.willingEvents = "Please select an option."
  if (!futureLeadership) errors.futureLeadership = "Please select an option."
  if (!confirmAccurate) errors.confirmAccurate = "Please confirm your information is accurate."
  if (!agreeGuidelines) errors.agreeGuidelines = "Please agree to the Community Guidelines."

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the highlighted fields.", errors }
  }

  try {
    await db.insert(ambassadorApplications).values({
      fullName,
      email,
      phone,
      facebook,
      linkedin: orNull(formData, "linkedin"),
      instagram: orNull(formData, "instagram"),
      city,
      university,
      fieldOfStudy,
      yearOfStudy,
      graduationYear,
      studentIdUrl: orNull(formData, "studentIdUrl"),
      aboutYou,
      whyJoin,
      leadershipExperience: orNull(formData, "leadershipExperience"),
      extracurricular: orNull(formData, "extracurricular"),
      representImpact,
      willingEvents,
      justifyEvents: orNull(formData, "justifyEvents"),
      hoursPerWeek: orNull(formData, "hoursPerWeek"),
      futureLeadership,
      interestArea: orNull(formData, "interestArea"),
      goldenQuestion: orNull(formData, "goldenQuestion"),
      resumeUrl: orNull(formData, "resumeUrl"),
      profilePhotoUrl: orNull(formData, "profilePhotoUrl"),
      tshirtSize: orNull(formData, "tshirtSize"),
      tshirtColor: orNull(formData, "tshirtColor"),
      hearAbout: orNull(formData, "hearAbout"),
      referralName: orNull(formData, "referralName"),
      aiUsage: orNull(formData, "aiUsage"),
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

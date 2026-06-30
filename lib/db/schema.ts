import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const ambassadorApplications = pgTable("ambassador_applications", {
  id: serial("id").primaryKey(),
  // Section 1 — Personal & Academic
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  facebook: text("facebook"),
  linkedin: text("linkedin"),
  instagram: text("instagram"),
  city: text("city"),
  university: text("university").notNull(),
  fieldOfStudy: text("field_of_study"),
  yearOfStudy: text("year_of_study"),
  graduationYear: text("graduation_year"),
  studentIdUrl: text("student_id_url"),
  // Section 2 — About You
  aboutYou: text("about_you"),
  whyJoin: text("why_join").notNull(),
  leadershipExperience: text("leadership_experience"),
  extracurricular: text("extracurricular"),
  // Section 3 — Ambassador Fit
  representImpact: text("represent_impact"),
  willingEvents: text("willing_events"),
  justifyEvents: text("justify_events"),
  hoursPerWeek: text("hours_per_week"),
  futureLeadership: text("future_leadership"),
  interestArea: text("interest_area"),
  goldenQuestion: text("golden_question"),
  // Section 4 — Attachments & Preferences
  resumeUrl: text("resume_url"),
  profilePhotoUrl: text("profile_photo_url"),
  tshirtSize: text("tshirt_size"),
  tshirtColor: text("tshirt_color"),
  // Section 5 — Final Step
  hearAbout: text("hear_about"),
  referralName: text("referral_name"),
  aiUsage: text("ai_usage"),
  // legacy / meta
  experience: text("experience"),
  socialHandle: text("social_handle"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

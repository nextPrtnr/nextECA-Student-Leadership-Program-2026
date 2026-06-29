import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const ambassadorApplications = pgTable("ambassador_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  university: text("university").notNull(),
  fieldOfStudy: text("field_of_study"),
  yearOfStudy: text("year_of_study"),
  city: text("city"),
  linkedin: text("linkedin"),
  socialHandle: text("social_handle"),
  whyJoin: text("why_join").notNull(),
  experience: text("experience"),
  hoursPerWeek: text("hours_per_week"),
  hearAbout: text("hear_about"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

"use client"

import { useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import {
  CheckCircle2,
  Loader2,
  Send,
  Clock,
  User,
  Heart,
  Sparkles,
  Paperclip,
  Flag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { submitApplication, type ApplyState } from "@/app/actions/apply"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Reveal } from "@/components/reveal"
import { FileUpload } from "@/components/file-upload"
import { cn } from "@/lib/utils"

const initialState: ApplyState = { success: false, message: "" }

const inputClass = "rounded-xl"
const textareaClass = "rounded-xl resize-none"

const TOTAL_STEPS = 5

const STEP_META: { title: string }[] = [
  { title: "Personal & Academic" },
  { title: "About You" },
  { title: "Ambassador Fit" },
  { title: "Attachments" },
  { title: "Final Step" },
]

// Required fields per step — used for client-side validation before advancing.
const STEP_REQUIRED: Record<number, string[]> = {
  1: ["fullName", "email", "phone", "facebook", "city", "university", "fieldOfStudy", "yearOfStudy", "graduationYear"],
  2: ["aboutYou", "whyJoin"],
  3: ["representImpact", "willingEvents", "futureLeadership"],
  4: [],
  5: ["confirmAccurate", "agreeGuidelines"],
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id?: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-primary"> *</span>}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

function CharCountField({
  id,
  name,
  label,
  minChars,
  placeholder,
  error,
}: {
  id: string
  name: string
  label: string
  minChars: number
  placeholder?: string
  error?: string
}) {
  const [charCount, setCharCount] = useState(0)
  const isSufficient = charCount >= minChars

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-baseline">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          <span className="text-primary"> *</span>
        </Label>
        <span className={`text-xs font-medium ${isSufficient ? "text-green-600" : "text-muted-foreground"}`}>
          {charCount}/{minChars}
        </span>
      </div>
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        className={cn(textareaClass, error && "border-destructive focus:ring-destructive/20")}
        onChange={(e) => setCharCount(e.target.value.trim().length)}
        onBlur={(e) => setCharCount(e.target.value.trim().length)}
      />
      {!isSufficient && charCount > 0 && (
        <p className="text-xs text-amber-600">Need {minChars - charCount} more characters</p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

function SectionHeader({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: number
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>
        <h3 className="mt-0.5 font-heading text-xl font-bold">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function NativeSelect({
  id,
  name,
  options,
  defaultLabel = "Select an option",
}: {
  id: string
  name: string
  options: string[]
  defaultLabel?: string
}) {
  return (
    <select
      id={id}
      name={name}
      defaultValue=""
      className={cn(
        "h-10 w-full appearance-none rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22></polyline></svg>')] bg-[right_0.75rem_center] bg-no-repeat pr-9",
      )}
    >
      <option value="" disabled>
        {defaultLabel}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

function RadioPills({
  name,
  options,
}: {
  name: string
  options: string[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label
          key={o}
          className="group flex cursor-pointer items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm transition-colors hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary has-[:checked]:font-medium"
        >
          <input type="radio" name={name} value={o} className="sr-only" />
          <span
            className="size-3.5 rounded-full border border-muted-foreground/40 transition-colors group-has-[:checked]:border-primary group-has-[:checked]:bg-primary group-has-[:checked]:ring-2 group-has-[:checked]:ring-inset group-has-[:checked]:ring-background"
            aria-hidden
          />
          {o}
        </label>
      ))}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending} className="rounded-full text-base">
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <Send className="size-4" />
          Submit Application
        </>
      )}
    </Button>
  )
}

export function Apply() {
  const [state, formAction] = useActionState(submitApplication, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const allErrors = { ...(state.errors ?? {}), ...clientErrors }

  // Min character requirements for text fields
  const MIN_CHARS = { aboutYou: 20, whyJoin: 30, representImpact: 20 }

  // Validate the required fields for a given step using current form values.
  function validateStep(step: number): Record<string, string> {
    const form = formRef.current
    const errs: Record<string, string> = {}
    if (!form) return errs
    for (const field of STEP_REQUIRED[step]) {
      const els = form.elements.namedItem(field)
      let value = ""
      let checked = false
      if (els instanceof RadioNodeList) {
        value = els.value ?? ""
      } else if (els instanceof HTMLInputElement) {
        if (els.type === "checkbox") checked = els.checked
        else value = els.value
      } else if (els instanceof HTMLTextAreaElement || els instanceof HTMLSelectElement) {
        value = els.value
      }
      if (field === "confirmAccurate" || field === "agreeGuidelines") {
        if (!checked) errs[field] = "Please confirm to continue."
      } else if (value.trim() === "") {
        errs[field] = "This field is required."
      } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errs[field] = "Please enter a valid email."
      } else if (field in MIN_CHARS) {
        const minLen = MIN_CHARS[field as keyof typeof MIN_CHARS]
        if (value.trim().length < minLen) {
          errs[field] = `Please write at least ${minLen} characters.`
        }
      }
    }
    return errs
  }

  function scrollToTop() {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function handleNext() {
    const errs = validateStep(currentStep)
    if (Object.keys(errs).length > 0) {
      setClientErrors(errs)
      return
    }
    setClientErrors({})
    setCurrentStep((s) => Math.min(TOTAL_STEPS, s + 1))
    scrollToTop()
  }

  function handleBack() {
    setClientErrors({})
    setCurrentStep((s) => Math.max(1, s - 1))
    scrollToTop()
  }

  // Prevent Enter in text inputs from submitting the whole form mid-wizard.
  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement
    if (
      e.key === "Enter" &&
      target.tagName === "INPUT" &&
      !(e.nativeEvent as any).isComposing &&
      (e.nativeEvent as any).keyCode !== 229
    ) {
      e.preventDefault()
      if (currentStep < TOTAL_STEPS) handleNext()
    }
  }

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      setCurrentStep(1)
      setClientErrors({})
      scrollToTop()
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      // Convert server errors to client errors so form data persists
      setClientErrors(state.errors)
      // Jump to the earliest step that has a server-reported error.
      const firstStep = [1, 2, 3, 4, 5].find((st) =>
        STEP_REQUIRED[st].some((f) => state.errors?.[f]),
      )
      if (firstStep) setCurrentStep(firstStep)
      scrollToTop()
    }
  }, [state])

  if (state.success) {
    return (
      <section id="apply" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-8" />
              </span>
              <h2 className="mt-6 font-heading text-2xl font-bold text-balance">
                Thank you for applying!
              </h2>
              <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground text-pretty">
                <p>Thank you for your interest in becoming a next ECA Campus Ambassador.</p>
                <p>
                  We value authenticity, curiosity, leadership and a genuine desire to help others
                  discover opportunities.
                </p>
                <p className="font-medium text-foreground">
                  Good luck—we hope to welcome you to the next ECA community.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-28" style={{ paddingTop: '42px' }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Clock className="size-3.5 text-primary" />
              Application takes around 10–15 minutes.
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Become a next ECA Campus Ambassador
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              Tell us your story. Fields marked with an asterisk
              <span className="text-primary"> *</span> are required.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <form
            ref={formRef}
            action={formAction}
            onKeyDown={handleKeyDown}
            className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
          >
            {/* Step progress */}
            <div className="sticky top-16 z-10 border-b border-border bg-card px-6 py-4 shadow-sm sm:px-8">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-primary">
                  Step {currentStep} of {TOTAL_STEPS}
                </span>
                <span className="text-muted-foreground">{STEP_META[currentStep - 1].title}</span>
              </div>
              <div className="mt-2 flex gap-1.5">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
                  <div
                    key={n}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors duration-500",
                      n <= currentStep ? "bg-primary" : "bg-muted",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 pt-16 sm:p-8 sm:pt-20">
              {/* SECTION 1 */}
              <div
                className={cn(
                  "flex flex-col gap-5",
                  currentStep === 1 ? "animate-in fade-in slide-in-from-right-4 duration-300" : "hidden",
                )}
              >
                <SectionHeader
                  step={1}
                  icon={User}
                  title="Personal & Academic Information"
                  description="Tell us a little about yourself."
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="fullName" label="Full name" required error={allErrors.fullName}>
                    <Input id="fullName" name="fullName" placeholder="Jane Doe" className={inputClass} />
                  </Field>
                  <Field id="email" label="Email address" required error={allErrors.email}>
                    <Input id="email" name="email" type="email" placeholder="jane@email.com" className={inputClass} />
                  </Field>
                  <Field id="phone" label="Phone / WhatsApp" required error={allErrors.phone}>
                    <Input id="phone" name="phone" placeholder="+880 1XXXXXXXXX" className={inputClass} />
                  </Field>
                  <Field id="facebook" label="Facebook profile" required error={allErrors.facebook}>
                    <Input id="facebook" name="facebook" placeholder="facebook.com/you" className={inputClass} />
                  </Field>
                  <Field id="linkedin" label="LinkedIn profile" hint="Optional but preferred.">
                    <Input id="linkedin" name="linkedin" placeholder="linkedin.com/in/you" className={inputClass} />
                  </Field>
                  <Field id="instagram" label="Instagram profile" hint="Optional.">
                    <Input id="instagram" name="instagram" placeholder="@yourhandle" className={inputClass} />
                  </Field>
                  <Field id="city" label="City" required error={allErrors.city}>
                    <Input id="city" name="city" placeholder="Your city" className={inputClass} />
                  </Field>
                  <Field id="university" label="University / College" required error={allErrors.university}>
                    <Input id="university" name="university" placeholder="University name" className={inputClass} />
                  </Field>
                  <Field id="fieldOfStudy" label="Department / Field of study" required error={allErrors.fieldOfStudy}>
                    <Input id="fieldOfStudy" name="fieldOfStudy" placeholder="e.g. Computer Science" className={inputClass} />
                  </Field>
                  <Field id="yearOfStudy" label="Current semester / year" required error={allErrors.yearOfStudy}>
                    <Input id="yearOfStudy" name="yearOfStudy" placeholder="e.g. 3rd Semester" className={inputClass} />
                  </Field>
                  <Field id="graduationYear" label="Expected graduation / passing year" required error={allErrors.graduationYear}>
                    <Input id="graduationYear" name="graduationYear" placeholder="e.g. 2027" className={inputClass} />
                  </Field>
                  <Field label="Upload Student ID Card" hint="Optional. Preferred for student verification. Max 3 MB.">
                    <FileUpload name="studentIdUrl" accept="image/*,.pdf" label="Upload Student ID (max 3 MB)" maxSizeMB={3} />
                  </Field>
                </div>
              </div>

              {/* SECTION 2 */}
              <div
                className={cn(
                  "flex flex-col gap-5",
                  currentStep === 2 ? "animate-in fade-in slide-in-from-right-4 duration-300" : "hidden",
                )}
              >
                <SectionHeader
                  step={2}
                  icon={Heart}
                  title="About You"
                  description="We'd love to know you beyond your academic profile."
                />
                <CharCountField
                  id="aboutYou"
                  name="aboutYou"
                  label="Tell us about yourself"
                  minChars={20}
                  placeholder="A short introduction—who you are, what drives you..."
                  error={allErrors.aboutYou}
                />
                <CharCountField
                  id="whyJoin"
                  name="whyJoin"
                  label="Why do you want to join the next ECA Student Leadership Program?"
                  minChars={30}
                  placeholder="Share what motivates you to lead and create impact..."
                  error={allErrors.whyJoin}
                />
                <Field id="leadershipExperience" label="Relevant leadership / club / volunteering / event experience" hint="Optional.">
                  <Textarea id="leadershipExperience" name="leadershipExperience" rows={3} placeholder="Tell us about any leadership or community experience." className={textareaClass} />
                </Field>
                <Field id="extracurricular" label="Extracurricular activities" hint="Optional.">
                  <Textarea id="extracurricular" name="extracurricular" rows={3} placeholder="Sports, arts, competitions, anything you enjoy." className={textareaClass} />
                </Field>
              </div>

              {/* SECTION 3 */}
              <div
                className={cn(
                  "flex flex-col gap-5",
                  currentStep === 3 ? "animate-in fade-in slide-in-from-right-4 duration-300" : "hidden",
                )}
              >
                <SectionHeader
                  step={3}
                  icon={Sparkles}
                  title="Ambassador Fit & Future Opportunities"
                  description="Help us understand how you'd contribute to the community."
                />
                <CharCountField
                  id="representImpact"
                  name="representImpact"
                  label="How would you represent next ECA online & offline and create real impact?"
                  minChars={20}
                  placeholder="Share your ideas for representing next ECA and making an impact."
                  error={allErrors.representImpact}
                />
                <Field label="Would you be willing to organize or support campus events with next ECA?" required error={allErrors.willingEvents}>
                  <RadioPills name="willingEvents" options={["Yes", "Maybe", "Not at the moment"]} />
                </Field>
                <Field id="justifyEvents" label="Please justify your previous answer." hint="Optional.">
                  <Textarea id="justifyEvents" name="justifyEvents" rows={3} placeholder="A sentence or two is plenty." className={textareaClass} />
                </Field>
                <Field id="hoursPerWeek" label="Weekly commitment">
                  <NativeSelect
                    id="hoursPerWeek"
                    name="hoursPerWeek"
                    options={["2–4 Hours", "4–6 Hours", "6–8 Hours", "8+ Hours"]}
                  />
                </Field>
                <Field label="Do you enjoy leadership and want future leadership opportunities within next ECA?" required error={allErrors.futureLeadership}>
                  <RadioPills name="futureLeadership" options={["Yes", "Maybe", "Not right now"]} />
                </Field>
                <Field id="interestArea" label="Which area interests you the most for future opportunities?">
                  <NativeSelect
                    id="interestArea"
                    name="interestArea"
                    options={[
                      "Technology & Development",
                      "Marketing & Community",
                      "Events & Operations",
                      "Design & Creative",
                      "Research & Strategy",
                      "Open to Any Opportunity",
                      "Other",
                    ]}
                  />
                </Field>
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <Field
                    id="goldenQuestion"
                    label="Golden question"
                    hint="There are no right or wrong answers—we simply want to understand how you think."
                  >
                    <p className="mb-2 text-sm text-foreground">
                      Imagine you&apos;re the CEO of next ECA for one day. What&apos;s ONE thing you
                      would introduce or improve to help more students discover opportunities or build
                      a stronger student community?
                    </p>
                    <Textarea id="goldenQuestion" name="goldenQuestion" rows={4} placeholder="Dream big—we're listening." className={cn(textareaClass, "bg-card")} />
                  </Field>
                </div>
              </div>

              {/* SECTION 4 */}
              <div
                className={cn(
                  "flex flex-col gap-5",
                  currentStep === 4 ? "animate-in fade-in slide-in-from-right-4 duration-300" : "hidden",
                )}
              >
                <SectionHeader
                  step={4}
                  icon={Paperclip}
                  title="Attachments & Preferences"
                  description="Optional information that helps us better support our ambassadors."
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Upload Resume / CV" hint="Optional. Max 3 MB.">
                    <FileUpload name="resumeUrl" accept=".pdf,.doc,.docx" label="Upload Resume / CV (max 3 MB)" maxSizeMB={3} />
                  </Field>
                  <Field label="Upload Profile Photo" hint="Optional. Max 4 MB.">
                    <FileUpload name="profilePhotoUrl" accept="image/*" label="Upload Profile Photo (max 4 MB)" maxSizeMB={4} />
                  </Field>
                </div>
                <p className="rounded-xl bg-muted/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  This helps us identify ambassadors for internal records and official documents. To
                  respect privacy, next ECA does not publicly use girls&apos; photos in announcements
                  or promotional materials.
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="tshirtSize" label="T-shirt size" hint="For future gifts / goodies.">
                    <NativeSelect id="tshirtSize" name="tshirtSize" options={["XS", "S", "M", "L", "XL", "XXL"]} />
                  </Field>
                  <Field id="tshirtColor" label="Preferred T-shirt color">
                    <NativeSelect
                      id="tshirtColor"
                      name="tshirtColor"
                      options={["Black", "White", "Green", "Red", "Gray", "No Preference"]}
                    />
                  </Field>
                </div>
              </div>

              {/* SECTION 5 */}
              <div
                className={cn(
                  "flex flex-col gap-5",
                  currentStep === 5 ? "animate-in fade-in slide-in-from-right-4 duration-300" : "hidden",
                )}
              >
                <SectionHeader
                  step={5}
                  icon={Flag}
                  title="Final Step"
                  description="You're almost done."
                />
                <Field id="hearAbout" label="How did you hear about this program?">
                  <NativeSelect
                    id="hearAbout"
                    name="hearAbout"
                    options={[
                      "next ECA Facebook Page",
                      "next ECA Facebook Group",
                      "Instagram",
                      "LinkedIn",
                      "Facebook Advertisement",
                      "Friend",
                      "University Club",
                      "Campus Ambassador",
                      "Other",
                    ]}
                  />
                </Field>
                <Field id="referralName" label="Referral name / organization" hint="Optional.">
                  <Input id="referralName" name="referralName" placeholder="Who referred you?" className={inputClass} />
                </Field>
                <Field
                  id="aiUsage"
                  label="Did you use AI while writing your answers?"
                  hint="We're not against AI—we simply value honesty."
                >
                  <NativeSelect
                    id="aiUsage"
                    name="aiUsage"
                    options={[
                      "I wrote everything myself.",
                      "Grammar / proofreading only.",
                      "Ideas or structure.",
                      "Drafted some parts.",
                      "Most of my answers were AI-assisted.",
                    ]}
                  />
                </Field>

                <div className="flex flex-col gap-3 pt-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm">
                    <input type="checkbox" name="confirmAccurate" className="mt-0.5 size-4 accent-primary" />
                    <span className={cn(allErrors.confirmAccurate && "text-destructive")}>
                      I confirm all information provided is accurate.
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-sm">
                    <input type="checkbox" name="agreeGuidelines" className="mt-0.5 size-4 accent-primary" />
                    <span className={cn(allErrors.agreeGuidelines && "text-destructive")}>
                      I agree to follow the{" "}
                      <a href="/community-guidelines" target="_blank" className="font-medium text-primary underline underline-offset-2">
                        next ECA Community Guidelines
                      </a>{" "}
                      and understand that next ECA reserves the right to terminate participants who
                      violate these guidelines.
                    </span>
                  </label>
                </div>
              </div>

              {state.message && !state.success && (
                <p className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {state.message}
                </p>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 border-t border-border bg-secondary/30 px-6 py-5 sm:px-8">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack} className="rounded-full">
                  <ChevronLeft className="size-4" />
                  Back
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Your progress is kept as you move between steps.
                </span>
              )}
              <div className="ml-auto">
                {currentStep < TOTAL_STEPS ? (
                  <Button type="button" onClick={handleNext} className="rounded-full">
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <SubmitButton />
                )}
              </div>
            </div>
          </form>
          {currentStep === TOTAL_STEPS && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By applying you agree to be contacted by the next ECA team about the program.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}

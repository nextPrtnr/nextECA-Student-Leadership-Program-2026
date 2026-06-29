"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { submitApplication, type ApplyState } from "@/app/actions/apply"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const initialState: ApplyState = { success: false, message: "" }

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full rounded-full text-base">
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <Send className="size-4" />
          Submit application
        </>
      )}
    </Button>
  )
}

const inputClass = "rounded-xl"

export function Apply() {
  const [state, formAction] = useActionState(submitApplication, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const errors = state.errors ?? {}

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  if (state.success) {
    return (
      <section id="apply" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 className="mt-6 font-heading text-2xl font-bold">Application received!</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">{state.message}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Our team will review your application and reach out via email. Keep an eye on your inbox.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Apply here</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Become a next ECA Campus Ambassador
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              Fill out the form below. Fields marked with an asterisk are required.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <form
            ref={formRef}
            action={formAction}
            className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="fullName" label="Full name" required error={errors.fullName}>
                <Input id="fullName" name="fullName" placeholder="Jane Doe" className={inputClass} />
              </Field>
              <Field id="email" label="Email" required error={errors.email}>
                <Input id="email" name="email" type="email" placeholder="jane@email.com" className={inputClass} />
              </Field>
              <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
                <Input id="phone" name="phone" placeholder="+1 234 567 890" className={inputClass} />
              </Field>
              <Field id="city" label="City">
                <Input id="city" name="city" placeholder="Your city" className={inputClass} />
              </Field>
              <Field id="university" label="University / College" required error={errors.university}>
                <Input id="university" name="university" placeholder="University name" className={inputClass} />
              </Field>
              <Field id="fieldOfStudy" label="Field of study">
                <Input id="fieldOfStudy" name="fieldOfStudy" placeholder="e.g. Computer Science" className={inputClass} />
              </Field>
              <Field id="yearOfStudy" label="Year of study">
                <Input id="yearOfStudy" name="yearOfStudy" placeholder="e.g. 2nd year" className={inputClass} />
              </Field>
              <Field id="hoursPerWeek" label="Hours you can commit / week">
                <Input id="hoursPerWeek" name="hoursPerWeek" placeholder="e.g. 4-6 hours" className={inputClass} />
              </Field>
              <Field id="linkedin" label="LinkedIn profile">
                <Input id="linkedin" name="linkedin" placeholder="linkedin.com/in/you" className={inputClass} />
              </Field>
              <Field id="socialHandle" label="Instagram / social handle">
                <Input id="socialHandle" name="socialHandle" placeholder="@yourhandle" className={inputClass} />
              </Field>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              <Field id="whyJoin" label="Why do you want to join next ECA?" required error={errors.whyJoin}>
                <Textarea
                  id="whyJoin"
                  name="whyJoin"
                  rows={4}
                  placeholder="Share what motivates you to lead and create impact on your campus..."
                  className={cn(inputClass, "resize-none")}
                />
              </Field>
              <Field id="experience" label="Relevant experience (leadership, clubs, events)">
                <Textarea
                  id="experience"
                  name="experience"
                  rows={3}
                  placeholder="Tell us about any leadership or community experience (optional)."
                  className={cn(inputClass, "resize-none")}
                />
              </Field>
              <Field id="hearAbout" label="How did you hear about us?">
                <Input id="hearAbout" name="hearAbout" placeholder="e.g. Instagram, a friend, my club" className={inputClass} />
              </Field>
            </div>

            {state.message && !state.success && (
              <p className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {state.message}
              </p>
            )}

            <div className="mt-7">
              <SubmitButton />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                By applying you agree to be contacted by the next ECA team about the program.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

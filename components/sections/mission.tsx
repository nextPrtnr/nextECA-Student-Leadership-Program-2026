import { Quote } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function Mission() {
  return (
    <section id="mission" className="scroll-mt-20 py-20 sm:py-28" style={{ paddingTop: '23px', paddingBottom: '0px' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-primary px-6 py-14 text-primary-foreground sm:px-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/30 blur-3xl"
            />
            <Quote className="size-10 text-accent" />
            <p className="mt-6 font-heading text-2xl font-semibold leading-snug text-balance sm:text-3xl">
              Every year, countless students miss opportunities that could change their careers —
              not because they lack talent, but because they never knew those opportunities existed.
              At next ECA, we&apos;re changing that.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 text-pretty">
              As a Campus Ambassador, you won&apos;t just represent a platform — you&apos;ll become a
              catalyst for your campus, connecting students with opportunities that can shape their
              future. If you believe leadership is about creating opportunities for others, we&apos;d
              love to have you on this journey.
            </p>
            <p className="mt-8 font-heading text-lg font-bold">
              next ECA — For the Community. By the Community.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

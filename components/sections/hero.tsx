import { ArrowRight, Sparkles, Star, Users, Award } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const STATS = [
  { icon: Users, value: "Campus", label: "Communities" },
  { icon: Award, value: "Certified", label: "Leadership" },
  { icon: Star, value: "Real", label: "Impact" },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <Sparkles className="size-4 text-primary" />
              next ECA Student Leadership Program
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Become a{" "}
              <span className="text-primary">Campus Ambassador</span> and lead the change.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Represent next ECA at your university, connect students with competitions,
              hackathons, Olympiads and scholarships, and grow as a leader while creating real
              impact on your campus.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#apply"
                className={cn(buttonVariants({ size: "lg" }), "group rounded-full text-base")}
              >
                Apply now
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#benefits"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-full text-base",
                )}
              >
                Explore the benefits
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                  <s.icon className="size-5 text-primary" />
                  <dt className="mt-2 font-heading text-lg font-bold leading-none">{s.value}</dt>
                  <dd className="text-sm text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-ambassadors.png"
              alt="next ECA campus ambassadors collaborating on campus"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>

          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:-left-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Award className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Official Certificate</p>
              <p className="text-xs text-muted-foreground">+ Recommendation Letter</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

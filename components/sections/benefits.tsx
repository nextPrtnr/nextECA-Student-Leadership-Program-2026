import {
  BadgeCheck,
  ThumbsUp,
  FileText,
  Medal,
  Megaphone,
  Briefcase,
  Network,
  Ticket,
  Compass,
  Gift,
  TrendingUp,
} from "lucide-react"
import { Reveal } from "@/components/reveal"

const BENEFITS = [
  { icon: BadgeCheck, title: "Official Certificate", body: "Certificate of Completion recognizing your contribution." },
  { icon: ThumbsUp, title: "LinkedIn Recommendation", body: "For outstanding contributors to the program." },
  { icon: FileText, title: "Recommendation Letter", body: "Performance-based, for higher studies and careers." },
  { icon: Medal, title: "Top Performer Recognition", body: "Monthly recognition for standout ambassadors." },
  { icon: Megaphone, title: "Social Media Shout-outs", body: "Featured across next ECA's platforms." },
  { icon: Briefcase, title: "Priority for Core Roles", body: "Future core team positions, internships and leadership roles." },
  { icon: Network, title: "Valuable Networking", body: "Connect with students, clubs, founders and professionals." },
  { icon: Ticket, title: "Priority Access", body: "Discounted access to workshops, seminars and events." },
  { icon: Compass, title: "Personal Guidance", body: "For hackathons, Olympiads and your extracurricular journey." },
  { icon: Gift, title: "Exclusive Goodies", body: "Merchandise and goodies for top performers." },
  { icon: TrendingUp, title: "Affiliate Incentives", body: "Future performance-based commissions as next ECA grows." },
]

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Your benefits
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Join a growing community of student leaders
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              Being a next ECA Campus Ambassador comes with rewards that grow your profile, network
              and future opportunities.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 80}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <b.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold leading-tight">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

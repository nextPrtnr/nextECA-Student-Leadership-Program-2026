import { Megaphone, Handshake, CalendarDays, Trophy, MessageSquareHeart } from "lucide-react"
import { Reveal } from "@/components/reveal"

const ITEMS = [
  {
    icon: Megaphone,
    title: "Promote Opportunities",
    body: "Introduce next ECA to students on your campus and share opportunities, updates and initiatives through your university communities and social platforms.",
  },
  {
    icon: Handshake,
    title: "Build Partnerships",
    body: "Connect next ECA with student clubs, organizations and campus communities, and help establish collaborations that benefit everyone.",
  },
  {
    icon: CalendarDays,
    title: "Lead Campus Initiatives",
    body: "Support or organize seminars, workshops, info sessions, hackathons and meetups while gaining hands-on leadership experience.",
  },
  {
    icon: Trophy,
    title: "Spotlight Campus Success",
    body: "Discover inspiring student achievements, events and success stories, and share them with the team to celebrate and inspire others.",
  },
  {
    icon: MessageSquareHeart,
    title: "Be the Voice of Your Campus",
    body: "Collect feedback from students and clubs and help us continuously improve by sharing ideas from your campus community.",
  },
]

export function Responsibilities() {
  return (
    <section id="responsibilities" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-28" style={{ paddingTop: '19px', paddingBottom: '41px' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Your responsibilities
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Here&apos;s what you&apos;ll do as a Campus Ambassador
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 90}>
              <article className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={180}>
            <div className="flex h-full flex-col justify-center gap-3 rounded-3xl border border-primary/30 bg-primary p-7 text-primary-foreground">
              <h3 className="font-heading text-xl font-bold text-balance">
                Ready to make a difference on your campus?
              </h3>
              <p className="text-sm leading-relaxed text-primary-foreground/85">
                Take the first step toward becoming a student leader.
              </p>
              <a
                href="#apply"
                className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02]"
              >
                Apply now
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { Compass, Users2, Rocket } from "lucide-react"
import { Reveal } from "@/components/reveal"

const POINTS = [
  {
    icon: Compass,
    title: "Discover Opportunities",
    body: "Help students find competitions, hackathons, Olympiads, scholarships and other valuable extracurriculars they would otherwise miss.",
  },
  {
    icon: Users2,
    title: "Build Community",
    body: "Connect clubs, organizations and campus communities, and grow a stronger innovation ecosystem at your university.",
  },
  {
    icon: Rocket,
    title: "Grow as a Leader",
    body: "Develop leadership, communication and event-management skills while expanding your network and creating real impact.",
  },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28" style={{ paddingTop: '20px', paddingBottom: '25px' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              About the program
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              This isn&apos;t just another ambassador program
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              It&apos;s a chance to develop leadership, expand your network, and create real impact.
              Whether you&apos;re passionate about leadership, community building, entrepreneurship or
              innovation, this program helps you grow personally and professionally.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ShieldCheck, Heart, Users, Megaphone, Lock, AlertTriangle } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Community Guidelines | next ECA Student Leadership Program",
  description:
    "The values and expectations every next ECA Campus Ambassador agrees to uphold — respect, integrity, privacy and a genuine commitment to the student community.",
}

const PRINCIPLES = [
  {
    icon: Heart,
    title: "Lead with respect",
    body: "Treat every student, partner and team member with kindness and dignity. Harassment, discrimination, hate speech or bullying of any kind has no place in our community.",
  },
  {
    icon: ShieldCheck,
    title: "Act with integrity",
    body: "Represent next ECA honestly. Never misrepresent the program, share false information, or make promises on behalf of next ECA without approval.",
  },
  {
    icon: Users,
    title: "Serve the community",
    body: "Your role is to help fellow students discover opportunities. Prioritise genuine value and support over personal gain, vanity metrics or self-promotion.",
  },
  {
    icon: Megaphone,
    title: "Communicate responsibly",
    body: "Use official, approved messaging when promoting competitions, hackathons and scholarships. Avoid spam, misleading claims and unverified information.",
  },
  {
    icon: Lock,
    title: "Respect privacy",
    body: "Protect the personal data of students you interact with. To respect privacy, next ECA does not publicly use girls' photos in announcements or promotional materials, and ambassadors must follow the same standard.",
  },
  {
    icon: AlertTriangle,
    title: "Uphold the brand",
    body: "Do not use the next ECA name or logo for unauthorised activities, fundraising, or political/commercial promotion. When in doubt, ask the team first.",
  },
]

export default function CommunityGuidelinesPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="next ECA home">
            <BrandLogo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          next ECA Student Leadership Program
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Community Guidelines
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
          Being a next ECA Campus Ambassador is a position of trust. These guidelines exist to keep
          our community safe, welcoming and impactful. By joining the program, every ambassador
          agrees to uphold them.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="size-5" />
              </span>
              <h2 className="mt-4 font-heading text-lg font-bold">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-7">
          <h2 className="font-heading text-xl font-bold">Enforcement</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
            next ECA reserves the right to issue warnings, suspend, or terminate the participation of
            any ambassador who violates these guidelines, at its sole discretion. Serious violations
            may result in immediate removal from the program. We believe the vast majority of our
            community shares these values — and we&apos;re grateful to lead alongside you.
          </p>
        </section>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Ready to make an impact on your campus?
          </p>
          <Link
            href="/#apply"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Apply to be an Ambassador
          </Link>
        </div>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.name}. For the Community. By the Community.
          </p>
        </div>
      </footer>
    </div>
  )
}

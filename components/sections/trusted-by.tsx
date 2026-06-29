import { Reveal } from "@/components/reveal"

const PARTNERS: { name: string; logo?: string; isWhiteLogo?: boolean }[] = [
  { name: "Cloud Camp BD", logo: "/partner-cloudcamp.webp" },
  { name: "PhotoZone Graphy", logo: "/partner-photozone.png" },
  { name: "Event Partner", logo: "/partner-logo3.png", isWhiteLogo: true },
]

function PartnerItem({ partner }: { partner: { name: string; logo?: string; isWhiteLogo?: boolean } }) {
  return (
    <div
      className={`flex h-16 w-44 shrink-0 items-center justify-center rounded-xl border px-6 grayscale opacity-70 transition-all duration-300 hover:opacity-100 hover:grayscale-0 ${
        partner.isWhiteLogo ? "border-border/50 bg-slate-100" : "border-border bg-card"
      }`}
    >
      {partner.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={partner.logo} alt={partner.name} className="max-h-8 w-auto" />
      ) : (
        <span className="font-heading text-base font-bold text-muted-foreground">
          {partner.name}
        </span>
      )}
    </div>
  )
}

export function TrustedBy() {
  return (
    <section id="trusted-by" className="scroll-mt-20 border-y border-border bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Trusted by</p>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              We collaborate with organizations to promote their competitions &amp; hackathons
            </h2>
          </div>
        </Reveal>

        {/* Marquee on small screens, grid on larger */}
        <Reveal delay={120}>
          <div className="mt-12 hidden flex-wrap items-center justify-center gap-5 md:flex">
            {PARTNERS.map((p) => (
              <PartnerItem key={p.name} partner={p} />
            ))}
          </div>
        </Reveal>

        <div className="mt-12 overflow-hidden md:hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-5">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <PartnerItem key={`${p.name}-${i}`} partner={p} />
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground text-pretty">
            Want to feature your competition, hackathon or event to thousands of students?{" "}
            <a href="#apply" className="font-semibold text-primary underline-offset-4 hover:underline">
              Partner with next ECA.
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

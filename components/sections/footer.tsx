import { BrandLogo } from "@/components/brand-logo"
import { SOCIALS, SITE } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <BrandLogo />
            <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
              {SITE.tagline} Helping students discover competitions, hackathons, Olympiads and
              scholarships — together.
            </p>
            <a
              href="#apply"
              className="mt-5 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Apply to be an Ambassador
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold">Program</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground">About</a></li>
                <li><a href="#responsibilities" className="hover:text-foreground">Responsibilities</a></li>
                <li><a href="#benefits" className="hover:text-foreground">Benefits</a></li>
                <li><a href="#mission" className="hover:text-foreground">Mission</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-2">
              <h3 className="text-sm font-semibold">Connect with us</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>For the Community. By the Community.</p>
        </div>
      </div>
    </footer>
  )
}

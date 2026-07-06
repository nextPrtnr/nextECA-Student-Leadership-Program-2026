import { SiteNav } from "@/components/site-nav"
import { DeadlineBanner } from "@/components/deadline-banner"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Responsibilities } from "@/components/sections/responsibilities"
import { Benefits } from "@/components/sections/benefits"
import { Mission } from "@/components/sections/mission"
import { Apply } from "@/components/sections/apply"
import { TrustedBy } from "@/components/sections/trusted-by"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <>
      <SiteNav />
      <DeadlineBanner />
      <main>
        <Hero />
        <About />
        <Responsibilities />
        <Benefits />
        <Mission />
        <Apply />
        <TrustedBy />
      </main>
      <Footer />
    </>
  )
}

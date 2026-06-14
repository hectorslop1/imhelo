import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import AboutBlock from '@/components/sections/AboutBlock'
import Services from '@/components/sections/Services'
import SelectedWork from '@/components/sections/SelectedWork'
import SectionBreak from '@/components/sections/SectionBreak'
import DeviceShowcase from '@/components/sections/DeviceShowcase'
import Experience from '@/components/sections/Experience'
import Marquee from '@/components/sections/Marquee'
import ContactFooter from '@/components/sections/ContactFooter'
import CurveTransition from '@/components/ui/CurveTransition'

// Section rhythm — LIGHT-dominant (azizkhaldi.com cadence). ◻ light · ◼ dark:
//   Hero ◻ · Intro ◼ · About ◻ · Services ◻ · Work ◻ ·〔curve ◻→◼〕
//   · Break ◼ · Showcase ◼ · Experience ◼ ·〔curve ◼→◻〕
//   · Marquee ◻ ·〔curve ◻→◼〕· Footer ◼
// One dark run (Break → Showcase → Experience) is entered by the ◻→◼ curve after
// Work and exited by the ◼→◻ curve before Marquee. CurveTransition bridges every
// light↔dark handoff with the signature arc.

const LIGHT = '#e9e7e1'
const DARK = '#1a1815'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <AboutBlock />
        <Services />
        <SelectedWork />
        <CurveTransition from={LIGHT} to={DARK} />
        <SectionBreak />
        <DeviceShowcase />
        <Experience />
        <CurveTransition from={DARK} to={LIGHT} />
        <Marquee />
        <CurveTransition from={LIGHT} to={DARK} />
        <ContactFooter />
      </main>
    </>
  )
}

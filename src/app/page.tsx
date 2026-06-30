import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import AboutBlock from '@/components/sections/AboutBlock'
import Services from '@/components/sections/Services'
import SelectedWork from '@/components/sections/SelectedWork'
import SectionBreak from '@/components/sections/SectionBreak'
import DeviceShowcase from '@/components/sections/DeviceShowcase'
import Experience from '@/components/sections/Experience'
import SelectedFrames from '@/components/sections/SelectedFrames'
import ContactFooter from '@/components/sections/ContactFooter'
import ThemeBackground from '@/components/ui/ThemeBackground'

// Section rhythm (◻ light · ◼ dark): Hero ◻ · Intro ◼ · About ◻ · Services ◻ ·
// Work ◻ · Break ◼ · Showcase ◼ · Experience ◼ · Frames ◼ · Footer ◼.
// A single fixed <ThemeBackground> floods the whole screen between light/dark as
// each section crosses the scroll activation band — replacing the old per-boundary
// CurveTransition with one continuous, coherent theme transition. Each section
// declares its theme via `data-section-theme` and is transparent (globals.css).

export default function Home() {
  return (
    <>
      <ThemeBackground />
      <Header />
      <main className="theme-flood">
        <Hero />
        <Intro />
        <AboutBlock />
        <Services />
        <SelectedWork />
        <SectionBreak />
        <DeviceShowcase />
        <Experience />
        <SelectedFrames />
        <ContactFooter />
      </main>
    </>
  )
}

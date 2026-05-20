import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Services from '@/components/sections/Services'
import SelectedWork from '@/components/sections/SelectedWork'
import DeviceShowcase from '@/components/sections/DeviceShowcase'
import Experience from '@/components/sections/Experience'
import Marquee from '@/components/sections/Marquee'
import ContactFooter from '@/components/sections/ContactFooter'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <SelectedWork />
        <DeviceShowcase />
        <Experience />
        <Marquee />
        <ContactFooter />
      </main>
    </>
  )
}

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = { title: 'About — HELO' }

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-40 pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] text-[#f2d832] uppercase mb-6">
            About
          </p>
          <h1
            className="font-bold tracking-tighter text-white mb-4"
            style={{ fontSize: 'clamp(40px,6vw,80px)', fontFamily: 'var(--font-syne)' }}
          >
            Hector Lopez
          </h1>
          <p className="text-[#888880] text-sm max-w-md">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

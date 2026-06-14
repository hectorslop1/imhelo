import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = { title: 'Mobile App Showcase — HELO' }

export default function MobileAppShowcasePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col justify-between" style={{ background: 'var(--surface)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-48 pb-40 flex-1">
          <p
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
            style={{ color: 'var(--accent-deep)' }}
          >
            Development · UI
          </p>
          <h1
            className="font-extrabold tracking-[-0.04em] mb-8"
            style={{
              fontSize: 'clamp(52px, 8vw, 112px)',
              fontFamily: 'var(--font-cabinet)',
              lineHeight: 0.92,
              color: 'var(--ink)',
            }}
          >
            Mobile App
            <br />
            Showcase
          </h1>
          <p className="font-mono text-[13px]" style={{ color: 'rgba(22,21,15,0.42)' }}>
            Coming soon.
          </p>
          <div className="mt-16 h-px" style={{ background: 'rgba(20,19,15,0.1)' }} />
          <Link
            href="/work"
            className="inline-flex items-center gap-2 mt-10 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(22,21,15,0.5)' }}
          >
            ← All work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

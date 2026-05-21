import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = { title: 'Graphic Design — HELO' }

export default function GraphicDesignPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col justify-between" style={{ background: '#080808' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-48 pb-40 flex-1">
          <p
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
            style={{ color: 'rgba(242,216,50,0.6)' }}
          >
            Visual Design · Illustration
          </p>
          <h1
            className="font-extrabold tracking-[-0.04em] text-white mb-8"
            style={{
              fontSize: 'clamp(52px, 8vw, 112px)',
              fontFamily: 'var(--font-syne)',
              lineHeight: 0.92,
            }}
          >
            Graphic
            <br />
            Design
          </h1>
          <p className="font-mono text-[13px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Coming soon.
          </p>
          <div className="mt-16 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <Link
            href="/work"
            className="inline-flex items-center gap-2 mt-10 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            ← All work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

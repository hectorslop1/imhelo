import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = { title: 'Contact — HELO' }

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-40 pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] text-[#f2d832] uppercase mb-6">
            Contact
          </p>
          <h1
            className="font-bold tracking-tighter text-white mb-4"
            style={{ fontSize: 'clamp(40px,6vw,80px)', fontFamily: 'var(--font-syne)' }}
          >
            Say HELO
          </h1>
          <a
            href="mailto:hello@imhelo.com"
            className="text-sm text-[#888880] hover:text-white transition-colors"
          >
            hello@imhelo.com
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}

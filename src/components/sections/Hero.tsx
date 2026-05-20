import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-24 px-6 lg:px-12 pt-32">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main heading */}
        <div className="mb-12">
          <h1
            className="font-bold leading-[0.88] tracking-tighter text-white"
            style={{
              fontSize: 'clamp(88px, 14vw, 200px)',
              fontFamily: 'var(--font-syne)',
            }}
          >
            HELO
          </h1>
          <p
            className="font-semibold leading-tight tracking-tight mt-3"
            style={{
              fontSize: 'clamp(24px, 3.5vw, 52px)',
              fontFamily: 'var(--font-syne)',
            }}
          >
            <span className="text-white">Design &amp; Development</span>
            <br />
            <span className="text-[#888880]">crafted into digital experiences.</span>
          </p>
        </div>

        {/* Subtext + CTAs */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-start sm:items-end">
          <p className="max-w-sm text-sm text-[#888880] leading-relaxed">
            I&apos;m Hector Lopez, a designer and developer creating polished
            interfaces, visual systems, and digital experiences with purpose.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/20 px-5 py-3 rounded-full hover:border-white/60 transition-colors duration-200"
            >
              View Work <ArrowRight size={14} />
            </Link>
            <Link
              href="mailto:hello@imhelo.com"
              className="text-sm font-medium text-[#0d0d0d] bg-[#f2d832] px-5 py-3 rounded-full hover:bg-white transition-colors duration-200"
            >
              Say HELO
            </Link>
          </div>
        </div>

        {/* Bottom info strip */}
        <div className="mt-16 pt-6 border-t border-white/[0.06] flex flex-wrap gap-6 justify-between text-xs text-[#888880]/60 font-mono">
          <span>San Diego, CA</span>
          <span>Development + Graphic Design</span>
          <span>Available for projects</span>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full opacity-[0.035] blur-[120px] bg-[#f2d832] pointer-events-none"
      />
    </section>
  )
}

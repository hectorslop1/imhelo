import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/hectorslop1' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/imhelo' },
  { label: 'Dribbble', href: 'https://dribbble.com/imhelo' },
]

export default function ContactFooter() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-10">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">06</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">Contact</span>
        </div>

        {/* Main content */}
        <div className="pb-16">
          {/* Big headline */}
          <h2
            className="font-extrabold leading-[0.95] mb-12"
            style={{
              fontSize: 'clamp(72px, 12vw, 160px)',
              fontFamily: 'var(--font-syne)',
              letterSpacing: '-0.03em',
            }}
          >
            <span className="text-white">Say </span>
            <span
              className="text-[#f2d832] font-normal"
              style={{ fontFamily: 'var(--font-singapore-sling)', letterSpacing: '0.08em' }}
            >HELO</span>
          </h2>

          {/* Bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end border-t border-white/[0.06] pt-10">
            {/* Left */}
            <div className="space-y-8">
              <p className="text-[14px] text-[#7a7a72] leading-relaxed max-w-sm">
                Let&apos;s build something polished, useful, and memorable.
              </p>
              <Link
                href="mailto:hello@imhelo.com"
                className="group inline-flex items-center gap-2.5 text-[14px] font-medium text-white border-b border-white/20 pb-1 hover:border-[#f2d832] hover:text-[#f2d832] transition-all duration-300"
              >
                hello@imhelo.com
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>

            {/* Right: meta */}
            <div className="space-y-6 lg:text-right">
              <div className="flex lg:justify-end gap-6">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-mono text-[#4a4a44] hover:text-white transition-colors duration-300 tracking-wide"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <p className="text-[11px] font-mono text-[#4a4a44] tracking-widest">
                San Diego, CA · 2026
              </p>
            </div>
          </div>
        </div>

        {/* Very bottom strip */}
        <div className="border-t border-white/[0.04] py-5 flex flex-col sm:flex-row justify-between gap-3 text-[10px] font-mono text-[#2a2a26] tracking-widest">
          <span>HELO — Designed &amp; Developed by Hector Lopez</span>
          <span>© 2026 All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}

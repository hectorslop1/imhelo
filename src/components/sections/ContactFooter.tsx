import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/imhelo' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/imhelo' },
  { label: 'Dribbble', href: 'https://dribbble.com/imhelo' },
]

export default function ContactFooter() {
  return (
    <footer className="py-32 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* CTA */}
          <div>
            <h2
              className="font-bold leading-[0.88] tracking-tighter text-white mb-8"
              style={{
                fontSize: 'clamp(56px, 9vw, 120px)',
                fontFamily: 'var(--font-syne)',
              }}
            >
              Say
              <br />
              <span className="text-[#f2d832]">HELO</span>
            </h2>
            <p className="text-[#888880] text-sm leading-relaxed max-w-sm mb-10">
              Let&apos;s build something polished, useful, and memorable.
            </p>
            <Link
              href="mailto:hello@imhelo.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0d0d0d] bg-[#f2d832] px-8 py-4 rounded-full hover:bg-white transition-colors duration-200"
            >
              hello@imhelo.com
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Info block */}
          <div className="space-y-8 lg:text-right">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-[0.2em] text-[#888880]/50 uppercase">
                Location
              </p>
              <p className="text-white text-sm">San Diego, CA</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.2em] text-[#888880]/50 uppercase">
                Social
              </p>
              <div className="flex lg:justify-end gap-6">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#888880] hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/[0.06] space-y-1">
              <p className="text-xs text-[#888880]/40 font-mono">
                HELO — 2026 Edition
              </p>
              <p className="text-xs text-[#888880]/30 font-mono">
                Designed &amp; Developed by Hector Lopez
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

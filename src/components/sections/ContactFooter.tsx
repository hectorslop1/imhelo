'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Mascot from '@/components/ui/Mascot'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance', href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble', href: 'https://dribbble.com/hectorslop' },
]

// ─── LocalTime ────────────────────────────────────────────────────────────────
// Live local time in San Diego (America/Los_Angeles). Hydration-safe.
function LocalTime() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>{time ?? '—'}</span>
}

const COL_HEAD = 'text-[12px] font-mono tracking-[0.18em] uppercase text-[#605d54] mb-5'
const COL_LINK =
  'group relative inline-block text-[15px] text-[#b8b4a8] hover:text-[var(--on-dark)] transition-colors duration-300 w-fit'

function Underline() {
  return (
    <span
      aria-hidden
      className="absolute -bottom-0.5 left-0 h-px w-full bg-[#f2d832] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
    />
  )
}

// ─── ContactFooter ────────────────────────────────────────────────────────────
// azizkhaldi.com footer: LINKS / SOCIALS / LOCAL TIME / VERSION columns, contact
// pills top-right, and a viewport-wide name wordmark with the mascot perched on it.
export default function ContactFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]" style={{ background: '#1a1815' }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28">

        {/* Top: columns + contact pills */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-8 pb-20 lg:pb-28">
          {/* Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            <nav className="flex flex-col">
              <p className={COL_HEAD}>Links</p>
              <ul className="space-y-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={COL_LINK}>
                      {label}
                      <Underline />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col">
              <p className={COL_HEAD}>Socials</p>
              <ul className="space-y-3">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={COL_LINK}>
                      {label}
                      <Underline />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <p className={COL_HEAD}>Local time</p>
              <p className="text-[15px] text-[#b8b4a8] font-mono tracking-wide">
                <LocalTime />
              </p>
              <p className="text-[13px] text-[#605d54] mt-1">San Diego, CA</p>
            </div>

            <div className="flex flex-col">
              <p className={COL_HEAD}>Version</p>
              <p className="text-[15px] text-[#b8b4a8] font-mono tracking-wide">© 2026</p>
              <p className="text-[13px] text-[#605d54] mt-1">Portfolio v1.0</p>
            </div>
          </div>

          {/* Contact pills */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <a
              href="mailto:hello@imhelo.com"
              className="group inline-flex items-center justify-between gap-4 rounded-full border border-white/25 bg-[#1a1815] pl-6 pr-5 py-3 text-[14px] text-[var(--on-dark)] hover:border-[#f2d832] hover:text-[#f2d832] transition-colors duration-300"
            >
              hello@imhelo.com
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-between gap-4 rounded-full border border-white/25 bg-[#1a1815] pl-6 pr-5 py-3 text-[14px] text-[var(--on-dark)] hover:border-[#f2d832] hover:text-[#f2d832] transition-colors duration-300"
            >
              Start a project
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Giant wordmark + mascot perched on top (azizkhaldi.com signature close) */}
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Mascot — centred, sitting on the cap-line of the wordmark, leans toward the cursor */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[68%] sm:bottom-[62%] z-10 pointer-events-none">
          <Mascot pose="idle" size={150} interactive className="drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]" />
        </div>

        <div
          aria-label="HELO"
          className="flex justify-between items-end leading-[0.74] select-none"
          style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--on-dark)' }}
        >
          {['H', 'E', 'L', 'O'].map((ch, i) => (
            <span
              key={i}
              className="font-bold"
              style={{ fontSize: 'clamp(96px, 25vw, 440px)', letterSpacing: '-0.04em' }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Credit strip */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 border-t border-white/[0.04] mt-8 py-5 flex flex-col sm:flex-row justify-between gap-3 text-[11px] font-mono text-[#3a3a34] tracking-widest">
        <span>HELO — Designed &amp; Developed by Hector Lopez</span>
        <span>© 2026 All rights reserved</span>
      </div>
    </footer>
  )
}

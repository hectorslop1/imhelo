'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Mascot from '@/components/ui/Mascot'
import SplitReveal from '@/components/ui/SplitReveal'
import MagneticLink from '@/components/ui/MagneticLink'

const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance',   href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble',  href: 'https://dribbble.com/hectorslop' },
]

// ─── LocalTime ────────────────────────────────────────────────────────────────
//
// Displays the current local time in San Diego (America/Los_Angeles).
// Updates every second via setInterval.
//
// Hydration-safe: `suppressHydrationWarning` tells React to skip the server/client
// mismatch warning for this span, which is intentional — time is always
// different between SSR and client render.
//
// Format: "San Diego, CA · 09:42 PM"
// To change the timezone: update the `timeZone` option below.

function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour:     '2-digit',
          minute:   '2-digit',
          hour12:   true,
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span suppressHydrationWarning>
      {time ? `San Diego, CA · ${time}` : 'San Diego, CA'}
    </span>
  )
}

// ─── ContactFooter ────────────────────────────────────────────────────────────

export default function ContactFooter() {
  return (
    <footer className="border-t border-white/[0.06]" style={{ background: '#1a1815' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-12">
          <span className="text-[12px] font-mono text-[#606058] tracking-widest">06</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[12px] font-mono text-[#606058] tracking-widest uppercase">Contact</span>
        </div>

        {/* Main content */}
        <div className="pb-16">
          {/* CTA headline + mascot inline */}
          <div className="mb-12 flex items-end gap-6 flex-wrap">
            <h2
              className="font-extrabold leading-[0.95]"
              style={{
                fontSize:      'clamp(52px, 9vw, 120px)',
                fontFamily:    'var(--font-cabinet)',
                letterSpacing: '-0.03em',
              }}
            >
              <SplitReveal text="Say" as="span" by="char" style={{ color: 'var(--on-dark)' }} stagger={0.03} duration={0.6} />
              <span style={{ display: 'inline-block', width: '0.3em' }} />
              <SplitReveal
                text="HELO"
                as="span"
                by="char"
                className="font-normal"
                style={{ color: '#f2d832', fontFamily: 'var(--font-singapore-sling)', letterSpacing: '0.08em' }}
                delay={0.16}
                stagger={0.045}
                duration={0.6}
              />
            </h2>
            {/* Mascot — sits beside the headline, leans toward the cursor */}
            <div className="hidden sm:block mb-2 shrink-0">
              <Mascot pose="idle" size={72} interactive />
            </div>
          </div>

          {/* Info row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end border-t border-white/[0.06] pt-10">
            {/* Left */}
            <div className="space-y-8">
              <p className="text-[14px] text-[#7a7a72] leading-relaxed max-w-sm">
                Let&apos;s build something polished, useful, and memorable.
              </p>
              <MagneticLink
                href="mailto:hello@imhelo.com"
                strength={0.45}
                className="group inline-flex items-center gap-2.5 text-[14px] font-medium text-white border-b border-white/20 pb-1 hover:border-[#f2d832] hover:text-[#f2d832] transition-all duration-300"
              >
                hello@imhelo.com
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </MagneticLink>
            </div>

            {/* Right: social + live time */}
            <div className="space-y-6 lg:text-right">
              <div className="flex lg:justify-end gap-6">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block text-[12px] font-mono text-[#606058] hover:text-white transition-colors duration-300 tracking-wide overflow-hidden py-px"
                  >
                    {label}
                    {/* Underline — grows from left on hover */}
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-px bg-[#f2d832] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    />
                  </a>
                ))}
              </div>
              <p className="text-[12px] font-mono text-[#606058] tracking-widest">
                <LocalTime />
              </p>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="border-t border-white/[0.04] py-5 flex flex-col sm:flex-row justify-between gap-3 text-[11px] font-mono text-[#3a3a34] tracking-widest">
          <span>HELO — Designed &amp; Developed by Hector Lopez</span>
          <span>© 2026 All rights reserved</span>
        </div>

      </div>

    </footer>
  )
}

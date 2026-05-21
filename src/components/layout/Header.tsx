'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Work',    href: '/work'    },
  { label: 'About',   href: '/about'   },
  { label: 'Contact', href: '/contact' },
]

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Header ───────────────────────────────────────────────────────────────────
//
// MONUMENT interaction:
//   When scrollY < 120  → logo is invisible (the hero HELO wordmark is visible)
//   When scrollY ≥ 120  → logo crossfades in, visually completing the transition
//
// The nav links and "Say HELO" CTA are always present for navigation.
// Only the wordmark fades in — the user always knows where they are.

export default function Header() {
  const [scrolled,     setScrolled]     = useState(false)
  const [logoVisible,  setLogoVisible]  = useState(false)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setLogoVisible(y > 120)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[padding,background,border-color] duration-700',
        scrolled
          ? 'py-4 bg-[#080808]/96 backdrop-blur-2xl border-b border-white/[0.05]'
          : 'py-6 bg-transparent',
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center justify-between">

        {/* ── Wordmark — fades in once hero HELO has scrolled away ── */}
        <Link
          href="/"
          aria-label="HELO — Home"
          className="group flex items-center gap-[6px]"
          style={{
            opacity:    logoVisible ? 1 : 0,
            transform:  logoVisible ? 'translateY(0)' : 'translateY(5px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
            pointerEvents: logoVisible ? 'auto' : 'none',
          }}
        >
          <span
            className="font-normal leading-none text-white group-hover:text-[#f2d832] transition-colors duration-300"
            style={{
              fontFamily:    'var(--font-singapore-sling)',
              fontSize:      '17px',
              letterSpacing: '0.1em',
            }}
          >
            HELO
          </span>
          {/* Brand dot */}
          <span className="w-[4px] h-[4px] rounded-full bg-[#f2d832] shrink-0 -mb-[3px] opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 origin-center" />
        </Link>

        {/* ── Navigation — always visible ── */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.08 }}
            >
              <Link
                href={href}
                className="relative text-[13px] tracking-wide text-[#7a7a72] hover:text-white transition-colors duration-300 group py-1"
              >
                {label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#f2d832] group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* ── CTA — always visible ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
        >
          <Link
            href="mailto:hello@imhelo.com"
            className="group relative overflow-hidden inline-flex items-center text-[13px] font-bold text-[#080808] bg-[#f2d832] px-5 py-2.5"
            style={{ borderRadius: '2px' }}
          >
            <span className="relative z-10 tracking-[-0.01em]">Say HELO</span>
            <span
              aria-hidden
              className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
            />
          </Link>
        </motion.div>

      </div>
    </motion.header>
  )
}

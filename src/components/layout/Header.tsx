'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Work',    href: '/work'    },
  { label: 'About',   href: '/about'   },
  { label: 'Contact', href: '/contact' },
]

const EASE     = [0.16, 1, 0.3, 1] as const
const NAV_EASE = 'cubic-bezier(0.16,1,0.3,1)'

// ─── SplitNavLink ─────────────────────────────────────────────────────────────
//
// Each character of the label lives in its own <span>.
// On hover, the visible layer slides up and a white clone slides in from below.
// Stagger delay per character gives a subtle wave effect.
//
// Accessibility: `aria-label` on the <Link> holds the real text;
// both character layers are `aria-hidden` so screen readers see only one copy.

function SplitNavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  const chars = label.split('')

  return (
    <Link
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex overflow-hidden py-1 text-[13px] tracking-wide"
    >
      {/* Yellow underline — grows on hover */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-[#f2d832] transition-all duration-300 ease-out"
        style={{ width: hovered ? '100%' : '0' }}
      />

      {/* Layer 1 — muted text, slides up on hover */}
      <span aria-hidden className="flex">
        {chars.map((char, i) => (
          <span
            key={i}
            style={{
              display:    'inline-block',
              color:      'rgba(122,122,114,1)',
              transform:  hovered ? 'translateY(-100%)' : 'translateY(0%)',
              transition: `transform 380ms ${NAV_EASE} ${i * 20}ms`,
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </span>

      {/* Layer 2 — white clone, slides up from below */}
      <span aria-hidden className="absolute inset-0 flex">
        {chars.map((char, i) => (
          <span
            key={i}
            style={{
              display:    'inline-block',
              color:      'rgba(255,255,255,1)',
              transform:  hovered ? 'translateY(0%)' : 'translateY(100%)',
              transition: `transform 380ms ${NAV_EASE} ${i * 20}ms`,
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </span>
    </Link>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
//
// MONUMENT interaction:
//   When scrollY < 120  → logo is invisible (the hero HELO wordmark is visible)
//   When scrollY ≥ 120  → logo crossfades in, visually completing the transition
//
// The nav links and "Say HELO" CTA are always present for navigation.
// Only the wordmark fades in — the user always knows where they are.

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [logoFull,    setLogoFull]    = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setLogoFull(y > 120)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // On homepage: scroll to top smoothly instead of navigating
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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

        {/* ── Wordmark — always present; dims to 28% while hero is visible ── */}
        {/*    Transitions to full opacity once the hero HELO scrolls away.   */}
        {/*    On the homepage, clicking scrolls smoothly to the top.          */}
        <Link
          href="/"
          aria-label="HELO — Go to homepage"
          onClick={handleLogoClick}
          className={cn(
            'group flex items-center gap-[7px]',
            // Elegant focus ring — visible but not garish
            'rounded-[2px] outline-none',
            'focus-visible:ring-1 focus-visible:ring-[#f2d832]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent',
          )}
          style={{
            // 28% at the top so it doesn't compete with the hero HELO
            // Full opacity once the hero has scrolled away
            opacity:    logoFull ? 1 : 0.28,
            transition: 'opacity 0.5s ease',
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
          {/* Brand dot — steady, no scale jump */}
          <span className="w-[4px] h-[4px] rounded-full bg-[#f2d832] shrink-0 -mb-[3px] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
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
              <SplitNavLink href={href} label={label} />
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

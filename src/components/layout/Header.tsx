'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import MagneticLink from '@/components/ui/MagneticLink'

const SOCIALS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance',   href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble',  href: 'https://dribbble.com/hectorslop' },
]

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
              color:      'var(--ink-3)',
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
              color:      'var(--ink)',
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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close the mobile menu on route change.
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Only the homepage has the light hero behind a transparent header.
  // On every other route the header carries its light backdrop immediately,
  // so the dark ink logo + nav stay readable regardless of page background.
  const isHome = pathname === '/'
  const solid  = scrolled || !isHome

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60)
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
        solid
          ? 'py-4 bg-[#e9e7e1]/85 backdrop-blur-2xl border-b border-[rgba(20,19,15,0.10)]'
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
            // The hero no longer carries a giant HELO wordmark, so the header
            // logo is always fully present (dark ink on the light field).
            opacity:    1,
            transition: 'opacity 0.5s ease',
          }}
        >
          <span
            className="font-normal leading-none text-[#16150f] group-hover:text-[#a8821a] transition-colors duration-300"
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

        {/* ── Navigation — inline at the top, collapses to the menu on scroll (azizkhaldi.com) ── */}
        <nav
          className={cn('items-center gap-10', solid ? 'hidden' : 'hidden md:flex')}
          aria-label="Main navigation"
        >
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

        {/* ── Right cluster: CTA + menu toggle (kept together on the right) ── */}
        <div className="flex items-center gap-4 lg:gap-5">

        {/* ── CTA ── */}
        <motion.div
          className={cn(solid ? 'hidden lg:block' : 'hidden md:block')}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
        >
          <MagneticLink
            href="mailto:hello@imhelo.com"
            strength={0.5}
            className="group relative overflow-hidden inline-flex items-center text-[13px] font-bold px-6 py-2.5 rounded-full bg-[#14130f]"
          >
            <span className="relative z-10 tracking-[-0.01em] text-[#ebe9e1] group-hover:text-[#14130f] transition-colors duration-300">
              Say HELO
            </span>
            <span
              aria-hidden
              className="absolute inset-0 bg-[#f2d832] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full"
            />
          </MagneticLink>
        </motion.div>

        {/* ── Menu toggle — always on mobile, on desktop once scrolled (azizkhaldi.com) ── */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
          className={cn(
            'flex flex-col items-end justify-center gap-[5px] w-9 h-9 -mr-1',
            solid ? 'md:flex' : 'md:hidden',
          )}
        >
          <span
            className="block h-px bg-[#16150f] transition-all duration-300 ease-out"
            style={{ width: 22, transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block h-px bg-[#16150f] transition-all duration-300 ease-out"
            style={{ width: menuOpen ? 22 : 15, transform: menuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
          />
        </button>

        </div>

      </div>

      {/* ── Fullscreen menu (mobile + desktop-on-scroll) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'var(--surface)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    href={href}
                    className="block font-extrabold tracking-[-0.03em] py-1"
                    style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(40px, 13vw, 72px)', color: 'var(--ink)' }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="mailto:hello@imhelo.com"
                className="block font-extrabold tracking-[-0.03em] py-1"
                style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(40px, 13vw, 72px)', color: 'var(--accent-deep)' }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 + NAV_LINKS.length * 0.06 }}
              >
                Say HELO
              </motion.a>
            </nav>

            <motion.div
              className="px-8 pb-12 flex flex-wrap gap-x-6 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
            >
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--ink-3)' }}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import MagneticLink from '@/components/ui/MagneticLink'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

const SOCIALS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance',   href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble',  href: 'https://dribbble.com/hectorslop' },
]

const NAV_LINKS = [
  { key: 'nav.home',    href: '/'        },
  { key: 'nav.work',    href: '/work'    },
  { key: 'nav.about',   href: '/about'   },
  { key: 'nav.contact', href: '/contact' },
]

const EASE = [0.16, 1, 0.3, 1] as const

// ─── MenuLink — large overlay link: index + label, slides + accent on hover ─────
function MenuLink({ href, label, index, onNavigate }: { href: string; label: string; index: number; onNavigate: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onClick={onNavigate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-baseline gap-5 sm:gap-7 py-1.5 sm:py-2 w-fit"
    >
      <span
        className="font-mono text-[12px] sm:text-[13px] tracking-widest transition-colors duration-300"
        style={{ color: hovered ? '#f2d832' : 'rgba(236,233,226,0.35)' }}
      >
        0{index + 1}
      </span>
      <span
        className="font-bold tracking-[-0.03em] leading-[0.95] transition-[transform,color] duration-300 ease-out"
        style={{
          fontFamily: 'var(--font-cabinet)',
          fontSize: 'clamp(44px, 9vw, 92px)',
          color: hovered ? '#f2d832' : 'var(--on-dark)',
          transform: hovered ? 'translateX(14px)' : 'translateX(0)',
        }}
      >
        {label}
      </span>
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { t } = useI18n()

  useEffect(() => setMounted(true), [])

  const theme  = useTheme()
  const isDark = theme === 'dark'
  // Transparent at the very top of any page; solid glass once scrolled. The glass
  // tone follows the active section theme (light/dark flood), so on dark pages /
  // dark home sections the header turns dark instead of staying light.
  const solid  = scrolled

  // Close on route change.
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll + Escape-to-close while the menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    if (menuOpen) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

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
        !solid && 'py-5 bg-transparent',
        solid && !isDark && 'py-3 bg-[#e9e7e1]/85 backdrop-blur-2xl border-b border-[rgba(20,19,15,0.10)]',
        solid && isDark && 'py-3 bg-[#1a1815]/85 backdrop-blur-2xl border-b border-[rgba(236,233,226,0.12)]',
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center justify-between">

        {/* ── Logo — full HELO lockup (bigger, premium presence) ── */}
        <Link
          href="/"
          aria-label="HELO — Go to homepage"
          onClick={handleLogoClick}
          className="group flex items-center rounded-[2px] outline-none focus-visible:ring-1 focus-visible:ring-[#f2d832]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
        >
          <Image
            src={isDark ? '/assetshelo/imhelologo/WhiteLogo.png' : '/assetshelo/imhelologo/Logo.png'}
            alt="HELO"
            width={363}
            height={100}
            priority
            className="h-7 lg:h-8 w-auto transition-opacity duration-300 group-hover:opacity-80"
          />
        </Link>

        {/* ── Right cluster: CTA + always-visible menu toggle ──
            Rendered as plain (non-animated) elements so they are NEVER hidden by an
            unfinished/paused entrance animation — the menu button must be present and
            visible at all times, including the very top of the homepage. ── */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="hidden md:block">
            <LanguageToggle tone={isDark ? 'dark' : 'light'} />
          </div>
          <div className="hidden md:block">
            <MagneticLink
              href="mailto:hello@imhelo.com"
              strength={0.5}
              className={cn(
                'group relative overflow-hidden inline-flex items-center text-[13px] font-bold px-6 py-2.5 rounded-full transition-colors duration-500',
                isDark ? 'bg-[#ece9e2]' : 'bg-[#14130f]',
              )}
            >
              <span className={cn(
                'relative z-10 tracking-[-0.01em] group-hover:text-[#14130f] transition-colors duration-300',
                isDark ? 'text-[#14130f]' : 'text-[#ebe9e1]',
              )}>
                {t('nav.sayHelo')}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 bg-[#f2d832] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full"
              />
            </MagneticLink>
          </div>

          {/* Menu toggle — ALWAYS visible (every breakpoint + scroll state) */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="group flex flex-col items-end justify-center gap-[6px] w-10 h-10 -mr-1"
          >
            <span className={cn('block h-[2px] w-6 rounded-full transition-all duration-300 ease-out group-hover:w-7', isDark ? 'bg-[#ece9e2]' : 'bg-[#16150f]')} />
            <span className={cn('block h-[2px] w-4 rounded-full transition-all duration-300 ease-out group-hover:w-7', isDark ? 'bg-[#ece9e2]' : 'bg-[#16150f]')} />
          </button>
        </div>
      </div>

      {/* ── Full-screen menu takeover — portaled to <body> so the header's
          backdrop-blur (which becomes a containing block for fixed children when
          scrolled) never traps this overlay. Fixes "menu won't open once scrolled". ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden"
            style={{ background: '#141310' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Ambient accent glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 15%, rgba(242,216,50,0.07) 0%, transparent 70%)' }}
            />

            {/* Top bar — brand + clear close */}
            <div className="relative max-w-[1400px] w-full mx-auto px-6 lg:px-16 py-5 flex items-center justify-between">
              <Link href="/" onClick={() => setMenuOpen(false)} aria-label="HELO — Home" className="inline-flex group">
                <Image
                  src="/assetshelo/imhelologo/WhiteLogo.png"
                  alt="HELO"
                  width={593}
                  height={167}
                  className="h-7 lg:h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="group flex items-center gap-3 text-[#ece9e2]"
              >
                <span className="font-mono text-[12px] tracking-widest uppercase text-[rgba(236,233,226,0.6)] group-hover:text-[#f2d832] transition-colors duration-300">
                  {t('nav.close')}
                </span>
                <span className="relative w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-colors duration-300 group-hover:border-[#f2d832]">
                  <span className="absolute block h-[2px] w-4 bg-current rotate-45 transition-colors duration-300 group-hover:bg-[#f2d832]" />
                  <span className="absolute block h-[2px] w-4 bg-current -rotate-45 transition-colors duration-300 group-hover:bg-[#f2d832]" />
                </span>
              </button>
            </div>

            {/* Links */}
            <nav className="relative flex-1 flex flex-col justify-center max-w-[1400px] w-full mx-auto px-6 lg:px-16">
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.18 + i * 0.06 }}
                >
                  <MenuLink href={href} label={t(key)} index={i} onNavigate={() => setMenuOpen(false)} />
                </motion.div>
              ))}
            </nav>

            {/* Footer row — contact + socials */}
            <motion.div
              className="relative max-w-[1400px] w-full mx-auto px-6 lg:px-16 pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            >
              <a
                href="mailto:hello@imhelo.com"
                className="group inline-flex items-center gap-3 text-[#ece9e2] w-fit"
              >
                <span className="font-mono text-[11px] tracking-widest uppercase text-[rgba(236,233,226,0.5)]">{t('nav.email')}</span>
                <span className="text-[16px] sm:text-[18px] group-hover:text-[#f2d832] transition-colors duration-300">
                  hello@imhelo.com
                </span>
              </a>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {SOCIALS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.18em] uppercase text-[rgba(236,233,226,0.45)] hover:text-[#f2d832] transition-colors duration-300"
                  >
                    {label}
                  </a>
                ))}
                <LanguageToggle tone="dark" />
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </motion.header>
  )
}

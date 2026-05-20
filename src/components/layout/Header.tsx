'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-4 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/[0.06]'
          : 'py-7'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl tracking-tighter text-white hover:text-[#f2d832] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          HELO
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[#888880] hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="mailto:hello@imhelo.com"
          className="text-sm font-medium bg-[#f2d832] text-[#0d0d0d] px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
        >
          Say HELO
        </Link>
      </div>
    </header>
  )
}

'use client'

import { useEffect } from 'react'
import { useTheme, useSetTheme } from '@/lib/theme'

// ─── ThemeBackground ──────────────────────────────────────────────────────────
//
// The single fixed, full-viewport background layer behind all content. Home
// sections are transparent (`.theme-flood [data-section-theme]` in globals.css),
// so THIS layer is the page background — it smoothly tweens light↔dark as each
// section crosses the activation band. Section vertical padding keeps real text
// away from the seam during the crossfade, so contrast holds.

const COLORS = { light: '#e9e7e1', dark: '#1a1815' } as const

export default function ThemeBackground() {
  const theme = useTheme()
  const setTheme = useSetTheme()

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section-theme]'),
    )
    if (sections.length === 0) return

    // Deterministic coverage scan (replaces a racy IntersectionObserver band):
    // on every scroll frame, pick the section occupying the MOST of the viewport
    // and adopt its theme. This can never flicker or stick between two adjacent
    // sections, and it keeps the flood matched to whatever fills the screen — so
    // any seam contrast falls on the minority (least-visible) section.
    let raf = 0
    const scan = () => {
      raf = 0
      const vh = window.innerHeight
      let best: { t: 'light' | 'dark'; cover: number } | null = null
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0))
        const t = s.getAttribute('data-section-theme')
        if ((t === 'light' || t === 'dark') && (!best || visible > best.cover)) {
          best = { t, cover: visible }
        }
      }
      if (best && best.cover > 0) setTheme(best.t)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(scan)
    }
    scan()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [setTheme])

  return (
    <div
      aria-hidden
      className="theme-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: COLORS[theme],
        transition: 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'none',
      }}
    />
  )
}

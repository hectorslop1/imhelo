'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Lenis smooth scroll + GSAP ScrollTrigger bridge ──────────────────────────
//
// lerp: 0.08 — fraction of remaining distance travelled per frame (azizkhaldi.com
// cinematic glide). Lower = smoother/laggier, higher = snappier.
//
// GSAP integration: instead of our own rAF loop we drive `lenis.raf` from GSAP's
// ticker and call `ScrollTrigger.update` on every Lenis scroll. This keeps any
// ScrollTrigger pin/scrub perfectly in sync with the smooth-scrolled position
// (the standard Lenis × ScrollTrigger setup) — without it, pinned sections jitter.
//
// Reduced-motion: skip Lenis entirely (native scroll). ScrollTriggers still work
// off native scroll, so pinned sections degrade gracefully.

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp:            0.08,
      smoothWheel:     true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => lenis.raf(time * 1000) // gsap ticker time is seconds
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}

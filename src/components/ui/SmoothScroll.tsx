'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// ─── Lenis smooth scroll ──────────────────────────────────────────────────────
//
// lerp: 0.075  — the fraction of the distance to travel per frame.
//               Lower = smoother / more cinematic glide.
//               0.1 = default (snappier), 0.075 = premium feel, 0.06 = very laggy.
//               Aziz Khaldi's site used ~0.08. We use 0.075 for slightly more presence.
//
// To adjust smoothness: change lerp value here only.

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp:            0.08,   // matches azizkhaldi.com's cinematic glide
      smoothWheel:     true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

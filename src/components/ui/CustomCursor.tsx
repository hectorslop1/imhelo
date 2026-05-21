'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

// ─── Custom Cursor ─────────────────────────────────────────────────────────────
//
// Desktop-only (~32px ring + 3px yellow dot).
// Position is driven by a rAF lerp loop — direct DOM mutation, no React state,
// so 60fps with zero re-renders.
//
// Grow state is triggered via event delegation (mouseover/mouseout on document)
// so newly added interactive elements are covered automatically.
//
// To mark any element as interactive: add data-cursor="grow".
// globals.css hides the native cursor on lg+ screens.

const LERP = (a: number, b: number, t: number) => a + (b - a) * t
const RING_SIZE = 32
const DOT_SIZE  = 3
const LERP_FACTOR = 0.115

export default function CustomCursor() {
  const reduced = useReducedMotion()

  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  const mouseRef   = useRef({ x: -200, y: -200 })
  const smoothRef  = useRef({ x: -200, y: -200 })
  const scaleRef   = useRef(1)
  const targetScaleRef = useRef(1)
  const rafRef     = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (reduced) return

    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

    const RING_HALF = RING_SIZE / 2
    const DOT_HALF  = DOT_SIZE  / 2

    // ── Mouse position ─────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    // ── Grow / shrink via event delegation ────────────────────────────────────
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('a, button, [data-cursor="grow"]')) {
        targetScaleRef.current = 1.55
        ring.style.borderColor = 'rgba(242,216,50,0.55)'
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('a, button, [data-cursor="grow"]')) {
        targetScaleRef.current = 1
        ring.style.borderColor = 'rgba(245,239,230,0.32)'
      }
    }

    // ── rAF lerp loop — single transform update per frame ─────────────────────
    const tick = () => {
      smoothRef.current.x = LERP(smoothRef.current.x, mouseRef.current.x, LERP_FACTOR)
      smoothRef.current.y = LERP(smoothRef.current.y, mouseRef.current.y, LERP_FACTOR)
      scaleRef.current    = LERP(scaleRef.current, targetScaleRef.current, 0.12)

      const rx = smoothRef.current.x - RING_HALF
      const ry = smoothRef.current.y - RING_HALF
      const dx = mouseRef.current.x  - DOT_HALF
      const dy = mouseRef.current.y  - DOT_HALF
      const s  = scaleRef.current.toFixed(3)

      ring.style.transform = `translate(${rx}px,${ry}px) scale(${s})`
      dot.style.transform  = `translate(${dx}px,${dy}px)`

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout',  onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  // No output on reduced motion or SSR
  if (reduced) return null

  return (
    <>
      {/* Outer ring — lerp-smoothed, grows on interactive elements */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block"
        style={{
          width:       `${RING_SIZE}px`,
          height:      `${RING_SIZE}px`,
          borderRadius: '50%',
          border:      '1px solid rgba(245,239,230,0.32)',
          transition:  'border-color 0.4s ease',
          willChange:  'transform',
        }}
      />
      {/* Center dot — snaps to exact mouse position */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block"
        style={{
          width:        `${DOT_SIZE}px`,
          height:       `${DOT_SIZE}px`,
          borderRadius: '50%',
          background:   'rgba(242,216,50,0.75)',
          willChange:   'transform',
        }}
      />
    </>
  )
}

'use client'

// ─── CurveTransition ──────────────────────────────────────────────────────────
//
// The signature azizkhaldi.com section sweep: a quadratic Bézier arc bridges two
// sections, and the arc's depth is driven by scroll so it crests as it passes
// through the viewport. Adapted from Aziz's curve path (Q600 … 1200 …), recolored
// to HELO and given a yellow accent stroke along the edge.
//
//   from   — color of the region ABOVE the curve (the section you're leaving)
//   to     — color BELOW the curve / the band fill (the section you're entering)
//   accent — stroke color drawn along the curve edge (HELO yellow by default)
//   height — band height
//
// The SVG uses preserveAspectRatio="none" so the curve stretches edge-to-edge.
// Respects prefers-reduced-motion (renders a static, gently-curved divider).

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

type CurveTransitionProps = {
  from?:   string
  to?:     string
  accent?: string
  height?: string
}

export default function CurveTransition({
  from   = '#ebe9e1',
  to     = '#0e0d0b',
  accent = '#f2d832',
  height = '42vh',
}: CurveTransitionProps) {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)

  // Progress across the whole band passing through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Control-point Y of the quadratic curve.
  // baseline 200 = flat. Lower value = arc crests UP (dark pokes up through light).
  // It dips up as the band enters, then settles back toward flat.
  const cpY = useTransform(scrollYProgress, [0, 0.5, 1], [250, 30, 210])

  // Build the two paths from the live control point.
  const regionPath = useTransform(cpY, v => `M0 0 H1200 V200 Q600 ${v} 0 200 Z`)
  const strokePath = useTransform(cpY, v => `M0 200 Q600 ${v} 1200 200`)

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full overflow-hidden"
      style={{ height, background: to }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        {/* Upper region (the section being left) with a curved bottom edge */}
        <motion.path d={reduced ? 'M0 0 H1200 V200 Q600 120 0 200 Z' : regionPath} fill={from} />
        {/* Yellow accent stroke riding the curve edge */}
        <motion.path
          d={reduced ? 'M0 200 Q600 120 1200 200' : strokePath}
          fill="none"
          stroke={accent}
          strokeWidth={2.5}
          strokeOpacity={0.85}
        />
      </svg>
    </div>
  )
}

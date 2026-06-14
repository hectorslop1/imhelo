'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { duration, ease, viewport } from '@/lib/motion-tokens'

// ─── ClipReveal ───────────────────────────────────────────────────────────────
//
// The primary text/block reveal for HELO. Uses clip-path polygon animation.
//
// Why clip-path over opacity+y:
//   Clip-path is layout-stable (the element keeps its space while hidden) and
//   creates the "emerge from a surface" physicality that opacity+y cannot.
//   It's the technique used consistently on premium portfolios.
//
// Direction options:
//   'up'   — content rises up from below (default, most common)
//   'down' — content falls from above (use for nav/overlays)
//
// Usage:
//   <ClipReveal delay={0.1}>
//     <h2 className="...">Heading</h2>
//   </ClipReveal>

interface ClipRevealProps {
  children:   React.ReactNode
  className?: string
  delay?:     number
  dur?:       number
  direction?: 'up' | 'down'
}

export default function ClipReveal({
  children,
  className,
  delay = 0,
  dur,
  direction = 'up',
}: ClipRevealProps) {
  const reduced     = useReducedMotion()
  const ref         = useRef<HTMLDivElement>(null)
  const inView      = useInView(ref, viewport.once)
  const animDur     = dur ?? duration.slow

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  // polygon(left-top, right-top, right-bottom, left-bottom)
  const hidden  = direction === 'up'
    ? 'polygon(0% 106%, 100% 106%, 100% 106%, 0% 106%)'  // collapsed at bottom
    : 'polygon(0% -6%,  100% -6%,  100% -6%,  0% -6%)'   // collapsed at top

  const visible = 'polygon(0% 0%, 100% 0%, 100% 106%, 0% 106%)'

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: hidden }}
        animate={inView ? { clipPath: visible } : { clipPath: hidden }}
        transition={{ duration: animDur, ease: ease.out, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

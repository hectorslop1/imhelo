'use client'

import type { ReactNode } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from 'motion/react'

// ─── VelocitySkew ─────────────────────────────────────────────────────────────
//
// Wraps content in a subtle scroll-velocity reactive skew: fast scrolling tilts it
// a few degrees, easing back to flat when you stop — the "alive" weight you feel on
// Awwwards sites. Spring-smoothed + clamped so it never looks broken. Reduced-motion
// renders a plain div.
export default function VelocitySkew({
  children,
  className,
  max = 3,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { stiffness: 200, damping: 40, mass: 0.6 })
  const skew = useTransform(smooth, [-3500, 0, 3500], [max, 0, -max], { clamp: true })

  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} style={{ skewY: skew, transformOrigin: 'center' }}>
      {children}
    </motion.div>
  )
}

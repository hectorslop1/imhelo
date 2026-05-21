'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

// ─── ClipReveal ───────────────────────────────────────────────────────────────
//
// Editorial wipe-up reveal using clip-path animation.
//
// The clip-path approach is layout-stable: the hidden content still occupies
// its natural space in the document, so no height jumps on reveal.
//
// Usage:
//   <ClipReveal>
//     <h2 className="...">Heading text</h2>
//   </ClipReveal>
//
// Props:
//   className — applied to the outer wrapper div (for margins, positioning)
//   delay     — seconds before the animation starts (for staggered groups)
//   duration  — animation duration in seconds (default 0.85)
//
// The component respects `prefers-reduced-motion` — renders static on reduced.

const EASE = [0.16, 1, 0.3, 1] as const

interface ClipRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export default function ClipReveal({
  children,
  className,
  delay = 0,
  duration = 0.85,
}: ClipRevealProps) {
  const reduced = useReducedMotion()
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-40px' })

  // On reduced motion, render directly without any animation wrapper
  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        // Polygon starts collapsed at the bottom (fully hidden, layout preserved)
        // Animates to a full rectangle (fully visible)
        initial={{ clipPath: 'polygon(0% 106%, 100% 106%, 100% 106%, 0% 106%)' }}
        animate={
          inView
            ? { clipPath: 'polygon(0% 0%, 100% 0%, 100% 106%, 0% 106%)' }
            : { clipPath: 'polygon(0% 106%, 100% 106%, 100% 106%, 0% 106%)' }
        }
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

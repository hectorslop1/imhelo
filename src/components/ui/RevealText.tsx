'use client'

// ─── RevealText ───────────────────────────────────────────────────────────────
//
// Mask-rise reveal on viewport entry: the content sits inside an overflow-hidden
// box and slides up from below its own mask, so it appears to be "wiped" into
// place from the baseline up. Same heading-reveal language as azizkhaldi.com.
//
// Use for short headings / lines. For long multi-line statements, prefer
// ClipReveal (clip-path wipe) which is layout-stable across wraps.
//
// Props:
//   as       — semantic tag for the outer element (h2, p, span…). Default 'div'.
//   delay    — seconds before the rise starts (stagger groups).
//   duration — rise duration (default 0.8s).

import { useRef, type ElementType } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

type RevealTextProps = {
  children:   React.ReactNode
  className?: string
  as?:        ElementType
  delay?:     number
  duration?:  number
  style?:     React.CSSProperties
}

export default function RevealText({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  duration = 0.8,
  style,
}: RevealTextProps) {
  const reduced = useReducedMotion()
  const ref     = useRef<HTMLSpanElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })

  if (reduced) {
    return <Tag className={className} style={style}>{children}</Tag>
  }

  return (
    <Tag className={className} style={style}>
      {/* Mask box — clips the rising content */}
      <span ref={ref} className="block overflow-hidden" style={{ paddingBottom: '0.04em' }}>
        <motion.span
          className="block"
          initial={{ y: '115%' }}
          animate={inView ? { y: '0%' } : { y: '115%' }}
          transition={{ duration, ease: EASE, delay }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  )
}

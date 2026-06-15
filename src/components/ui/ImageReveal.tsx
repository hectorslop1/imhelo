'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { duration, ease, viewport } from '@/lib/motion-tokens'

// ─── ImageReveal ──────────────────────────────────────────────────────────────
//
// Premium reveal for images and media containers:
//   1. Outer wrapper: clips from top (inset reveal downward — image appears
//      to be uncovered like a blind being raised)
//   2. Inner image: slight counter-scale (starts 1.08, settles to 1.0)
//      gives the classic Ken Burns entry feel.
//
// This matches the scale-on-reveal pattern seen on high-end portfolio sites.
//
// Props:
//   className   — applied to outer wrapper (set width/height here)
//   delay       — seconds before reveal starts (for stagger groups)
//   direction   — 'up' (default) or 'down' for the wipe direction
//   children    — the <img>, <video>, or any block element

interface ImageRevealProps {
  children:   React.ReactNode
  className?: string
  style?:     React.CSSProperties
  delay?:     number
  direction?: 'up' | 'left'
}

export default function ImageReveal({
  children,
  className,
  style,
  delay = 0,
  direction = 'up',
}: ImageRevealProps) {
  const reduced = useReducedMotion()
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, viewport.once)

  // Default to a soft radius so no image reads as a hard square. A usage can opt
  // out with `rounded-none` or set its own `rounded-*` (both respected).
  const cls = `${className ?? ''}${className?.includes('rounded') ? '' : ' rounded-2xl'}`.trim()

  if (reduced) {
    return <div ref={ref} className={cls} style={{ overflow: 'hidden', ...style }}>{children}</div>
  }

  const hiddenClip  = direction === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
  const visibleClip = 'inset(0% 0% 0% 0%)'

  return (
    <div ref={ref} className={cls} style={{ overflow: 'hidden', position: 'relative', ...style }}>
      {/* Clip-path wipe layer — must fill the parent fully for aspect-ratio to work */}
      <motion.div
        initial={{ clipPath: hiddenClip }}
        animate={inView ? { clipPath: visibleClip } : { clipPath: hiddenClip }}
        transition={{ duration: duration.slow, ease: ease.drawer, delay }}
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      >
        {/* Counter-scale so image fills frame as the clip opens */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: duration.slow + 0.15, ease: ease.out, delay }}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

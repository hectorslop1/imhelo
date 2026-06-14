'use client'

// ─── CountUp ──────────────────────────────────────────────────────────────────
//
// Animates an integer from 0 to `value` once it scrolls into view, with an
// ease-out-cubic curve (fast start, gentle settle). Same stat-counter motion as
// azizkhaldi.com's "4+ / 30+" figures. Suffix (e.g. "+") is appended verbatim.
//
// Pure rAF — no React re-render churn beyond the displayed number, and it stops
// cleanly on unmount. Respects prefers-reduced-motion (renders the final value).

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

type CountUpProps = {
  value:      number
  suffix?:    string
  duration?:  number   // seconds
  className?: string
  style?:     React.CSSProperties
}

export default function CountUp({
  value,
  suffix = '',
  duration = 1.5,
  className,
  style,
}: CountUpProps) {
  const reduced = useReducedMotion()
  const ref     = useRef<HTMLSpanElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) { setN(value); return }

    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p     = Math.min((t - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)   // ease-out-cubic
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className} style={style}>
      {n}{suffix}
    </span>
  )
}

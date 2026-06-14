'use client'

// ─── MagneticLink ─────────────────────────────────────────────────────────────
//
// Cursor-magnetic hover interaction. While the pointer is over (and near) the
// element, it translates toward the cursor by a fraction of the offset; on leave
// it springs back to rest. Same microinteraction language as azizkhaldi.com's
// buttons and nav.
//
// Implementation notes:
//   • The OUTER wrapper holds the listeners and is never transformed, so its
//     bounding rect stays stable — no measurement feedback loop.
//   • The INNER motion.span carries the spring-smoothed x/y translate.
//   • Respects prefers-reduced-motion (renders a plain link, no motion).
//
// Props:
//   strength — fraction of the cursor offset to follow (0.3–0.5 feels good)
//   as       — 'a' (internal/external link, default) or 'button'-like via onClick

import { useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type MagneticLinkProps = {
  href:       string
  children:   ReactNode
  className?: string
  style?:     React.CSSProperties
  external?:  boolean
  strength?:  number
  onClick?:   (e: React.MouseEvent<HTMLAnchorElement>) => void
  ariaLabel?: string
}

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 } as const

export default function MagneticLink({
  href,
  children,
  className,
  style,
  external,
  strength = 0.4,
  onClick,
  ariaLabel,
}: MagneticLinkProps) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)

  const x  = useMotionValue(0)
  const y  = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !wrapRef.current) return
    const r  = wrapRef.current.getBoundingClientRect()
    const cx = r.left + r.width  / 2
    const cy = r.top  + r.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: 'inline-block' }}
    >
      <motion.span style={{ x: sx, y: sy, display: 'inline-block' }}>
        <Link
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn('inline-block', className)}
          style={style}
          {...linkProps}
        >
          {children}
        </Link>
      </motion.span>
    </div>
  )
}

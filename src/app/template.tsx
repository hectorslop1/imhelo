'use client'

import { motion, useReducedMotion } from 'motion/react'

// ─── Page Transition Template ─────────────────────────────────────────────────
//
// Next.js App Router `template.tsx` re-mounts on every route change (unlike
// layout.tsx which persists). This makes it the right place for page transitions.
//
// Sequence:
//   t=0        — Overlay is fully opaque. HELO wordmark is visible.
//   t=0→0.5s  — Overlay fades out (with HELO mark).
//   t=0.3→0.7s — Page content fades in (slight overlap = smooth blend).
//
// `pointer-events: none` on the overlay so the page is interactive immediately.
// Respects `prefers-reduced-motion`.

const EASE = [0.16, 1, 0.3, 1] as const

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <>
      {/* ── Branded transition overlay ── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
        className="fixed inset-0 z-[9990] flex items-center justify-center bg-[#080808]"
        style={{ pointerEvents: 'none' }}
        aria-hidden
      >
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeIn' }}
          style={{
            fontFamily:    'var(--font-singapore-sling)',
            fontSize:      'clamp(36px, 6vw, 72px)',
            letterSpacing: '0.12em',
            color:         '#f2d832',
            lineHeight:    1,
            userSelect:    'none',
          }}
        >
          HELO
        </motion.span>
      </motion.div>

      {/* ── Page content — fades in as overlay clears ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.32 }}
      >
        {children}
      </motion.div>
    </>
  )
}

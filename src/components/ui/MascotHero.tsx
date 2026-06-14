'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react'

// ─── MascotHero ───────────────────────────────────────────────────────────────
//
// The HELO flame character as a living hero centerpiece — our answer to Aziz's
// WebGL blob, built entirely from the existing PNG (no animation assets needed).
//
// Layered behaviour:
//   1. Entrance   — springs up + scales in with a soft overshoot (character bounce)
//   2. Idle float — continuous bob + breathing + micro-sway (always feels alive)
//   3. Cursor lean — tilts in 3D toward the pointer, spring-smoothed (desktop only)
//   4. Flame glow — warm radial behind the head, slow pulse + fast flicker
//   5. Embers     — a few sparks drifting up from the flame (thematic, subtle)
//   6. Ground shadow — contracts as it floats up, selling the levitation
//
// Reduced-motion: renders a clean static character. Touch/coarse pointers skip
// the cursor lean and embers for performance.

const MASCOT_SRC = '/assetshelo/helomascot/Helo.png'
const ASPECT = 1122 / 1402 // width / height of the source art

interface MascotHeroProps {
  /** Rendered height of the character in px (width derives from aspect). */
  height?: number
  className?: string
}

export default function MascotHero({ height = 440, className = '' }: MascotHeroProps) {
  const reduced = useReducedMotion() ?? false
  const wrapRef = useRef<HTMLDivElement>(null)

  // Embers use Math.random(), so they are mounted client-side only to avoid a
  // server/client hydration mismatch.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const width = Math.round(height * ASPECT)

  // ── Cursor lean — normalized pointer position (-1..1) from viewport center ──
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const springCfg = { stiffness: 110, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [-1, 1], [14, -14]), springCfg)
  const rotateX = useSpring(useTransform(py, [-1, 1], [-11, 11]), springCfg)
  const leanX = useSpring(useTransform(px, [-1, 1], [22, -22]), springCfg)
  const leanY = useSpring(useTransform(py, [-1, 1], [14, -14]), springCfg)

  useEffect(() => {
    if (reduced) return
    // Only enable the cursor lean for fine pointers (desktop)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / cx)))
      py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / cy)))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [px, py, reduced])

  // ── Embers — stable randomized spark config ──
  const embers = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        left: 40 + Math.random() * 20, // % across the flame head
        size: 4 + Math.random() * 5,
        delay: Math.random() * 4,
        dur: 2.6 + Math.random() * 2.2,
        drift: (Math.random() - 0.5) * 36,
      })),
    [],
  )

  return (
    <div
      ref={wrapRef}
      className={`relative select-none ${className}`}
      style={{ width, height, perspective: 1100 }}
      aria-hidden
    >
      {/* ── Flame glow — warm halo behind the head ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '8%',
          width: height * 0.85,
          height: height * 0.85,
          x: '-50%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(242,216,50,0.55) 0%, rgba(242,216,50,0.18) 38%, transparent 70%)',
          filter: 'blur(6px)',
        }}
        animate={
          reduced
            ? { opacity: 0.5 }
            : { opacity: [0.45, 0.85, 0.55, 0.8, 0.45], scale: [1, 1.06, 0.98, 1.04, 1] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Embers — sparks drifting up from the flame (client-only) ── */}
      {mounted && !reduced &&
        embers.map((e) => (
          <motion.span
            key={e.id}
            className="absolute rounded-full pointer-events-none hidden lg:block"
            style={{
              left: `${e.left}%`,
              top: '14%',
              width: e.size,
              height: e.size,
              background: 'radial-gradient(circle, #ffe773 0%, #f2d832 55%, rgba(242,216,50,0) 100%)',
            }}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 0.9, 0],
              y: [0, -height * 0.34],
              x: [0, e.drift],
              scale: [0.6, 1, 0.3],
            }}
            transition={{
              duration: e.dur,
              delay: e.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}

      {/* ── Entrance wrapper — one-shot spring-in ── */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { opacity: 0, scale: 0.82, y: 36 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.15 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── Cursor lean wrapper — 3D tilt toward pointer ── */}
        <motion.div
          className="absolute inset-0"
          style={
            reduced
              ? undefined
              : { rotateX, rotateY, x: leanX, y: leanY, transformStyle: 'preserve-3d' }
          }
        >
          {/* ── Idle float wrapper — perpetual bob + breathing + sway ── */}
          <motion.div
            className="absolute inset-0"
            animate={
              reduced
                ? undefined
                : { y: [0, -16, 0], rotate: [0, 1.1, 0, -1.1, 0], scale: [1, 1.015, 1] }
            }
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={MASCOT_SRC}
              alt="HELO — the brand character"
              fill
              priority
              sizes={`${width}px`}
              className="object-contain"
              style={{ filter: 'drop-shadow(0 22px 30px rgba(20,19,15,0.18))' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Ground shadow — contracts on the up-beat of the float ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          bottom: '-3%',
          width: width * 0.62,
          height: height * 0.06,
          x: '-50%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(20,19,15,0.28) 0%, rgba(20,19,15,0.10) 45%, transparent 72%)',
          filter: 'blur(3px)',
        }}
        animate={reduced ? { opacity: 0.2 } : { scaleX: [1, 0.84, 1], opacity: [0.24, 0.14, 0.24] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

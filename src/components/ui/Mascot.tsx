'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'

// ─── Mascot pose config ───────────────────────────────────────────────────────
//
// To swap a pose: update the path value here.
// To add a new pose: add a key + drop the asset in /public/assetshelo/helomascot/
// The component reads from this map — nothing else in the codebase needs to change.
//
// Usage:
//   <Mascot />                          → idle, 80 px, static
//   <Mascot pose="wave" size={120} />
//   <Mascot interactive size={140} />   → flat image leans toward the cursor (faux-3D look-at) + idle float
//
// ── Upgrading to a real cursor-following character (Rive — recommended for a 2D
//    mascot, mirrors azizkhaldi.com's look-at robot) ─────────────────────────────
//   1. Author a `.riv` rig with a state machine + a "mouse tracking" Listener in
//      the Rive editor (or reskin Rive's free cursor-follow template) and drop it
//      in /public/assetshelo/helomascot/.
//   2. `npm i @rive-app/react-canvas`.
//   3. Swap the <Image>/tilt block below for <RiveComponent> bound to that state
//      machine. Rive then owns the cursor tracking, so the pointer wiring here can
//      be deleted. Everything else in the codebase keeps importing <Mascot/> as-is.

export const MASCOT_POSES = {
  idle: '/assetshelo/helomascot/Helo.png',
  wave: '/assetshelo/helomascot/Helo.png',   // replace path when wave asset is ready
  // future example:
  // celebrate: '/assetshelo/helomascot/Helo-celebrate.png',
} as const

export type MascotPose = keyof typeof MASCOT_POSES

interface MascotProps {
  pose?:        MascotPose
  size?:        number
  className?:   string
  /** Lean toward the cursor (faux-3D look-at) + idle float. Off by default so inline marks stay static. */
  interactive?: boolean
  /** Max look-at tilt in degrees. */
  maxTilt?:     number
}

const SPRING = { stiffness: 150, damping: 18, mass: 0.6 } as const

export default function Mascot({
  pose        = 'idle',
  size        = 80,
  className   = '',
  interactive = false,
  maxTilt     = 16,
}: MascotProps) {
  const reduced = useReducedMotion() ?? false
  const wrapRef = useRef<HTMLDivElement>(null)

  // Pointer offset from the mascot centre, normalised to roughly -1..1.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-1, 1], [-maxTilt, maxTilt]), SPRING)
  const rotateX = useSpring(useTransform(py, [-1, 1], [maxTilt, -maxTilt]), SPRING)

  const active = interactive && !reduced

  useEffect(() => {
    if (!active) return
    let raf = 0
    const NORM = 380 // px from centre to reach full tilt — tighter = more reactive
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / NORM)))
        py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / NORM)))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [active, px, py])

  // Static render — identical to the original, used for inline marks and reduced motion.
  if (!active) {
    return (
      <div
        className={`relative select-none pointer-events-none shrink-0 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        <Image src={MASCOT_POSES[pose]} alt="HELO brand character" fill className="object-contain" />
      </div>
    )
  }

  // Interactive render — leans toward the cursor (perspective + rotateX/Y) over a gentle idle float.
  return (
    <div
      ref={wrapRef}
      className={`relative select-none pointer-events-none shrink-0 ${className}`}
      style={{ width: size, height: size, perspective: 600 }}
      aria-hidden
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
        >
          <Image src={MASCOT_POSES[pose]} alt="HELO brand character" fill className="object-contain" />
        </motion.div>
      </motion.div>
    </div>
  )
}

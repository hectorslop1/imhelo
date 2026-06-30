'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
  type AnimationPlaybackControls,
} from 'motion/react'
import StickerPeel from '@/components/ui/StickerPeel'

// ─── HeroSticker ────────────────────────────────────────────────────────────────
//
// The HELO flame as a scroll-driven physical sticker. No holographic foil — a clean,
// stable die-cut flame whose premium feel comes entirely from physics + continuity.
//
// State machine (one direction-aware flow, never a blind reverse):
//
//   attached → peeling → falling → out → returning → attached
//
//   • attached  — flat sticker resting in the layout slot. Fixed clone hidden.
//   • peeling   — scroll scrubs a slow, deliberate peel from the TOP edge down; reversible
//                 (scroll back up → attached) right up until it is FULLY lifted.
//   • falling   — the instant the peel COMPLETES it commits: it hangs there a beat, fully
//                 lifted and sagging under its own weight, THEN drops in an autonomous gravity
//                 fall. Frozen in place (no longer scroll-tracked) so the whole beat is seen.
//   • out       — fully past the bottom, hidden. Stays gone no matter how far you scroll.
//   • returning — on scrolling back into the Hero it RISES BACK IN FROM BELOW (where it fell),
//                 still curled, then presses on from the BOTTOM edge up to the top (peel → 0):
//                 bottom adheres first, the top flap lays down last — the peel-off in reverse.
//
// The flying sticker lives in a FIXED overlay portaled to <body>, so it crosses the whole
// viewport free of any hero overflow / transform / stacking trap. The resting sticker and the
// flying clone are the SAME flat artifact, so the attach/detach swap is pixel-identical
// (no flash, no reload). Reduced motion → a plain static sticker.

const SRC = '/assetshelo/helomascot/Helo.png'
// Serve the 1.16 MB mascot PNG through Next's optimizer (resized webp, alpha kept)
// — it's the home-hero LCP element. w=828 covers retina at the rendered size.
const SRC_OPT = `/_next/image?url=${encodeURIComponent(SRC)}&w=828&q=75`
const ASPECT = 1122 / 1402

// Scroll thresholds — fraction of one viewport scrolled from the Hero top.
const PEEL_START = 0.02 // begin lifting once scrolling down past here
const PEEL_END = 0.32 // peel scrubs to FULLY lifted by here (slow, hand-peeled) → then commits
const RESET_AT = 0.01 // back above here while peeling → snap to rest
const RETURN_AT = 0.12 // scrolling back UP into the hero past here → rise back in from below
const RETURN_PEEL = 0.92 // returns strongly curled — adheres bottom→top (peel → 0) on landing

type Phase = 'attached' | 'peeling' | 'falling' | 'out' | 'returning'

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smooth = (t: number) => t * t * (3 - 2 * t) // smoothstep

interface HeroStickerProps {
  height?: number
  className?: string
}

export default function HeroSticker({ height = 340, className = '' }: HeroStickerProps) {
  const reduced = useReducedMotion() ?? false
  const width = Math.round(height * ASPECT)

  const slotRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const phaseRef = useRef<Phase>('attached')
  const flight = useRef<AnimationPlaybackControls[]>([])
  const rafRef = useRef(0)
  const lastYRef = useRef(0)

  const [mounted, setMounted] = useState(false)
  const [attached, setAttached] = useState(true)
  // Client-only mount gate for the <body> portal (avoids SSR hydration mismatch).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  // Base = the slot's live viewport rect, so the fixed clone sits exactly over it.
  const slotX = useMotionValue(0)
  const slotY = useMotionValue(0)
  // Flight offsets, added on top of the base.
  const offX = useMotionValue(0)
  const offY = useMotionValue(0)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const rotZ = useMotionValue(0)
  const scale = useMotionValue(1)
  const opacity = useMotionValue(0) // flying clone (0 while attached)
  const peel = useMotionValue(0) // 0 = flat, 1 = fully peeled

  // Spring only the scroll-scrubbed peel → smooth, snappy lift without per-frame setState.
  const peelD = useSpring(peel, { stiffness: 240, damping: 28, mass: 0.6 })

  const tx = useTransform(() => slotX.get() + offX.get())
  const ty = useTransform(() => slotY.get() + offY.get())

  // Push the peel onto the CSS variable StickerPeel reads (no React re-render per frame).
  useMotionValueEvent(peelD, 'change', v => {
    wrapRef.current?.style.setProperty('--peel', String(v))
  })

  const { scrollY } = useScroll()

  const measureSlot = () => {
    const el = slotRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    slotX.set(r.left)
    slotY.set(r.top)
  }

  const setPhase = (p: Phase) => {
    phaseRef.current = p
    setAttached(p === 'attached')
  }

  const stopFlight = () => {
    flight.current.forEach(a => a.stop())
    flight.current = []
  }

  // Continuous, scroll-scrubbed peel (reversible until we commit to the fall).
  const drivePeel = (p: number) => {
    peel.set(smooth(clamp01(p / PEEL_END)))
  }

  // Autonomous detach — fires the instant the peel COMPLETES. Hangs fully lifted a beat,
  // sagging under its own weight, then drops. Frozen in place (not scroll-tracked) so the
  // whole "fully peeled → lets go → falls" beat plays out on screen.
  const startFall = () => {
    stopFlight()
    measureSlot() // freeze an accurate base before going fixed-independent
    setPhase('falling')
    peel.set(1) // ensure the peel reads fully complete even on a fast scroll jump
    opacity.set(1)
    const H = window.innerHeight
    const distance = H * 1.2 + height
    // 1) Hang: fully peeled, drooping under its own weight — the "barely holding on" beat.
    flight.current = [
      animate(offY, 18, { duration: 0.5, ease: [0.34, 0, 0.5, 1] }),
      animate(rotZ, 5, { duration: 0.5, ease: 'easeOut' }),
    ]
    flight.current[0].finished
      .then(() => {
        if (phaseRef.current !== 'falling') return
        // 2) Let go — autonomous gravity fall, finishes on its own regardless of scroll.
        flight.current = [
          animate(offY, distance, { duration: 0.95, ease: [0.4, 0, 1, 1] }), // gravity ease-in
          animate(offX, 28, { duration: 0.95, ease: [0.33, 0, 0.67, 1] }),
          animate(rotZ, 17, { duration: 0.95, ease: [0.33, 0, 0.67, 1] }),
          animate(rotX, -7, { duration: 0.55, ease: 'easeOut' }),
          animate(rotY, 5, { duration: 0.55, ease: 'easeOut' }),
          animate(scale, 0.9, { duration: 0.95, ease: [0.4, 0, 1, 1] }),
        ]
        flight.current[0].finished
          .then(() => {
            if (phaseRef.current !== 'falling') return
            opacity.set(0)
            setPhase('out')
            // If the user raced back to the top during the fall, bring it straight back in.
            if (window.scrollY / window.innerHeight < RETURN_AT) startReturn()
          })
          .catch(() => {})
      })
      .catch(() => {})
  }

  // Rise back in from BELOW (where it fell), still curled, then press it on bottom→top.
  const startReturn = () => {
    stopFlight()
    setPhase('returning')
    measureSlot()
    const H = window.innerHeight
    // jump() = set value AND zero out velocity, so the spring below doesn't inherit
    // leftover velocity from the fall (which would fling it far past the start point).
    peel.jump(RETURN_PEEL) // arrives strongly curled — lays down (sticks) after it rises in
    peelD.jump(RETURN_PEEL)
    scale.jump(1)
    opacity.set(1)
    offY.jump(H * 0.6 + height) // start below the fold — it returns the way it left
    offX.jump(20)
    rotZ.jump(7)
    rotX.jump(-6)
    rotY.jump(-5)
    flight.current = [
      // Near-critically damped → soft arrival, no exaggerated bounce, settles promptly.
      animate(offY, 0, { type: 'spring', stiffness: 120, damping: 22, mass: 1 }),
      animate(offX, 0, { duration: 0.9, ease: [0.22, 1, 0.36, 1] }),
      animate(rotZ, 0, { duration: 0.85, ease: [0.22, 1, 0.36, 1] }),
      animate(rotY, 0, { duration: 0.85, ease: [0.22, 1, 0.36, 1] }),
    ]
    flight.current[0].finished
      .then(() => {
        if (phaseRef.current !== 'returning') return
        offX.set(0)
        offY.set(0)
        rotZ.set(0)
        rotY.set(0)
        scale.set(1)
        // In place, still curled & tilted — now press it on from the BOTTOM edge up to the
        // top (peel → 0, tilt → 0 together): bottom adheres first, the top flap lays down
        // last. The peel-off lift played in reverse — it should feel like a real sticker.
        const stick = animate(peel, 0, { duration: 0.6, ease: [0.22, 1, 0.36, 1] })
        const stickTilt = animate(rotX, 0, { duration: 0.6, ease: [0.22, 1, 0.36, 1] })
        flight.current = [stick, stickTilt]
        Promise.all([stick.finished, stickTilt.finished])
          .then(() => {
            if (phaseRef.current !== 'returning') return
            setPhase('attached') // resting sticker shows (pixel-identical)
            opacity.set(0) // hide clone same frame → invisible swap
            // If the user scrolled back down during the return, hand straight off to the peel.
            if (window.scrollY / window.innerHeight >= PEEL_END) startFall()
          })
          .catch(() => {})
      })
      .catch(() => {})
  }

  // Enter the peel/leave flow from a clean pose (used from attached, and to interrupt a
  // just-landed return when the user scrolls back down before the spring formally finishes).
  const enterPeeling = (p: number) => {
    stopFlight()
    offX.jump(0)
    offY.jump(0)
    rotX.jump(0)
    rotY.jump(0)
    rotZ.jump(0)
    scale.jump(1)
    opacity.set(1) // show the (identical) fixed clone
    measureSlot()
    if (p >= PEEL_END) {
      startFall()
    } else {
      setPhase('peeling')
      drivePeel(p)
    }
  }

  // Snap everything back to the resting state.
  const resetAttached = () => {
    stopFlight()
    peel.jump(0)
    peelD.jump(0)
    offX.jump(0)
    offY.jump(0)
    rotX.jump(0)
    rotY.jump(0)
    rotZ.jump(0)
    scale.jump(1)
    opacity.set(0)
    setPhase('attached')
  }

  // ── React to scroll via the state machine ──
  useMotionValueEvent(scrollY, 'change', yPx => {
    if (reduced || !mounted) return
    const p = yPx / window.innerHeight
    const goingDown = yPx > lastYRef.current
    lastYRef.current = yPx
    const phase = phaseRef.current

    switch (phase) {
      case 'attached': {
        // Only peel when scrolling DOWN — coming back up never re-triggers a peel.
        if (goingDown && p > PEEL_START) enterPeeling(p)
        break
      }
      case 'peeling': {
        if (p <= RESET_AT) {
          resetAttached() // reversed back to top → rest cleanly (offY stayed 0)
        } else if (p >= PEEL_END) {
          startFall() // fully peeled → commit; from here the hang + fall are autonomous
        } else {
          measureSlot() // keep the clone glued to the slot while scrubbing
          drivePeel(p) // reversible: scrubs both ways until we commit
        }
        break
      }
      case 'falling':
        break // committed — ignore scroll, the fall finishes on its own
      case 'out': {
        // Only drop back in when scrolling UP into the hero — never mid-page.
        if (!goingDown && p < RETURN_AT) startReturn()
        break
      }
      case 'returning': {
        // Let the drop land undisturbed; but once it's home, a downward scroll hands
        // straight back off to the peel/fall (covers scrolling down right after a return,
        // before the landing spring formally settles).
        if (goingDown && p > PEEL_START && Math.abs(offY.get()) < 8) enterPeeling(p)
        break
      }
    }
  })

  // Keep the clone glued to the slot ONLY during the short windows that need it
  // (peeling + returning). Avoids per-frame getBoundingClientRect the rest of the time.
  useEffect(() => {
    if (reduced) return
    measureSlot()
    const onResize = () => measureSlot()
    window.addEventListener('resize', onResize)
    const loop = () => {
      const ph = phaseRef.current
      if (ph === 'peeling' || ph === 'returning') measureSlot()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  // Resting / flying both render this flat, stable sticker — keeps the swap invisible.
  const resting = (
    <StickerPeel
      imageSrc={SRC_OPT}
      width={width}
      rotate={0}
      peelDirection={0}
      shadowIntensity={0.5}
      disableDrag
      noHoverPeel
      noSpecular
    />
  )

  // Reduced motion — plain static sticker, no scroll choreography.
  if (reduced) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        {resting}
      </div>
    )
  }

  return (
    <>
      {/* Layout slot — reserves space + holds the attached (resting) sticker */}
      <div ref={slotRef} className={`relative ${className}`} style={{ width, height }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: attached ? 1 : 0,
            pointerEvents: attached ? 'auto' : 'none',
          }}
        >
          {resting}
        </div>
      </div>

      {/* Flying / peeling sticker — fixed overlay portaled to <body> (escapes hero stacking) */}
      {mounted &&
        createPortal(
          <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' }}>
            <motion.div
              ref={wrapRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width,
                x: tx,
                y: ty,
                rotateX: rotX,
                rotateY: rotY,
                rotateZ: rotZ,
                scale,
                opacity,
                transformPerspective: 1000,
                transformOrigin: 'center top',
                // will-change only while actually in flight, not permanently.
                willChange: attached ? 'auto' : 'transform, opacity',
              }}
            >
              <StickerPeel
                imageSrc={SRC_OPT}
                width={width}
                rotate={0}
                peelDirection={0}
                peelBackActivePct={80}
                shadowIntensity={0.5}
                disableDrag
                varPeel
                noHoverPeel
                noSpecular
              />
            </motion.div>
          </div>,
          document.body,
        )}
    </>
  )
}

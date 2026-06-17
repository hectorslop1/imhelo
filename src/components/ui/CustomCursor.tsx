'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// ─── Custom Cursor — HELO Happy Face (custom SVG, fully interactive) ─────────────
//
// Desktop / fine-pointer only. One rAF loop, direct DOM writes (60fps, no re-renders).
//
//   • Rest    → a hand-drawn smiley (the HELO isotype language: "H" eye + "Ξ" eye +
//               smile) follows the pointer with a snappy lerp and a slow idle spin.
//   • Motion  → it leans into travel; shake it fast and it GROWS (macOS-style) and
//               swaps to a dizzy face (spiral eyes + wavy mouth), then settles.
//   • Hover   → over a / button / [data-cursor] it "hugs" the element: a rounded box
//               springs to wrap its bounds. The hug is re-evaluated on scroll so it
//               never stays stuck on an element you've scrolled away from.

const LERP = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, min: number, max: number) => (v < min ? min : v > max ? max : v)

const BASE = 30
const FACE_LERP = 0.24
const HUG_LERP = 0.2
const HUG_PAD = 8
const INTERACTIVE = 'a, button, [data-cursor="grow"], input, textarea, [role="button"]'

export default function CustomCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const faceRef = useRef<HTMLDivElement>(null)
  const happyRef = useRef<HTMLImageElement>(null)
  const dizzyRef = useRef<SVGSVGElement>(null)
  const hugRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  const mouse = useRef({ x: -200, y: -200 })
  const face = useRef({ x: -200, y: -200 })
  const prev = useRef({ x: -200, y: -200 })
  const rot = useRef(0)
  const spin = useRef(0)
  const dizzy = useRef(0)
  const scale = useRef(1)
  const visible = useRef(0)

  const hug = useRef<{ x: number; y: number; w: number; h: number; r: number } | null>(null)
  const hugBox = useRef({ x: -200, y: -200, w: 0, h: 0, r: 16, o: 0 })

  useEffect(() => {
    if (reduced) return
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return
    const faceEl = faceRef.current
    const hugEl = hugRef.current
    const happyEl = happyRef.current
    const dizzyEl = dizzyRef.current
    if (!faceEl || !hugEl) return

    const elementToHug = (el: Element | null) => {
      const t = el?.closest(INTERACTIVE) as HTMLElement | null
      if (!t) return null
      const r = t.getBoundingClientRect()
      const radius = parseFloat(getComputedStyle(t).borderRadius) || 12
      return {
        x: r.left - HUG_PAD,
        y: r.top - HUG_PAD,
        w: r.width + HUG_PAD * 2,
        h: r.height + HUG_PAD * 2,
        r: Math.min(radius + HUG_PAD, r.height / 2 + HUG_PAD),
      }
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      visible.current = 1
      hug.current = elementToHug(e.target as Element | null)
    }
    // Re-evaluate what's under the pointer on scroll → never a stuck hug, and the
    // face reappears after programmatic scroll (e.g. back-to-top).
    const onScroll = () => {
      hug.current = elementToHug(document.elementFromPoint(mouse.current.x, mouse.current.y))
    }

    const tick = () => {
      face.current.x = LERP(face.current.x, mouse.current.x, FACE_LERP)
      face.current.y = LERP(face.current.y, mouse.current.y, FACE_LERP)

      const vx = mouse.current.x - prev.current.x
      const vy = mouse.current.y - prev.current.y
      prev.current = { x: mouse.current.x, y: mouse.current.y }
      const speed = Math.hypot(vx, vy)

      rot.current = LERP(rot.current, clamp(vx * 0.5, -22, 22), 0.18)
      spin.current = (spin.current + 0.32) % 360
      // Agitation builds fast with speed, then eases off SLOWLY so the dizzy face
      // lingers and is clearly perceptible (macOS shake feel).
      dizzy.current = clamp(dizzy.current + (speed > 34 ? 0.13 : -0.016), 0, 1)
      const wobble = dizzy.current > 0.4 ? Math.sin(performance.now() / 42) * 20 * dizzy.current : 0

      const hovering = hug.current !== null
      // Grow noticeably on shake (macOS), shrink while hugging.
      const targetScale = (hovering ? 0.4 : 1) * (1 + dizzy.current * 1.25)
      scale.current = LERP(scale.current, targetScale, 0.2)
      const faceOpacity = visible.current * (hovering ? 0 : 1)

      faceEl.style.opacity = faceOpacity.toFixed(2)
      faceEl.style.transform = `translate3d(${(face.current.x - BASE / 2).toFixed(2)}px, ${(face.current.y - BASE / 2).toFixed(2)}px, 0) rotate(${(spin.current + rot.current + wobble).toFixed(2)}deg) scale(${scale.current.toFixed(3)})`

      // Expression crossfade
      if (happyEl) happyEl.style.opacity = (1 - dizzy.current).toFixed(2)
      if (dizzyEl) dizzyEl.style.opacity = dizzy.current.toFixed(2)

      // Hug box
      const b = hugBox.current
      if (hug.current) {
        const t = hug.current
        b.x = LERP(b.x, t.x, HUG_LERP); b.y = LERP(b.y, t.y, HUG_LERP)
        b.w = LERP(b.w, t.w, HUG_LERP); b.h = LERP(b.h, t.h, HUG_LERP)
        b.r = LERP(b.r, t.r, HUG_LERP); b.o = LERP(b.o, 1, 0.2)
      } else {
        b.x = LERP(b.x, mouse.current.x - 4, 0.3); b.y = LERP(b.y, mouse.current.y - 4, 0.3)
        b.w = LERP(b.w, 8, 0.3); b.h = LERP(b.h, 8, 0.3)
        b.r = LERP(b.r, 8, 0.3); b.o = LERP(b.o, 0, 0.25)
      }
      hugEl.style.opacity = (b.o * visible.current).toFixed(2)
      hugEl.style.transform = `translate3d(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px, 0)`
      hugEl.style.width = `${b.w.toFixed(1)}px`
      hugEl.style.height = `${b.h.toFixed(1)}px`
      hugEl.style.borderRadius = `${b.r.toFixed(1)}px`

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])

  if (reduced || !enabled) return null

  return (
    <>
      {/* Magnetic hug box */}
      <div
        ref={hugRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: 8, height: 8, opacity: 0,
          border: '1.5px solid rgba(242,216,50,0.9)',
          background: 'rgba(242,216,50,0.06)',
          willChange: 'transform, width, height, opacity',
        }}
      />
      {/* Happy Face — exact isotype at rest, crossfades to a dizzy face on shake */}
      <div
        ref={faceRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ width: BASE, height: BASE, opacity: 0, willChange: 'transform, opacity' }}
      >
        {/* Rest — the real HELO isotype (pixel-exact smile + color) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={happyRef}
          src="/assetshelo/imhelologo/HappyFace.png"
          alt=""
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.28))' }}
        />
        {/* Shake — dizzy face (spiral eyes + wavy mouth) */}
        <svg
          ref={dizzyRef}
          viewBox="0 0 100 100"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, overflow: 'visible', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.28))' }}
        >
          <circle cx="50" cy="50" r="45" fill="#f2d832" stroke="#16150f" strokeWidth="5" />
          <g fill="none" stroke="#16150f" strokeWidth="4.5" strokeLinecap="round">
            <path d="M36 42 m-7 0 a7 7 0 1 1 7 7 a4 4 0 1 1 -4 -4" />
            <path d="M64 42 m-7 0 a7 7 0 1 1 7 7 a4 4 0 1 1 -4 -4" />
            <path d="M32 66 q6 -7 12 0 t12 0" />
          </g>
        </svg>
      </div>
    </>
  )
}

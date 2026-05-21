'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { projects } from '@/data/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Bespoke project visuals ──────────────────────────────────────────────────
// CSS-only illustrations — replaced automatically when real assets are placed
// at the paths defined in src/data/projects.ts

function NascarVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(158deg, #111108 0%, #0e0e06 100%)' }} />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(118deg, transparent ${28 + i * 9}%, rgba(242,216,50,${0.11 - i * 0.03}) ${28 + i * 9}%, rgba(242,216,50,${0.11 - i * 0.03}) ${30 + i * 9}%, transparent ${30 + i * 9}%)`,
          }}
        />
      ))}
      <div
        className="absolute -bottom-1 left-0 right-0 overflow-hidden pointer-events-none"
        style={{ lineHeight: 0 }}
      >
        <p
          className="leading-none select-none whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '180px',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            color: '#f2d832',
            opacity: 0.07,
          }}
        >
          GIGFAST
        </p>
      </div>
    </div>
  )
}

function MobileVisual() {
  const frames = [
    { w: 130, h: 256, dx: -140, dy: -108, rot: '-7deg', z: 1 },
    { w: 150, h: 300, dx: -75,  dy: -130, rot: '0deg',  z: 3 },
    { w: 118, h: 236, dx: 80,   dy: -100, rot: '6deg',  z: 2 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a0a12 0%, #08080f 100%)' }}>
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 1, height: 1 }}>
          {frames.map((f, i) => (
            <div
              key={i}
              className="absolute rounded-[18px] border border-white/[0.09]"
              style={{
                width: f.w, height: f.h, left: f.dx, top: f.dy,
                transform: `rotate(${f.rot})`,
                background: 'rgba(255,255,255,0.02)',
                boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
                zIndex: f.z,
              }}
            >
              <div className="w-8 h-2 rounded-full bg-black/50 mx-auto mt-2.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InteractiveVisual() {
  const cols = 14; const rows = 7
  const ACTIVE = new Set([16, 17, 30, 31, 32, 44, 45, 58, 59, 60, 72, 73])
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 50%, #0f0f0f 0%, #080808 100%)' }}>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '16px' }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div key={i} className="rounded-full" style={{ width: 5, height: 5, background: ACTIVE.has(i) ? '#f2d832' : 'rgba(255,255,255,0.07)', opacity: ACTIVE.has(i) ? 0.6 : 1, boxShadow: ACTIVE.has(i) ? '0 0 8px rgba(242,216,50,0.45)' : 'none' }} />
        ))}
      </div>
    </div>
  )
}

function GraphicVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#0c0c0a' }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute" style={{ width: '1px', height: '100%', left: `${22 + i * 18}%`, top: 0, background: `rgba(242,216,50,${0.06 - i * 0.01})` }} />
      ))}
      <div className="absolute inset-0 flex items-end justify-start p-8">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>Visual Systems</p>
      </div>
    </div>
  )
}

function getVisual(id: string) {
  if (id === 'gigfast-nascar')          return <NascarVisual />
  if (id === 'mobile-app-showcase')     return <MobileVisual />
  if (id === 'interactive-elements')    return <InteractiveVisual />
  if (id === 'graphic-design-collection') return <GraphicVisual />
  return <div className="absolute inset-0" style={{ background: '#111' }} />
}

// ─── Section ──────────────────────────────────────────────────────────────────
//
// Editorial numbered project list.
// Hover: row shifts right, arrow animates, floating thumbnail follows cursor.
// Floating thumbnail uses rAF-driven lerp — no React state, no re-renders.

export default function SelectedWork() {
  const reduced = useReducedMotion() ?? false

  // Hovered row index
  const [hovered, setHovered] = useState<number | null>(null)

  // Thumbnail: fixed position, lerp-smoothed to cursor
  const thumbRef  = useRef<HTMLDivElement>(null)
  const mouseRef  = useRef({ x: -800, y: -800 })
  const smoothRef = useRef({ x: -800, y: -800 })
  const rafRef    = useRef<number | undefined>(undefined)

  // Run rAF loop only once on mount; pause effect when reduced motion
  useEffect(() => {
    if (reduced) return
    const frame = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1
      if (thumbRef.current) {
        thumbRef.current.style.left = `${smoothRef.current.x + 28}px`
        thumbRef.current.style.top  = `${smoothRef.current.y - 96}px`
      }
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [reduced])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  return (
    <section
      className="border-t border-white/[0.06]"
      style={{ background: '#080808' }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Floating thumbnail — fixed, follows cursor ── */}
      {!reduced && (
        <div
          ref={thumbRef}
          className="fixed pointer-events-none z-50 rounded-sm overflow-hidden"
          style={{
            width:      260,
            height:     162,
            opacity:    hovered !== null ? 1 : 0,
            transition: 'opacity 0.22s ease',
            // Start well off-screen so it never flashes at origin
            left: -800,
            top:  -800,
          }}
          aria-hidden
        >
          <div className="absolute inset-0">
            {hovered !== null && getVisual(projects[hovered].id)}
          </div>
          {/* Subtle edge vignette */}
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }} />
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header strip */}
        <div className="flex items-center gap-4 py-12">
          <span className="text-[12px] font-mono text-[#606058] tracking-widest">03</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[12px] font-mono text-[#606058] tracking-widest uppercase">Selected Work</span>
        </div>

        {/* Editorial headline */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="flex items-baseline justify-between mb-16"
        >
          <h2
            className="font-extrabold tracking-[-0.05em] text-white"
            style={{ fontSize: 'clamp(42px, 6vw, 84px)', fontFamily: 'var(--font-syne)', lineHeight: 1 }}
          >
            Projects
          </h2>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-[12px] font-mono text-[#5a5a54] hover:text-white transition-colors duration-300 tracking-widest uppercase"
          >
            All work
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
          </Link>
        </motion.div>

        {/* ── Project rows ── */}
        <div className="-mx-6 lg:-mx-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-32px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
            >
              <Link
                href={`/work`}
                className="group block px-6 lg:px-16 border-t border-white/[0.06] cursor-pointer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="relative flex items-center gap-5 lg:gap-10 py-8 lg:py-9 transition-transform duration-300 ease-out"
                  style={{ transform: hovered === i ? 'translateX(10px)' : 'translateX(0)' }}
                >
                  {/* Index */}
                  <span className="text-[12px] font-mono tracking-widest shrink-0 w-7 transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(242,216,50,0.7)' : 'rgba(255,255,255,0.32)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title — flex-1 */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-extrabold tracking-[-0.04em] leading-[1.05] transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(20px, 2.4vw, 34px)',
                        fontFamily: 'var(--font-syne)',
                        color: hovered === i ? '#ffffff' : 'rgba(255,255,255,0.78)',
                      }}
                    >
                      {/* Animated underline */}
                      <span className="relative">
                        {project.title}
                        <span
                          className="absolute left-0 -bottom-0.5 h-px bg-white transition-all duration-400 ease-out"
                          style={{ width: hovered === i ? '100%' : '0%' }}
                        />
                      </span>
                    </h3>
                  </div>

                  {/* Category — hidden on mobile */}
                  <span className="hidden lg:block text-[12px] font-mono tracking-wide shrink-0 w-52 transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.28)' }}>
                    {project.category}
                  </span>

                  {/* Year */}
                  <span className="hidden md:block text-[12px] font-mono shrink-0 tracking-widest transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.28)' }}>
                    {project.year}
                  </span>

                  {/* Arrow */}
                  <span
                    className="shrink-0 text-[16px] transition-all duration-300"
                    style={{
                      color:     hovered === i ? '#f2d832' : 'rgba(255,255,255,0.2)',
                      transform: hovered === i ? 'translate(2px, -2px)' : 'translate(0, 0)',
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Closing rule */}
          <div className="border-t border-white/[0.06]" />
        </div>

        {/* Bottom link */}
        <div className="pt-10 pb-28 flex justify-end">
          <Link
            href="/work"
            className="group flex items-center gap-2 text-[12px] font-mono text-[#5a5a54] hover:text-white transition-colors duration-300 tracking-widest uppercase"
          >
            View all projects
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { projects, type Project } from '@/data/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Per-project preview image cycles ────────────────────────────────────────
// Each array drives the animated hover thumbnail — images rotate every 2.5 s
// with a slow crossfade + Ken Burns scale, identical to the project hero pages.
//
// To update previews for a project: edit its array.
// To add a new project with previews: add a key matching project.id.
// Projects whose id is not listed fall back to CSS visuals below.

const PREVIEWS: Record<string, string[]> = {
  'gigfast-nascar': [
    '/assetshelo/Nascar/ZaneSmith/TL_01108-2.jpg',
    '/assetshelo/Nascar/ZaneSmith/2328TP1264.jpg',
    '/assetshelo/Nascar/ZaneSmith/2328TP1318.jpg',
    '/assetshelo/Nascar/ZaneSmith/2328JN1547.jpg',
    '/assetshelo/Nascar/ZaneSmith/2313DG1291.jpg',
  ],
  'graphic-design': [
    '/assetshelo/GraphicDesign/Gba26qPbwAAEM7t.jpeg',
    '/assetshelo/GraphicDesign/GZGP05WbYAAfZ4V.jpeg',
    '/assetshelo/GraphicDesign/GRv1j5sb0AAOT25.jpeg',
    '/assetshelo/GraphicDesign/GRMHLmrbQAAVK9x.jpeg',
    '/assetshelo/GraphicDesign/GWRnPcvbQAE2by8.jpeg',
  ],
  'apparel-graphics': [
    '/assetshelo/ApparelDesign/MarioTshirt.png',
    '/assetshelo/ApparelDesign/JackHoodie.jpeg',
    '/assetshelo/ApparelDesign/PeachTshirt.png',
    '/assetshelo/ApparelDesign/CharizardHoodie.jpeg',
    '/assetshelo/ApparelDesign/PrincessHoodie.JPG',
  ],
}

// ─── CSS fallback visuals ─────────────────────────────────────────────────────
// Used only for projects that have no entry in PREVIEWS above.

function MobileVisual() {
  const frames = [
    { w: 130, h: 256, dx: -140, dy: -108, rot: '-7deg', z: 1 },
    { w: 150, h: 300, dx: -75,  dy: -130, rot:  '0deg', z: 3 },
    { w: 118, h: 236, dx:  80,  dy: -100, rot:  '6deg', z: 2 },
  ]
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(158deg, #0a0a14 0%, #080810 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 1, height: 1 }}>
          {frames.map((f, i) => (
            <div
              key={i}
              className="absolute rounded-[18px]"
              style={{
                width: f.w, height: f.h, left: f.dx, top: f.dy,
                transform: `rotate(${f.rot})`,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 24px 56px rgba(0,0,0,0.7)',
                zIndex: f.z,
              }}
            >
              <div className="w-8 h-[5px] rounded-full bg-black/60 mx-auto mt-3" />
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
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #0e0e0e 0%, #080808 100%)' }}
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '15px' }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width:      5,
              height:     5,
              background: ACTIVE.has(i) ? '#f2d832' : 'rgba(255,255,255,0.065)',
              opacity:    ACTIVE.has(i) ? 0.65 : 1,
              boxShadow:  ACTIVE.has(i) ? '0 0 10px rgba(242,216,50,0.5)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Animated preview (inside the floating thumbnail) ────────────────────────
// Renders the current preview image with:
//   • slow Ken Burns scale (1.04 → 1.09, linear over 6 s)
//   • crossfade between images (opacity 0→1 / exit opacity→0, 0.8 s each)
// Both transitions are transform/opacity — no layout or paint work.
// Falls back to CSS visuals for projects without entries in PREVIEWS.

function AnimatedPreview({
  project,
  idx,
  reduced,
}: {
  project: Project
  idx:     number
  reduced: boolean
}) {
  const images = PREVIEWS[project.id]

  if (!images) {
    if (project.id === 'mobile-app-showcase')  return <MobileVisual />
    if (project.id === 'interactive-elements') return <InteractiveVisual />
    return <div className="w-full h-full" style={{ background: '#111' }} />
  }

  const src = images[idx % images.length]

  return (
    <>
      {reduced ? (
        // Reduced motion: static first image, no crossfade, no scale
        <div className="relative w-full h-full">
          <Image src={images[0]} alt={project.title} fill sizes="280px" className="object-cover" />
        </div>
      ) : (
        <AnimatePresence initial={false}>
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.09 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              scale:   { duration: 6,   ease: 'linear' },
            }}
          >
            <Image
              src={src}
              alt={project.title}
              fill
              sizes="280px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
//
// Desktop: 280×175 floating thumbnail lerp-follows the cursor (rAF, zero
//          React re-renders during movement). When a row is hovered the
//          thumbnail cycles through the project's preview images every 2.5 s.
//
// Mobile:  64×40 static cover thumbnail embedded in each row (hidden on md+).

export default function SelectedWork() {
  const reduced = useReducedMotion() ?? false

  // Which row is hovered (null = none)
  const [hovered, setHovered] = useState<number | null>(null)
  // Which image in that project's preview array is active
  const [previewIdx, setPreviewIdx] = useState(0)

  // ── Preview cycle ──────────────────────────────────────────────────────────
  // Resets to 0 and starts a new interval whenever hovered changes.
  useEffect(() => {
    setPreviewIdx(0)
    if (hovered === null) return

    const images = PREVIEWS[projects[hovered].id]
    if (!images || images.length <= 1) return

    const id = setInterval(
      () => setPreviewIdx(i => (i + 1) % images.length),
      2500,
    )
    return () => clearInterval(id)
  }, [hovered])

  // ── rAF cursor-follow (thumbnail position) ─────────────────────────────────
  // Lerp smoothing written directly to DOM — no setState, no re-renders.
  const thumbRef  = useRef<HTMLDivElement>(null)
  const mouseRef  = useRef({ x: -1000, y: -1000 })
  const smoothRef = useRef({ x: -1000, y: -1000 })
  const rafRef    = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (reduced) return
    const frame = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1
      if (thumbRef.current) {
        thumbRef.current.style.left = `${smoothRef.current.x + 32}px`
        thumbRef.current.style.top  = `${smoothRef.current.y - 88}px`
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

      {/* ── Floating thumbnail ─────────────────────────────────────────────────
          Fixed, lerp-follows cursor. Animates in/out via CSS opacity + scale.
          Inner images cycle every 2.5 s via AnimatePresence crossfade.
      ──────────────────────────────────────────────────────────────────────── */}
      {!reduced && (
        <div
          ref={thumbRef}
          className="fixed pointer-events-none z-50 overflow-hidden rounded-[6px]"
          style={{
            width:      280,
            height:     175,
            left:       -1000,
            top:        -1000,
            opacity:    hovered !== null ? 1 : 0,
            transform:  hovered !== null ? 'scale(1)' : 'scale(0.94)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
          aria-hidden
        >
          {/* Animated image layer */}
          <div className="relative w-full h-full overflow-hidden">
            {hovered !== null && (
              <AnimatedPreview
                project={projects[hovered]}
                idx={previewIdx}
                reduced={reduced}
              />
            )}
          </div>

          {/* HELO-yellow top sliver */}
          <div
            className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
            style={{ background: 'rgba(242,216,50,0.35)' }}
          />
          {/* Inner vignette */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.55)' }}
          />
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header strip */}
        <div className="flex items-center gap-4 py-12">
          <span className="text-[12px] font-mono text-[#606058] tracking-widest">03</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[12px] font-mono text-[#606058] tracking-widest uppercase">
            Selected Work
          </span>
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
                href={`/work/${project.id}`}
                className="group block px-6 lg:px-16 border-t border-white/[0.06]"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="relative flex items-center gap-4 lg:gap-10 py-7 lg:py-9 transition-transform duration-300 ease-out"
                  style={{ transform: hovered === i ? 'translateX(10px)' : 'translateX(0)' }}
                >
                  {/* Mobile thumbnail — static, 64×40, md:hidden */}
                  {project.cover && (
                    <div
                      className="md:hidden shrink-0 relative overflow-hidden rounded"
                      style={{ width: 64, height: 40, background: '#0a0a0a' }}
                    >
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Index */}
                  <span
                    className="text-[12px] font-mono tracking-widest shrink-0 w-7 transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(242,216,50,0.7)' : 'rgba(255,255,255,0.32)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title + animated underline */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-extrabold tracking-[-0.04em] leading-[1.05] transition-colors duration-300"
                      style={{
                        fontSize:   'clamp(20px, 2.4vw, 34px)',
                        fontFamily: 'var(--font-syne)',
                        color: hovered === i ? '#ffffff' : 'rgba(255,255,255,0.78)',
                      }}
                    >
                      <span className="relative">
                        {project.title}
                        <span
                          className="absolute left-0 -bottom-0.5 h-px bg-white transition-all duration-500 ease-out"
                          style={{ width: hovered === i ? '100%' : '0%' }}
                        />
                      </span>
                    </h3>
                  </div>

                  {/* Category */}
                  <span
                    className="hidden lg:block text-[12px] font-mono tracking-wide shrink-0 w-52 transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.28)' }}
                  >
                    {project.category}
                  </span>

                  {/* Year */}
                  <span
                    className="hidden md:block text-[12px] font-mono shrink-0 tracking-widest transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.28)' }}
                  >
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

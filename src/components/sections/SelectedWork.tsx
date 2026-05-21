'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '@/data/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// ─────────────────────────────────────────────────────────────────────────────
// Per-project visual compositions
// Each one is unique and hints at the project's nature
// ─────────────────────────────────────────────────────────────────────────────

function NascarVisual({ size = 'full' }: { size?: 'full' | 'thumb' }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #111108 0%, #0e0e06 100%)' }}
      />
      {/* Speed stripes */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(118deg,
              transparent ${28 + i * 9}%,
              rgba(242,216,50,${0.11 - i * 0.03}) ${28 + i * 9}%,
              rgba(242,216,50,${0.11 - i * 0.03}) ${30 + i * 9}%,
              transparent ${30 + i * 9}%)`,
          }}
        />
      ))}
      {/* Ghost text */}
      {size === 'full' && (
        <motion.div
          animate={{ x: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 left-0 right-0 overflow-hidden"
        >
          <p
            className="leading-none select-none whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(80px, 14vw, 180px)',
              fontWeight: 800,
              letterSpacing: '-0.06em',
              color: '#f2d832',
              opacity: 0.07,
            }}
          >
            GIGFAST
          </p>
        </motion.div>
      )}
      {/* Dot grid — top right */}
      {size === 'full' && (
        <div
          className="absolute top-7 right-7 grid gap-[5px]"
          style={{ gridTemplateColumns: 'repeat(9, 1fr)' }}
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full"
              style={{ background: '#f2d832', opacity: [0.35, 0.18, 0.55, 0.22][i % 4] }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MobileVisual({ size = 'full' }: { size?: 'full' | 'thumb' }) {
  const frames =
    size === 'full'
      ? [
          { w: 130, h: 256, dx: -140, dy: -108, rot: '-7deg', z: 1 },
          { w: 150, h: 300, dx: -75, dy: -130, rot: '0deg', z: 3 },
          { w: 118, h: 236, dx: 80,  dy: -100, rot: '6deg',  z: 2 },
        ]
      : [
          { w: 28, h: 52, dx: -28, dy: -22, rot: '-5deg', z: 1 },
          { w: 32, h: 62, dx: -12, dy: -28, rot: '0deg',  z: 2 },
          { w: 26, h: 50, dx: 16,  dy: -20, rot: '5deg',  z: 1 },
        ]

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0a12 0%, #08080f 100%)' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Phone cluster — centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 1, height: 1 }}>
          {frames.map((f, i) => (
            <div
              key={i}
              className="absolute rounded-[18px] border border-white/[0.09]"
              style={{
                width: f.w,
                height: f.h,
                left: f.dx,
                top: f.dy,
                transform: `rotate(${f.rot})`,
                background: 'rgba(255,255,255,0.02)',
                boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
                zIndex: f.z,
              }}
            >
              {size === 'full' && (
                <div className="w-8 h-2 rounded-full bg-black/50 mx-auto mt-2.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InteractiveVisual({ size = 'full' }: { size?: 'full' | 'thumb' }) {
  const cols = size === 'full' ? 14 : 7
  const rows = size === 'full' ? 7 : 4
  const ACTIVE = new Set(
    size === 'full'
      ? [16, 17, 30, 31, 32, 44, 45, 58, 59, 60, 72, 73]
      : [4, 5, 11, 12, 18, 19]
  )

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #0f0f0f 0%, #080808 100%)',
      }}
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: size === 'full' ? '16px' : '8px' }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: size === 'full' ? 5 : 4,
              height: size === 'full' ? 5 : 4,
              background: ACTIVE.has(i) ? '#f2d832' : 'rgba(255,255,255,0.07)',
              opacity: ACTIVE.has(i) ? 0.6 : 1,
              boxShadow: ACTIVE.has(i) ? '0 0 8px rgba(242,216,50,0.45)' : 'none',
            }}
          />
        ))}
      </div>
      {/* SVG connectors */}
      {size === 'full' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.07 }}>
          <line x1="33%" y1="43%" x2="50%" y2="57%" stroke="white" strokeWidth="1" />
          <line x1="50%" y1="57%" x2="67%" y2="46%" stroke="white" strokeWidth="1" />
          <line x1="67%" y1="46%" x2="58%" y2="31%" stroke="white" strokeWidth="1" />
        </svg>
      )}
    </div>
  )
}

function getVisual(id: string, size: 'full' | 'thumb' = 'full') {
  if (id === 'gigfast-nascar')     return <NascarVisual size={size} />
  if (id === 'mobile-app-showcase') return <MobileVisual size={size} />
  if (id === 'interactive-elements') return <InteractiveVisual size={size} />
  // fallback
  return (
    <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #111 0%, #080808 100%)' }} />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured card — full-width hero treatment
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.95, ease: EASE }}
      className="group relative overflow-hidden cursor-pointer mb-2"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '4px',
      }}
    >
      {/* Visual area */}
      <div className="relative h-[320px] md:h-[480px] overflow-hidden">
        {/* Composition — scales on hover */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025]">
          {getVisual(project.id, 'full')}
        </div>

        {/* Yellow tint on hover */}
        <div className="absolute inset-0 bg-[#f2d832]/0 group-hover:bg-[#f2d832]/[0.02] transition-colors duration-500 pointer-events-none" />

        {/* Top-left index */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/25 tracking-widest">01</span>
          <span className="w-8 h-px bg-white/10" />
          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">Featured</span>
        </div>

        {/* Tag — top right */}
        <div className="absolute top-6 right-6 text-[10px] font-mono text-white/15 tracking-widest uppercase">
          {project.tags[0]}
        </div>

        {/* Bottom overlay — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Meta strip */}
      <div
        className="px-8 py-7 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div>
          <p className="text-[10px] font-mono text-[#4a4a44] tracking-[0.2em] uppercase mb-3">
            {project.category}
          </p>
          <h3
            className="font-extrabold tracking-[-0.04em] text-white group-hover:text-[#f2d832] transition-colors duration-400 leading-tight mb-3"
            style={{
              fontSize: 'clamp(22px, 3vw, 38px)',
              fontFamily: 'var(--font-syne)',
            }}
          >
            {project.title}
          </h3>
          <p className="text-[13px] text-[#7a7a72] leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-4 self-end">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-[#4a4a44]">{project.role}</span>
          </div>
          <span className="text-[10px] font-mono text-[#4a4a44]">{project.year}</span>
          <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:bg-[#f2d832] group-hover:border-[#f2d832] transition-all duration-400 shrink-0">
            <ArrowUpRight
              size={14}
              className="text-[#7a7a72] group-hover:text-[#080808] group-hover:translate-x-px group-hover:-translate-y-px transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Project row — editorial list treatment
// ─────────────────────────────────────────────────────────────────────────────

function ProjectRow({ project, rowIndex }: { project: Project; rowIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, ease: EASE, delay: rowIndex * 0.1 }}
      className="group relative -mx-6 lg:-mx-16 px-6 lg:px-16 cursor-pointer"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Yellow left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#f2d832] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out"
      />

      {/* Hover bg */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-400" />

      <div className="relative flex items-center gap-5 lg:gap-10 py-7 lg:py-8">

        {/* Index */}
        <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest shrink-0 w-6">
          {String(rowIndex + 2).padStart(2, '0')}
        </span>

        {/* Title + meta — expands */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-extrabold tracking-[-0.04em] text-white group-hover:text-[#f2d832] transition-colors duration-300 leading-[1.1] mb-2"
            style={{
              fontSize: 'clamp(20px, 2.5vw, 30px)',
              fontFamily: 'var(--font-syne)',
            }}
          >
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[11px] font-mono text-[#4a4a44] tracking-wide">
              {project.category}
            </span>
            <span className="text-[#4a4a44]/30 text-[10px]">·</span>
            <span className="text-[12px] text-[#7a7a72]">{project.role}</span>
          </div>
        </div>

        {/* Right: thumbnail + year + arrow */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">

          {/* Mini visual thumbnail */}
          <div
            className="relative hidden sm:block overflow-hidden"
            style={{
              width: 96,
              height: 60,
              borderRadius: '3px',
              border: '1px solid rgba(255,255,255,0.06)',
              flexShrink: 0,
            }}
          >
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.08]">
              {getVisual(project.id, 'thumb')}
            </div>
            {/* Yellow flash on hover */}
            <div className="absolute inset-0 bg-[#f2d832]/0 group-hover:bg-[#f2d832]/[0.05] transition-colors duration-400" />
          </div>

          <span className="text-[11px] font-mono text-[#4a4a44] hidden md:block">{project.year}</span>

          {/* Arrow */}
          <div className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:bg-[#f2d832] group-hover:border-[#f2d832] transition-all duration-350 shrink-0">
            <ArrowUpRight
              size={13}
              className="text-[#7a7a72] group-hover:text-[#080808] group-hover:translate-x-px group-hover:-translate-y-px transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

export default function SelectedWork() {
  const featured = projects.filter((p) => p.featured)
  const [first, ...rest] = featured

  return (
    <section className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-10">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">03</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">
            Selected Work
          </span>
        </div>

        {/* Title row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-baseline justify-between mb-12"
        >
          <h2
            className="font-extrabold tracking-[-0.05em] text-white"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontFamily: 'var(--font-syne)',
              lineHeight: 1,
            }}
          >
            Projects
          </h2>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-[13px] text-[#7a7a72] hover:text-white transition-colors duration-300"
          >
            View all work
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
        </motion.div>

        {/* Featured hero card */}
        {first && <FeaturedCard project={first} />}

        {/* Editorial list rows */}
        <div className="mt-2 mb-8">
          {rest.map((project, i) => (
            <ProjectRow key={project.id} project={project} rowIndex={i} />
          ))}
          {/* Closing border */}
          <div className="border-t border-white/[0.06] -mx-6 lg:-mx-16" />
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="pb-24 flex justify-end"
        >
          <Link
            href="/work"
            className="group flex items-center gap-2 text-[12px] font-mono text-[#4a4a44] hover:text-white tracking-widest uppercase transition-colors duration-300"
          >
            All projects
            <ArrowUpRight
              size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

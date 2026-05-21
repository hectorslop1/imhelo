'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'
import { experiences, type Experience } from '@/data/experience'
import { skills } from '@/data/skills'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Period renderer ──────────────────────────────────────────────────────────
// Highlights "Present" in yellow so the live state reads immediately.

function Period({
  text,
  isPrimary,
}: {
  text: string
  isPrimary: boolean
}) {
  const idx = text.indexOf('Present')
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span
        style={{
          color: isPrimary ? 'rgba(242,216,50,0.72)' : 'rgba(242,216,50,0.38)',
        }}
      >
        Present
      </span>
    </>
  )
}

// ─── Skill chip ───────────────────────────────────────────────────────────────

function SkillChip({ label }: { label: string }) {
  return (
    <span className="inline-flex text-[10px] font-mono tracking-wide px-2.5 py-[5px] rounded-md border border-white/[0.07] text-[#3a3a34] cursor-default transition-colors duration-200 hover:border-white/[0.16] hover:text-[#5e5e58] hover:bg-white/[0.02]">
      {label}
    </span>
  )
}

// ─── Skill groups (toolkit panel) ─────────────────────────────────────────────

function SkillsToolkit({ reduced }: { reduced: boolean }) {
  return (
    <div>
      {/* Toolkit label */}
      <div className="flex items-center gap-2.5 mb-6">
        <span aria-hidden className="w-[3px] h-[3px] rounded-full bg-[#f2d832]/50 shrink-0" />
        <p className="text-[9px] font-mono text-[#f2d832]/36 tracking-[0.28em] uppercase">
          Toolkit
        </p>
      </div>

      <div className="space-y-6">
        {skills.map((group, i) => (
          <motion.div
            key={group.label}
            initial={reduced ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.22 + i * 0.07 }}
          >
            <p className="text-[9px] font-mono text-[#262624] tracking-[0.2em] uppercase mb-2.5">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <SkillChip key={item} label={item} />
              ))}
            </div>
            {i < skills.length - 1 && (
              <div className="mt-5 h-px bg-white/[0.04]" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Career path header ───────────────────────────────────────────────────────
// Editorial annotation at the top of the timeline column.
// Makes the section feel like a curated module, not a list.

function CareerPathHeader({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-12"
      initial={reduced ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="flex items-center gap-2 shrink-0">
        <span aria-hidden className="w-[5px] h-[5px] rounded-full bg-[#f2d832]/42 shrink-0" />
        <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#282826]">
          Career Path
        </span>
      </div>
      <div className="flex-1 h-px bg-white/[0.04]" />
      <span className="text-[9px] font-mono text-[#1c1c1a] tracking-[0.18em] shrink-0">
        2018 — Present
      </span>
    </motion.div>
  )
}

// ─── Timeline node ────────────────────────────────────────────────────────────
// Three tiers — all in a fixed 24×24 container so the spine stays centred.
//
//  isPrimary  Double-phase concentric pulse + ambient halo + glowing core
//  isCurrent  Single slow pulse + dimmer yellow dot
//  past       Hollow muted ring, drifts yellow on card hover

function TimelineNode({
  isCurrent,
  isPrimary,
  reduced,
}: {
  isCurrent: boolean
  isPrimary: boolean
  reduced: boolean
}) {
  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: 24, height: 24 }}
    >
      {isPrimary ? (
        <>
          {/* Soft ambient halo — slow breath */}
          {!reduced && (
            <motion.span
              aria-hidden
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: -12,
                background:
                  'radial-gradient(circle, rgba(242,216,50,0.14) 0%, transparent 65%)',
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Two rings at opposite phases — makes the pulse feel organic */}
          {!reduced && (
            <>
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: '1px solid rgba(242,216,50,0.26)' }}
                animate={{ scale: [1, 2.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: '1px solid rgba(242,216,50,0.15)' }}
                animate={{ scale: [1, 2.8, 1], opacity: [0.38, 0, 0.38] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.7,   // exactly half the cycle
                }}
              />
            </>
          )}

          {/* Static outer ring */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(242,216,50,0.13)' }}
          />

          {/* Core */}
          <span
            className="relative w-[9px] h-[9px] rounded-full bg-[#f2d832] transition-shadow duration-500 group-hover/entry:shadow-[0_0_26px_rgba(242,216,50,1)]"
            style={{ boxShadow: '0 0 10px rgba(242,216,50,0.82)' }}
          />
        </>
      ) : isCurrent ? (
        <>
          {!reduced && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: '1px solid rgba(242,216,50,0.14)' }}
              animate={{ scale: [1, 2.2, 1], opacity: [0.36, 0, 0.36] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <span className="w-[8px] h-[8px] rounded-full bg-[#f2d832]/40 transition-all duration-300 group-hover/entry:bg-[#f2d832]/68 group-hover/entry:shadow-[0_0_10px_rgba(242,216,50,0.42)]" />
        </>
      ) : (
        <span className="w-[8px] h-[8px] rounded-full border border-white/[0.13] bg-[#0c0c0c] transition-all duration-300 group-hover/entry:border-[#f2d832]/34 group-hover/entry:bg-[#f2d832]/[0.05]" />
      )}
    </div>
  )
}

// ─── Timeline entry ────────────────────────────────────────────────────────────
// Each entry is self-contained with its own viewport reveal.
// isPrimary (index 0) gets premium card treatment.

type EntryProps = {
  exp: Experience
  index: number
  isLast: boolean
  isPrimary: boolean
  reduced: boolean
}

function TimelineEntry({ exp, index, isLast, isPrimary, reduced }: EntryProps) {
  const isCurrent = exp.period.includes('Present')

  return (
    <motion.div
      className="group/entry relative flex gap-5"
      style={{ paddingBottom: isLast ? 0 : isPrimary ? '4.5rem' : '3.5rem' }}
      /* Reveal: slides up + scales in from very slightly behind the plane */
      initial={reduced ? {} : { opacity: 0, y: 24, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.78, ease: EASE, delay: index * 0.16 }}
      /* Lift on hover */
      whileHover={reduced ? undefined : { y: -5, transition: { duration: 0.35, ease: EASE } }}
    >
      {/* ── Node column ── */}
      <div className="flex flex-col items-center shrink-0" style={{ paddingTop: 4 }}>
        <TimelineNode isCurrent={isCurrent} isPrimary={isPrimary} reduced={reduced} />
        {!isLast && (
          <div
            aria-hidden
            className="flex-1 w-px mt-2"
            style={{ background: 'transparent' }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <div
        className={cn(
          'relative flex-1 rounded-2xl border overflow-hidden transition-colors duration-300',
          isPrimary
            ? 'border-[rgba(242,216,50,0.1)] bg-[rgba(242,216,50,0.02)] group-hover/entry:border-[rgba(242,216,50,0.22)] group-hover/entry:bg-[rgba(242,216,50,0.04)]'
            : isCurrent
              ? 'border-white/[0.06] bg-white/[0.007] group-hover/entry:border-white/[0.12] group-hover/entry:bg-white/[0.016]'
              : 'border-white/[0.05] bg-transparent group-hover/entry:border-white/[0.09] group-hover/entry:bg-white/[0.012]',
        )}
        style={
          isPrimary
            ? { boxShadow: '0 8px 48px rgba(0,0,0,0.36)' }
            : undefined
        }
      >
        {/* Radial inner glow — fades in on hover */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/entry:opacity-100 transition-opacity duration-500"
          style={{
            background: isPrimary
              ? 'radial-gradient(ellipse at 0% 0%, rgba(242,216,50,0.06) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.025) 0%, transparent 60%)',
          }}
        />

        {/* Left accent stripe for active roles */}
        {isCurrent && (
          <span
            aria-hidden
            className="absolute left-0 inset-y-0 w-[2px] pointer-events-none"
            style={{
              background: isPrimary
                ? 'linear-gradient(to bottom, transparent 0%, rgba(242,216,50,0.7) 18%, rgba(242,216,50,0.7) 82%, transparent 100%)'
                : 'linear-gradient(to bottom, transparent 0%, rgba(242,216,50,0.24) 28%, rgba(242,216,50,0.24) 72%, transparent 100%)',
            }}
          />
        )}

        {/* Inner padding — primary gets more room */}
        <div className={cn('px-7', isPrimary ? 'pt-7 pb-8' : 'pt-6 pb-6')}>

          {/* ── Period + badge ── */}
          <div className="flex items-center gap-3 mb-5">
            <p
              className={cn(
                'font-mono uppercase',
                isPrimary
                  ? 'text-[11px] tracking-[0.22em]'
                  : 'text-[10px] tracking-[0.18em] text-[#262624]',
              )}
            >
              <Period text={exp.period} isPrimary={isPrimary} />
            </p>

            {isPrimary && (
              <span className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full border border-[#f2d832]/13 bg-[#f2d832]/[0.07]">
                <motion.span
                  aria-hidden
                  className="inline-block w-[4px] h-[4px] rounded-full bg-[#f2d832] shrink-0"
                  animate={reduced ? {} : { opacity: [0.38, 1, 0.38] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-[8px] font-mono tracking-[0.26em] text-[#f2d832]/44 uppercase">
                  Current
                </span>
              </span>
            )}
          </div>

          {/* ── Role ── */}
          <h3
            className={cn(
              'font-bold tracking-[-0.025em] leading-tight mb-2 transition-colors duration-300',
              isPrimary
                ? 'text-white group-hover/entry:text-[#fdfcf5]'
                : 'text-white/76 group-hover/entry:text-white',
            )}
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: isPrimary
                ? 'clamp(17px, 1.5vw, 22px)'
                : 'clamp(14px, 1.2vw, 17px)',
            }}
          >
            {exp.role}
          </h3>

          {/* ── Company ── */}
          <p
            className={cn(
              'text-[11px] font-mono tracking-wide mb-5 transition-colors duration-300',
              isPrimary
                ? 'text-[#f2d832]/24 group-hover/entry:text-[#f2d832]/46'
                : 'text-[#262624] group-hover/entry:text-[#363632]',
            )}
          >
            {exp.company}
          </p>

          {/* ── Description ── */}
          <p className="text-[13px] leading-relaxed text-[#505050] group-hover/entry:text-[#626260] transition-colors duration-300 mb-5">
            {exp.description}
          </p>

          {/* ── Highlights as chip pills ── */}
          {exp.highlights && exp.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {exp.highlights.map((h) => (
                <span
                  key={h}
                  className={cn(
                    'text-[10px] font-mono tracking-wide px-2.5 py-[5px] rounded-full border transition-colors duration-200',
                    isPrimary
                      ? 'border-[#f2d832]/10 text-[#f2d832]/32 bg-[#f2d832]/[0.04] group-hover/entry:border-[#f2d832]/20 group-hover/entry:text-[#f2d832]/55 group-hover/entry:bg-[#f2d832]/[0.07]'
                      : 'border-white/[0.06] text-[#282826] bg-transparent group-hover/entry:border-white/[0.11] group-hover/entry:text-[#383834]',
                  )}
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* ── Tags (optional, below a thin rule) ── */}
          {exp.tags && exp.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04]">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono tracking-[0.15em] uppercase px-2 py-[3px] rounded border border-[#f2d832]/10 text-[#f2d832]/24 transition-colors duration-200 group-hover/entry:border-[#f2d832]/20 group-hover/entry:text-[#f2d832]/42"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>
    </motion.div>
  )
}

// ─── Left panel ───────────────────────────────────────────────────────────────

function LeftPanel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="lg:sticky lg:top-28 lg:self-start"
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <h2
        className="font-extrabold leading-[0.9] tracking-[-0.04em] text-white mb-5"
        style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 3.5vw, 52px)' }}
      >
        Experience
        <br />
        <span className="text-[#f2d832]">&amp; Skills.</span>
      </h2>

      <p className="text-[13px] text-[#505050] leading-relaxed mb-8 max-w-[300px]">
        A career built across design and development — from visual systems and brand identity to mobile interfaces and interactive frontend experiences.
      </p>

      <div className="h-px bg-white/[0.05] mb-8" />

      <SkillsToolkit reduced={reduced} />
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
//
// SCROLL PROGRESS SPINE
// ─────────────────────
// useScroll tracks `timelineRef` (the entries column only, below the header).
// offset: ['start 0.85', 'end 0.2']
//   → progress = 0 when the column's top edge hits 85% down the viewport
//   → progress = 1 when the column's bottom edge passes 20% from the top
//
// useSpring wraps scrollYProgress → smoothProgress
//   stiffness: 55, damping: 20 → the fill lags behind slightly, like ink rising
//
// Three rendered layers (all inside `timelineRef`):
//   1. Blurred glow (8px wide, blur 3px) — soft yellow luminosity
//   2. Precise 1px fill line — sharp yellow gradient
//   3. Moving head dot — glowing bead at the current fill tip
//
// prefers-reduced-motion: spring is bypassed; all three layers hidden;
//   spine base rail is always visible (scaleY locked to 1 removed → fills instantly).
//
// EDIT TIMELINE ENTRIES → src/data/experience.ts
// EDIT SKILL GROUPS     → src/data/skills.ts

export default function Experience() {
  const reduced = useReducedMotion() ?? false
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.2'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    restDelta: 0.001,
  })

  const active = reduced ? scrollYProgress : smoothProgress

  const spineScaleY = useTransform(active, [0, 1], [0, 1])

  // Head dot: position as % of the entries column height, fades in once moving
  const headTop     = useTransform(smoothProgress, (v) => `${v * 100}%`)
  const headOpacity = useTransform(smoothProgress, [0, 0.04], [0, 1])

  return (
    <section className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header strip */}
        <div className="flex items-center gap-4 py-10">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">05</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">
            Experience &amp; Skills
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 lg:gap-24 pb-32 items-start">

          <LeftPanel reduced={reduced} />

          {/* Right column: editorial header + spine + entries */}
          <div>
            {/* Career path annotation — outside the spine container */}
            <CareerPathHeader reduced={reduced} />

            {/* Entries container — ref lives here so spine aligns with nodes */}
            <div ref={timelineRef} className="relative">

              {/* Layer 1: Blurred ambient glow */}
              {!reduced && (
                <motion.div
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    left: 8,
                    top: 6,
                    bottom: 0,
                    width: 8,
                    scaleY: spineScaleY,
                    transformOrigin: 'top',
                    filter: 'blur(3px)',
                    background:
                      'linear-gradient(to bottom, rgba(242,216,50,0.46) 0%, rgba(242,216,50,0.14) 50%, transparent 88%)',
                  }}
                />
              )}

              {/* Layer 2: Base rail — always visible, dim */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  left: 11,
                  top: 6,
                  bottom: 0,
                  width: 1,
                  background: 'rgba(255,255,255,0.05)',
                }}
              />

              {/* Layer 3: Scroll-progress fill */}
              <motion.div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  left: 11,
                  top: 6,
                  bottom: 0,
                  width: 1,
                  scaleY: reduced ? 1 : spineScaleY,
                  transformOrigin: 'top',
                  background:
                    'linear-gradient(to bottom, rgba(242,216,50,0.78) 0%, rgba(242,216,50,0.34) 32%, rgba(255,255,255,0.07) 66%, transparent 100%)',
                }}
              />

              {/* Layer 4: Moving head dot — glowing bead at the fill tip */}
              {!reduced && (
                <motion.div
                  aria-hidden
                  className="absolute pointer-events-none z-10"
                  style={{
                    left: 8,
                    top: headTop,
                    y: '-50%',
                    opacity: headOpacity,
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#f2d832',
                    boxShadow:
                      '0 0 8px rgba(242,216,50,0.9), 0 0 18px rgba(242,216,50,0.38)',
                  }}
                />
              )}

              {/* Timeline entries
                  Ordered most-recent-first in src/data/experience.ts
                  index 0 → isPrimary (Lead Mobile Dev, U-wifi Inc.) */}
              {experiences.map((exp, i) => (
                <TimelineEntry
                  key={`${exp.company}-${i}`}
                  exp={exp}
                  index={i}
                  isLast={i === experiences.length - 1}
                  isPrimary={i === 0}
                  reduced={reduced}
                />
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

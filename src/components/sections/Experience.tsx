'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'
import { experiences, type Experience } from '@/data/experience'
import { skills } from '@/data/skills'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Timeline node ────────────────────────────────────────────────────────────

function TimelineNode({ isCurrent, reduced }: { isCurrent: boolean; reduced: boolean }) {
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: 24, height: 24 }}>
      {isCurrent ? (
        <>
          {/* Outer ambient halo */}
          {!reduced && (
            <motion.span
              aria-hidden
              className="absolute rounded-full"
              style={{
                inset: -6,
                background: 'radial-gradient(circle, rgba(242,216,50,0.12) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {/* Pulsing outer ring */}
          {!reduced && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(242,216,50,0.3)' }}
              animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {/* Core dot */}
          <span
            className="relative w-[9px] h-[9px] rounded-full bg-[#f2d832] transition-shadow duration-500 group-hover/entry:shadow-[0_0_24px_rgba(242,216,50,0.9)]"
            style={{ boxShadow: '0 0 10px rgba(242,216,50,0.55)' }}
          />
        </>
      ) : (
        <span className="w-[9px] h-[9px] rounded-full border border-white/[0.18] bg-[#0c0c0c] transition-all duration-400 group-hover/entry:border-[#f2d832]/50 group-hover/entry:bg-[#f2d832]/[0.06] group-hover/entry:shadow-[0_0_8px_rgba(242,216,50,0.15)]" />
      )}
    </div>
  )
}

// ─── Single timeline entry ────────────────────────────────────────────────────

type EntryProps = {
  exp: Experience
  index: number
  isLast: boolean
  reduced: boolean
}

function TimelineEntry({ exp, index, isLast, reduced }: EntryProps) {
  const isCurrent = exp.period.includes('Present')

  return (
    <motion.div
      className="group/entry relative flex gap-5"
      style={{ paddingBottom: isLast ? 0 : '3.5rem' }}
      initial={reduced ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.72, ease: EASE, delay: index * 0.15 }}
      whileHover={reduced ? undefined : { y: -5, transition: { duration: 0.35, ease: EASE } }}
    >
      {/* ── Node column ── */}
      <div className="flex flex-col items-center shrink-0" style={{ paddingTop: 3 }}>
        <TimelineNode isCurrent={isCurrent} reduced={reduced} />
        {!isLast && (
          <div
            aria-hidden
            className="flex-1 w-px mt-2"
            style={{ background: 'transparent' }}
          />
        )}
      </div>

      {/* ── Content card ── */}
      <div
        className={cn(
          'relative flex-1 rounded-2xl border p-6 pb-7 overflow-hidden',
          'transition-all duration-400',
          isCurrent
            ? 'border-white/[0.08] bg-[rgba(242,216,50,0.018)] group-hover/entry:border-[#f2d832]/20 group-hover/entry:bg-[rgba(242,216,50,0.032)]'
            : 'border-white/[0.05] bg-transparent group-hover/entry:border-white/[0.10] group-hover/entry:bg-[rgba(255,255,255,0.014)]',
        )}
      >
        {/* Subtle inner glow on hover — gradient radial top-left */}
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/entry:opacity-100 transition-opacity duration-500',
          )}
          style={{
            background: isCurrent
              ? 'radial-gradient(ellipse at 0% 0%, rgba(242,216,50,0.04) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.02) 0%, transparent 60%)',
          }}
        />

        {/* Active left-edge accent stripe */}
        {isCurrent && (
          <span
            aria-hidden
            className="absolute left-0 inset-y-0 w-[2px] rounded-r-full"
            style={{
              background:
                'linear-gradient(to bottom, rgba(242,216,50,0.0) 0%, rgba(242,216,50,0.7) 20%, rgba(242,216,50,0.7) 80%, rgba(242,216,50,0.0) 100%)',
            }}
          />
        )}

        {/* ── Period + status badge ── */}
        <div className="flex items-center gap-3 mb-4">
          <p
            className={cn(
              'font-mono uppercase tracking-[0.18em]',
              isCurrent
                ? 'text-[#f2d832]/70 text-[11px]'
                : 'text-[#3a3a34] text-[10px] tracking-[0.15em]',
            )}
          >
            {exp.period}
          </p>

          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#f2d832]/15 bg-[#f2d832]/[0.06]">
              <motion.span
                aria-hidden
                className="inline-block w-[4px] h-[4px] rounded-full bg-[#f2d832]"
                animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[8px] font-mono text-[#f2d832]/50 tracking-[0.2em] uppercase">
                Active
              </span>
            </span>
          )}
        </div>

        {/* ── Role title ── */}
        <h3
          className={cn(
            'font-bold tracking-[-0.02em] leading-snug mb-1',
            'transition-colors duration-300',
            isCurrent
              ? 'text-white group-hover/entry:text-[#f2f0e8]'
              : 'text-white/90 group-hover/entry:text-white',
          )}
          style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(16px, 1.4vw, 20px)' }}
        >
          {exp.role}
        </h3>

        {/* ── Company ── */}
        <p
          className={cn(
            'text-[11px] font-mono tracking-wide mb-5 transition-colors duration-300',
            isCurrent
              ? 'text-[#f2d832]/30 group-hover/entry:text-[#f2d832]/50'
              : 'text-[#3a3a34] group-hover/entry:text-[#4a4a44]',
          )}
        >
          {exp.company}
        </p>

        {/* ── Description ── */}
        <p className="text-[13px] text-[#6a6a62] leading-relaxed mb-5 group-hover/entry:text-[#7a7a72] transition-colors duration-300">
          {exp.description}
        </p>

        {/* ── Highlights ── */}
        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="space-y-2 mb-5">
            {exp.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="shrink-0 rounded-full transition-all duration-300"
                  style={{
                    width: 3,
                    height: 3,
                    background: isCurrent
                      ? 'rgba(242,216,50,0.5)'
                      : 'rgba(255,255,255,0.10)',
                  }}
                />
                <span className="text-[11px] font-mono text-[#4a4a44] tracking-wide group-hover/entry:text-[#5a5a52] transition-colors duration-300">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* ── Tags ── */}
        {exp.tags && exp.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'text-[9px] px-2.5 py-[5px] border font-mono tracking-[0.12em] uppercase rounded-full transition-all duration-300',
                  isCurrent
                    ? 'border-[#f2d832]/12 text-[#f2d832]/30 group-hover/entry:border-[#f2d832]/25 group-hover/entry:text-[#f2d832]/55 group-hover/entry:bg-[#f2d832]/[0.04]'
                    : 'border-white/[0.06] text-[#3a3a34] group-hover/entry:border-white/[0.10] group-hover/entry:text-[#4a4a44]',
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Skills grid ─────────────────────────────────────────────────────────────

function SkillsGrid({ reduced }: { reduced: boolean }) {
  return (
    <div className="space-y-6">
      {skills.map((group, i) => (
        <motion.div
          key={group.label}
          initial={reduced ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.08 }}
        >
          {/* Group label */}
          <p className="text-[9px] font-mono text-[#f2d832]/35 tracking-[0.2em] uppercase mb-2.5">
            {group.label}
          </p>

          {/* Items: dot-joined, each individually hoverable */}
          <p className="text-[11px] font-mono text-[#3a3a34] leading-relaxed">
            {group.items.map((item, j) => (
              <span key={item}>
                <span className="hover:text-[#6a6a62] transition-colors duration-200 cursor-default">
                  {item}
                </span>
                {j < group.items.length - 1 && (
                  <span
                    aria-hidden
                    className="text-[#1e1e1c] mx-2"
                    style={{ fontSize: '8px', verticalAlign: 'middle' }}
                  >
                    ✦
                  </span>
                )}
              </span>
            ))}
          </p>

          {/* Thin separator below every group except the last */}
          {i < skills.length - 1 && (
            <div className="mt-5 h-px bg-white/[0.04]" />
          )}
        </motion.div>
      ))}
    </div>
  )
}

// ─── Left panel: heading + intro + skills ─────────────────────────────────────

function LeftPanel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="lg:sticky lg:top-28 lg:self-start"
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* Display heading */}
      <h2
        className="font-extrabold leading-[0.9] tracking-[-0.04em] text-white mb-5"
        style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 3.5vw, 52px)' }}
      >
        Experience
        <br />
        <span className="text-[#f2d832]">&amp; Skills.</span>
      </h2>

      <p className="text-[13px] text-[#5a5a52] leading-relaxed mb-8 max-w-[300px]">
        A career built across design and development — from visual systems and brand identity to mobile interfaces and interactive frontend experiences.
      </p>

      {/* Divider */}
      <div className="h-px bg-white/[0.05] mb-8" />

      {/* Skills */}
      <SkillsGrid reduced={reduced} />
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Experience() {
  const reduced = useReducedMotion() ?? false

  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.2'],
  })

  // Spring-smoothed scroll progress for organic spine fill
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  })

  const spineScaleY = useTransform(
    reduced ? scrollYProgress : smoothProgress,
    [0, 1],
    [0, 1],
  )

  return (
    <section className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-10">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">05</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">
            Experience &amp; Skills
          </span>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 lg:gap-24 pb-32 items-start">

          {/* Left */}
          <LeftPanel reduced={reduced} />

          {/* Right: timeline */}
          <div ref={timelineRef} className="relative">

            {/* ── Spine: ambient glow (wider, blurred) ── */}
            {!reduced && (
              <motion.div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  left: 7,
                  top: 6,
                  bottom: 0,
                  width: 9,
                  scaleY: spineScaleY,
                  transformOrigin: 'top',
                  filter: 'blur(4px)',
                  background:
                    'linear-gradient(to bottom, rgba(242,216,50,0.35) 0%, rgba(242,216,50,0.12) 40%, transparent 80%)',
                }}
              />
            )}

            {/* ── Spine: base track ── */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: 11,
                top: 6,
                bottom: 0,
                width: 1,
                background: 'rgba(255,255,255,0.04)',
              }}
            />

            {/* ── Spine: scroll-progress fill ── */}
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
                  'linear-gradient(to bottom, rgba(242,216,50,0.65) 0%, rgba(242,216,50,0.28) 30%, rgba(255,255,255,0.06) 65%, transparent 100%)',
              }}
            />

            {/* ── Timeline entries ── */}
            {experiences.map((exp, i) => (
              <TimelineEntry
                key={`${exp.company}-${i}`}
                exp={exp}
                index={i}
                isLast={i === experiences.length - 1}
                reduced={reduced}
              />
            ))}

          </div>
        </div>

      </div>
    </section>
  )
}

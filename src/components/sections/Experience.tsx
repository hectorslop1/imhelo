'use client'

import { motion, useReducedMotion } from 'motion/react'
import { experiences, type Experience } from '@/data/experience'
import { skills } from '@/data/skills'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Left panel: display heading + intro + skills ─────────────────────────────

function SkillsPanel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="lg:sticky lg:top-28 lg:self-start"
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      {/* Display heading */}
      <h2
        className="font-extrabold leading-[0.92] tracking-[-0.04em] text-white mb-5"
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(34px, 3.8vw, 54px)',
        }}
      >
        Experience
        <br />
        <span className="text-[#f2d832]">&amp; Skills.</span>
      </h2>

      <p className="text-[13px] text-[#7a7a72] leading-relaxed mb-8 max-w-[280px]">
        A career built across design and development — from visual systems and brand identity to mobile interfaces and interactive frontend experiences.
      </p>

      {/* Divider */}
      <div className="h-px bg-white/[0.06] mb-8" />

      {/* Skills — each group: label + dot-joined items */}
      <div className="space-y-6">
        {skills.map((group, i) => (
          <motion.div
            key={group.label}
            initial={reduced ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
          >
            <p className="text-[10px] font-mono text-[#f2d832]/50 tracking-widest uppercase mb-1.5">
              {group.label}
            </p>
            <p className="text-[12px] font-mono text-[#4a4a44] leading-relaxed">
              {group.items.join(' · ')}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
      /* Scroll reveal — slides in from the right */
      initial={reduced ? {} : { opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.1 }}
      /* Hover — entire row lifts */
      whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.35, ease: EASE } }}
    >
      {/* ── Timeline node ── */}
      <div
        className="shrink-0 flex justify-center mt-[4px]"
        style={{ width: 22 }}
      >
        <div
          className={cn(
            'rounded-full border-2 transition-all duration-300',
            isCurrent
              ? [
                  'w-[14px] h-[14px]',
                  'bg-[#f2d832] border-[#f2d832]/40',
                  'group-hover/entry:shadow-[0_0_18px_rgba(242,216,50,0.65)]',
                ].join(' ')
              : [
                  'w-3 h-3',
                  'bg-[#111111] border-white/[0.16]',
                  'group-hover/entry:border-white/[0.35]',
                  'group-hover/entry:scale-110',
                ].join(' ')
          )}
        />
      </div>

      {/* ── Content card ── */}
      <div
        className={cn(
          'flex-1 rounded-xl border p-6 transition-all duration-350',
          'border-white/[0.04] group-hover/entry:border-white/[0.1]',
          'bg-transparent group-hover/entry:bg-white/[0.015]',
        )}
      >
        {/* Period + active badge */}
        <div className="flex items-center gap-3 mb-3">
          <p
            className={cn(
              'text-[11px] font-mono tracking-widest uppercase',
              isCurrent ? 'text-[#f2d832]/70' : 'text-[#3a3a34]',
            )}
          >
            {exp.period}
          </p>
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5">
              <motion.span
                className="w-[5px] h-[5px] rounded-full bg-[#f2d832] shrink-0"
                animate={reduced ? {} : { opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[9px] font-mono text-[#f2d832]/40 tracking-widest uppercase">Active</span>
            </span>
          )}
        </div>

        {/* Role */}
        <h3
          className="font-bold text-white tracking-[-0.02em] leading-tight mb-1"
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(16px, 1.5vw, 20px)',
          }}
        >
          {exp.role}
        </h3>

        {/* Company */}
        <p className="text-[12px] text-[#4a4a44] font-mono mb-4 tracking-wide">
          {exp.company}
        </p>

        {/* Description */}
        <p className="text-[13px] text-[#7a7a72] leading-relaxed mb-4">
          {exp.description}
        </p>

        {/* Highlights */}
        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {exp.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5">
                <span
                  className="shrink-0 rounded-full"
                  style={{
                    width: 3,
                    height: 3,
                    background: isCurrent
                      ? 'rgba(242,216,50,0.5)'
                      : 'rgba(255,255,255,0.14)',
                  }}
                />
                <span className="text-[11px] font-mono text-[#4a4a44] tracking-wide">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'text-[10px] px-2.5 py-[5px] border font-mono tracking-wide rounded',
                'border-white/[0.06] text-[#3a3a34]',
                'transition-colors duration-300',
                'group-hover/entry:border-white/[0.12] group-hover/entry:text-[#6a6a62]',
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Experience() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-10">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">05</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">Experience &amp; Skills</span>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 lg:gap-20 pb-28 items-start">

          {/* Left: intro + skills (sticky on desktop) */}
          <SkillsPanel reduced={reduced} />

          {/* Right: vertical timeline */}
          <div className="relative">

            {/* Vertical line — draws down on scroll */}
            <motion.div
              className="absolute w-px pointer-events-none"
              style={{
                left: 11,
                top: 6,
                bottom: 6,
                background:
                  'linear-gradient(to bottom, rgba(242,216,50,0.22) 0%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.02) 80%, transparent 100%)',
                transformOrigin: 'top',
              }}
              initial={reduced ? {} : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.5, ease: EASE }}
            />

            {/* Entries */}
            {experiences.map((exp, i) => (
              <TimelineEntry
                key={exp.company}
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

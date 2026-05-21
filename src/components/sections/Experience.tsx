'use client'

import { motion, useReducedMotion } from 'motion/react'
import { experiences, type Experience } from '@/data/experience'
import { skills } from '@/data/skills'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Period renderer ──────────────────────────────────────────────────────────
// Renders "Present" in yellow. Signature accent — used only here and nowhere else
// on the page simultaneously.

function Period({ text, isPrimary }: { text: string; isPrimary: boolean }) {
  const idx = text.indexOf('Present')
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: isPrimary ? 'rgba(242,216,50,0.75)' : 'rgba(242,216,50,0.38)' }}>
        Present
      </span>
    </>
  )
}

// ─── Skill chip ───────────────────────────────────────────────────────────────

function SkillChip({ label }: { label: string }) {
  return (
    <span className="inline-flex text-[11px] font-mono tracking-wide px-2.5 py-[5px] rounded-md border border-white/[0.08] text-[#5a5a54] cursor-default transition-colors duration-200 hover:border-white/[0.18] hover:text-[#7a7a72] hover:bg-white/[0.02]">
      {label}
    </span>
  )
}

// ─── Toolkit panel ───────────────────────────────────────────────────────────

function Toolkit({ reduced }: { reduced: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-6">
        <span aria-hidden className="w-[3px] h-[3px] rounded-full bg-[#f2d832]/50 shrink-0" />
        <p className="text-[11px] font-mono text-[#f2d832]/50 tracking-[0.18em] uppercase">
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
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.07 }}
          >
            <p className="text-[11px] font-mono text-[#4a4a44] tracking-[0.14em] uppercase mb-3">
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

// ─── Document-style timeline entry ────────────────────────────────────────────
//
// Structure (typographic document — no card borders):
//
//   DATE  ●               ← mono, "Present" in yellow, ● only for primary role
//   ──────────────────    ← full-width 1px rule
//   ROLE            CO.   ← Syne bold left, company mono right
//   ──────────────────    ← second rule
//
//   Description text
//
//   highlight · highlight · highlight
//
// To edit: src/data/experience.ts

type EntryProps = {
  exp: Experience
  isPrimary: boolean   // true only for index 0 (most recent / U-wifi)
  reduced: boolean
  index: number
}

function DocumentEntry({ exp, isPrimary, reduced, index }: EntryProps) {
  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
      className="pb-16"
    >
      {/* ── Date row ── */}
      <div className="flex items-center gap-3 mb-3">
        <p
          className="font-mono uppercase tracking-[0.16em] text-[12px]"
          style={{ color: isPrimary ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.34)' }}
        >
          <Period text={exp.period} isPrimary={isPrimary} />
        </p>

        {/* Yellow dot — only for the primary / current role */}
        {isPrimary && (
          <motion.span
            aria-label="Current role"
            className="inline-block w-[5px] h-[5px] rounded-full bg-[#f2d832] shrink-0"
            style={{ boxShadow: '0 0 8px rgba(242,216,50,0.7)' }}
            animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* ── Top rule ── */}
      <div
        className="w-full mb-3"
        style={{
          height: '1px',
          background: isPrimary
            ? 'linear-gradient(to right, rgba(242,216,50,0.4) 0%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.04) 100%)'
            : 'rgba(255,255,255,0.07)',
        }}
      />

      {/* ── Role + Company on one line ── */}
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h3
          className="font-bold tracking-[-0.025em] leading-tight text-white"
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: isPrimary ? 'clamp(17px, 1.6vw, 24px)' : 'clamp(15px, 1.3vw, 19px)',
          }}
        >
          {exp.role}
        </h3>
        <span
          className="font-mono tracking-wide shrink-0 text-right"
          style={{
            fontSize: '12px',
            color: isPrimary ? 'rgba(242,216,50,0.45)' : 'rgba(255,255,255,0.3)',
          }}
        >
          {exp.company}
        </span>
      </div>

      {/* ── Bottom rule ── */}
      <div className="w-full mb-6" style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

      {/* ── Description ── */}
      <p
        className="text-[14px] leading-relaxed mb-5"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        {exp.description}
      </p>

      {/* ── Highlights — inline dot-separated ── */}
      {exp.highlights && exp.highlights.length > 0 && (
        <p className="text-[12px] font-mono" style={{ color: 'rgba(255,255,255,0.36)', lineHeight: 1.9 }}>
          {exp.highlights.map((h, i) => (
            <span key={h}>
              {h}
              {i < (exp.highlights?.length ?? 0) - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>{' · '}</span>
              )}
            </span>
          ))}
        </p>
      )}
    </motion.article>
  )
}

// ─── Left panel ───────────────────────────────────────────────────────────────

function LeftPanel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="lg:sticky lg:top-28 lg:self-start"
      initial={reduced ? {} : { opacity: 0, y: 16 }}
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

      <p className="text-[14px] leading-relaxed mb-8 max-w-[300px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
        A career built across design and development — from visual systems and brand identity
        to mobile interfaces and interactive frontend experiences.
      </p>

      <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.05)' }} />

      <Toolkit reduced={reduced} />
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
//
// Two-column on desktop: sticky left panel (heading + toolkit) + document timeline right.
//
// EDIT TIMELINE ENTRIES → src/data/experience.ts
//   Array is ordered most-recent-first.
//   index 0 → isPrimary (Lead Mobile Developer, U-wifi Inc.)
//
// EDIT SKILL GROUPS → src/data/skills.ts

export default function Experience() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header strip */}
        <div className="flex items-center gap-4 py-12">
          <span className="text-[12px] font-mono text-[#606058] tracking-widest">05</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[12px] font-mono text-[#606058] tracking-widest uppercase">
            Experience &amp; Skills
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 lg:gap-24 pb-32 items-start">

          <LeftPanel reduced={reduced} />

          {/* Document timeline */}
          <div>
            {/* Career path annotation */}
            <motion.div
              className="flex items-center gap-3 mb-14"
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="flex items-center gap-2 shrink-0">
                <span aria-hidden className="w-[5px] h-[5px] rounded-full bg-[#f2d832]/40 shrink-0" />
                <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#3e3e38]">
                  Career Path
                </span>
              </div>
              <div className="flex-1 h-px bg-white/[0.04]" />
              <span className="text-[11px] font-mono text-[#3a3a34] tracking-[0.14em] shrink-0">
                2018 — Present
              </span>
            </motion.div>

            {/* Entries — index 0 is the primary (most recent) role */}
            {experiences.map((exp, i) => (
              <DocumentEntry
                key={`${exp.company}-${i}`}
                exp={exp}
                index={i}
                isPrimary={i === 0}
                reduced={reduced}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

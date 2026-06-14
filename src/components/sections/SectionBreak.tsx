'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

// ─── SectionBreak ─────────────────────────────────────────────────────────────
//
// Visual chapter break between Selected Work and Device Showcase.
// Feels like a typographic intermission — not a banner, not a section.
//
// Structure:
//   Ghost HELO — massive, near-invisible, parallax on scroll
//   Diagonal stripe — HELO yellow at 3% opacity, moves opposite to scroll
//   Yellow accent line — 28px, 1px, very subtle
//   Lora italic statement — "Built with intent."
//   Byline — two mono lines, right-aligned on desktop
//
// The ghost HELO scrolls at a different rate than the page content,
// creating depth without needing any 3D. The diagonal stripe reinforces
// the motion by moving in the opposite direction — editorial, not decorative.

const EASE = [0.16, 1, 0.3, 1] as const

export default function SectionBreak() {
  const reduced   = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Ghost HELO slides downward as you scroll past (parallax — slower than page)
  const ghostY     = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  // Diagonal stripe moves upward (opposite direction — creates tension)
  const stripeY    = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const stripeX    = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  // Second stripe moves faster
  const stripe2Y   = useTransform(scrollYProgress, [0, 1], ['18%', '-18%'])
  const stripe2X   = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.04] overflow-hidden"
      style={{ background: '#1a1815' }}
    >

      {/* ── Ghost HELO watermark — parallax, slower than page scroll ── */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 pointer-events-none select-none"
        style={{
          fontFamily:    'var(--font-singapore-sling)',
          fontSize:      'clamp(100px, 20vw, 300px)',
          color:         'rgba(255,255,255,0.028)',
          letterSpacing: '0.04em',
          lineHeight:    0.85,
          translateX:    '-0.025em',
          y:             reduced ? 0 : ghostY,
        }}
      >
        HELO
      </motion.div>

      {/* ── Diagonal editorial stripe — moves opposite to scroll ── */}
      {/* A thin HELO-yellow band crossing the section at ~20° — moves with parallax */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width:       '140%',
            height:      1,
            left:        '-20%',
            top:         '42%',
            background:  'rgba(242,216,50,0.06)',
            transform:   'rotate(-8deg)',
            y:           stripeY,
            x:           stripeX,
          }}
        />
      )}
      {/* Second stripe — offset, even thinner, moves faster */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width:      '110%',
            height:     1,
            left:       '-5%',
            top:        '55%',
            background: 'rgba(242,216,50,0.03)',
            transform:  'rotate(-8deg)',
            y:          stripe2Y,
            x:          stripe2X,
          }}
        />
      )}

      {/* ── Editorial content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-10 lg:gap-24">

          {/* Left: statement */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {/* Yellow accent line */}
            <div
              aria-hidden
              style={{
                width:        28,
                height:       '1px',
                background:   'rgba(242,216,50,0.3)',
                marginBottom: '1.75rem',
              }}
            />

            {/* Lora italic — only serif text on the entire page */}
            <p
              style={{
                fontFamily: 'var(--font-lora)',
                fontStyle:  'italic',
                fontSize:   'clamp(26px, 3.8vw, 50px)',
                color:      'rgba(255,255,255,0.5)',
                lineHeight: 1.2,
              }}
            >
              Built with intent.
            </p>
          </motion.div>

          {/* Right: byline */}
          <motion.div
            initial={reduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="flex flex-col gap-2 lg:items-end shrink-0"
          >
            <p className="text-[11px] font-mono text-[#4a4a44] tracking-[0.2em] uppercase">
              Designed by HELO
            </p>
            <p className="text-[11px] font-mono text-[#343430] tracking-[0.2em] uppercase">
              Developed by HELO
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

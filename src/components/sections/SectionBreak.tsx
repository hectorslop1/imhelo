'use client'

import { motion, useReducedMotion } from 'motion/react'

// ─── SectionBreak ─────────────────────────────────────────────────────────────
//
// Visual chapter break between Selected Work and Device Showcase.
// Feels like a typographic intermission — not a banner, not a section.
//
// Structure:
//   Ghost HELO — massive, near-invisible, anchored bottom-left
//   Yellow accent line — 28px, 1px, very subtle
//   Lora italic statement — "Built with intent."  ← only serif moment on the page
//   Byline — two mono lines, right-aligned on desktop
//
// To change the phrase: edit the <p> content below.
// To change the ghost opacity: adjust rgba(255,255,255,0.024)
// Background is #0a0a09 — intentionally between hero #080808 and body #0d0d0d.

const EASE = [0.16, 1, 0.3, 1] as const

export default function SectionBreak() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      className="relative border-t border-white/[0.04] overflow-hidden"
      style={{ background: '#0a0a09' }}
    >
      {/* ── Ghost HELO watermark ── */}
      {/* Bottom-left anchor. Ultra-faint — present for depth, invisible at a glance. */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 pointer-events-none select-none"
        style={{
          fontFamily:    'var(--font-singapore-sling)',
          fontSize:      'clamp(100px, 20vw, 300px)',
          color:         'rgba(255,255,255,0.024)',
          letterSpacing: '0.04em',
          lineHeight:    0.85,
          transform:     'translateX(-0.025em)',
        }}
      >
        HELO
      </div>

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
            {/* Yellow accent line — 1px, 28px wide, very subtle */}
            <div
              aria-hidden
              style={{
                width:        28,
                height:       '1px',
                background:   'rgba(242,216,50,0.3)',
                marginBottom: '1.75rem',
              }}
            />

            {/* Lora italic phrase — only serif text on the entire page */}
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

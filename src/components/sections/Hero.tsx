'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Hero / MONUMENT ─────────────────────────────────────────────────────────
//
// HELO fills the viewport as a graphic object, not a headline.
// Singapore Sling at viewport-spanning scale.
//
// On scroll: the wordmark fades and lifts — visually handing off
// to the header logo that fades in simultaneously.
//
// No CTA buttons. The confidence is the CTA.

export default function Hero() {
  const reduced = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Monument wordmark fades as user scrolls through the hero
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const wordmarkY       = useTransform(scrollYProgress, [0, 0.45], [0, -28])

  // Scroll indicator disappears as soon as the user begins scrolling
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
      style={{ background: '#080808' }}
    >
      {/* ── Monument wordmark block ── */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full">

          <motion.div
            style={reduced ? {} : { opacity: wordmarkOpacity, y: wordmarkY }}
          >
            {/* HELO — the graphic object
                Large vw-based font-size fills most of the viewport width.
                Singapore Sling is loaded as a local font variable. */}
            <div className="overflow-hidden" style={{ paddingBottom: '0.05em' }}>
              <motion.h1
                initial={reduced ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-normal text-white select-none"
                style={{
                  fontFamily: 'var(--font-singapore-sling)',
                  fontSize: 'clamp(140px, 30vw, 560px)',
                  lineHeight: 0.88,
                  letterSpacing: '0.04em',
                }}
                aria-label="HELO — Hector Lopez, Design & Development"
              >
                HELO
              </motion.h1>
            </div>

            {/* Mono metadata — single restrained line below the wordmark */}
            <motion.p
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.35 }}
              className="mt-10 text-[12px] font-mono uppercase tracking-[0.2em]"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              Design &amp; Development<span style={{ color: 'rgba(255,255,255,0.2)' }}>{' · '}</span>San Diego, CA<span style={{ color: 'rgba(255,255,255,0.2)' }}>{' · '}</span>2026
            </motion.p>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator — bottom centre ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.7 }}
        style={reduced ? {} : { opacity: indicatorOpacity }}
        aria-hidden
      >
        {/* Animated drip line */}
        <div
          className="w-px relative overflow-hidden"
          style={{ height: 44, background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, rgba(242,216,50,0.65), transparent)',
            }}
            animate={reduced ? {} : { y: ['-100%', '350%'] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.8,
            }}
          />
        </div>
        <span
          className="text-[8px] font-mono tracking-[0.35em] uppercase"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}

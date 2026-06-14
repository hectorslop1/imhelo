'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import HeroSticker from '@/components/ui/HeroSticker'
import SplitReveal from '@/components/ui/SplitReveal'
import { duration, ease } from '@/lib/motion-tokens'

// Social links — bottom-left vertical stack, same position language as azizkhaldi.com.
const HERO_SOCIALS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance',   href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble',  href: 'https://dribbble.com/hectorslop' },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
//
// LIGHT field, minimal, centred — the azizkhaldi.com hero language adapted to HELO.
// The animated flame character is the centrepiece (our equivalent of Aziz's blob).
// Edge framing mirrors Aziz: left vertical rail, bottom-left socials, a vertical
// name label on the right, and a centred "scroll down" cue.

export default function Hero() {
  const reduced = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity   = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY         = useTransform(scrollYProgress, [0, 0.5], [0, -36])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])

  const roleLines = ['Designer &', 'Developer.']

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* ── Centred composition: eyebrow + role, sticker, name ── */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-24">
        {/* eyebrow + role — these fade & lift on scroll; the sticker handles its own exit */}
        <motion.div
          className="flex flex-col items-center"
          style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          {/* eyebrow */}
          <motion.p
            className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.32em] mb-5"
            style={{ color: 'var(--ink-3)' }}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.medium, ease: ease.out, delay: 0.2 }}
          >
            Hi! I&rsquo;m Hector
          </motion.p>

          {/* role lines — per-character mask-rise cascade (azizkhaldi.com heading signature) */}
          <h1 className="mb-2" aria-label="Hector Lopez — Designer & Developer">
            {roleLines.map((line, i) => (
              <SplitReveal
                key={line}
                text={line}
                as="span"
                by="char"
                className="block font-semibold"
                style={{
                  fontFamily: 'var(--font-cabinet)',
                  fontSize: 'clamp(38px, 5.2vw, 72px)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  color: 'var(--ink)',
                }}
                delay={0.3 + i * 0.2}
                stagger={0.026}
                duration={0.6}
              />
            ))}
          </h1>
        </motion.div>

        {/* flame sticker centrepiece — peels, falls (physics) & drops back from above, outside the text fade */}
        <div className="my-1">
          <HeroSticker height={340} />
        </div>

        {/* full-name detail label (Aziz-style small caps) — fades & lifts on scroll */}
        <motion.div style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}>
          <motion.p
            className="text-[11px] font-mono uppercase tracking-[0.42em] mt-1"
            style={{ color: 'var(--ink-4)' }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, ease: ease.out, delay: 0.9 }}
          >
            Hector Lopez
          </motion.p>
        </motion.div>
      </div>

      {/* ── Left vertical rail — decorative scroll rail (azizkhaldi.com) ── */}
      <motion.div
        className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-10"
        style={{ height: 280 }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: ease.out, delay: 0.7 }}
        aria-hidden
      >
        <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--ink-3)' }} />
        <span className="flex-1 w-px my-2" style={{ background: 'var(--line)' }} />
        <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--ink-4)' }} />
      </motion.div>

      {/* ── Social links — bottom-left vertical stack ── */}
      <motion.div
        className="absolute left-8 lg:left-10 bottom-10 hidden lg:flex flex-col items-start gap-3 z-10"
        initial={reduced ? false : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: ease.out, delay: 1.0 }}
        aria-label="Social links"
      >
        {HERO_SOCIALS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono tracking-[0.18em] uppercase transition-colors duration-300"
            style={{ color: 'var(--ink-4)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-4)')}
          >
            {label}
          </Link>
        ))}
      </motion.div>

      {/* ── scroll down — bottom centre ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: ease.out, delay: 0.8 }}
        style={reduced ? undefined : { opacity: indicatorOpacity }}
        aria-hidden
      >
        <span className="text-[12px] font-mono tracking-[0.12em]" style={{ color: 'var(--ink-3)' }}>
          scroll down
        </span>
        <div className="w-px relative overflow-hidden" style={{ height: 40, background: 'var(--line)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, rgba(20,19,15,0.5), transparent)',
            }}
            animate={reduced ? undefined : { y: ['-100%', '350%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.7 }}
          />
        </div>
      </motion.div>
    </section>
  )
}

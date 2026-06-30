'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import ScrollWordReveal from '@/components/ui/ScrollWordReveal'
import CountUp from '@/components/ui/CountUp'
import { useI18n } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Intro ────────────────────────────────────────────────────────────────────
//
// The first dark "room" (#1a1815). It's `min-h-screen` so the light↔dark flood
// holds a full viewport here — the dark mood registers and the word-reveal
// statement has room to read before the screen returns to light at AboutBlock.
//
// A faint warm radial glow at left-center (under the heading) adds depth without
// being visible at first glance. Type is Hanken Grotesk (--font-cabinet) bold.

export default function Intro() {
  const reduced = useReducedMotion() ?? false
  const { t, lang } = useI18n()

  return (
    <section
      data-section-theme="dark"
      className="border-t border-white/[0.06] relative overflow-hidden min-h-screen flex items-center"
      style={{ background: '#1a1815' }}
    >
      {/* Subtle ambient warm glow — barely visible, creates sense of depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 25% 55%, rgba(242,216,50,0.028) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-28">

        {/* Index + label row — the horizontal rule draws left-to-right on enter */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <motion.span
            className="text-[12px] font-mono text-[#606058] tracking-widest shrink-0"
            initial={reduced ? {} : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          >
            01
          </motion.span>
          {/* The line draws across — scaleX from 0→1, origin left */}
          <motion.span
            className="flex-1 h-px bg-white/[0.06] origin-left"
            initial={reduced ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          />
          <motion.span
            className="text-[12px] font-mono text-[#606058] tracking-widest uppercase shrink-0"
            initial={reduced ? {} : { opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          >
            {t('home.intro.label')}
          </motion.span>
        </motion.div>

        {/* Statement — word-by-word scroll illumination (azizkhaldi.com intro signature) */}
        <ScrollWordReveal
          key={lang}
          as="h2"
          className="font-bold leading-[1.12] tracking-[-0.04em] max-w-4xl"
          style={{ fontSize: 'clamp(22px, 3vw, 48px)', fontFamily: 'var(--font-cabinet)' }}
          baseColor="var(--on-dark)"
          segments={[
            { text: t('home.intro.stmt1') },
            { text: t('home.intro.stmt2'), color: 'rgba(236,233,226,0.45)' },
            { text: t('home.intro.stmt3'), color: '#f2d832' },
          ]}
        />

        {/* About Me CTA pill — centred (azizkhaldi.com intro signature) */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={reduced ? {} : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 rounded-full pl-7 pr-2 py-2 bg-[#f2d832] text-[#16150f] transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="text-[14px] font-medium tracking-[-0.01em]">{t('home.intro.cta')}</span>
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#16150f] text-[#f2d832] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </motion.div>

        {/* Bottom area — bio + stats, same visual language as Aziz's 4+/30+ */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/[0.04]"
          initial={reduced ? {} : { opacity: 0, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          {/* Bio + discipline tag */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
            <p className="text-[14px] text-[#7a7a72] leading-relaxed max-w-sm">
              {t('home.intro.bio')}
            </p>
            <p className="text-[12px] font-mono text-[#606058] tracking-[0.16em] uppercase">
              {t('disc.development')}<span className="text-[#f2d832]">{' ✦ '}</span>{t('disc.design')}
            </p>
          </div>

          {/* Stats row — figures count up when scrolled into view */}
          <div className="flex gap-12 pt-8 border-t border-white/[0.04]">
            {[
              { num: 9,  suffix: '+', label: t('home.intro.stat1') },
              { num: 50, suffix: '+', label: t('home.intro.stat2') },
              { num: 2,  suffix: '',  label: t('home.intro.stat3') },
            ].map(({ num, suffix, label }) => (
              <div key={label}>
                <CountUp
                  value={num}
                  suffix={suffix}
                  className="font-extrabold leading-none block"
                  style={{
                    fontFamily:    'var(--font-cabinet)',
                    fontSize:      'clamp(32px, 3.8vw, 52px)',
                    letterSpacing: '-0.04em',
                    color:         '#f2d832',
                  }}
                />
                <p className="text-[11px] font-mono text-[#4a4a44] tracking-[0.14em] uppercase mt-2">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

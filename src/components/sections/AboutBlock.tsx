'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useI18n } from '@/lib/i18n'

// ─── AboutBlock ───────────────────────────────────────────────────────────────
//
// The azizkhaldi.com "About" beat that sits right after the intro: a giant
// viewport-overflow kinetic marquee of the role words, a large black-and-white
// portrait, and the "Scroll to Explore / My Short Story" edge labels.
//
// LIGHT section. The marquee text is sized in vw so it bleeds past both edges,
// exactly like Aziz's "FULL-STACK DEVELOPER UI & UX DESIGNER." band.

const EASE = [0.16, 1, 0.3, 1] as const

export default function AboutBlock() {
  const reduced = useReducedMotion() ?? false
  const { t } = useI18n()

  const marqueeItems = [t('marquee.designer'), t('marquee.developer')]
  const track = Array.from({ length: 6 }, () => marqueeItems).flat()

  return (
    <section
      data-section-theme="light"
      className="relative overflow-hidden border-t border-[var(--line)] py-16 lg:py-24"
      style={{ background: 'var(--surface)' }}
    >
      {/* ── Edge labels ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center justify-between mb-10 lg:mb-14">
        <motion.span
          className="text-[11px] font-mono uppercase tracking-[0.22em] flex items-center gap-2"
          style={{ color: 'var(--ink-3)' }}
          initial={reduced ? {} : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span aria-hidden>↓</span> {t('home.about.scroll')}
        </motion.span>
        <motion.span
          className="text-[11px] font-mono uppercase tracking-[0.22em]"
          style={{ color: 'var(--ink-3)' }}
          initial={reduced ? {} : { opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          {t('home.about.story')}
        </motion.span>
      </div>

      {/* ── Giant kinetic marquee — overflows both edges ── */}
      <div className="overflow-hidden select-none mb-14 lg:mb-20" aria-hidden>
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {track.map((word, i) => (
            <span
              key={i}
              className="shrink-0 font-extrabold uppercase"
              style={{
                fontFamily:    'var(--font-cabinet)',
                fontSize:      'clamp(58px, 13vw, 190px)',
                letterSpacing: '-0.035em',
                lineHeight:    1,
                color:         'var(--ink)',
              }}
            >
              {word}
              <span style={{ color: 'var(--accent-deep)', padding: '0 0.18em' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Large B&W portrait ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex justify-center">
        <motion.div
          className="relative w-full max-w-[540px] overflow-hidden rounded-2xl"
          style={{ aspectRatio: '4 / 5' }}
          initial={reduced ? {} : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Image
            src="/assetshelo/ProfilePicture/IMG_5081.JPG"
            alt="Hector Lopez — designer and developer based in San Diego"
            fill
            sizes="(max-width: 768px) 90vw, 540px"
            className="object-cover"
            style={{ filter: 'grayscale(1) contrast(1.05) brightness(0.98)', objectPosition: 'center top' }}
          />
          {/* corner ticks — Aziz-style framing accents */}
          <span className="absolute top-0 left-0 w-8 h-px" style={{ background: 'var(--accent)' }} />
          <span className="absolute top-0 left-0 w-px h-8" style={{ background: 'var(--accent)' }} />
          <span className="absolute bottom-0 right-0 w-8 h-px" style={{ background: 'var(--accent)' }} />
          <span className="absolute bottom-0 right-0 w-px h-8" style={{ background: 'var(--accent)' }} />
        </motion.div>
      </div>
    </section>
  )
}

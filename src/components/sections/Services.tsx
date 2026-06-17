'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Code2, Palette, type LucideIcon } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as const

type Pillar = {
  index: string
  titleKey: string
  descKey: string
  tools: string
  Icon: LucideIcon
}

const PILLARS: Pillar[] = [
  {
    index: '01',
    titleKey: 'disc.development',
    descKey: 'services.dev.desc',
    tools: 'Next.js · React · TypeScript · GSAP · Motion',
    Icon: Code2,
  },
  {
    index: '02',
    titleKey: 'disc.design',
    descKey: 'services.design.desc',
    tools: 'Figma · Illustrator · Branding · Typography',
    Icon: Palette,
  },
]

// ─── Services / What I Do ───────────────────────────────────────────────────────
//
// azizkhaldi.com "What I do" card grid: bordered cards sitting side by side, each
// with a filled accent circle holding a line-icon, a number, a bold title, a
// hairline divider, and a description. Aziz has 4 cards (horizontal scroll); HELO
// has two disciplines, so the two cards fill the row without a carousel.

function PillarCard({ pillar, reduced, index }: { pillar: Pillar; reduced: boolean; index: number }) {
  const { Icon } = pillar
  const { t } = useI18n()
  return (
    <motion.div
      className="group relative flex flex-col p-8 lg:p-12 transition-colors duration-500 hover:bg-black/[0.015]"
      initial={reduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
    >
      {/* Top row — icon circle + number */}
      <div className="flex items-start justify-between mb-12 lg:mb-16">
        <span
          className="flex items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-[1.06]"
          style={{ width: 80, height: 80, background: 'var(--accent)' }}
        >
          <Icon size={30} strokeWidth={1.6} color="#16150f" />
        </span>
        <span
          className="font-light tracking-tight"
          style={{ fontSize: 24, fontFamily: 'var(--font-cabinet)', color: 'var(--ink-4)' }}
        >
          {pillar.index}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-bold tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', fontFamily: 'var(--font-cabinet)', color: 'var(--ink)' }}
      >
        {t(pillar.titleKey)}
      </h3>

      {/* Divider */}
      <div className="h-px w-full my-6 lg:my-7" style={{ background: 'var(--line)' }} />

      {/* Description + tools */}
      <p className="text-[15px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
        {t(pillar.descKey)}
      </p>
      <p className="mt-5 text-[11px] font-mono tracking-wide" style={{ color: 'var(--ink-3)' }}>
        {pillar.tools}
      </p>
    </motion.div>
  )
}

export default function Services() {
  const reduced = useReducedMotion() ?? false
  const { t } = useI18n()

  return (
    <section className="border-t border-[var(--line)]" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header — draw-line animation */}
        <div className="flex items-center gap-4 py-12">
          <motion.span
            className="text-[12px] font-mono text-[#686868] tracking-widest shrink-0"
            initial={reduced ? {} : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            02
          </motion.span>
          <motion.span
            className="flex-1 h-px origin-left"
            style={{ background: 'var(--line)' }}
            initial={reduced ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          />
          <motion.span
            className="text-[12px] font-mono text-[#686868] tracking-widest uppercase shrink-0"
            initial={reduced ? {} : { opacity: 0, x: 6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          >
            {t('home.services.label')}
          </motion.span>
        </div>

        {/* Card grid — bordered, adjacent cards (azizkhaldi.com "What I do") */}
        <div className="pb-20 lg:pb-24">
          <div
            className="grid grid-cols-1 md:grid-cols-2 border-y"
            style={{ borderColor: 'var(--line)' }}
          >
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.index}
                className={i > 0 ? 'border-t md:border-t-0 md:border-l' : ''}
                style={{ borderColor: 'var(--line)' }}
              >
                <PillarCard pillar={pillar} reduced={reduced} index={i} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import SplitReveal from '@/components/ui/SplitReveal'
import { useI18n } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as const

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance', href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble', href: 'https://dribbble.com/hectorslop' },
]

export default function ContactContent() {
  const reduced = useReducedMotion() ?? false
  const { t } = useI18n()

  const META = [
    { label: t('contact.basedIn'), value: 'San Diego, CA' },
    { label: t('contact.availability'), value: t('contact.availabilityValue') },
    { label: t('contact.reply'), value: t('contact.replyValue') },
  ]
  const rise = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, ease: EASE, delay },
  })

  return (
    <main className="min-h-screen pt-36 lg:pt-44 pb-28 px-6 lg:px-12" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Label */}
        <motion.p
          className="text-[12px] font-mono tracking-[0.22em] uppercase text-[#a8821a] mb-8"
          {...rise(0)}
        >
          {t('contact.label')}
        </motion.p>

        {/* Heading */}
        <SplitReveal
          text={t('contact.title')}
          as="h1"
          by="word"
          className="block font-bold tracking-[-0.04em] leading-[0.98] max-w-[15ch]"
          style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(44px, 8vw, 110px)', color: 'var(--ink)' }}
          stagger={0.04}
          duration={0.7}
        />

        {/* Lead */}
        <motion.p
          className="mt-10 text-[17px] lg:text-[19px] leading-relaxed max-w-[52ch]"
          style={{ color: 'var(--ink-2)' }}
          {...rise(0.1)}
        >
          {t('contact.lead')}
        </motion.p>

        {/* Prominent email */}
        <motion.a
          href="mailto:hello@imhelo.com"
          className="group inline-flex items-center gap-4 mt-12 lg:mt-16 w-fit"
          {...rise(0.15)}
        >
          <span
            className="font-bold tracking-[-0.03em] transition-colors duration-300 group-hover:text-[#a8821a]"
            style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(28px, 5vw, 64px)', color: 'var(--ink)' }}
          >
            hello@imhelo.com
          </span>
          <span className="flex items-center justify-center w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-[#14130f] text-[#f2d832] shrink-0 transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </span>
        </motion.a>

        {/* Meta grid */}
        <motion.div
          className="mt-20 lg:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[var(--line)] pt-10 max-w-3xl"
          {...rise(0.2)}
        >
          {META.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#9a968b] mb-2">{label}</p>
              <p className="text-[15px]" style={{ color: 'var(--ink)' }}>{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Connect */}
        <motion.div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3" {...rise(0.28)}>
          <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#9a968b]">{t('contact.connect')}</span>
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-[14px] text-[#5a574e] hover:text-[var(--ink)] transition-colors duration-300"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-[#f2d832] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </motion.div>

      </div>
    </main>
  )
}

'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import ClipReveal from '@/components/ui/ClipReveal'
import ImageReveal from '@/components/ui/ImageReveal'
import { useI18n } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as const

const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance',   href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble',  href: 'https://dribbble.com/hectorslop' },
]

export default function AboutContent() {
  const reduced = useReducedMotion() ?? false
  const { t } = useI18n()

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

      {/* Section label strip — draw-line */}
      <div className="flex items-center gap-4 pt-40 pb-16">
        <motion.span
          className="text-[12px] font-mono text-[#686868] tracking-widest shrink-0"
          initial={reduced ? {} : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
        >
          01
        </motion.span>
        <motion.span
          className="flex-1 h-px bg-[var(--line)] origin-left"
          initial={reduced ? {} : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
        />
        <motion.span
          className="text-[12px] font-mono text-[#686868] tracking-widest uppercase shrink-0"
          initial={reduced ? {} : { opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.32 }}
        >
          {t('home.intro.label')}
        </motion.span>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-28 items-start pb-32">

        {/* ── Left: text ── */}
        <div>
          {/* Name — ClipReveal premium text entrance */}
          <ClipReveal dur={0.9}>
            <h1
              className="font-extrabold tracking-[-0.05em] leading-[0.9] mb-8"
              style={{
                fontFamily: 'var(--font-cabinet)',
                fontSize:   'clamp(52px, 8vw, 112px)',
                color:      'var(--ink)',
              }}
            >
              Hector<br />Lopez
            </h1>
          </ClipReveal>

          {/* Role tag */}
          <motion.p
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-12"
            style={{ color: 'var(--accent-deep)' }}
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          >
            {t('about.role')}
          </motion.p>

          {/* Horizontal rule */}
          <motion.div
            className="w-full h-px mb-12"
            style={{ background: 'rgba(20,19,15,0.12)' }}
            initial={reduced ? {} : { scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          />

          {/* Bio */}
          <motion.p
            className="text-[15px] leading-relaxed mb-14"
            style={{
              color:         'var(--ink-2)',
              letterSpacing: '-0.01em',
              maxWidth:      '480px',
            }}
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            {t('about.bio')}
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-8 mb-14"
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          >
            {[
              { label: t('about.focus'),     value: t('about.focusValue') },
              { label: t('contact.basedIn'), value: 'San Diego, CA'       },
              { label: t('about.since'),     value: '2017'                },
            ].map(({ label, value }, i) => (
              <div key={label} className="flex items-start gap-8">
                {i > 0 && (
                  <div className="w-px self-stretch mt-1" style={{ background: 'rgba(20,19,15,0.12)' }} />
                )}
                <div>
                  <p className="text-[11px] font-mono text-[#686868] tracking-[0.18em] uppercase mb-2">
                    {label}
                  </p>
                  <p className="text-[13px] font-mono text-[var(--ink-2)] whitespace-pre-line leading-relaxed">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
          >
            <span className="text-[11px] font-mono text-[#686868] tracking-[0.18em] uppercase shrink-0">
              {t('contact.connect')}
            </span>
            <div
              className="hidden sm:block flex-1 h-px"
              style={{ background: 'rgba(20,19,15,0.12)', minWidth: 24 }}
            />
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative text-[12px] font-mono text-[#686868] hover:text-[var(--ink)] transition-colors duration-300 tracking-wide overflow-hidden py-px"
              >
                {label}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px bg-[#f2d832] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: profile photo — ImageReveal premium entrance ── */}
        <div className="relative lg:sticky lg:top-28">
          <ImageReveal
            className="w-full"
            delay={0.3}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '4 / 5', background: 'var(--surface-2)' }}
            >
              <Image
                src="/assetshelo/ProfilePicture/IMG_5081.JPG"
                alt="Hector Lopez — designer and developer based in San Diego"
                fill
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover"
                style={{
                  filter:         'grayscale(1) brightness(0.96) contrast(1.08)',
                  objectPosition: 'center top',
                }}
                priority
              />

              <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply"
                style={{ background: 'rgba(242,216,50,0.04)' }}
              />

              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--surface), transparent)' }}
              />

              <div
                className="absolute top-0 left-0 w-10 h-px pointer-events-none"
                style={{ background: 'rgba(242,216,50,0.7)' }}
              />
              <div
                className="absolute top-0 left-0 w-px h-10 pointer-events-none"
                style={{ background: 'rgba(242,216,50,0.7)' }}
              />
            </div>
          </ImageReveal>

          <p className="mt-3 text-[11px] font-mono text-[#686868] tracking-widest">
            HECTOR LOPEZ — SAN DIEGO, CA
          </p>
        </div>

      </div>
    </div>
  )
}

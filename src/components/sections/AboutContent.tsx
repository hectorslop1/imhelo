'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Social links ─────────────────────────────────────────────────────────────
// To update: change href values here. Labels are used as display text + aria-label.

const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance',   href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble',  href: 'https://dribbble.com/hectorslop' },
]

// ─── AboutContent (client) ────────────────────────────────────────────────────
//
// Editorial two-column layout: text left, photo right.
// Photo: grayscale + slight contrast lift — intentional, not a headshot.
// Profile image: /public/assetshelo/ProfilePicture/IMG_5081.JPG

export default function AboutContent() {
  const reduced = useReducedMotion() ?? false

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

      {/* Section label strip */}
      <div className="flex items-center gap-4 pt-40 pb-16">
        <span className="text-[12px] font-mono text-[#606058] tracking-widest">01</span>
        <span className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-[12px] font-mono text-[#606058] tracking-widest uppercase">About</span>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-28 items-start pb-32">

        {/* ── Left: text ── */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Name */}
          <h1
            className="font-extrabold tracking-[-0.05em] text-white leading-[0.9] mb-8"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize:   'clamp(52px, 8vw, 112px)',
            }}
          >
            Hector<br />Lopez
          </h1>

          {/* Role tag */}
          <p
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-12"
            style={{ color: 'rgba(242,216,50,0.6)' }}
          >
            Designer &amp; Developer · San Diego, CA
          </p>

          {/* Horizontal rule */}
          <div className="w-full h-px mb-12" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* Bio */}
          <p
            className="text-[15px] leading-relaxed mb-14"
            style={{
              color:          'rgba(255,255,255,0.52)',
              letterSpacing:  '-0.01em',
              maxWidth:       '480px',
            }}
          >
            I&apos;m Hector Lopez, a designer and developer creating visual systems,
            interfaces, and digital experiences with a focus on clarity, motion, and craft.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mb-14">
            {[
              { label: 'Focus',    value: 'Development\nGraphic Design' },
              { label: 'Based in', value: 'San Diego, CA'               },
              { label: 'Since',    value: '2017'                         },
            ].map(({ label, value }, i) => (
              <div key={label} className="flex items-start gap-8">
                {i > 0 && (
                  <div className="w-px self-stretch mt-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                )}
                <div>
                  <p className="text-[11px] font-mono text-[#3e3e38] tracking-[0.18em] uppercase mb-2">
                    {label}
                  </p>
                  <p className="text-[13px] font-mono text-[#888880] whitespace-pre-line leading-relaxed">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="text-[11px] font-mono text-[#3e3e38] tracking-[0.18em] uppercase shrink-0">
              Connect
            </span>
            <div
              className="hidden sm:block flex-1 h-px"
              style={{ background: 'rgba(255,255,255,0.06)', minWidth: 24 }}
            />
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[12px] font-mono text-[#606058] hover:text-white transition-colors duration-300 tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Right: profile photo ── */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.18 }}
          className="relative lg:sticky lg:top-28"
        >
          {/* Photo container — portrait ratio, editorial crop */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '4 / 5', background: '#111' }}
          >
            <Image
              src="/assetshelo/ProfilePicture/IMG_5081.JPG"
              alt="Hector Lopez — designer and developer based in San Diego"
              fill
              sizes="(max-width: 1024px) 90vw, 380px"
              className="object-cover"
              style={{
                filter:         'grayscale(1) brightness(0.8) contrast(1.12)',
                objectPosition: 'center top',
              }}
              priority
            />

            {/* Subtle yellow brand tint */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{ background: 'rgba(242,216,50,0.03)' }}
            />

            {/* Bottom gradient — blends into page background */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #080808, transparent)' }}
            />

            {/* Top-left corner accent */}
            <div
              className="absolute top-0 left-0 w-10 h-px pointer-events-none"
              style={{ background: 'rgba(242,216,50,0.4)' }}
            />
            <div
              className="absolute top-0 left-0 w-px h-10 pointer-events-none"
              style={{ background: 'rgba(242,216,50,0.4)' }}
            />
          </div>

          {/* Caption */}
          <p className="mt-3 text-[11px] font-mono text-[#3a3a34] tracking-widest">
            HECTOR LOPEZ — SAN DIEGO, CA
          </p>
        </motion.div>

      </div>
    </div>
  )
}

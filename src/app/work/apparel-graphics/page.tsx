'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Lightbox, type MediaItem } from '@/components/ui/MediaViewer'
import ImageReveal from '@/components/ui/ImageReveal'

const EASE = [0.16, 1, 0.3, 1] as const
const BASE = '/assetshelo/ApparelDesign'

// ─── Hero cycling images ──────────────────────────────────────────────────────
// Apparel images rotate in the animated cover. object-cover for cinematic fill.
// To reorder or add images to the cycle: edit this array only.

const HERO_SRCS: string[] = [
  `${BASE}/MarioTshirt.png`,
  `${BASE}/JackHoodie.jpeg`,
  `${BASE}/PeachTshirt.png`,
  `${BASE}/CharizardHoodie.jpeg`,
  `${BASE}/PrincessHoodie.JPG`,
  `${BASE}/AcuraTshirt.png`,
]

// ─── Gallery ─────────────────────────────────────────────────────────────────
// All 8 apparel assets in one unified list. No IP names in labels.
//
// lightboxRatio: actual image aspect ratio so the lightbox stage fits correctly.
//   AcuraTshirt    1344×720   → '16/9'
//   MarioTshirt    3046×2024  → '3/2'
//   PeachTshirt    3046×2024  → '3/2'
//   CharizardHoodie 2001×1300 → '3/2'
//   JackHoodie     4096×4096  → '1/1'
//   EclipseTshirt  1080×694   → '3/2'
//   MetalGearTshirt 1080×695  → '3/2'
//   PrincessHoodie 1305×940   → '4/3'
//
// To add a piece: append a new entry here and drop the asset in the assets folder.
// To reorder: drag entries within this array — grid follows array order.

type ApparelItem = {
  src:           string
  alt:           string
  label:         string
  lightboxRatio: string
}

const GALLERY: ApparelItem[] = [
  {
    src:           `${BASE}/MarioTshirt.png`,
    alt:           'T-shirt mockup with character graphic print on white tee',
    label:         'T-shirt Concept',
    lightboxRatio: '3/2',
  },
  {
    src:           `${BASE}/PeachTshirt.png`,
    alt:           'T-shirt mockup with illustrated character graphic on white tee',
    label:         'T-shirt Concept',
    lightboxRatio: '3/2',
  },
  {
    src:           `${BASE}/CharizardHoodie.jpeg`,
    alt:           'Hoodie mockup with bold graphic print and dark colorway',
    label:         'Hoodie Concept',
    lightboxRatio: '3/2',
  },
  {
    src:           `${BASE}/JackHoodie.jpeg`,
    alt:           'Hoodie mockup with illustration and premium streetwear aesthetic',
    label:         'Hoodie Concept',
    lightboxRatio: '1/1',
  },
  {
    src:           `${BASE}/AcuraTshirt.png`,
    alt:           'T-shirt mockup with automotive graphic and technical linework',
    label:         'Apparel Graphic',
    lightboxRatio: '16/9',
  },
  {
    src:           `${BASE}/EclipseTshirt.jpg`,
    alt:           'T-shirt mockup with illustrated car graphic on dark tee',
    label:         'T-shirt Concept',
    lightboxRatio: '3/2',
  },
  {
    src:           `${BASE}/MetalGearTshirt.jpg`,
    alt:           'T-shirt mockup with tactical graphic design on dark tee',
    label:         'T-shirt Concept',
    lightboxRatio: '3/2',
  },
  {
    src:           `${BASE}/PrincessHoodie.JPG`,
    alt:           'Hoodie mockup with character illustration print',
    label:         'Fan Concept',
    lightboxRatio: '4/3',
  },
]

// ─── Lightbox list ────────────────────────────────────────────────────────────
const ALL_MEDIA: MediaItem[] = GALLERY.map(item => ({
  type:        'image' as const,
  src:          item.src,
  alt:          item.alt,
  label:        item.label,
  aspectRatio:  item.lightboxRatio,
}))

// ─── Helpers ─────────────────────────────────────────────────────────────────

function HoverOverlay({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <>
      <div className="absolute inset-0 z-[5] pointer-events-none bg-black/0 group-hover:bg-black/28 transition-colors duration-300 flex items-center justify-center">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View
        </span>
      </div>
      <button
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={onClick}
        aria-label={label}
      />
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApparelGraphicsPage() {
  const reduced                    = useReducedMotion() ?? false
  const [heroIndex, setHeroIndex]  = useState(0)
  const [lightbox,  setLightbox]   = useState<number | null>(null)

  // Cycle hero images every 4 s
  useEffect(() => {
    if (reduced) return
    const id = setInterval(
      () => setHeroIndex(i => (i + 1) % HERO_SRCS.length),
      4000,
    )
    return () => clearInterval(id)
  }, [reduced])

  const openAt = useCallback((src: string) => {
    const idx = ALL_MEDIA.findIndex(m => m.src === src)
    if (idx !== -1) setLightbox(idx)
  }, [])

  return (
    <>
      <Header />
      <main style={{ background: '#1a1815' }}>

        {/* ══════════════════════════════════════════════════════════════════════
            HERO — LIGHT header (coherent with the site) + cover banner
        ══════════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--surface)' }} className="pt-36 lg:pt-44 pb-14">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
            <motion.p
              className="font-mono text-[11px] tracking-[0.22em] uppercase mb-5"
              style={{ color: 'var(--accent-deep)' }}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              Graphic Design · Print
            </motion.p>
            <motion.h1
              className="font-extrabold tracking-[-0.04em]"
              style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(52px, 8.5vw, 118px)', lineHeight: 0.9, color: 'var(--ink)' }}
              initial={reduced ? {} : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
            >
              Apparel
              <br />
              Graphics
            </motion.h1>
            <motion.p
              className="mt-5 text-[14px] leading-relaxed"
              style={{ color: 'var(--ink-2)', maxWidth: '440px' }}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.26 }}
            >
              Personal apparel graphic concepts for hoodies and t-shirts —
              exploring how visual identity, illustration, and pop
              culture-inspired graphics can live beyond screens.
            </motion.p>
            <div className="flex flex-wrap items-start gap-x-10 gap-y-4 mt-9 pt-7" style={{ borderTop: '1px solid var(--line)' }}>
              {[
                { label: 'Year', value: 'Ongoing' },
                { label: 'Role', value: 'Graphic Design · Art Direction · Apparel Mockups' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase mb-1.5" style={{ color: 'rgba(22,21,15,0.42)' }}>{label}</p>
                  <p className="text-[13px] leading-snug" style={{ color: 'rgba(22,21,15,0.7)', maxWidth: '380px' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cover banner — Ken Burns crossfade leading into the dark gallery */}
        <section
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '16 / 9', maxHeight: '74vh' }}
        >
          {/* ── Image layer — slow crossfade + Ken Burns ── */}
          <div className="absolute inset-0">
            {reduced ? (
              <Image
                src={HERO_SRCS[0]}
                alt="Apparel graphic concept mockup"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
            ) : (
              <AnimatePresence initial={false}>
                <motion.div
                  key={heroIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1.09 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                    scale:   { duration: 8,   ease: 'linear' },
                  }}
                >
                  <Image
                    src={HERO_SRCS[heroIndex]}
                    alt="Apparel graphic concept mockup"
                    fill
                    priority={heroIndex === 0}
                    quality={90}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Bottom + left gradient for text readability */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                'linear-gradient(to top, #1a1815 0%, rgba(26,24,21,0.7) 12%, rgba(26,24,21,0.12) 45%, transparent 78%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                'linear-gradient(to bottom, rgba(26,24,21,0.14) 0%, transparent 28%)',
            }}
          />

          {/* Text now lives in the light header above — banner is image-only */}

          {/* ── Navigation dots ── */}
          {!reduced && (
            <div className="absolute bottom-5 right-6 lg:right-16 z-[10] flex items-center gap-1.5">
              {HERO_SRCS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500 focus:outline-none"
                  style={{
                    background: i === heroIndex
                      ? 'rgba(242,216,50,0.9)'
                      : 'rgba(255,255,255,0.22)',
                    transform: i === heroIndex ? 'scale(1.4)' : 'scale(1)',
                  }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            GALLERY — unified 2-col grid
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-32">

            {/* Section marker */}
            <motion.div
              className="flex items-center justify-between mb-10 lg:mb-12"
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(242,216,50,0.5)' }}
              >
                01 — Works
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.12em]"
                style={{ color: 'rgba(255,255,255,0.18)' }}
              >
                {GALLERY.length} pieces
              </span>
            </motion.div>

            {/*
             * 2-col desktop/tablet, 1-col mobile.
             * aspect-[3/2] + object-cover — lifestyle mockup shots suit cover cropping.
             * Stagger: (i % 2) × 80 ms → gentle left/right wave per row.
             * Lightbox uses per-image aspect ratio so the stage matches the original.
             */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GALLERY.map((item, i) => (
                <div key={item.src}>
                  <ImageReveal
                    className="rounded-xl aspect-[3/2]"
                    delay={(i % 2) * 0.08}
                  >
                    <div className="relative w-full h-full group" style={{ background: '#0a0a0a' }}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 700px"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <HoverOverlay
                        onClick={() => openAt(item.src)}
                        label={`View: ${item.label}`}
                      />
                    </div>
                  </ImageReveal>

                  <p
                    className="mt-2 font-mono text-[10px] tracking-[0.14em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.22)' }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Disclaimer — very subtle, below the grid */}
            <motion.p
              className="mt-10 font-mono text-[10px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.14)', maxWidth: '440px' }}
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Personal fan concepts. Not affiliated with or endorsed by the
              original IP owners.
            </motion.p>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            NEXT PROJECT
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                Next Project
              </p>
              <Link href="/work/mobile-app-showcase" className="group flex items-center gap-4">
                <span
                  className="font-extrabold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[#f2d832]"
                  style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(26px, 3.5vw, 48px)' }}
                >
                  Mobile App Showcase
                </span>
                <span
                  className="text-[22px] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  →
                </span>
              </Link>
            </motion.div>

            <Link
              href="/work"
              className="font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              All work →
            </Link>
          </div>
        </section>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {lightbox !== null && (
            <Lightbox
              items={ALL_MEDIA}
              startIndex={lightbox}
              onClose={() => setLightbox(null)}
            />
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </>
  )
}

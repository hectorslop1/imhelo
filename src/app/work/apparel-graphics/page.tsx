'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Header from '@/components/layout/Header'
import ActiveTheme from '@/components/ui/ActiveTheme'
import Footer from '@/components/layout/Footer'
import { Lightbox, type MediaItem } from '@/components/ui/MediaViewer'
import ImageReveal from '@/components/ui/ImageReveal'
import ShaderImage from '@/components/ui/ShaderImage'
import { useI18n } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as const
const BASE = '/assetshelo/ApparelDesign'

// ─── Hero cycling images ──────────────────────────────────────────────────────
// Apparel images rotate in the animated cover. object-cover for cinematic fill.
// To reorder or add images to the cycle: edit this array only.

const HERO_SRCS: string[] = [
  `${BASE}/CharizardHoodie.jpeg`,  // bold yellow flat-lay + big type
  `${BASE}/EclipseTshirt.jpg`,     // Fast & Furious green, blueprint back
  `${BASE}/MetalGearTshirt.jpg`,   // moody concrete, Snake artwork
  `${BASE}/MarioTshirt.png`,       // red neon, worn — presentation variety
  `${BASE}/JackHoodie.jpeg`,       // Pumpkin King, worn back view
  `${BASE}/PeachTshirt.png`,       // pink neon, worn — color variety
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
  const { t } = useI18n()
  return (
    <>
      <div className="absolute inset-0 z-[5] pointer-events-none bg-black/0 group-hover:bg-black/28 transition-colors duration-300 flex items-center justify-center">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {t('home.work.view')}
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

// Page-local bilingual copy (resolve with COPY[lang]).
const COPY = {
  en: {
    eyebrow: 'Graphic Design · Print',
    title1: 'Apparel', title2: 'Graphics',
    desc: 'Personal apparel graphic concepts for hoodies and t-shirts — exploring how visual identity, illustration, and pop culture-inspired graphics can live beyond screens.',
    yearLabel: 'Year', yearValue: 'Ongoing',
    roleLabel: 'Role', roleValue: 'Graphic Design · Art Direction · Apparel Mockups',
    worksMarker: '01 — Works',
    pieces: (n: number) => `${n} pieces`,
    disclaimer: 'Personal fan concepts. Not affiliated with or endorsed by the original IP owners.',
  },
  es: {
    eyebrow: 'Diseño Gráfico · Impresión',
    title1: 'Gráficos', title2: 'para Ropa',
    desc: 'Conceptos personales de gráfica para ropa — hoodies y camisetas — explorando cómo la identidad visual, la ilustración y los gráficos inspirados en la cultura pop pueden vivir más allá de la pantalla.',
    yearLabel: 'Año', yearValue: 'En curso',
    roleLabel: 'Rol', roleValue: 'Diseño Gráfico · Dirección de Arte · Mockups de Ropa',
    worksMarker: '01 — Trabajos',
    pieces: (n: number) => `${n} piezas`,
    disclaimer: 'Conceptos personales de fan. Sin afiliación ni respaldo de los dueños originales de la IP.',
  },
} as const

export default function ApparelGraphicsPage() {
  const reduced                    = useReducedMotion() ?? false
  const { t, lang } = useI18n()
  const c = COPY[lang]
  const [heroIndex, setHeroIndex]  = useState(0)
  const [lightbox,  setLightbox]   = useState<number | null>(null)

  const openAt = useCallback((src: string) => {
    const idx = ALL_MEDIA.findIndex(m => m.src === src)
    if (idx !== -1) setLightbox(idx)
  }, [])

  return (
    <>
      <ActiveTheme theme="dark" />
      <Header />
      <main style={{ background: '#1a1815' }}>

        {/* ══════════════════════════════════════════════════════════════════════
            HERO — LIGHT header (coherent with the site) + cover banner
        ══════════════════════════════════════════════════════════════════════ */}
        {/* HERO — full-bleed cover with title + meta overlaid (editorial case study) */}
        <section className="relative min-h-[70vh] sm:min-h-[92vh] flex items-end overflow-hidden">
          {/* ── Cycling image layer — WebGL displacement morph (poster <img> fallback) ── */}
          <ShaderImage
            srcs={HERO_SRCS}
            alt="Apparel graphic concept mockup"
            onIndexChange={setHeroIndex}
            className="absolute inset-0"
          />

          {/* ── Legibility gradient ── */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                'linear-gradient(to bottom, rgba(26,24,21,0.5) 0%, rgba(26,24,21,0.06) 26%, rgba(26,24,21,0.28) 52%, rgba(26,24,21,0.82) 84%, #1a1815 100%)',
            }}
          />

          {/* ── Overlaid content — bottom-left ── */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 pb-16 lg:pb-24">
            <motion.p
              className="font-mono text-[11px] tracking-[0.22em] uppercase mb-5"
              style={{ color: '#f2d832' }}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              {c.eyebrow}
            </motion.p>
            <motion.h1
              className="font-extrabold tracking-[-0.04em]"
              style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(52px, 8.5vw, 118px)', lineHeight: 0.9, color: 'var(--on-dark)' }}
              initial={reduced ? {} : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
            >
              {c.title1}
              <br />
              {c.title2}
            </motion.h1>
            <motion.p
              className="mt-5 text-[14px] leading-relaxed"
              style={{ color: 'rgba(236,233,226,0.78)', maxWidth: '440px' }}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.36 }}
            >
              {c.desc}
            </motion.p>
            <motion.div
              className="flex flex-wrap items-start gap-x-10 gap-y-4 mt-9 pt-7 max-w-3xl"
              style={{ borderTop: '1px solid rgba(236,233,226,0.18)' }}
              initial={reduced ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.46 }}
            >
              {[
                { label: c.yearLabel, value: c.yearValue },
                { label: c.roleLabel, value: c.roleValue },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase mb-1.5" style={{ color: 'rgba(236,233,226,0.5)' }}>{label}</p>
                  <p className="text-[13px] leading-snug" style={{ color: 'rgba(236,233,226,0.82)', maxWidth: '380px' }}>{value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Navigation dots ── */}
          {!reduced && (
            <div className="absolute bottom-6 right-6 lg:right-16 z-[10] flex items-center gap-1.5">
              {HERO_SRCS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500 focus:outline-none"
                  style={{
                    background: i === heroIndex ? 'rgba(242,216,50,0.9)' : 'rgba(255,255,255,0.22)',
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
                {c.worksMarker}
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.12em]"
                style={{ color: 'rgba(255,255,255,0.18)' }}
              >
                {c.pieces(GALLERY.length)}
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
                        label={`${t('home.work.view')}: ${item.label}`}
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
              {c.disclaimer}
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

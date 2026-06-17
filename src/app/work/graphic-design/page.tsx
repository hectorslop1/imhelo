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
const BASE = '/assetshelo/GraphicDesign'

// ─── Hero cycling images ──────────────────────────────────────────────────────
// Six images rotate in the animated cover. object-cover for cinematic fill.
// To reorder or replace: update this array only.

const HERO_SRCS: string[] = [
  `${BASE}/Gba26qPbwAAEM7t.jpeg`,
  `${BASE}/GZGP05WbYAAfZ4V.jpeg`,
  `${BASE}/GRv1j5sb0AAOT25.jpeg`,
  `${BASE}/GRMHLmrbQAAVK9x.jpeg`,
  `${BASE}/GWRnPcvbQAE2by8.jpeg`,
  `${BASE}/F2phz5FaUAAH4fv.jpeg`,
]

// ─── Gallery ─────────────────────────────────────────────────────────────────
// All 15 GraphicDesign images in one unified list.
//
// wide: true  → spans 2 of 3 columns on desktop (lg:col-span-2), aspect 2:1.
//               On tablet the item renders as a regular 1:1 tile (no spanning).
//
// Grid auto-placement (3-col desktop) depends on order — wide items land at
// cols 2–3 or cols 1–2 because of the surrounding single-col items.
// Verified layout per row:
//   Row 1  [0]          [1]          [2]
//   Row 2  [3 WIDE ────────────────] [4]
//   Row 3  [5]          [6 WIDE ───────────]
//   Row 4  [7]          [8]          [9]
//   Row 5  [10]         [11 WIDE ──────────]
//   Row 6  [12]         [13]         [14]
//
// To add/reorder: keep the wide/regular cadence above, or move a wide item to
// a different row by changing its position in the array.

type GalleryItem = {
  src:            string
  alt:            string
  label:          string
  wide?:          boolean
  lightboxRatio?: string  // lightbox stage aspect-ratio; defaults '1/1'
}

const GALLERY: GalleryItem[] = [
  // ── Row 1 — 3 regular ────────────────────────────────────────────
  {
    src:   `${BASE}/Gba26qPbwAAEM7t.jpeg`,
    alt:   'Day of the Dead — cinematic digital painting, ornate sugar skull with marigold flowers and jewel tones',
    label: 'Day of the Dead',
  },
  {
    src:   `${BASE}/GZGP05WbYAAfZ4V.jpeg`,
    alt:   'Pumpkin King — dark badge illustration with skull crown and ornate decorative linework',
    label: 'Badge Design',
  },
  {
    src:   `${BASE}/GRv1j5sb0AAOT25.jpeg`,
    alt:   'Friday — vortex typography composition with spiral letterforms and dynamic motion',
    label: 'Typography',
  },
  // ── Row 2 — wide + regular ───────────────────────────────────────
  {
    src:   `${BASE}/GRMHLmrbQAAVK9x.jpeg`,
    alt:   'Friday — retro typography with bold vintage letterforms and classic treatment',
    label: 'Typography',
    wide:  true,
  },
  {
    src:   `${BASE}/GWRnPcvbQAE2by8.jpeg`,
    alt:   'Victorian Girl — detailed ink illustration with ornate decorative framing and intricate linework',
    label: 'Illustration',
  },
  // ── Row 3 — regular + wide ───────────────────────────────────────
  {
    src:   `${BASE}/GYl9A_MasAQYtc2.jpeg`,
    alt:   'Princesses — vibrant character painting with rich colors and expressive figures',
    label: 'Character Study',
  },
  {
    src:   `${BASE}/F2phz5FaUAAH4fv.jpeg`,
    alt:   'HELO neon wordmark — brand identity rendered in glowing neon light aesthetic on dark background',
    label: 'HELO Identity',
    wide:  true,
  },
  // ── Row 4 — 3 regular ────────────────────────────────────────────
  {
    src:   `${BASE}/G4ogjTJbQAEo72k.jpeg`,
    alt:   'WAAARGH — expressive skull ink sketch with gestural brushwork and bold lettering',
    label: 'Badge Design',
  },
  {
    src:   `${BASE}/GTW8-oha8AAeKgl.jpeg`,
    alt:   'Figure and character study illustration',
    label: 'Character Study',
    lightboxRatio: '3/4',
  },
  {
    src:   `${BASE}/GUBStDcWEAAk9IA.jpeg`,
    alt:   'Visual illustration exploration',
    label: 'Illustration',
  },
  // ── Row 5 — regular + wide ───────────────────────────────────────
  {
    src:   `${BASE}/GUpyHAeboAALOvW.jpeg`,
    alt:   'Visual experiment in composition and form',
    label: 'Visual Experiment',
  },
  {
    src:   `${BASE}/GVI8jw5aEAA3zyA.jpeg`,
    alt:   'Graphic illustration exploration',
    label: 'Illustration',
    wide:  true,
  },
  // ── Row 6 — 3 regular ────────────────────────────────────────────
  {
    src:   `${BASE}/GWvPwwdacAAElRs.jpeg`,
    alt:   'Visual experiment in form and texture',
    label: 'Visual Experiment',
  },
  {
    src:   `${BASE}/GXiuqEoaIAA96EQ.jpeg`,
    alt:   'Detailed character illustration study',
    label: 'Character Study',
    lightboxRatio: '3/4',
  },
  {
    src:   `${BASE}/GMXy_CvaMAA8j3A.png`,
    alt:   'Graphic design exploration',
    label: 'Visual Experiment',
  },
]

// ─── Lightbox media list ──────────────────────────────────────────────────────
const ALL_MEDIA: MediaItem[] = GALLERY.map(item => ({
  type:        'image' as const,
  src:          item.src,
  alt:          item.alt,
  label:        item.label,
  aspectRatio:  item.lightboxRatio ?? '1/1',
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

// One grid tile — handles both regular (1:1) and wide (2:1 desktop) items.
// className on the motion.div carries the CSS Grid col-span.
function GalleryTile({
  item,
  reduced,
  onOpen,
  delay = 0,
}: {
  item:     GalleryItem
  reduced:  boolean
  onOpen:   () => void
  delay?:   number
}) {
  return (
    <div className={item.wide ? 'lg:col-span-2' : ''}>
      <ImageReveal
        className={[
          'rounded-xl',
          item.wide ? 'aspect-square lg:aspect-[2/1]' : 'aspect-square',
        ].join(' ')}
        delay={delay}
      >
        <div className="relative w-full h-full group" style={{ background: '#0a0a0a' }}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            quality={85}
            sizes={
              item.wide
                ? '(max-width: 1024px) 100vw, (max-width: 1400px) calc(66vw - 4rem), 848px'
                : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) calc(33vw - 3rem), 424px'
            }
            className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <HoverOverlay onClick={onOpen} label={`View: ${item.label}`} />
        </div>
      </ImageReveal>

      <p
        className="mt-2 font-mono text-[10px] tracking-[0.14em] uppercase"
        style={{ color: 'rgba(255,255,255,0.22)' }}
      >
        {item.label}
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GraphicDesignPage() {
  const reduced    = useReducedMotion() ?? false
  const [heroIndex, setHeroIndex] = useState(0)
  const [lightbox,  setLightbox]  = useState<number | null>(null)

  // Cycle hero images every 4 s. Cleanup on unmount or when reduced-motion changes.
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
            HERO — full-bleed animated cover with the title + meta overlaid (editorial)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[70vh] sm:min-h-[92vh] flex items-end overflow-hidden">
          {/* ── Cycling image layer (Ken Burns crossfade) ── */}
          <div className="absolute inset-0">
            {reduced ? (
              <Image
                src={HERO_SRCS[0]}
                alt="Graphic Design"
                fill
                priority
                quality={88}
                sizes="100vw"
                className="object-cover"
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
                    alt="Graphic Design"
                    fill
                    priority={heroIndex === 0}
                    quality={88}
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* ── Legibility gradient — top darken (under the header) + strong bottom into the dark gallery ── */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                'linear-gradient(to bottom, rgba(26,24,21,0.5) 0%, rgba(26,24,21,0.06) 26%, rgba(26,24,21,0.28) 52%, rgba(26,24,21,0.82) 84%, #1a1815 100%)',
            }}
          />

          {/* ── Overlaid content — bottom-left, editorial ── */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 pb-16 lg:pb-24">
            <motion.p
              className="font-mono text-[11px] tracking-[0.22em] uppercase mb-5"
              style={{ color: '#f2d832' }}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              Visual Design · Illustration
            </motion.p>
            <motion.h1
              className="font-extrabold tracking-[-0.04em]"
              style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(54px, 9vw, 124px)', lineHeight: 0.9, color: 'var(--on-dark)' }}
              initial={reduced ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
            >
              Graphic
              <br />
              Design
            </motion.h1>
            <motion.p
              className="mt-5 text-[14px] leading-relaxed"
              style={{ color: 'rgba(236,233,226,0.78)', maxWidth: '460px' }}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.36 }}
            >
              A curated archive of illustrations, typographic works, badge designs,
              and visual experiments — exploring character, composition, and
              graphic storytelling beyond client work.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-start gap-x-10 gap-y-4 mt-9 pt-7 max-w-3xl"
              style={{ borderTop: '1px solid rgba(236,233,226,0.18)' }}
              initial={reduced ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.46 }}
            >
              {[
                { label: 'Year',       value: 'Ongoing' },
                { label: 'Discipline', value: 'Illustration · Typography · Visual Design' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase mb-1.5" style={{ color: 'rgba(236,233,226,0.5)' }}>{label}</p>
                  <p className="text-[13px] leading-snug" style={{ color: 'rgba(236,233,226,0.82)' }}>{value}</p>
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
            GALLERY — one unified grid of all 15 GraphicDesign images
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
             * Unified grid — desktop: 3 cols, tablet: 2 cols, mobile: 1 col.
             * Wide items span 2 cols on desktop only (lg:col-span-2).
             * Stagger delay = (index mod 3) × 60 ms — per-column wave effect.
             * See GALLERY array comment for exact row layout.
             */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {GALLERY.map((item, i) => (
                <GalleryTile
                  key={item.src}
                  item={item}
                  reduced={reduced}
                  onOpen={() => openAt(item.src)}
                  delay={(i % 3) * 0.06}
                />
              ))}
            </div>

            {/* Disclaimer — very subtle, sits below the grid */}
            <motion.p
              className="mt-10 font-mono text-[10px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.14)', maxWidth: '440px' }}
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Personal creative explorations. Not affiliated with or endorsed
              by the original IP owners.
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
              <Link href="/work/apparel-graphics" className="group flex items-center gap-4">
                <span
                  className="font-extrabold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[#f2d832]"
                  style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(26px, 3.5vw, 48px)' }}
                >
                  Apparel Graphics
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

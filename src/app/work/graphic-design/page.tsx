'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Lightbox, type MediaItem } from '@/components/ui/MediaViewer'

const EASE = [0.16, 1, 0.3, 1] as const
const BASE = '/assetshelo/GraphicDesign'

// ─── Featured ─────────────────────────────────────────────────────────────────

const FEATURED = {
  src:   `${BASE}/Gba26qPbwAAEM7t.jpeg`,
  alt:   'Day of the Dead — cinematic digital painting featuring an ornate sugar skull surrounded by marigold flowers, rich jewel tones, and intricate decorative details',
  label: 'Day of the Dead',
}

// ─── Gallery data ─────────────────────────────────────────────────────────────
// To reorder: change the array order.
// wide: true → spans full row in the 2-col grid (aspect 2:1 container, object-contain).
// wide: false → 1-col cell (aspect 1:1, object-contain).

type GalleryItem = {
  src: string
  alt: string
  label: string
  wide?: boolean
}

const MAIN_GALLERY: GalleryItem[] = [
  {
    src:   `${BASE}/GZGP05WbYAAfZ4V.jpeg`,
    alt:   'Pumpkin King — dramatic dark badge illustration with skull crown and ornate decorative linework',
    label: 'Pumpkin King',
    wide:  true,
  },
  {
    src:   `${BASE}/GRv1j5sb0AAOT25.jpeg`,
    alt:   'Friday — vortex typography composition with spiral letterforms and dynamic motion',
    label: 'Friday — Vortex',
  },
  {
    src:   `${BASE}/GRMHLmrbQAAVK9x.jpeg`,
    alt:   'Friday — retro typography design with bold vintage letterforms and classic treatment',
    label: 'Friday — Retro',
  },
  {
    src:   `${BASE}/GWRnPcvbQAE2by8.jpeg`,
    alt:   'Victorian girl — detailed ink illustration with ornate decorative framing and intricate linework',
    label: 'Victorian Girl',
  },
  {
    src:   `${BASE}/GYl9A_MasAQYtc2.jpeg`,
    alt:   'Princesses — vibrant character painting with rich colors and expressive figures',
    label: 'Princesses',
  },
  {
    src:   `${BASE}/F2phz5FaUAAH4fv.jpeg`,
    alt:   'HELO neon wordmark — brand identity rendered in glowing neon light aesthetic on dark background',
    label: 'HELO — Neon',
    wide:  true,
  },
  {
    src:   `${BASE}/G4ogjTJbQAEo72k.jpeg`,
    alt:   'WAAARGH — expressive skull ink sketch with gestural brushwork and bold lettering',
    label: 'WAAARGH',
    wide:  true,
  },
]

// ─── Personal explorations ────────────────────────────────────────────────────
// Personal creative practice. Not affiliated with or endorsed by IP owners.
// aspectRatio matches original file proportions so the lightbox shows correctly:
//   '3/4' for portrait files; '1/1' for square files.

type PersonalItem = GalleryItem & { aspectRatio: string }

const PERSONAL_GALLERY: PersonalItem[] = [
  {
    src:         `${BASE}/GTW8-oha8AAeKgl.jpeg`,
    alt:         'Personal illustration — figure and character study',
    label:       'Exploration I',
    aspectRatio: '3/4',   // portrait 1474 × 2048
  },
  {
    src:         `${BASE}/GUBStDcWEAAk9IA.jpeg`,
    alt:         'Personal creative exploration',
    label:       'Exploration II',
    aspectRatio: '1/1',
  },
  {
    src:         `${BASE}/GUpyHAeboAALOvW.jpeg`,
    alt:         'Personal visual experiment',
    label:       'Exploration III',
    aspectRatio: '1/1',
  },
  {
    src:         `${BASE}/GVI8jw5aEAA3zyA.jpeg`,
    alt:         'Personal creative exploration',
    label:       'Exploration IV',
    aspectRatio: '1/1',
  },
  {
    src:         `${BASE}/GWvPwwdacAAElRs.jpeg`,
    alt:         'Personal visual experiment',
    label:       'Exploration V',
    aspectRatio: '1/1',
  },
  {
    src:         `${BASE}/GXiuqEoaIAA96EQ.jpeg`,
    alt:         'Personal illustration — character study',
    label:       'Exploration VI',
    aspectRatio: '3/4',   // portrait 1875 × 2625
  },
  {
    src:         `${BASE}/GMXy_CvaMAA8j3A.png`,
    alt:         'Personal graphic exploration',
    label:       'Exploration VII',
    aspectRatio: '1/1',
  },
]

// ─── Unified media list ───────────────────────────────────────────────────────
// Order: featured → main gallery → personal explorations.
// findIndex by src drives openAt() — do not add duplicates.

const ALL_MEDIA: MediaItem[] = [
  {
    type:        'image',
    src:          FEATURED.src,
    alt:          FEATURED.alt,
    label:        FEATURED.label,
    aspectRatio: '1/1',   // show the square source image uncropped
  },
  ...MAIN_GALLERY.map(item => ({
    type:        'image' as const,
    src:          item.src,
    alt:          item.alt,
    label:        item.label,
    aspectRatio: '1/1',   // all main gallery pieces are square
  })),
  ...PERSONAL_GALLERY.map(item => ({
    type:        'image' as const,
    src:          item.src,
    alt:          item.alt,
    label:        item.label,
    aspectRatio:  item.aspectRatio,
  })),
]

// ─── Local helpers ────────────────────────────────────────────────────────────

function SectionLabel({ index, label, reduced }: { index: string; label: string; reduced: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={reduced ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: 'rgba(242,216,50,0.5)' }}>
        {index}
      </span>
      <span className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.24)' }}>
        {label}
      </span>
    </motion.div>
  )
}

// Reusable gallery cell: image container + caption
function GalleryCell({
  item,
  wide,
  reduced,
  onOpen,
  delay = 0,
}: {
  item: GalleryItem
  wide?: boolean
  reduced: boolean
  onOpen: () => void
  delay?: number
}) {
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.72, ease: EASE, delay }}
    >
      <div
        className="relative overflow-hidden rounded-xl group"
        style={{ aspectRatio: wide ? '2/1' : '1/1', background: '#0a0a0a' }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          quality={item.src.includes('GZGP') ? 78 : 85}
          sizes={
            wide
              ? '(max-width: 768px) 100vw, (max-width: 1400px) calc(100vw - 8rem), 1272px'
              : '(max-width: 768px) 100vw, (max-width: 1400px) calc(50vw - 5rem), 636px'
          }
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <ViewOverlay onClick={onOpen} label={`View: ${item.label}`} />
      </div>
      <p
        className="mt-2.5 font-mono text-[11px] tracking-wide"
        style={{ color: 'rgba(255,255,255,0.26)' }}
      >
        {item.label}
      </p>
    </motion.div>
  )
}

// Invisible button + dark hover overlay — place inside any div with `group overflow-hidden`
function ViewOverlay({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <>
      <div className="absolute inset-0 z-[5] pointer-events-none bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
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

export default function GraphicDesignPage() {
  const reduced = useReducedMotion() ?? false
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openAt = useCallback((src: string) => {
    const idx = ALL_MEDIA.findIndex(m => m.src === src)
    if (idx !== -1) setLightbox(idx)
  }, [])

  return (
    <>
      <Header />
      <main style={{ background: '#080808' }}>

        {/* ══════════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════════ */}
        <section>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-20">

            <motion.p
              className="font-mono text-[11px] tracking-[0.22em] uppercase mb-5"
              style={{ color: 'rgba(242,216,50,0.65)' }}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              Visual Design · Illustration
            </motion.p>

            <motion.h1
              className="font-extrabold tracking-[-0.04em] text-white"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(58px, 9.5vw, 136px)',
                lineHeight: 0.9,
              }}
              initial={reduced ? {} : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              Graphic
              <br />
              Design
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-start gap-x-12 gap-y-5 mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              initial={reduced ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.28 }}
            >
              {[
                { label: 'Year',       value: 'Ongoing' },
                { label: 'Discipline', value: 'Illustration · Typography · Visual Design' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[13px] leading-snug"
                    style={{ color: 'rgba(255,255,255,0.68)', maxWidth: '340px' }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURED IMAGE — full-bleed cinematic reveal
        ══════════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="relative w-full overflow-hidden group"
          style={{ aspectRatio: '4/3' }}
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        >
          <Image
            src={FEATURED.src}
            alt={FEATURED.alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Bottom gradient — smooth transition into next section */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent 55%, rgba(8,8,8,0.35) 75%, rgba(8,8,8,0.85) 92%, #080808 100%)',
            }}
          />

          {/* Piece label — bottom left */}
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-8 pointer-events-none z-[6]">
            <p
              className="font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.42)' }}
            >
              {FEATURED.label}
            </p>
          </div>

          <ViewOverlay
            onClick={() => openAt(FEATURED.src)}
            label="View: Day of the Dead"
          />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            01 WORKS
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

            <SectionLabel index="01" label="Works" reduced={reduced} />

            {/* Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-28 mt-14 mb-16">
              <motion.h2
                className="font-extrabold tracking-[-0.04em] text-white leading-[0.95]"
                style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(28px, 3vw, 44px)' }}
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                Illustration
                <br />
                &amp; design.
              </motion.h2>

              <motion.p
                className="text-[14px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.44)', maxWidth: '520px' }}
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                A curated archive of illustrations, typographic works, badge designs, and visual
                experiments — exploring character, composition, color, and graphic storytelling
                beyond client work.
              </motion.p>
            </div>

            {/* ── Editorial gallery — explicit rows for precise alignment ──────
                Each row is its own element: no CSS auto-placement surprises.
                Wide = 2:1 standalone row. Pairs = 2-col sub-grid, both 1:1.
                space-y-3 gives consistent 12px gap between every row.
            ─────────────────────────────────────────────────────────────────── */}
            <div className="space-y-3">

              {/* Row 1 — Pumpkin King (full-width) */}
              <GalleryCell
                item={MAIN_GALLERY[0]}
                wide
                reduced={reduced}
                onOpen={() => openAt(MAIN_GALLERY[0].src)}
              />

              {/* Row 2 — Friday pair */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <GalleryCell
                  item={MAIN_GALLERY[1]}
                  reduced={reduced}
                  onOpen={() => openAt(MAIN_GALLERY[1].src)}
                />
                <GalleryCell
                  item={MAIN_GALLERY[2]}
                  reduced={reduced}
                  onOpen={() => openAt(MAIN_GALLERY[2].src)}
                  delay={0.06}
                />
              </div>

              {/* Row 3 — Victorian Girl + Princesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <GalleryCell
                  item={MAIN_GALLERY[3]}
                  reduced={reduced}
                  onOpen={() => openAt(MAIN_GALLERY[3].src)}
                />
                <GalleryCell
                  item={MAIN_GALLERY[4]}
                  reduced={reduced}
                  onOpen={() => openAt(MAIN_GALLERY[4].src)}
                  delay={0.06}
                />
              </div>

              {/* Row 4 — HELO Neon (full-width) */}
              <GalleryCell
                item={MAIN_GALLERY[5]}
                wide
                reduced={reduced}
                onOpen={() => openAt(MAIN_GALLERY[5].src)}
              />

              {/* Row 5 — WAAARGH (full-width) */}
              <GalleryCell
                item={MAIN_GALLERY[6]}
                wide
                reduced={reduced}
                onOpen={() => openAt(MAIN_GALLERY[6].src)}
              />


              {/* Row 6 — Exp I + Exp II */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <GalleryCell
                  item={PERSONAL_GALLERY[0]}
                  reduced={reduced}
                  onOpen={() => openAt(PERSONAL_GALLERY[0].src)}
                />
                <GalleryCell
                  item={PERSONAL_GALLERY[1]}
                  reduced={reduced}
                  onOpen={() => openAt(PERSONAL_GALLERY[1].src)}
                  delay={0.06}
                />
              </div>

              {/* Row 7 — Exp III + Exp IV */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <GalleryCell
                  item={PERSONAL_GALLERY[2]}
                  reduced={reduced}
                  onOpen={() => openAt(PERSONAL_GALLERY[2].src)}
                />
                <GalleryCell
                  item={PERSONAL_GALLERY[3]}
                  reduced={reduced}
                  onOpen={() => openAt(PERSONAL_GALLERY[3].src)}
                  delay={0.06}
                />
              </div>

              {/* Row 8 — Exp V + Exp VI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <GalleryCell
                  item={PERSONAL_GALLERY[4]}
                  reduced={reduced}
                  onOpen={() => openAt(PERSONAL_GALLERY[4].src)}
                />
                <GalleryCell
                  item={PERSONAL_GALLERY[5]}
                  reduced={reduced}
                  onOpen={() => openAt(PERSONAL_GALLERY[5].src)}
                  delay={0.06}
                />
              </div>

              {/* Row 9 — Exp VII (full-width close) */}
              <GalleryCell
                item={PERSONAL_GALLERY[6]}
                wide
                reduced={reduced}
                onOpen={() => openAt(PERSONAL_GALLERY[6].src)}
              />

            </div>

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
                  style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(26px, 3.5vw, 48px)' }}
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

        {/* ── Media viewer ── */}
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

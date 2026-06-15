'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Lightbox, type MediaItem } from '@/components/ui/MediaViewer'
import ImageReveal from '@/components/ui/ImageReveal'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Gallery ─────────────────────────────────────────────────────────────────
// To reorder images: change the array order below.
// All images within the same row-group share the same aspect ratio
// so the grid stays level — do not mix portrait and landscape in one row.

const GALLERY_MAIN = [
  // Row: two 4/3 landscape images
  {
    src: '/assetshelo/Nascar/ZaneSmith/2313CO1085.jpg',
    alt: 'Zane Smith at trackside, RTA rtatel.com prominently displayed on racing suit',
    aspect: '4/3',
  },
  {
    src: '/assetshelo/Nascar/ZaneSmith/2313DG2120.jpg',
    alt: '#38 Ford F-150 truck at speed, 75 Years anniversary wall in background',
    aspect: '4/3',
  },
]

const GALLERY_PRESENCE = [
  // Row 1: two 4/3 landscape images
  {
    src: '/assetshelo/Nascar/ZaneSmith/TL_01178-2.jpg',
    alt: 'Zane Smith at trackside with gigFAST truck visible behind, golden hour editorial shot',
    aspect: '4/3',
  },
  {
    src: '/assetshelo/Nascar/ZaneSmith/DSC06043.jpg',
    alt: "Branded event tent with gigFAST Internet and RTA logos, LET'S GO ZANE banner in background",
    aspect: '4/3',
  },
  // Row 2: two 4/3 landscape images
  {
    src: '/assetshelo/Nascar/ZaneSmith/2215HH1758.jpg',
    alt: '#38 truck during a night pit stop, full crew in action at pit lane',
    aspect: '4/3',
  },
  {
    src: '/assetshelo/Nascar/ZaneSmith/IMG_7925.jpeg',
    alt: 'Team hauler panel showing RTA, Gigometer speed dial, and gigFAST Internet branding',
    aspect: '4/3',
  },
]

const GALLERY_GRID = [
  // All 3/2 — consistent aspect across the full gallery grid
  {
    src: '/assetshelo/Nascar/ZaneSmith/2313CO1018.jpg',
    alt: 'Zane Smith back-facing portrait, racing suit with RTA and gigFAST logos, full stadium backdrop',
    aspect: '3/2',
  },
  {
    src: '/assetshelo/Nascar/ZaneSmith/2313DG1291.jpg',
    alt: '#38 Ford F-150 truck in motion, daytime, gigFAST and RTA logos clearly legible on side',
    aspect: '3/2',
  },
  {
    src: '/assetshelo/Nascar/ZaneSmith/2328JN1808.jpg',
    alt: '#38 truck at night, passing SPEEDWAY signage, cinematic low-angle shot',
    aspect: '3/2',
  },
  {
    src: '/assetshelo/Nascar/ZaneSmith/2328JN1547.jpg',
    alt: '#38 truck viewed from above at night race, dramatic overhead perspective',
    aspect: '3/2',
  },
  {
    src: '/assetshelo/Nascar/ZaneSmith/2328TP1474.jpg',
    alt: 'Cockpit interior with Zane Smith in seat wearing helmet, roll cage visible',
    aspect: '3/2',
  },
]

// ─── Logos ────────────────────────────────────────────────────────────────────
// To add or remove logos: edit this array.

const LOGOS = [
  {
    src: '/assetshelo/Nascar/Logos/gigFastInternet.png',
    alt: 'gigFAST Internet · Voice · TV logo',
    label: 'gigFAST Internet',
  },
  {
    src: '/assetshelo/Nascar/Logos/RTALogo.png',
    alt: 'RTA Rural Telecommunications of America logo',
    label: 'RTA',
  },
  {
    src: '/assetshelo/Nascar/Logos/rtatelcom.png',
    alt: 'RTATEL.COM web domain logo',
    label: 'RTATEL.COM',
  },
]

// ─── Video cards ──────────────────────────────────────────────────────────────
// Poster images are shown as thumbnails before the viewer opens.
// All three videos are available in the media viewer.
// IMG_8994.mp4 (~48 MB) — consider compressing before production.

const VIDEO_CARDS = [
  {
    src: '/assetshelo/Nascar/ZaneSmith/IMG_9039.mp4',
    label: 'Race Clip 01',
    poster: '/assetshelo/Nascar/ZaneSmith/thumb_IMG_9039.jpg',
  },
  {
    src: '/assetshelo/Nascar/ZaneSmith/IMG_9044.mp4',
    label: 'Race Clip 02',
    poster: '/assetshelo/Nascar/ZaneSmith/thumb_IMG_9044.jpg',
  },
  {
    // ~48 MB — consider compressing before production
    src: '/assetshelo/Nascar/ZaneSmith/IMG_8994.mp4',
    label: 'Race Footage',
    poster: '/assetshelo/Nascar/ZaneSmith/thumb_IMG_8994.jpg',
  },
]

// ─── Unified media list for the lightbox ─────────────────────────────────────
// Order: section 03 → 04 → 05 → 06 gallery → 07 videos.
// findIndex by src drives the openAt() helper — do not add duplicates.

const ALL_MEDIA: MediaItem[] = [
  // Section 03 — Race Application
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2328TP1264.jpg',
    alt: '#38 Ford F-150 NASCAR truck in motion at speed — gigFAST Internet and RTA livery visible',
    label: '#38 Ford F-150 at speed',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2313CO1085.jpg',
    alt: 'Zane Smith at trackside, RTA rtatel.com prominently displayed on racing suit',
    label: 'Zane Smith trackside',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2313DG2120.jpg',
    alt: '#38 Ford F-150 truck at speed, 75 Years anniversary wall in background',
    label: '#38 truck, 75 Years',
  },
  // Section 04 — The Gigometer
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2328TP1318.jpg',
    alt: 'Gigometer internet speed dial graphic on the #38 truck bed, photographed from above',
    label: 'Gigometer truck bed graphic',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/Logos/gigometer.png',
    alt: 'Gigometer.net speed test web application — branded internet speed dial UI',
    label: 'gigometer.net — web app',
  },
  // Section 05 — Campaign Presence
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/TL_01178-2.jpg',
    alt: 'Zane Smith at trackside with gigFAST truck visible behind, golden hour editorial shot',
    label: 'Zane Smith — golden hour',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/DSC06043.jpg',
    alt: "Branded event tent with gigFAST Internet and RTA logos, LET'S GO ZANE banner in background",
    label: 'Event tent',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2215HH1758.jpg',
    alt: '#38 truck during a night pit stop, full crew in action at pit lane',
    label: '#38 night pit stop',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/IMG_7925.jpeg',
    alt: 'Team hauler panel showing RTA, Gigometer speed dial, and gigFAST Internet branding',
    label: 'Team hauler branding',
  },
  // Section 06 — Gallery
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2313CO1018.jpg',
    alt: 'Zane Smith back-facing portrait, racing suit with RTA and gigFAST logos, full stadium backdrop',
    label: 'Zane Smith — stadium',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2313DG1291.jpg',
    alt: '#38 Ford F-150 truck in motion, daytime, gigFAST and RTA logos clearly legible on side',
    label: '#38 truck in motion',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2328JN1808.jpg',
    alt: '#38 truck at night, passing SPEEDWAY signage, cinematic low-angle shot',
    label: '#38 at SPEEDWAY — night',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2328JN1547.jpg',
    alt: '#38 truck viewed from above at night race, dramatic overhead perspective',
    label: '#38 overhead — night',
  },
  {
    type: 'image',
    src: '/assetshelo/Nascar/ZaneSmith/2328TP1474.jpg',
    alt: 'Cockpit interior with Zane Smith in seat wearing helmet, roll cage visible',
    label: 'Cockpit interior',
  },
  // Section 07 — Race Footage
  {
    type: 'video',
    src: '/assetshelo/Nascar/ZaneSmith/IMG_9039.mp4',
    alt: 'Race Clip 01 — NASCAR Craftsman Truck Series event footage',
    label: 'Race Clip 01',
    poster: '/assetshelo/Nascar/ZaneSmith/thumb_IMG_9039.jpg',
  },
  {
    type: 'video',
    src: '/assetshelo/Nascar/ZaneSmith/IMG_9044.mp4',
    alt: 'Race Clip 02 — NASCAR Craftsman Truck Series event footage',
    label: 'Race Clip 02',
    poster: '/assetshelo/Nascar/ZaneSmith/thumb_IMG_9044.jpg',
  },
  {
    type: 'video',
    src: '/assetshelo/Nascar/ZaneSmith/IMG_8994.mp4',
    alt: 'Race Footage — NASCAR Craftsman Truck Series event footage',
    label: 'Race Footage',
    poster: '/assetshelo/Nascar/ZaneSmith/thumb_IMG_8994.jpg',
  },
]

// ─── Section label ────────────────────────────────────────────────────────────

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

// ─── View overlay (for clickable image containers) ────────────────────────────
// Place inside any motion.div that has: className="... group overflow-hidden ..."
// The invisible button captures clicks; the overlay shows on group-hover.

function ViewOverlay({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <>
      <div className="absolute inset-0 z-[5] pointer-events-none bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
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

export default function GigfastNascarPage() {
  const reduced = useReducedMotion() ?? false
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openAt = useCallback((src: string) => {
    const idx = ALL_MEDIA.findIndex(m => m.src === src)
    if (idx !== -1) setLightbox(idx)
  }, [])

  return (
    <>
      <Header />
      <main style={{ background: '#1a1815' }}>

        {/* ══════════════════════════════════════════════════════════════════════
            HERO — full-bleed poster with the title + meta overlaid (editorial case study)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[92vh] flex items-end overflow-hidden">
          {/* Poster — the image IS the hero (full protagonism, never cut by an info box) */}
          <Image
            src="/assetshelo/Nascar/ZaneSmith/TL_01108-2.jpg"
            alt="Zane Smith walking at the racetrack at dusk, gigFAST Internet and RTA logos visible on the back of his racing suit"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Legibility gradient — settles into the dark case study below */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(26,24,21,0.55) 0%, rgba(26,24,21,0.08) 30%, rgba(26,24,21,0.25) 52%, rgba(26,24,21,0.78) 84%, #1a1815 100%)',
            }}
          />

          {/* Overlaid content — bottom-left, editorial */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 pb-16 lg:pb-24">
            <motion.p
              className="font-mono text-[11px] tracking-[0.22em] uppercase mb-5"
              style={{ color: '#f2d832' }}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              Graphic Design · Branding · Digital Product
            </motion.p>

            <motion.h1
              className="font-extrabold tracking-[-0.04em]"
              style={{
                fontFamily: 'var(--font-cabinet)',
                fontSize: 'clamp(54px, 9vw, 124px)',
                lineHeight: 0.9,
                color: 'var(--on-dark)',
              }}
              initial={reduced ? {} : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
            >
              gigFAST
              <br />
              NASCAR
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-start gap-x-12 gap-y-5 mt-10 pt-8 max-w-4xl"
              style={{ borderTop: '1px solid rgba(236,233,226,0.18)' }}
              initial={reduced ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.42 }}
            >
              {[
                { label: 'Year',   value: '2023' },
                { label: 'Client', value: 'RTA / gigFAST Internet' },
                { label: 'Role',   value: 'Visual Design · Logo Application · Brand Graphics · Digital Product Design' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1.5"
                    style={{ color: 'rgba(236,233,226,0.5)' }}
                  >
                    {label}
                  </p>
                  <p className="text-[13px] leading-snug" style={{ color: 'rgba(236,233,226,0.82)', maxWidth: '340px' }}>
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            01 OVERVIEW
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

            <SectionLabel index="01" label="Overview" reduced={reduced} />

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-28 mt-14">

              <motion.div
                initial={reduced ? {} : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <h2
                  className="font-extrabold tracking-[-0.04em] text-white leading-[0.95]"
                  style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(28px, 3vw, 44px)' }}
                >
                  A brand built for the track.
                </h2>
              </motion.div>

              <motion.div
                className="space-y-5"
                initial={reduced ? {} : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
              >
                <p
                  className="leading-relaxed"
                  style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', color: 'rgba(255,255,255,0.7)', maxWidth: '640px' }}
                >
                  Visual identity and graphic design work for a NASCAR Craftsman Truck Series sponsorship.
                  The gigFAST Internet and RTA brands were applied across the #38 Ford F-150 truck, driver
                  racing suit, branded event tent, and team hauler graphics — creating a consistent visual
                  presence across the entire race-day environment.
                </p>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.42)', maxWidth: '560px' }}
                >
                  The central creative concept — the Gigometer — turned an internet speed test into a
                  racing-inspired visual system, connecting speed, connectivity, and motorsport across
                  physical graphics and a branded digital interface.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            02 BRAND SYSTEM
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

            <SectionLabel index="02" label="Brand System" reduced={reduced} />

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-28 mt-14 mb-14">
              <motion.h2
                className="font-extrabold tracking-[-0.04em] text-white leading-[0.95]"
                style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(28px, 3vw, 44px)' }}
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                Identity built for speed.
              </motion.h2>
              <motion.p
                className="text-[14px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.44)', maxWidth: '520px' }}
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                The gigFAST Internet and RTATEL.COM logos were designed as the visual foundation of the
                sponsorship campaign — built in a bold Americana style to match the energy of motorsport
                while staying legible at speed across truck liveries, signage, and apparel.
              </motion.p>
            </div>

            {/* Logo tiles — not interactive, display only */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {LOGOS.map((logo, i) => (
                <motion.div
                  key={logo.label}
                  className="relative rounded-2xl flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '44px 32px 36px',
                    minHeight: '140px',
                  }}
                  initial={reduced ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
                >
                  <div className="relative w-full" style={{ height: '56px' }}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      quality={92}
                      sizes="(max-width: 768px) 80vw, 30vw"
                      className="object-contain"
                    />
                  </div>
                  <p
                    className="mt-5 font-mono text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                  >
                    {logo.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="mt-5 font-mono text-[11px]"
              style={{ color: 'rgba(255,255,255,0.22)' }}
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
            >
              Logos designed as part of the campaign visual identity for RTA and gigFAST Internet.
            </motion.p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            03 RACE APPLICATION
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

            <SectionLabel index="03" label="Race Application" reduced={reduced} />

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-28 mt-14 mb-16">
              <motion.h2
                className="font-extrabold tracking-[-0.04em] text-white leading-[0.95]"
                style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(28px, 3vw, 44px)' }}
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                Graphics at speed.
              </motion.h2>
              <motion.p
                className="text-[14px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.44)', maxWidth: '520px' }}
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                The gigFAST and RTA visual identity was applied across three NASCAR truck versions
                throughout the season, as well as Zane Smith&apos;s driver racing suit. The branding
                remained legible and bold across every track condition and distance.
              </motion.p>
            </div>

            {/* Hero truck image — 16/9, clickable */}
            <ImageReveal className="rounded-2xl mb-3" style={{ aspectRatio: '16/9' }}>
              <div className="relative w-full h-full group">
                <Image
                  src="/assetshelo/Nascar/ZaneSmith/2328TP1264.jpg"
                  alt="#38 Ford F-150 NASCAR truck in motion at speed — gigFAST Internet and RTA rtatel.com livery clearly visible on the side"
                  fill
                  quality={86}
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-cover"
                />
                <ViewOverlay
                  onClick={() => openAt('/assetshelo/Nascar/ZaneSmith/2328TP1264.jpg')}
                  label="View: #38 Ford F-150 at speed"
                />
              </div>
            </ImageReveal>

            {/* Two-up grid — both 4/3, so the row is level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GALLERY_MAIN.map((img, i) => (
                <ImageReveal
                  key={img.src}
                  className="rounded-xl"
                  style={{ aspectRatio: img.aspect }}
                  delay={i * 0.1}
                >
                  <div className="relative w-full h-full group">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <ViewOverlay
                      onClick={() => openAt(img.src)}
                      label={`View: ${img.alt.slice(0, 60)}`}
                    />
                  </div>
                </ImageReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            04 THE GIGOMETER
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

            <SectionLabel index="04" label="The Gigometer" reduced={reduced} />

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-28 mt-14 mb-16">
              <motion.h2
                className="font-extrabold tracking-[-0.04em] text-white leading-[0.95]"
                style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(28px, 3vw, 44px)' }}
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                Speed,
                <br />
                re-scaled.
              </motion.h2>
              <motion.p
                className="text-[14px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.44)', maxWidth: '520px' }}
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                The Gigometer re-imagined a car speedometer as an internet speed dial — measuring
                connectivity from 2G to 1000G instead of MPH. Applied across two truck versions, the
                race-day hauler signage, and a live branded web app at gigometer.net, where fans could
                test their own connection speed through the gigFAST brand experience.
              </motion.p>
            </div>

            {/* Truck bed graphic + app screenshot — both clickable */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3 items-start">

              <ImageReveal className="rounded-2xl" style={{ aspectRatio: '16/10' }}>
                <div className="relative w-full h-full group">
                  <Image
                    src="/assetshelo/Nascar/ZaneSmith/2328TP1318.jpg"
                    alt="Gigometer internet speed dial graphic on the #38 truck bed, photographed from above — shows Z. Smith name bar and speed ranges from 2G to 1000G"
                    fill
                    quality={86}
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="object-cover object-top"
                  />
                  <ViewOverlay
                    onClick={() => openAt('/assetshelo/Nascar/ZaneSmith/2328TP1318.jpg')}
                    label="View: Gigometer truck bed graphic"
                  />
                </div>
              </ImageReveal>

              {/* App screenshot — iPhone proportions */}
              <ImageReveal
                className="rounded-2xl self-stretch"
                style={{ aspectRatio: '9/19', minHeight: '320px' }}
                delay={0.12}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src="/assetshelo/Nascar/Logos/gigometer.png"
                    alt="Gigometer.net speed test web application running in a mobile browser — branded internet speed dial UI with RTA and gigFAST logos, and the #38 NASCAR truck as a UI element"
                    fill
                    quality={92}
                    sizes="220px"
                    className="object-cover object-top"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 z-[3]"
                    style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 100%)' }}
                  >
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      gigometer.net
                    </p>
                  </div>
                  <ViewOverlay
                    onClick={() => openAt('/assetshelo/Nascar/Logos/gigometer.png')}
                    label="View: gigometer.net web app"
                  />
                </div>
              </ImageReveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            05 CAMPAIGN PRESENCE
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

            <SectionLabel index="05" label="Campaign Presence" reduced={reduced} />

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-28 mt-14 mb-16">
              <motion.h2
                className="font-extrabold tracking-[-0.04em] text-white leading-[0.95]"
                style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(28px, 3vw, 44px)' }}
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                From suit
                <br />
                to signage.
              </motion.h2>
              <motion.p
                className="text-[14px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.44)', maxWidth: '520px' }}
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                The visual system extended beyond the truck into the full race-day environment —
                driver suit, event tent, pit-lane signage, and the team hauler. Every surface
                carried the same bold Americana palette and brand presence.
              </motion.p>
            </div>

            {/* 2×2 presence grid — all 4/3 so each row stays level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GALLERY_PRESENCE.map((img, i) => (
                <motion.div
                  key={img.src}
                  className="relative overflow-hidden rounded-xl group"
                  style={{ aspectRatio: img.aspect }}
                  initial={reduced ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.72, ease: EASE, delay: (i % 2) * 0.09 }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <ViewOverlay
                    onClick={() => openAt(img.src)}
                    label={`View: ${img.alt.slice(0, 60)}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            06 GALLERY
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

            <SectionLabel index="06" label="Gallery" reduced={reduced} />

            <motion.p
              className="mt-6 mb-14 font-mono text-[12px]"
              style={{ color: 'rgba(255,255,255,0.26)' }}
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Photography from NASCAR Craftsman Truck Series events.
            </motion.p>

            {/* Gallery grid — all 3/2, consistent across all cells */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {GALLERY_GRID.map((img, i) => (
                <motion.div
                  key={img.src}
                  className="relative overflow-hidden rounded-xl group"
                  style={{ aspectRatio: img.aspect }}
                  initial={reduced ? {} : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.65, ease: EASE, delay: i * 0.07 }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <ViewOverlay
                    onClick={() => openAt(img.src)}
                    label={`View: ${img.alt.slice(0, 60)}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            07 RACE FOOTAGE
            preload="metadata" in the viewer — browser fetches only the poster
            frame until the user opens a video and presses play.
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

            <SectionLabel index="07" label="Race Footage" reduced={reduced} />

            <motion.p
              className="mt-6 mb-14 font-mono text-[12px]"
              style={{ color: 'rgba(255,255,255,0.26)' }}
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Short clips from NASCAR events.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {VIDEO_CARDS.map((video, i) => (
                <motion.button
                  key={video.src}
                  className="overflow-hidden rounded-2xl group w-full text-left"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'block',
                  }}
                  initial={reduced ? {} : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
                  onClick={() => openAt(video.src)}
                  aria-label={`Watch: ${video.label}`}
                >
                  {/* Poster thumbnail */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={video.poster}
                      alt={video.label}
                      fill
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {/* Play button overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-colors duration-300"
                      style={{ background: 'rgba(0,0,0,0.22)' }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        style={{ width: 52, height: 52, background: 'rgba(242,216,50,0.92)' }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#000"
                          style={{ marginLeft: 3 }}
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="px-5 py-4">
                    <p
                      className="font-mono text-[11px] tracking-wide"
                      style={{ color: 'rgba(255,255,255,0.36)' }}
                    >
                      {video.label}
                    </p>
                  </div>
                </motion.button>
              ))}
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
              <Link href="/work/graphic-design" className="group flex items-center gap-4">
                <span
                  className="font-extrabold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[#f2d832]"
                  style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(26px, 3.5vw, 48px)' }}
                >
                  Graphic Design
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

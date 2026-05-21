'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt: string
  label?: string
  poster?: string // required when type === 'video'
}

type LightboxProps = {
  items: MediaItem[]
  startIndex: number
  onClose: () => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Lightbox ─────────────────────────────────────────────────────────────────

export function Lightbox({ items, startIndex, onClose }: LightboxProps) {
  const reduced = useReducedMotion() ?? false
  const [current, setCurrent] = useState(startIndex)

  const item = items[current]
  const hasPrev = current > 0
  const hasNext = current < items.length - 1

  const goPrev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
  const goNext = useCallback(() => setCurrent(c => Math.min(items.length - 1, c + 1)), [items.length])

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, goPrev, goNext])

  return (
    /*
     * Backdrop — clicks outside the stage close the viewer.
     * Warm dark radial gradient so the stage "lifts" off the page.
     */
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center px-3 py-4 sm:px-8 sm:py-10"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% 48%, rgba(26,22,10,0.88) 0%, rgba(4,4,4,0.97) 100%)',
      }}
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
    >
      {/*
       * Stage — the visible viewing surface.
       * Slightly lighter than the page (#111 vs #080808), yellow-accented
       * top border, and a layered shadow for depth.
       */}
      <motion.div
        className="relative w-full max-w-[960px] flex flex-col overflow-hidden rounded-2xl"
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: '1px solid rgba(242,216,50,0.28)',
          boxShadow:
            '0 0 0 1px rgba(242,216,50,0.06), 0 40px 100px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.5)',
        }}
        initial={reduced ? {} : { opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Top bar: label · prev/counter/next · close ── */}
        <div
          className="flex items-center justify-between gap-4 px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Label */}
          <p
            className="font-mono text-[12px] tracking-wide truncate"
            style={{ color: 'rgba(255,255,255,0.32)' }}
          >
            {item.label ?? ''}
          </p>

          {/* Navigation + close */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={goPrev}
              disabled={!hasPrev}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-[22px] leading-none transition-colors duration-150 disabled:pointer-events-none"
              style={{ color: hasPrev ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)' }}
              aria-label="Previous"
            >
              ←
            </button>

            <span
              className="font-mono text-[11px] tracking-[0.2em] tabular-nums px-2"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {current + 1}&thinsp;/&thinsp;{items.length}
            </span>

            <button
              onClick={goNext}
              disabled={!hasNext}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-[22px] leading-none transition-colors duration-150 disabled:pointer-events-none"
              style={{ color: hasNext ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)' }}
              aria-label="Next"
            >
              →
            </button>

            {/* Thin vertical divider */}
            <span
              className="block mx-2"
              style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)' }}
              aria-hidden
            />

            {/* Close */}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-[20px] leading-none transition-colors duration-150 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              aria-label="Close viewer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Media well ── */}
        <div className="p-3" style={{ background: '#0a0a0a' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="overflow-hidden rounded-xl"
              initial={reduced ? {} : { opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.2 }}
            >
              {item.type === 'image' ? (
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '3/2', background: '#0a0a0a' }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    quality={92}
                    sizes="(max-width: 960px) 100vw, 960px"
                    className="object-contain"
                  />
                </div>
              ) : (
                /*
                 * key={item.src} remounts <video> when the source changes,
                 * which stops playback and loads the new poster automatically.
                 */
                <video
                  key={item.src}
                  src={item.src}
                  poster={item.poster}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full block rounded-xl"
                  style={{ aspectRatio: '16/9', background: '#050505', display: 'block' }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </motion.div>
    </motion.div>
  )
}

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
  poster?: string // video thumbnail — required when type === 'video'
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
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-20"
      style={{ background: 'rgba(5,5,5,0.95)' }}
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
    >
      {/* Panel — stops clicks from reaching backdrop */}
      <motion.div
        className="relative w-full max-w-[1100px]"
        initial={reduced ? {} : { opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:text-white"
          style={{ color: 'rgba(255,255,255,0.36)' }}
          aria-label="Close viewer"
        >
          Close ✕
        </button>

        {/* Media — crossfade on item change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="overflow-hidden rounded-xl"
            initial={reduced ? {} : { opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.22 }}
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
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className="object-contain"
                />
              </div>
            ) : (
              /*
               * key={item.src} remounts the <video> whenever the src changes,
               * which resets playback automatically.
               */
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                controls
                preload="metadata"
                playsInline
                className="w-full block"
                style={{ aspectRatio: '16/9', background: '#050505' }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar: label + counter + prev / next */}
        <div className="flex items-center justify-between mt-5 gap-4">
          <p
            className="font-mono text-[11px] tracking-wide truncate"
            style={{ color: 'rgba(255,255,255,0.32)' }}
          >
            {item.label ?? ''}
          </p>

          <div className="flex items-center gap-5 shrink-0">
            <button
              onClick={goPrev}
              disabled={!hasPrev}
              className="font-mono text-[16px] transition-colors duration-200"
              style={{ color: hasPrev ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.1)' }}
              aria-label="Previous"
            >
              ←
            </button>
            <span
              className="font-mono text-[11px] tracking-[0.2em]"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {current + 1}&nbsp;/&nbsp;{items.length}
            </span>
            <button
              onClick={goNext}
              disabled={!hasNext}
              className="font-mono text-[16px] transition-colors duration-200"
              style={{ color: hasNext ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.1)' }}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ─── Asset configuration ──────────────────────────────────────────────────────
// Drop real files at these paths and the CSS fallbacks are replaced automatically.
const DEVICE_ASSETS = {
  iphone: {
    frame: '/devices/iphone-frame.png',
    screens: [
      '/projects/app-showcase/screen-01.jpg',
      '/projects/app-showcase/screen-02.jpg',
    ],
  },
  watch: {
    frame: '/devices/apple-watch-frame.png',
    screens: ['/projects/app-showcase/watch-01.jpg'],
  },
} as const

const SHOWCASE_META = {
  title: 'Mobile App Showcase',
  discipline: 'Development / UI',
  platform: 'iOS · watchOS',
  year: '2025',
  scene: '01 — Dashboard',
}

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Graceful asset fallback ──────────────────────────────────────────────────
function AssetOrFallback({
  src,
  alt,
  className,
  fallback,
}: {
  src: string
  alt: string
  className?: string
  fallback: ReactNode
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return <>{fallback}</>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

// ─── iPhone screen (CSS placeholder) ─────────────────────────────────────────
function IPhoneScreen() {
  const items = [
    { name: 'gigFAST NASCAR', cat: 'Branding', active: true },
    { name: 'App Showcase', cat: 'Development', active: false },
    { name: 'Interactive UI', cat: 'Frontend', active: false },
    { name: 'Design Collection', cat: 'Visual', active: false },
  ]

  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d0d] overflow-hidden select-none">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-[14px] pb-2 shrink-0">
        <span className="text-[9px] font-semibold text-white/70 tabular-nums">9:41</span>
        <div className="flex items-center gap-1">
          {[5, 7, 9].map((h, i) => (
            <div
              key={i}
              className="rounded-[2px] bg-white"
              style={{ width: 3, height: h, opacity: [1, 0.65, 0.35][i] }}
            />
          ))}
          <div className="ml-1.5 w-5 h-[9px] rounded-[2px] border border-white/25 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-white/55 rounded-[1px]" style={{ width: '72%' }} />
          </div>
        </div>
      </div>

      {/* App header */}
      <div className="px-5 pt-2 pb-4 shrink-0">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[7.5px] font-mono text-[#f2d832]/60 tracking-widest uppercase">HELO</span>
          <div className="w-[3px] h-[3px] rounded-full bg-[#f2d832]/40" />
          <span className="text-[7.5px] font-mono text-white/15 tracking-widest uppercase">Projects</span>
        </div>
        <p
          className="text-[19px] font-extrabold text-white tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          04 Works
        </p>
      </div>

      {/* List */}
      <div className="flex-1 px-4 flex flex-col gap-[5px] overflow-hidden">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-[10px] px-3 py-2.5 shrink-0"
            style={{
              background: item.active ? 'rgba(242,216,50,0.07)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${item.active ? 'rgba(242,216,50,0.14)' : 'rgba(255,255,255,0.05)'}`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-[22px] h-[22px] rounded-[6px] flex items-center justify-center shrink-0"
                style={{ background: item.active ? 'rgba(242,216,50,0.12)' : 'rgba(255,255,255,0.04)' }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: item.active ? '#f2d832' : 'rgba(255,255,255,0.18)' }}
                />
              </div>
              <span
                className="text-[9px] font-medium truncate"
                style={{ color: item.active ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.35)' }}
              >
                {item.name}
              </span>
            </div>
            <span
              className="text-[7px] font-mono"
              style={{ color: item.active ? 'rgba(242,216,50,0.45)' : 'rgba(255,255,255,0.16)' }}
            >
              {item.cat}
            </span>
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div className="flex justify-center py-3 shrink-0">
        <div className="w-20 h-[3px] rounded-full bg-white/12" />
      </div>
    </div>
  )
}

// ─── Watch screen (CSS placeholder) ──────────────────────────────────────────
function WatchScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d0d0d] select-none">
      <p className="text-[6.5px] font-mono text-white/20 tracking-widest uppercase mb-1">TUE</p>
      <p
        className="text-[22px] font-extrabold text-white tracking-tight leading-none mb-3"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        9:41
      </p>
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
          <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(242,216,50,0.1)" strokeWidth="3" />
          <circle
            cx="20" cy="20" r="14"
            fill="none" stroke="#f2d832" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="88" strokeDashoffset="22"
            style={{ filter: 'drop-shadow(0 0 3px rgba(242,216,50,0.45))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[7px] h-[7px] rounded-full bg-[#f2d832]/30" />
        </div>
      </div>
      <p className="text-[6px] font-mono text-[#f2d832]/35 tracking-widest mt-2">75%</p>
    </div>
  )
}

// ─── iPhone frame ─────────────────────────────────────────────────────────────
function IPhoneFrame({ scale = 1 }: { scale?: number }) {
  const w = Math.round(220 * scale)
  const h = Math.round(476 * scale)
  const br = Math.round(48 * scale)

  return (
    <div
      style={{
        position: 'relative',
        width: w,
        height: h,
        borderRadius: br,
        background: 'linear-gradient(158deg, #2e2e2e 0%, #1c1c1c 42%, #101010 100%)',
        boxShadow: [
          '0 0 0 1.5px rgba(255,255,255,0.12)',
          '0 0 0 3px rgba(0,0,0,0.88)',
          '0 40px 90px rgba(0,0,0,0.78)',
          '0 0 0 3px rgba(0,0,0,0.88)',
          'inset 0 1px 0 rgba(255,255,255,0.14)',
        ].join(', '),
      }}
    >
      {/* Volume buttons */}
      <div style={{ position: 'absolute', left: -3.5, top: Math.round(96 * scale), width: 3.5, height: Math.round(28 * scale), borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', left: -3.5, top: Math.round(134 * scale), width: 3.5, height: Math.round(28 * scale), borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
      {/* Power button */}
      <div style={{ position: 'absolute', right: -3.5, top: Math.round(114 * scale), width: 3.5, height: Math.round(44 * scale), borderRadius: 2, background: 'rgba(255,255,255,0.09)' }} />

      {/* Screen bezel */}
      <div
        style={{
          position: 'absolute',
          inset: Math.round(9 * scale),
          borderRadius: Math.round(40 * scale),
          overflow: 'hidden',
          background: '#0d0d0d',
        }}
      >
        {/* Dynamic island */}
        <div
          style={{
            position: 'absolute',
            top: Math.round(13 * scale),
            left: '50%',
            transform: 'translateX(-50%)',
            width: Math.round(96 * scale),
            height: Math.round(28 * scale),
            borderRadius: 20,
            background: '#080808',
            zIndex: 10,
          }}
        />
        <AssetOrFallback
          src={DEVICE_ASSETS.iphone.screens[0]}
          alt="App interface screen"
          className="absolute inset-0 w-full h-full object-cover"
          fallback={<IPhoneScreen />}
        />
      </div>

      {/* Gloss sheen */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: br,
          background: 'linear-gradient(142deg, rgba(255,255,255,0.06) 0%, transparent 38%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

// ─── Apple Watch frame ────────────────────────────────────────────────────────
function WatchFrame({ scale = 1 }: { scale?: number }) {
  const w = Math.round(100 * scale)
  const h = Math.round(116 * scale)
  const br = Math.round(24 * scale)
  const bandW = Math.round(64 * scale)
  const bandH = Math.round(13 * scale)

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Band top */}
      <div
        style={{
          width: bandW, height: bandH,
          margin: '0 auto 1px',
          background: 'linear-gradient(to bottom, #202020, #171717)',
          borderRadius: '3px 3px 0 0',
          border: '1px solid rgba(255,255,255,0.07)',
          borderBottom: 'none',
        }}
      />

      {/* Body */}
      <div
        style={{
          position: 'relative',
          width: w, height: h,
          borderRadius: br,
          background: 'linear-gradient(150deg, #272727 0%, #191919 50%, #0f0f0f 100%)',
          boxShadow: [
            '0 0 0 1.5px rgba(255,255,255,0.11)',
            '0 0 0 3px rgba(0,0,0,0.82)',
            '0 18px 45px rgba(0,0,0,0.68)',
            'inset 0 1px 0 rgba(255,255,255,0.1)',
          ].join(', '),
          overflow: 'hidden',
        }}
      >
        {/* Digital crown */}
        <div style={{ position: 'absolute', right: -4, top: '33%', width: 4, height: Math.round(26 * scale), borderRadius: 2.5, background: 'rgba(255,255,255,0.09)' }} />
        {/* Side button */}
        <div style={{ position: 'absolute', right: -4, top: '62%', width: 4, height: Math.round(16 * scale), borderRadius: 2.5, background: 'rgba(255,255,255,0.07)' }} />

        {/* Screen */}
        <div
          style={{
            position: 'absolute',
            inset: Math.round(5 * scale),
            borderRadius: Math.round(20 * scale),
            overflow: 'hidden',
            background: '#0d0d0d',
          }}
        >
          <AssetOrFallback
            src={DEVICE_ASSETS.watch.screens[0]}
            alt="Watch interface screen"
            className="w-full h-full object-cover"
            fallback={<WatchScreen />}
          />
        </div>

        {/* Gloss */}
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: br,
            background: 'linear-gradient(140deg, rgba(255,255,255,0.07) 0%, transparent 48%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Band bottom */}
      <div
        style={{
          width: bandW, height: bandH,
          margin: '1px auto 0',
          background: 'linear-gradient(to top, #202020, #171717)',
          borderRadius: '0 0 3px 3px',
          border: '1px solid rgba(255,255,255,0.07)',
          borderTop: 'none',
        }}
      />
    </div>
  )
}

// ─── Annotated device stage ───────────────────────────────────────────────────
//
// MONUMENT direction: technical/editorial presentation.
// Dimension lines with labels above each device, platform labels below.
// No hover lift. No ambient glow. No floor reflection.
// Expand trigger is a minimal mono text button.

function AnnotatedDevices({
  onExpand,
  showExpand = true,
  scale = 1,
}: {
  onExpand: () => void
  showExpand?: boolean
  scale?: number
}) {
  return (
    <div className="relative">

      {/* Device row — bottoms aligned */}
      <div className="flex items-end justify-center gap-6 pt-12">

        {/* ── iPhone ── */}
        <div className="relative">

          {/* Top annotation: drop line + label */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ bottom: '100%', paddingBottom: 10 }}
          >
            <span
              className="font-mono tracking-[0.22em] uppercase mb-2 whitespace-nowrap"
              style={{ fontSize: '9px', color: 'rgba(255,255,255,0.36)' }}
            >
              iPhone 15 Pro
            </span>
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <IPhoneFrame scale={scale} />

          {/* Bottom annotation: platform + horizontal ticks */}
          <div
            className="absolute left-0 right-0 flex justify-center"
            style={{ top: '100%', paddingTop: 14 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-px w-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span
                className="font-mono tracking-[0.18em]"
                style={{ fontSize: '9px', color: 'rgba(255,255,255,0.26)' }}
              >
                iOS 18
              </span>
              <div className="h-px w-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        </div>

        {/* ── Apple Watch ── */}
        <div className="relative" style={{ marginBottom: Math.round(56 * scale) }}>

          {/* Top annotation */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ bottom: '100%', paddingBottom: 10 }}
          >
            <span
              className="font-mono tracking-[0.22em] uppercase mb-2 whitespace-nowrap"
              style={{ fontSize: '9px', color: 'rgba(255,255,255,0.36)' }}
            >
              Apple Watch
            </span>
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <WatchFrame scale={scale} />

          {/* Bottom annotation */}
          <div
            className="absolute left-0 right-0 flex justify-center"
            style={{ top: '100%', paddingTop: 14 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-px w-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span
                className="font-mono tracking-[0.18em]"
                style={{ fontSize: '9px', color: 'rgba(255,255,255,0.26)' }}
              >
                watchOS 11
              </span>
              <div className="h-px w-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        </div>

      </div>

      {/* Scene annotation — centered below devices */}
      <div className="mt-16 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <motion.span
          className="inline-block w-[5px] h-[5px] rounded-full bg-[#f2d832] shrink-0"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span
          className="font-mono tracking-[0.16em] uppercase shrink-0"
          style={{ fontSize: '10px', color: '#5a5a54' }}
        >
          {SHOWCASE_META.scene}
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>

      {/* Expand trigger */}
      {showExpand && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onExpand}
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            aria-label="Expand device showcase"
          >
            <div
              className="h-px transition-all duration-300 group-hover:w-10"
              style={{ width: 24, background: 'rgba(255,255,255,0.08)' }}
            />
            <span
              className="font-mono tracking-[0.28em] uppercase transition-colors duration-300"
              style={{ fontSize: '10px', color: '#4a4a44' }}
            >
              Expand
            </span>
            <div
              className="h-px transition-all duration-300 group-hover:w-10"
              style={{ width: 24, background: 'rgba(255,255,255,0.08)' }}
            />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Showcase overlay ─────────────────────────────────────────────────────────
// Document-style full-screen expansion — no rounded modal, no ambient glow.
// Close is a minimal mono text button.

function ShowcaseOverlay({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto"
      style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role="dialog"
      aria-modal="true"
      aria-label="Device Showcase"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Close — mono text, top right */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close showcase"
        className="absolute top-6 right-6 lg:top-8 lg:right-8 font-mono tracking-[0.28em] uppercase transition-colors duration-200 focus:outline-none hover:text-white/40"
        style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Close ×
      </button>

      {/* Content */}
      <motion.div
        className="w-full max-w-[960px] px-6 lg:px-16 py-16 flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
      >
        {/* Devices — no expand button inside overlay */}
        <div className="mb-16">
          <AnnotatedDevices onExpand={() => {}} showExpand={false} scale={1.08} />
        </div>

        {/* Separator */}
        <div className="w-full h-px mb-10" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Project info */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p
              className="font-mono text-[#606058] tracking-[0.16em] uppercase mb-2"
              style={{ fontSize: '11px' }}
            >
              Selected Work
            </p>
            <h3
              className="font-extrabold text-white tracking-[-0.04em] leading-none"
              style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontFamily: 'var(--font-syne)' }}
            >
              {SHOWCASE_META.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 shrink-0 sm:pb-1">
            {[
              { label: 'Discipline', value: SHOWCASE_META.discipline },
              { label: 'Platform',   value: SHOWCASE_META.platform },
              { label: 'Year',       value: SHOWCASE_META.year },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-start gap-1">
                <span
                  className="font-mono text-[#5a5a54] tracking-[0.14em] uppercase"
                  style={{ fontSize: '10px' }}
                >
                  {label}
                </span>
                <span
                  className="font-mono"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
//
// Two-column: editorial copy + flat spec table (left) / annotated device stage (right).
// EDIT content → SHOWCASE_META constant above.
// EDIT assets  → DEVICE_ASSETS constant above.

export default function DeviceShowcase() {
  const [overlayOpen, setOverlayOpen] = useState(false)

  return (
    <section className="border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header strip */}
        <div className="flex items-center gap-4 py-12">
          <span className="text-[12px] font-mono text-[#606058] tracking-widest">04</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[12px] font-mono text-[#606058] tracking-widest uppercase">Device Showcase</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center pb-28">

          {/* ── Left: editorial copy + document-style spec table ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <h2
              className="font-extrabold tracking-[-0.04em] text-white mb-6 leading-[0.92]"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontFamily: 'var(--font-syne)' }}
            >
              Work in
              <br />
              <span className="text-[#f2d832]">Context.</span>
            </h2>

            <p
              className="text-[14px] leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.42)' }}
            >
              Every project lives in an interface. This showcase puts the work
              inside real device frames — app screens and visual systems
              rendered exactly where they belong.
            </p>

            {/* Spec table — document style, full-width 1px rules */}
            <div className="mb-10">
              {[
                { label: 'Project',    value: SHOWCASE_META.title },
                { label: 'Discipline', value: SHOWCASE_META.discipline },
                { label: 'Scene',      value: SHOWCASE_META.scene },
                { label: 'Platform',   value: SHOWCASE_META.platform },
              ].map(({ label, value }, i) => (
                <div key={label}>
                  {i === 0 && (
                    <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  )}
                  <div className="flex items-center justify-between py-3">
                    <span
                      className="font-mono tracking-[0.14em] uppercase text-[#5a5a54]"
                      style={{ fontSize: '11px' }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '13px', color: 'rgba(255,255,255,0.52)' }}
                    >
                      {value}
                    </span>
                  </div>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              ))}
            </div>

            {/* Scene indicator */}
            <div className="flex items-center gap-3">
              <span
                className="font-mono tracking-[0.14em] uppercase text-[#5a5a54] mr-1"
                style={{ fontSize: '11px' }}
              >
                Scene
              </span>
              {['01', '02', '03'].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <div
                    className="rounded-full"
                    style={{
                      width: i === 0 ? 18 : 5,
                      height: 5,
                      background: i === 0 ? '#f2d832' : 'rgba(255,255,255,0.08)',
                    }}
                  />
                  <span
                    className="font-mono tracking-widest"
                    style={{
                      fontSize: '10px',
                      color: i === 0 ? 'rgba(242,216,50,0.55)' : 'rgba(255,255,255,0.22)',
                    }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: annotated device stage ── */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
          >
            <AnnotatedDevices onExpand={() => setOverlayOpen(true)} />
          </motion.div>

        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {overlayOpen && (
          <ShowcaseOverlay onClose={() => setOverlayOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  )
}

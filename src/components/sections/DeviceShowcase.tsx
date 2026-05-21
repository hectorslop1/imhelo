'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

// Strong ease-out — starts fast, feels immediately responsive (Emil: never ease-in for UI)
const EASE = [0.16, 1, 0.3, 1] as const

// ─── Asset configuration ──────────────────────────────────────────────────────
// To replace placeholders with real screenshots:
//   1. Drop files at these paths inside /public (e.g. /public/projects/app-showcase/screen-01.jpg)
//   2. The <img> loads automatically — CSS placeholder disappears.
//   3. screen index matches SCENES order (screen-01 = scene 01, etc.)
//   4. watch-01 is shared across all scenes.
const DEVICE_ASSETS = {
  iphone: {
    screens: [
      '/projects/app-showcase/screen-01.jpg',
      '/projects/app-showcase/screen-02.jpg',
      '/projects/app-showcase/screen-03.jpg',
      '/projects/app-showcase/screen-04.jpg',
    ] as string[],
  },
  watch: {
    screens: ['/projects/app-showcase/watch-01.jpg'] as string[],
  },
}

// ─── Scene data ───────────────────────────────────────────────────────────────
// Edit here to add, remove, or rename scenes.
//   id    → shown as "01" index label
//   label → scene name
//   desc  → one-line description shown only when scene is active
//   watch → true highlights the Watch ring for this scene
const SCENES = [
  { id: '01', label: 'Dashboard',         desc: 'Main app overview and project navigation.',           watch: false },
  { id: '02', label: 'App Flow',          desc: 'User journey, screen transitions, and core actions.', watch: false },
  { id: '03', label: 'Watch Companion',   desc: 'Apple Watch glances and companion UI.',               watch: true  },
  { id: '04', label: 'Interface Details', desc: 'Component library, UI patterns, and visual tokens.',  watch: false },
]

// ─── Showcase metadata ────────────────────────────────────────────────────────
// Edit text here — no component changes needed.
const SHOWCASE_META = {
  title:       'Mobile App Showcase',
  discipline:  'Development / UI',
  platform:    'iOS · watchOS',
  year:        '2026',
  description: 'A focused interface showcase presenting app screens, companion views, and product-focused UI details inside realistic device frames.',
}

// ─── Graceful asset fallback ──────────────────────────────────────────────────
// Tries to load <img src>, falls back to CSS placeholder silently on 404.
function AssetOrFallback({
  src, alt, className, fallback,
}: {
  src: string; alt: string; className?: string; fallback: ReactNode
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return <>{fallback}</>
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={() => setFailed(true)} />
}

// ─── iPhone screen placeholder ────────────────────────────────────────────────
// Rendered only when a real screenshot is absent.
// To change the content shown per scene: edit the `screens` array below.
function IPhoneScreen({ scene = 0 }: { scene?: number }) {
  const screens = [
    {
      header: '04 Works', sub: 'Projects',
      items: [
        { name: 'gigFAST NASCAR',    cat: 'Branding',    active: true  },
        { name: 'App Showcase',      cat: 'Development', active: false },
        { name: 'Interactive UI',    cat: 'Frontend',    active: false },
        { name: 'Design Collection', cat: 'Visual',      active: false },
      ],
    },
    {
      header: 'Get Started', sub: 'Onboarding',
      items: [
        { name: 'Connect Account',  cat: 'Step 01', active: true  },
        { name: 'Set Preferences',  cat: 'Step 02', active: false },
        { name: 'Choose Plan',      cat: 'Step 03', active: false },
        { name: 'Launch Dashboard', cat: 'Step 04', active: false },
      ],
    },
    {
      header: 'Companion', sub: 'watchOS',
      items: [
        { name: 'Activity Ring',  cat: 'Health',    active: true  },
        { name: 'Notifications', cat: 'Alerts',    active: false },
        { name: 'Quick Actions', cat: 'Controls',  active: false },
        { name: 'Sync Status',   cat: 'System',    active: false },
      ],
    },
    {
      header: 'UI Kit', sub: 'Components',
      items: [
        { name: 'Buttons & CTAs', cat: 'Actions',    active: true  },
        { name: 'Type Scale',     cat: 'Typography', active: false },
        { name: 'Color Tokens',   cat: 'Palette',    active: false },
        { name: 'Icon Set',       cat: 'Assets',     active: false },
      ],
    },
  ]

  const s = screens[scene] ?? screens[0]

  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d0d] overflow-hidden select-none">
      <div className="flex items-center justify-between px-5 pt-[14px] pb-2 shrink-0">
        <span className="text-[9px] font-semibold text-white/70 tabular-nums">9:41</span>
        <div className="flex items-center gap-1">
          {[5, 7, 9].map((h, i) => (
            <div key={i} className="rounded-[2px] bg-white" style={{ width: 3, height: h, opacity: [1, 0.65, 0.35][i] }} />
          ))}
          <div className="ml-1.5 w-5 h-[9px] rounded-[2px] border border-white/25 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-white/55 rounded-[1px]" style={{ width: '72%' }} />
          </div>
        </div>
      </div>
      <div className="px-5 pt-2 pb-4 shrink-0">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[7.5px] font-mono text-[#f2d832]/60 tracking-widest uppercase">HELO</span>
          <div className="w-[3px] h-[3px] rounded-full bg-[#f2d832]/40" />
          <span className="text-[7.5px] font-mono text-white/15 tracking-widest uppercase">{s.sub}</span>
        </div>
        <p className="text-[19px] font-extrabold text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-syne)' }}>
          {s.header}
        </p>
      </div>
      <div className="flex-1 px-4 flex flex-col gap-[5px] overflow-hidden">
        {s.items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-[10px] px-3 py-2.5 shrink-0"
            style={{
              background: item.active ? 'rgba(242,216,50,0.07)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${item.active ? 'rgba(242,216,50,0.14)' : 'rgba(255,255,255,0.05)'}`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-[22px] h-[22px] rounded-[6px] flex items-center justify-center shrink-0"
                style={{ background: item.active ? 'rgba(242,216,50,0.12)' : 'rgba(255,255,255,0.04)' }}>
                <div className="w-2 h-2 rounded-full"
                  style={{ background: item.active ? '#f2d832' : 'rgba(255,255,255,0.18)' }} />
              </div>
              <span className="text-[9px] font-medium truncate"
                style={{ color: item.active ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.35)' }}>
                {item.name}
              </span>
            </div>
            <span className="text-[7px] font-mono"
              style={{ color: item.active ? 'rgba(242,216,50,0.45)' : 'rgba(255,255,255,0.16)' }}>
              {item.cat}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-3 shrink-0">
        <div className="w-20 h-[3px] rounded-full bg-white/12" />
      </div>
    </div>
  )
}

// ─── Watch screen placeholder ─────────────────────────────────────────────────
function WatchScreen({ active = false }: { active?: boolean }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d0d0d] select-none">
      <p className="text-[6.5px] font-mono text-white/20 tracking-widest uppercase mb-1">TUE</p>
      <p className="text-[22px] font-extrabold text-white tracking-tight leading-none mb-3"
        style={{ fontFamily: 'var(--font-syne)' }}>9:41</p>
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
          <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(242,216,50,0.1)" strokeWidth="3" />
          <circle
            cx="20" cy="20" r="14" fill="none"
            stroke={active ? '#f2d832' : 'rgba(242,216,50,0.45)'}
            strokeWidth="3" strokeLinecap="round"
            strokeDasharray="88" strokeDashoffset="22"
            style={{ filter: `drop-shadow(0 0 3px rgba(242,216,50,${active ? 0.65 : 0.2}))` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[7px] h-[7px] rounded-full"
            style={{ background: active ? '#f2d832' : 'rgba(242,216,50,0.25)' }} />
        </div>
      </div>
      <p className="text-[6px] font-mono text-[#f2d832]/35 tracking-widest mt-2">75%</p>
    </div>
  )
}

// ─── iPhone frame ─────────────────────────────────────────────────────────────
function IPhoneFrame({ scale = 1, scene = 0 }: { scale?: number; scene?: number }) {
  const w = Math.round(220 * scale)
  const h = Math.round(476 * scale)
  const br = Math.round(48 * scale)

  return (
    <div style={{
      position: 'relative', width: w, height: h, borderRadius: br,
      background: 'linear-gradient(158deg, #2e2e2e 0%, #1c1c1c 42%, #101010 100%)',
      boxShadow: [
        '0 0 0 1.5px rgba(255,255,255,0.12)',
        '0 0 0 3px rgba(0,0,0,0.88)',
        '0 40px 90px rgba(0,0,0,0.78)',
        'inset 0 1px 0 rgba(255,255,255,0.14)',
      ].join(', '),
    }}>
      <div style={{ position: 'absolute', left: -3.5, top: Math.round(96 * scale), width: 3.5, height: Math.round(28 * scale), borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', left: -3.5, top: Math.round(134 * scale), width: 3.5, height: Math.round(28 * scale), borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', right: -3.5, top: Math.round(114 * scale), width: 3.5, height: Math.round(44 * scale), borderRadius: 2, background: 'rgba(255,255,255,0.09)' }} />
      <div style={{ position: 'absolute', inset: Math.round(9 * scale), borderRadius: Math.round(40 * scale), overflow: 'hidden', background: '#0d0d0d' }}>
        <div style={{ position: 'absolute', top: Math.round(13 * scale), left: '50%', transform: 'translateX(-50%)', width: Math.round(96 * scale), height: Math.round(28 * scale), borderRadius: 20, background: '#080808', zIndex: 10 }} />
        <AssetOrFallback
          src={DEVICE_ASSETS.iphone.screens[scene] ?? DEVICE_ASSETS.iphone.screens[0]}
          alt={`App interface — scene ${scene + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          fallback={<IPhoneScreen scene={scene} />}
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, borderRadius: br, background: 'linear-gradient(142deg, rgba(255,255,255,0.06) 0%, transparent 38%)', pointerEvents: 'none' }} />
    </div>
  )
}

// ─── Apple Watch frame ────────────────────────────────────────────────────────
function WatchFrame({ scale = 1, active = false }: { scale?: number; active?: boolean }) {
  const w = Math.round(100 * scale)
  const h = Math.round(116 * scale)
  const br = Math.round(24 * scale)
  const bandW = Math.round(64 * scale)
  const bandH = Math.round(13 * scale)

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ width: bandW, height: bandH, margin: '0 auto 1px', background: 'linear-gradient(to bottom, #202020, #171717)', borderRadius: '3px 3px 0 0', border: '1px solid rgba(255,255,255,0.07)', borderBottom: 'none' }} />
      <div style={{ position: 'relative', width: w, height: h, borderRadius: br, background: 'linear-gradient(150deg, #272727 0%, #191919 50%, #0f0f0f 100%)', boxShadow: ['0 0 0 1.5px rgba(255,255,255,0.11)', '0 0 0 3px rgba(0,0,0,0.82)', '0 18px 45px rgba(0,0,0,0.68)', 'inset 0 1px 0 rgba(255,255,255,0.1)'].join(', '), overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -4, top: '33%', width: 4, height: Math.round(26 * scale), borderRadius: 2.5, background: 'rgba(255,255,255,0.09)' }} />
        <div style={{ position: 'absolute', right: -4, top: '62%', width: 4, height: Math.round(16 * scale), borderRadius: 2.5, background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', inset: Math.round(5 * scale), borderRadius: Math.round(20 * scale), overflow: 'hidden', background: '#0d0d0d' }}>
          <AssetOrFallback
            src={DEVICE_ASSETS.watch.screens[0]}
            alt="Watch interface screen"
            className="w-full h-full object-cover"
            fallback={<WatchScreen active={active} />}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, borderRadius: br, background: 'linear-gradient(140deg, rgba(255,255,255,0.07) 0%, transparent 48%)', pointerEvents: 'none' }} />
      </div>
      <div style={{ width: bandW, height: bandH, margin: '1px auto 0', background: 'linear-gradient(to top, #202020, #171717)', borderRadius: '0 0 3px 3px', border: '1px solid rgba(255,255,255,0.07)', borderTop: 'none' }} />
    </div>
  )
}

// ─── Annotated device stage (section view) ────────────────────────────────────
function AnnotatedDevices({
  onExpand,
  showExpand = true,
  scale = 1,
  scene = 0,
}: {
  onExpand: () => void
  showExpand?: boolean
  scale?: number
  scene?: number
}) {
  const activeScene = SCENES[scene]

  return (
    <div className="relative">
      <div className="flex items-end justify-center gap-6 pt-12">

        {/* iPhone */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ bottom: '100%', paddingBottom: 10 }}>
            <span className="font-mono tracking-[0.22em] uppercase mb-2 whitespace-nowrap" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.36)' }}>iPhone 15 Pro</span>
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <IPhoneFrame scale={scale} scene={scene} />
          <div className="absolute left-0 right-0 flex justify-center" style={{ top: '100%', paddingTop: 14 }}>
            <div className="flex items-center gap-2">
              <div className="h-px w-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="font-mono tracking-[0.18em]" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.26)' }}>iOS 18</span>
              <div className="h-px w-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        </div>

        {/* Apple Watch */}
        <div className="relative" style={{ marginBottom: Math.round(56 * scale) }}>
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ bottom: '100%', paddingBottom: 10 }}>
            <span className="font-mono tracking-[0.22em] uppercase mb-2 whitespace-nowrap" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.36)' }}>Apple Watch</span>
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <WatchFrame scale={scale} active={activeScene?.watch} />
          <div className="absolute left-0 right-0 flex justify-center" style={{ top: '100%', paddingTop: 14 }}>
            <div className="flex items-center gap-2">
              <div className="h-px w-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="font-mono tracking-[0.18em]" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.26)' }}>watchOS 11</span>
              <div className="h-px w-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scene annotation */}
      <div className="mt-16 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <motion.span
          className="inline-block w-[5px] h-[5px] rounded-full bg-[#f2d832] shrink-0"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-mono tracking-[0.16em] uppercase shrink-0" style={{ fontSize: '10px', color: '#5a5a54' }}>
          {activeScene?.id} — {activeScene?.label}
        </span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>

      {/* Expand trigger — scale on press (Emil: buttons must feel responsive) */}
      {showExpand && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onExpand}
            aria-label="Expand device showcase"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm"
            style={{
              background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer',
              // Precise property transition — not `all`
              transition: 'transform 120ms ease-out',
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
            onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
          >
            <div className="h-px transition-[width] duration-300 ease-out group-hover:w-10"
              style={{ width: 24, background: 'rgba(255,255,255,0.08)' }} />
            <span
              className="font-mono tracking-[0.28em] uppercase"
              style={{
                fontSize: '10px', color: '#4a4a44',
                transition: 'color 160ms ease-out',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.35)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#4a4a44' }}
            >
              Expand
            </span>
            <div className="h-px transition-[width] duration-300 ease-out group-hover:w-10"
              style={{ width: 24, background: 'rgba(255,255,255,0.08)' }} />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Showcase overlay ─────────────────────────────────────────────────────────
//
// Premium full-screen product demo.
// Applied principles:
//   Emil Kowalski — motion reinforces meaning, asymmetric exit (faster), blur bridges crossfade,
//                   scale(0.98) press feedback, explicit property transitions (not `all`)
//   High-end design — content scales in from 0.98, stagger 40ms between items
//   Impeccable — body scroll locked, Escape closes, focus trapped on close button
//
// Layout:
//   Top bar (label + close)
//   Two-column: left panel (title / meta / scene selector) | right (devices)
//   Bottom strip (scene name)
//
// Mobile: devices on top, metadata below (order-1/2 classes)

function ShowcaseOverlay({ onClose }: { onClose: () => void }) {
  const [activeScene, setActiveScene] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion() ?? false
  const scene = SCENES[activeScene]
  const SCALE = 1.18

  // Escape key + body scroll lock
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
    // ── Backdrop: fast opacity fade only ──
    // Exit is 180ms — Emil: exit faster than enter
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: '#050505' }}
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? {} : { opacity: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      role="dialog"
      aria-modal="true"
      aria-label="Device Showcase — expanded view"
    >

      {/* ── Top bar ── slides down from above, appears first */}
      <motion.div
        className="shrink-0 flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/[0.05]"
        initial={reduced ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: EASE, delay: 0.06 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-[4px] h-[4px] rounded-full bg-[#f2d832]/35 shrink-0" aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#4a4a44]">
            Device Showcase
          </span>
        </div>

        {/* Close button — precise color transition, scale on press */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close showcase"
          className="font-mono tracking-[0.28em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm"
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.24)',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 0',
            transition: 'color 160ms ease-out, transform 120ms ease-out',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.24)' }}
          onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.95)' }}
          onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
        >
          Close ×
        </button>
      </motion.div>

      {/* ── Main content — scales in from 0.98, rises 14px ── */}
      {/* High-end: content materializes, doesn't just appear */}
      <motion.div
        className="flex-1 max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-10 lg:py-14"
        initial={reduced ? {} : { opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
        style={{ transformOrigin: 'center top' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 lg:gap-20 items-start">

          {/* ── Left panel — order-2 on mobile (devices appear first) ── */}
          <div className="order-2 lg:order-1">

            {/* Title block — stagger delay 0.16s total */}
            <motion.div
              className="mb-8"
              initial={reduced ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.16 }}
            >
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: '#5a5a54' }}>
                Selected Work
              </p>
              <h2
                className="font-extrabold text-white tracking-[-0.04em] leading-[0.94] mb-5"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontFamily: 'var(--font-syne)' }}
              >
                {SHOWCASE_META.title}
              </h2>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '52ch' }}>
                {SHOWCASE_META.description}
              </p>
            </motion.div>

            {/* Metadata table — stagger delay 0.22s total */}
            <motion.div
              className="mb-9"
              initial={reduced ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, ease: EASE, delay: 0.22 }}
            >
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              {[
                { label: 'Discipline', value: SHOWCASE_META.discipline },
                { label: 'Platform',   value: SHOWCASE_META.platform   },
                { label: 'Year',       value: SHOWCASE_META.year       },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="flex items-center justify-between py-3">
                    <span className="font-mono tracking-[0.14em] uppercase" style={{ fontSize: '11px', color: '#5a5a54' }}>
                      {label}
                    </span>
                    <span className="font-mono" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.48)' }}>
                      {value}
                    </span>
                  </div>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              ))}
            </motion.div>

            {/* Scene selector — items stagger individually 40ms apart */}
            <div>
              <motion.p
                className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3"
                style={{ color: '#5a5a54' }}
                initial={reduced ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE, delay: 0.26 }}
              >
                Scenes
              </motion.p>
              <div className="space-y-px">
                {SCENES.map((s, i) => {
                  const isActive = i === activeScene
                  return (
                    <motion.button
                      key={s.id}
                      onClick={() => setActiveScene(i)}
                      aria-pressed={isActive}
                      initial={reduced ? {} : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: EASE, delay: 0.28 + i * 0.04 }}
                      className="w-full flex items-start gap-4 py-3 px-3 rounded-md text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
                      style={{
                        background: isActive ? 'rgba(255,255,255,0.025)' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
                        cursor: 'pointer',
                        // Precise transitions — Emil: never use `all`
                        transition: 'background-color 160ms ease-out, border-color 160ms ease-out, transform 120ms ease-out',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.015)'
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
                      }}
                      onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)' }}
                      onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
                    >
                      {/* Index */}
                      <span
                        className="font-mono shrink-0 tabular-nums pt-[2px]"
                        style={{
                          fontSize: '11px',
                          color: isActive ? 'rgba(242,216,50,0.6)' : 'rgba(255,255,255,0.2)',
                          transition: 'color 160ms ease-out',
                        }}
                      >
                        {s.id}
                      </span>

                      {/* Label + description */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-mono"
                          style={{
                            fontSize: '13px',
                            color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                            transition: 'color 160ms ease-out',
                          }}
                        >
                          {s.label}
                        </p>
                        {/* CSS max-height transition — no layout shift, no JS animation overhead */}
                        {/* Emil: CSS transitions are interruptible; use over keyframes for dynamic UI */}
                        <div
                          style={{
                            maxHeight: isActive ? '32px' : '0px',
                            overflow: 'hidden',
                            opacity: isActive ? 1 : 0,
                            transition: 'max-height 200ms ease-out, opacity 150ms ease-out',
                          }}
                        >
                          <p className="font-mono mt-1 leading-snug" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.26)' }}>
                            {s.desc}
                          </p>
                        </div>
                      </div>

                      {/* Active indicator */}
                      <div
                        style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: '#f2d832',
                          opacity: isActive ? 0.45 : 0,
                          flexShrink: 0,
                          marginTop: 5,
                          transition: 'opacity 200ms ease-out',
                        }}
                        aria-hidden
                      />
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Right panel: devices — order-1 on mobile, appears early ── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          >
            {/* overflow-x-auto for narrow mobile viewports */}
            <div className="overflow-x-auto pb-4">
              <div className="flex items-end justify-center gap-8 pt-10 px-4">

                {/* iPhone — screen changes on scene switch */}
                <div className="relative shrink-0">
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ bottom: '100%', paddingBottom: 10 }}>
                    <span className="font-mono tracking-[0.22em] uppercase mb-2 whitespace-nowrap" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)' }}>
                      iPhone 15 Pro
                    </span>
                    <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  </div>

                  {/* AnimatePresence mode="wait" — old exits fully before new enters */}
                  {/* Emil: blur bridges the crossfade, makes two states read as one transition */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`iphone-${activeScene}`}
                      initial={reduced ? {} : { opacity: 0, y: 8, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={reduced ? {} : { opacity: 0, y: -8, filter: 'blur(4px)' }}
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      <IPhoneFrame scale={SCALE} scene={activeScene} />
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-px w-5" style={{ background: 'rgba(255,255,255,0.04)' }} />
                      <span className="font-mono tracking-[0.18em]" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>iOS 18</span>
                      <div className="h-px w-5" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    </div>
                  </div>
                </div>

                {/* Apple Watch — highlights when scene.watch is true */}
                <div className="relative shrink-0" style={{ marginBottom: Math.round(56 * SCALE) }}>
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ bottom: '100%', paddingBottom: 10 }}>
                    <span className="font-mono tracking-[0.22em] uppercase mb-2 whitespace-nowrap" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)' }}>
                      Apple Watch
                    </span>
                    <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`watch-${activeScene}`}
                      initial={reduced ? {} : { opacity: 0, y: 6, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={reduced ? {} : { opacity: 0, y: -6, filter: 'blur(4px)' }}
                      transition={{ duration: 0.28, ease: EASE, delay: 0.04 }}
                    >
                      <WatchFrame scale={SCALE} active={scene.watch} />
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-px w-3" style={{ background: 'rgba(255,255,255,0.04)' }} />
                      <span className="font-mono tracking-[0.18em]" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>watchOS 11</span>
                      <div className="h-px w-3" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Bottom strip — appears last, anchors the overlay ── */}
      <motion.div
        className="shrink-0 border-t border-white/[0.04] px-6 lg:px-12 py-4 flex items-center justify-between"
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE, delay: 0.32 }}
      >
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase" style={{ color: '#2e2e2c' }}>
          HELO — Interface Showcase
        </p>
        <p className="font-mono text-[11px] tracking-[0.14em]" style={{ color: '#2e2e2c' }}>
          {scene?.id} — {scene?.label}
        </p>
      </motion.div>

    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
//
// EDIT content  → SHOWCASE_META constant (title, discipline, platform, year, description)
// EDIT scenes   → SCENES array (id, label, desc, watch)
// EDIT assets   → DEVICE_ASSETS constant (file paths)

export default function DeviceShowcase() {
  const [overlayOpen, setOverlayOpen] = useState(false)

  return (
    <section className="border-t border-white/[0.06] overflow-hidden" style={{ background: '#111111' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header strip */}
        <div className="flex items-center gap-4 py-12">
          <span className="text-[12px] font-mono text-[#606058] tracking-widest">04</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[12px] font-mono text-[#606058] tracking-widest uppercase">Device Showcase</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center pb-28">

          {/* Left: editorial copy + spec table */}
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

            <p className="text-[14px] leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.42)' }}>
              Every project lives in an interface. This showcase puts the work
              inside real device frames — app screens and visual systems
              rendered exactly where they belong.
            </p>

            <div className="mb-10">
              {[
                { label: 'Project',    value: SHOWCASE_META.title      },
                { label: 'Discipline', value: SHOWCASE_META.discipline },
                { label: 'Platform',   value: SHOWCASE_META.platform   },
              ].map(({ label, value }, i) => (
                <div key={label}>
                  {i === 0 && <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                  <div className="flex items-center justify-between py-3">
                    <span className="font-mono tracking-[0.14em] uppercase text-[#5a5a54]" style={{ fontSize: '11px' }}>{label}</span>
                    <span className="font-mono" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.52)' }}>{value}</span>
                  </div>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              ))}
            </div>

            {/* Scene pills */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono tracking-[0.14em] uppercase text-[#5a5a54] mr-1" style={{ fontSize: '11px' }}>Scenes</span>
              {SCENES.map((s, i) => (
                <div key={s.id} className="flex items-center gap-1.5">
                  <div className="rounded-full" style={{ width: i === 0 ? 18 : 5, height: 5, background: i === 0 ? '#f2d832' : 'rgba(255,255,255,0.08)' }} />
                  <span className="font-mono tracking-widest" style={{ fontSize: '10px', color: i === 0 ? 'rgba(242,216,50,0.55)' : 'rgba(255,255,255,0.22)' }}>
                    {s.id}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: annotated device stage — static scene 01 in section view */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
          >
            <AnnotatedDevices onExpand={() => setOverlayOpen(true)} scene={0} />
          </motion.div>

        </div>
      </div>

      {/* AnimatePresence handles mount/unmount with exit animation */}
      <AnimatePresence>
        {overlayOpen && (
          <ShowcaseOverlay onClose={() => setOverlayOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  )
}

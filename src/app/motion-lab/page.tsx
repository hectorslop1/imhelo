'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'motion/react'
import ClipReveal from '@/components/ui/ClipReveal'
import ImageReveal from '@/components/ui/ImageReveal'
import RevealText from '@/components/ui/RevealText'
import MagneticLink from '@/components/ui/MagneticLink'
import { duration, ease, stagger, viewport } from '@/lib/motion-tokens'

// ─── Motion Lab ────────────────────────────────────────────────────────────────
//
// Safe testing environment for HELO's motion system.
// Verify the feel of each primitive BEFORE applying to production pages.
//
// Sections:
//   01 — ClipReveal (text emerge from surface)
//   02 — RevealText (mask-rise, for short lines)
//   03 — ImageReveal (scale + clip for media)
//   04 — Stagger sequences
//   05 — MagneticLink / hover interactions
//   06 — Project row hover (yellow wipe)
//   07 — Page transition preview
//   08 — Easing reference

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Lab({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, viewport.once)
  return (
    <section
      ref={ref}
      id={id}
      className="border-t"
      style={{ borderColor: 'var(--line)', paddingTop: 80, paddingBottom: 80 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: duration.fast, ease: ease.out }}
          className="flex items-center gap-4 mb-16"
        >
          <span
            className="font-mono text-[11px] tracking-widest uppercase"
            style={{ color: 'var(--ink-3)' }}
          >
            {label}
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--line)' }} />
        </motion.div>
        {children}
      </div>
    </section>
  )
}

// ─── Demo: Stagger list ───────────────────────────────────────────────────────

const ITEMS = [
  'gigFAST NASCAR — Graphic Design · Branding',
  'Graphic Design — Visual Design · Illustration',
  'Apparel Graphics — Apparel · Merchandise',
  'Interactive Elements — Frontend · Motion',
]

function StaggerList() {
  const ref    = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, viewport.once)
  return (
    <ul ref={ref} className="space-y-0">
      {ITEMS.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.medium, ease: ease.out, delay: i * stagger.sm }}
          className="border-b flex items-center justify-between py-5"
          style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
        >
          <span className="font-mono text-sm">{item}</span>
          <span style={{ color: 'var(--ink-4)' }}>→</span>
        </motion.li>
      ))}
    </ul>
  )
}

// ─── Demo: Project row hover ──────────────────────────────────────────────────

function HoverRow({ title, category }: { title: string; category: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative border-t"
      style={{ height: 88, overflow: 'hidden', borderColor: 'var(--line)', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default state */}
      <div className="absolute inset-0 flex items-center justify-between px-0 z-[2] pointer-events-none">
        <span
          className="font-extrabold uppercase tracking-tight"
          style={{
            fontFamily:  'var(--font-cabinet)',
            fontSize:    'clamp(18px, 2vw, 28px)',
            color:       'var(--ink)',
            transition:  'opacity 0.3s',
            opacity:     hovered ? 0 : 1,
          }}
        >
          {title}
        </span>
        <span
          className="font-mono text-[11px] tracking-widest uppercase"
          style={{
            color:      'var(--ink-3)',
            transition: 'opacity 0.3s',
            opacity:    hovered ? 0 : 1,
          }}
        >
          {category}
        </span>
      </div>

      {/* Hover overlay — yellow wipe from below */}
      <div
        style={{
          position:    'absolute',
          inset:       0,
          background:  'var(--accent)',
          overflow:    'hidden',
          pointerEvents: 'none',
          transform:   hovered ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 101%, 0)',
          transition:  `transform ${hovered ? '0.6s' : '0.85s'} cubic-bezier(0.19,1,0.22,1)`,
        }}
      >
        <div
          style={{
            height:    '100%',
            display:   'flex',
            alignItems: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            transform: hovered ? 'translate3d(0, 0%, 0)' : 'translate3d(0, -101%, 0)',
            transition: `transform ${hovered ? '0.6s' : '0.85s'} cubic-bezier(0.19,1,0.22,1)`,
          }}
        >
          <span
            className="font-extrabold uppercase tracking-tight"
            style={{
              fontFamily: 'var(--font-cabinet)',
              fontSize:   'clamp(18px, 2vw, 28px)',
              color:      '#0d0c0c',
            }}
          >
            {title} · {category}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Demo: Lightbox ───────────────────────────────────────────────────────────

function LightboxDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-sm uppercase tracking-widest px-6 py-3 border transition-colors duration-200"
        style={{
          borderColor: 'var(--ink)',
          color:       'var(--ink)',
          background:  'transparent',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--ink)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--surface)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'
        }}
      >
        Open Lightbox
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="fixed inset-0 z-[9000] flex items-center justify-center"
            style={{ background: 'rgba(14, 13, 11, 0.92)', backdropFilter: 'blur(4px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ duration: duration.medium, ease: ease.out }}
              onClick={e => e.stopPropagation()}
              className="relative"
              style={{
                background:   'var(--surface-2)',
                borderRadius: 4,
                padding:      40,
                maxWidth:     640,
                width:        '90%',
              }}
            >
              <div className="aspect-video w-full mb-6" style={{ background: 'var(--line)', borderRadius: 2 }}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
                    Media placeholder
                  </span>
                </div>
              </div>
              <p className="font-mono text-sm" style={{ color: 'var(--ink-2)' }}>
                gigFAST NASCAR — Visual Design · Branding
              </p>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 font-mono text-[11px] tracking-widest uppercase"
                style={{ color: 'var(--ink-3)' }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Demo: Easing swatches ────────────────────────────────────────────────────

type EasingSwatch = { name: string; curve: readonly [number, number, number, number]; color: string }

const EASINGS: EasingSwatch[] = [
  { name: 'out (primary)',    curve: ease.out,      color: 'var(--accent)' },
  { name: 'drawer',          curve: ease.drawer,   color: 'var(--ink-2)' },
  { name: 'outSharp (exit)', curve: ease.outSharp, color: 'var(--ink-3)' },
  { name: 'inOut',           curve: ease.inOut,    color: 'var(--ink-4)' },
]

function EasingBar({ name, curve, color }: EasingSwatch) {
  const [playing, setPlaying] = useState(false)
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, viewport.once)

  return (
    <div ref={ref} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--ink-3)' }}>
          {name}
        </span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          cubic-bezier({curve.join(', ')})
        </span>
      </div>
      <div
        className="relative h-10 overflow-hidden"
        style={{ background: 'var(--line-2)', borderRadius: 2, cursor: 'pointer' }}
        onClick={() => setPlaying(p => !p)}
      >
        <motion.div
          style={{ height: '100%', width: 40, background: color, borderRadius: 2 }}
          animate={playing || inView ? { x: [0, 'calc(100vw - 160px)'] } : { x: 0 }}
          transition={{
            duration:    duration.slow,
            ease:        [...curve] as [number, number, number, number],
            repeat:      Infinity,
            repeatDelay: 1.2,
          }}
        />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MotionLab() {
  const reduced = useReducedMotion()

  return (
    <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div
        className="sticky top-0 z-50 border-b"
        style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-widest transition-colors duration-200"
            style={{ color: 'var(--ink-3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
          >
            ← Back to HELO
          </Link>
          <span
            className="font-mono text-[11px] uppercase tracking-widest"
            style={{ color: 'var(--accent-deep)' }}
          >
            Motion Lab — Dev Only
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div
        className="max-w-[1200px] mx-auto px-6 lg:px-16"
        style={{ paddingTop: 100, paddingBottom: 80 }}
      >
        <ClipReveal>
          <h1
            className="font-extrabold"
            style={{
              fontFamily:    'var(--font-cabinet)',
              fontSize:      'clamp(52px, 8vw, 120px)',
              letterSpacing: '-0.04em',
              lineHeight:    0.9,
              color:         'var(--ink)',
            }}
          >
            Motion Lab
          </h1>
        </ClipReveal>
        <ClipReveal delay={0.12}>
          <p
            className="mt-8 max-w-xl"
            style={{
              fontSize:   'clamp(16px, 1.4vw, 18px)',
              lineHeight: 1.65,
              color:      'var(--ink-2)',
            }}
          >
            Test environment for HELO&apos;s motion system. Each section demonstrates
            a primitive. Adjust timings in{' '}
            <code
              className="font-mono text-[13px] px-1.5 py-0.5"
              style={{ background: 'var(--line-2)', color: 'var(--ink)', borderRadius: 2 }}
            >
              src/lib/motion-tokens.ts
            </code>{' '}
            and reload to compare.
          </p>
        </ClipReveal>

        {reduced && (
          <div
            className="mt-6 font-mono text-[11px] uppercase tracking-widest px-3 py-2 inline-block"
            style={{ background: 'var(--accent-dim)', color: 'var(--accent-deep)' }}
          >
            Reduced motion active — animations disabled
          </div>
        )}
      </div>

      {/* ── 01 ClipReveal ── */}
      <Lab id="clip-reveal" label="01 — ClipReveal">
        <div className="space-y-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--ink-4)' }}>
              direction=&quot;up&quot; (default) — headings, blocks
            </p>
            <ClipReveal>
              <h2
                className="font-extrabold"
                style={{
                  fontFamily:    'var(--font-cabinet)',
                  fontSize:      'clamp(36px, 5vw, 72px)',
                  letterSpacing: '-0.04em',
                  lineHeight:    1,
                  color:         'var(--ink)',
                }}
              >
                Premium text reveal.
              </h2>
            </ClipReveal>
            <ClipReveal delay={0.1}>
              <h2
                className="font-extrabold"
                style={{
                  fontFamily:    'var(--font-cabinet)',
                  fontSize:      'clamp(36px, 5vw, 72px)',
                  letterSpacing: '-0.04em',
                  lineHeight:    1,
                  color:         'var(--ink)',
                  marginTop:     8,
                }}
              >
                Each line staggers.
              </h2>
            </ClipReveal>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--ink-4)' }}>
              direction=&quot;down&quot; — nav items, dropdowns
            </p>
            <ClipReveal direction="down">
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520 }}>
                I blend visual design and frontend development to create work
                that feels sharp, useful, and memorable.
              </p>
            </ClipReveal>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--ink-4)' }}>
              Staggered group (delay increments of {stagger.sm}s)
            </p>
            {['Development', 'Graphic Design', 'Motion & Interaction'].map((label, i) => (
              <ClipReveal key={label} delay={i * stagger.sm}>
                <div
                  className="border-b flex items-center justify-between py-5"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <span
                    className="font-extrabold uppercase"
                    style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(20px, 2.5vw, 36px)', color: 'var(--ink)' }}
                  >
                    {String(i + 1).padStart(2, '0')} — {label}
                  </span>
                </div>
              </ClipReveal>
            ))}
          </div>
        </div>
      </Lab>

      {/* ── 02 RevealText ── */}
      <Lab id="reveal-text" label="02 — RevealText (mask-rise)">
        <div className="space-y-8">
          <p className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--ink-4)' }}>
            Use for short single-line headings. Slides up from overflow-hidden mask.
          </p>
          <RevealText
            as="h3"
            className="font-extrabold"
            style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.04em', color: 'var(--ink)' }}
          >
            Selected Work
          </RevealText>
          <RevealText
            delay={0.08}
            as="h3"
            className="font-extrabold"
            style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.04em', color: 'var(--ink)' }}
          >
            Projects
          </RevealText>
          <RevealText
            delay={0.16}
            as="p"
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: 16, color: 'var(--ink-3)' }}
          >
            Design &amp; Development — San Diego, CA
          </RevealText>
        </div>
      </Lab>

      {/* ── 03 ImageReveal ── */}
      <Lab id="image-reveal" label="03 — ImageReveal (media blocks)">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-10" style={{ color: 'var(--ink-4)' }}>
          Clip-path inset + counter-scale. The image appears to emerge from beneath a surface.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['gigFAST NASCAR', 'Graphic Design', 'Apparel Graphics'].map((title, i) => (
            <ImageReveal key={title} delay={i * stagger.md}>
              <div
                className="aspect-[4/3] w-full flex items-end p-4"
                style={{ background: 'var(--surface-2)' }}
              >
                <span
                  className="font-mono text-[11px] uppercase tracking-widest"
                  style={{ color: 'var(--ink-3)' }}
                >
                  {title}
                </span>
              </div>
            </ImageReveal>
          ))}
        </div>

        <div className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--ink-4)' }}>
            direction=&quot;left&quot;
          </p>
          <ImageReveal direction="left">
            <div
              className="aspect-[16/6] w-full flex items-center justify-center"
              style={{ background: 'var(--line)' }}
            >
              <span className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
                Full-width media reveal
              </span>
            </div>
          </ImageReveal>
        </div>
      </Lab>

      {/* ── 04 Stagger ── */}
      <Lab id="stagger" label="04 — Stagger sequences">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-10" style={{ color: 'var(--ink-4)' }}>
          Project list rows staggered by {stagger.sm}s. Scroll up and back down to replay.
        </p>
        <StaggerList />
      </Lab>

      {/* ── 05 Hover / Magnetic ── */}
      <Lab id="hover" label="05 — Hover interactions">
        <div className="space-y-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--ink-4)' }}>
              MagneticLink — cursor pulls the element
            </p>
            <div className="flex flex-wrap gap-6">
              <MagneticLink
                href="/work"
                className="font-mono text-sm uppercase tracking-widest"
                style={{ color: 'var(--ink)' }}
              >
                View Work
              </MagneticLink>
              <MagneticLink
                href="/about"
                className="font-mono text-sm uppercase tracking-widest"
                style={{ color: 'var(--ink-3)' }}
              >
                About HELO
              </MagneticLink>
              <MagneticLink
                href="/contact"
                className="font-mono text-sm uppercase tracking-widest px-5 py-2.5"
                style={{ background: 'var(--accent)', color: 'var(--ink)' }}
              >
                Say HELO
              </MagneticLink>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--ink-4)' }}>
              Button press feedback — scale(0.97) on active
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.1, ease: ease.out }}
              className="font-mono text-sm uppercase tracking-widest px-6 py-3 border transition-colors duration-200"
              style={{ borderColor: 'var(--ink)', color: 'var(--ink)', background: 'transparent' }}
            >
              Press me
            </motion.button>
          </div>
        </div>
      </Lab>

      {/* ── 06 Project row hover ── */}
      <Lab id="project-hover" label="06 — Project row hover (yellow wipe)">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-10" style={{ color: 'var(--ink-4)' }}>
          The signature HELO interaction. Hover each row.
        </p>
        <div>
          {ITEMS.map((item, i) => {
            const [title, cat] = item.split(' — ')
            return (
              <HoverRow key={i} title={title} category={cat ?? ''} />
            )
          })}
          <div className="border-t" style={{ borderColor: 'var(--line)' }} />
        </div>
      </Lab>

      {/* ── 07 Lightbox ── */}
      <Lab id="lightbox" label="07 — Lightbox open / close">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-10" style={{ color: 'var(--ink-4)' }}>
          Scale + fade entry. Click outside or Close to dismiss.
        </p>
        <LightboxDemo />
      </Lab>

      {/* ── 08 Easing reference ── */}
      <Lab id="easings" label="08 — Easing reference">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-10" style={{ color: 'var(--ink-4)' }}>
          All HELO easing curves. Click a bar to restart. These are the motion-tokens.ts values.
        </p>
        {EASINGS.map(e => <EasingBar key={e.name} {...e} />)}

        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--line)' }}>
          <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: 'var(--ink-4)' }}>
            Duration scale (all in seconds)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(duration).map(([name, val]) => (
              <div key={name} className="p-4" style={{ background: 'var(--line-2)' }}>
                <div className="font-mono text-[18px] font-bold" style={{ color: 'var(--ink)' }}>{val}s</div>
                <div className="font-mono text-[10px] uppercase tracking-widest mt-1" style={{ color: 'var(--ink-4)' }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </Lab>

      {/* ── 09 Page transition ── */}
      <Lab id="page-transition" label="09 — Page transition">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-8" style={{ color: 'var(--ink-4)' }}>
          Navigate away and back to see the template.tsx overlay. The dark screen with &quot;HELO&quot; appears on each route change.
        </p>
        <div className="flex flex-wrap gap-4">
          {[['/', 'Home'], ['/work', 'Work'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-[11px] uppercase tracking-widest px-5 py-3 border transition-colors duration-200"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </Lab>

      {/* ── Footer ── */}
      <footer
        className="border-t"
        style={{ borderColor: 'var(--line)', paddingTop: 40, paddingBottom: 40 }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--ink-4)' }}>
            HELO Motion Lab — Dev Only
          </span>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-widest transition-colors duration-200"
            style={{ color: 'var(--ink-3)' }}
          >
            Return to site →
          </Link>
        </div>
      </footer>

    </div>
  )
}

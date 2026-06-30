'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── SelectedFrames ───────────────────────────────────────────────────────────
//
// A GSAP-pinned horizontal gallery: the section locks to the viewport while the
// strongest visual frames scrub sideways with vertical scroll — the signature
// Awwwards "pinned horizontal scroll" moment (azizkhaldi.com has no equivalent).
// A pure visual index, distinct from the project cards above.
//
// Desktop + motion → pinned + scrubbed (GSAP ScrollTrigger, synced to Lenis via
// SmoothScroll). Mobile / reduced-motion → graceful native horizontal scroll
// with snap (no pin), so it stays usable and accessible.

const FRAMES = [
  { src: '/assetshelo/GraphicDesign/Gba26qPbwAAEM7t.jpeg', label: 'Day of the Dead' },
  { src: '/assetshelo/GraphicDesign/GXiuqEoaIAA96EQ.jpeg', label: 'La Lucha' },
  { src: '/assetshelo/ApparelDesign/CharizardHoodie.jpeg', label: 'Apparel' },
  { src: '/assetshelo/Nascar/ZaneSmith/2328JN1808.jpg',    label: 'gigFAST NASCAR' },
  { src: '/assetshelo/GraphicDesign/GWvPwwdacAAElRs.jpeg', label: 'Say My Name' },
  { src: '/assetshelo/ApparelDesign/EclipseTshirt.jpg',    label: 'Eclipse' },
  { src: '/assetshelo/GraphicDesign/GRMHLmrbQAAVK9x.jpeg', label: 'Friday' },
]

export default function SelectedFrames() {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [pin, setPin] = useState(false)

  // Decide mode after mount (SSR-safe default = native scroll).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
    const apply = () => setPin(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Pin + horizontal scrub (desktop / motion only).
  useEffect(() => {
    if (!pin) return
    const pinEl = pinRef.current
    const track = trackRef.current
    if (!pinEl || !track) return

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, pinRef)

    return () => ctx.revert()
  }, [pin])

  return (
    <section data-section-theme="dark" className="relative overflow-hidden border-t border-white/[0.06]" style={{ background: '#1a1815' }}>
      <div
        ref={pinRef}
        className={
          pin
            ? 'h-screen flex flex-col justify-center'
            : 'py-20'
        }
      >
        {/* Heading row */}
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-16 flex items-end justify-between mb-8 lg:mb-12">
          <div>
            <span className="block font-mono text-[12px] tracking-[0.18em] uppercase text-[#605d54] mb-3">
              Selected Frames
            </span>
            <h2
              className="font-bold tracking-[-0.04em] leading-[0.95]"
              style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(34px, 5vw, 72px)', color: 'var(--on-dark)' }}
            >
              A visual index
            </h2>
          </div>
          <span aria-hidden className="hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#605d54]">
            {pin ? 'scroll' : 'swipe'} <span className="text-[#f2d832]">→</span>
          </span>
        </div>

        {/* Track */}
        <div className={pin ? 'overflow-hidden' : 'overflow-x-auto no-scrollbar snap-x snap-mandatory'}>
          <div
            ref={trackRef}
            className="flex gap-5 lg:gap-7 px-6 lg:px-16 w-max will-change-transform"
          >
            {FRAMES.map((f, i) => (
              <figure
                key={f.src}
                className="group relative shrink-0 snap-start overflow-hidden rounded-2xl"
                style={{
                  width: 'clamp(260px, 34vw, 460px)',
                  aspectRatio: '3 / 4',
                  background: '#100f0c',
                }}
              >
                <Image
                  src={f.src}
                  alt={f.label}
                  fill
                  sizes="(max-width: 768px) 80vw, 34vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(10,9,7,0.55), transparent 45%)' }}
                />
                <figcaption className="absolute bottom-4 left-5 z-10 flex items-center gap-2">
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(236,233,226,0.55)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] text-[var(--on-dark)]" style={{ fontFamily: 'var(--font-cabinet)' }}>
                    {f.label}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

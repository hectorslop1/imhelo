'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useInView } from 'motion/react'
import SplitReveal from '@/components/ui/SplitReveal'
import { experiences, type Experience } from '@/data/experience'

const EASE = [0.16, 1, 0.3, 1] as const
const BG = '#1a1815'

// ─── Period renderer — "Present" picks up the accent ───────────────────────────
function Period({ text }: { text: string }) {
  const idx = text.indexOf('Present')
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: 'var(--accent)' }}>Present</span>
    </>
  )
}

// ─── Centered scroll-progress rail (azizkhaldi.com .timeline-progress) ──────────
// A faint full-height track centred on the column, overlaid by an accent bar whose
// height scrubs with scroll — the line "draws" downward as you move through the
// timeline. Hidden below md, where the layout collapses to a single left column.
function TimelineRail({
  trackRef,
  reduced,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>
  reduced: boolean
}) {
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start center', 'end center'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      aria-hidden
      className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full"
      style={{ width: 2, background: 'rgba(236,233,226,0.10)' }}
    >
      {reduced ? (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)' }} />
      ) : (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transformOrigin: 'top',
            scaleY,
            background: 'var(--accent)',
          }}
        />
      )}
    </div>
  )
}

// ─── One timeline entry — alternating side, brightens when crossing centre ──────
type EntryProps = { exp: Experience; index: number; reduced: boolean }

function ExperienceEntry({ exp, index, reduced }: EntryProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  // "Active" only while the entry sits inside a band around the viewport centre,
  // so the rail node lights up and the copy brightens as it reaches the middle.
  const active = useInView(itemRef, { margin: '-40% 0px -40% 0px' })
  const isLeft = index % 2 === 0 // even → left column (text hugs rail from the right)

  return (
    <div
      ref={itemRef}
      className="relative flex items-center w-full mb-[16vh] md:mb-[50vh] last:mb-0"
    >
      {/* Node dot sitting on the centred rail */}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:block rounded-full"
        style={{
          width: 13,
          height: 13,
          background: BG,
          border: `1px solid ${active ? 'var(--accent)' : 'rgba(236,233,226,0.45)'}`,
          boxShadow: active ? '0 0 12px rgba(242,216,50,0.6)' : 'none',
          transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        }}
      />

      {/* Content column — alternates left / right of the rail on md+ */}
      <motion.div
        className={[
          'w-full md:w-[45%]',
          isLeft ? 'md:text-right' : 'md:ml-auto md:text-left',
        ].join(' ')}
        initial={reduced ? false : { opacity: 0.34 }}
        animate={reduced ? { opacity: 1 } : { opacity: active ? 1 : 0.34 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Company — giant, word-rise reveal */}
        <SplitReveal
          text={exp.company}
          as="h3"
          by="word"
          className="block font-bold tracking-[-0.03em] leading-[0.98]"
          style={{
            fontFamily: 'var(--font-cabinet)',
            fontSize: 'clamp(40px, 6.4vw, 72px)',
            color: 'var(--on-dark)',
          }}
          stagger={0.04}
          duration={0.7}
        />

        {/* Role */}
        <p
          className="mt-4 md:mt-5 font-medium leading-[1.15]"
          style={{
            fontFamily: 'var(--font-cabinet)',
            fontSize: 'clamp(18px, 2.4vw, 30px)',
            color: 'var(--on-dark-2)',
          }}
        >
          {exp.role}
        </p>

        {/* Description — capped line length, pinned toward the rail */}
        <p
          className={['mt-4 md:mt-5 leading-relaxed', isLeft ? 'md:ml-auto' : ''].join(' ')}
          style={{
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            color: 'var(--on-dark-2)',
            maxWidth: '36ch',
          }}
        >
          {exp.description}
        </p>

        {/* Date */}
        <p
          className="mt-5 md:mt-6 font-light tracking-wide"
          style={{
            fontFamily: 'var(--font-cabinet)',
            fontSize: 'clamp(13px, 1.1vw, 16px)',
            color: 'var(--on-dark-2)',
          }}
        >
          <Period text={exp.period} />
        </p>
      </motion.div>
    </div>
  )
}

// ─── Section ────────────────────────────────────────────────────────────────────
export default function Experience() {
  const reduced = useReducedMotion() ?? false
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06]" style={{ background: BG }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Intro heading — centred, word-rise reveal (Aziz experience intro) */}
        <div className="text-center pt-28 md:pt-44 pb-24 md:pb-40 max-w-3xl mx-auto">
          <SplitReveal
            text="Explore my journey and the craft that shapes how I design and build."
            as="h2"
            by="word"
            className="block font-medium tracking-[-0.02em]"
            style={{
              fontFamily: 'var(--font-cabinet)',
              fontSize: 'clamp(24px, 3.4vw, 40px)',
              lineHeight: 1.25,
              color: 'var(--on-dark)',
            }}
            stagger={0.04}
            duration={0.7}
          />
        </div>

        {/* Timeline — centred rail, alternating entries */}
        <div ref={trackRef} className="relative pb-28 md:pb-44">
          <TimelineRail trackRef={trackRef} reduced={reduced} />
          {experiences.map((exp, i) => (
            <ExperienceEntry key={`${exp.company}-${i}`} exp={exp} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

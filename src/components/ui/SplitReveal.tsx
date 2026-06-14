'use client'

import { Fragment, useRef, type ElementType } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

// ─── SplitReveal ──────────────────────────────────────────────────────────────
//
// The azizkhaldi.com heading-reveal signature: text is split into characters (or
// words), each masked in an overflow-hidden box and risen from below with a
// per-unit stagger — so the line "emerges" letter by letter rather than as a
// single block. This staggered cascade is the dominant text-motion feel of Aziz.
//
// Props:
//   text     — the string to reveal (kept on aria-label for a11y)
//   as       — semantic wrapper tag (h1, h2, span, p…). Default 'span'.
//   by       — 'char' (dramatic, for big headings) | 'word' (calmer, for copy)
//   stagger  — seconds between each unit
//   delay    — seconds before the cascade begins
//   duration — rise duration per unit
//   once     — fire only the first time it enters the viewport

const EASE = [0.16, 1, 0.3, 1] as const
const SPACE = ' ' // rendered gap is handled by margins; this keeps words apart

type SplitRevealProps = {
  text:       string
  as?:        ElementType
  by?:        'char' | 'word'
  stagger?:   number
  delay?:     number
  duration?:  number
  once?:      boolean
  className?: string
  style?:     React.CSSProperties
}

export default function SplitReveal({
  text,
  as: Tag = 'span',
  by = 'char',
  stagger = 0.022,
  delay = 0,
  duration = 0.62,
  once = true,
  className,
  style,
}: SplitRevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  if (reduced) {
    return <Tag ref={ref} className={className} style={style}>{text}</Tag>
  }

  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const unit = {
    hidden: { y: '118%' },
    visible: { y: '0%', transition: { duration, ease: EASE } },
  }

  // mask wrapper keeps layout height stable while clipping descenders
  const maskStyle: React.CSSProperties = {
    display: 'inline-block',
    overflow: 'hidden',
    verticalAlign: 'top',
    paddingBottom: '0.14em',
    marginBottom: '-0.14em',
  }
  const riseStyle: React.CSSProperties = { display: 'inline-block', willChange: 'transform' }

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      <motion.span
        aria-hidden
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ display: 'inline' }}
      >
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span style={{ display: 'inline-block' }}>
              {by === 'char'
                ? Array.from(word).map((ch, ci) => (
                    <span key={ci} style={maskStyle}>
                      <motion.span variants={unit} style={riseStyle}>{ch}</motion.span>
                    </span>
                  ))
                : (
                    <span style={maskStyle}>
                      <motion.span variants={unit} style={riseStyle}>{word}</motion.span>
                    </span>
                  )}
            </span>
            {wi < words.length - 1 ? <span style={{ display: 'inline-block', width: '0.28em' }}>{SPACE}</span> : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}

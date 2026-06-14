'use client'

import { useRef, type ElementType } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'

// ─── ScrollWordReveal ─────────────────────────────────────────────────────────
//
// The azizkhaldi.com intro signature: a statement whose words illuminate one by
// one, scrubbed directly to scroll position — each word fades from dim to full as
// the reader scrolls the section through the viewport. Not a one-shot stagger:
// the reveal is tied to scrollYProgress so it feels physically connected to the
// scroll, exactly like Aziz's "I'm Aziz — a Full Stack Developer crafting…".
//
// Pass `segments` so phrases can carry their own accent colour while still
// participating in the word-by-word illumination.

export type WordSegment = { text: string; color?: string }

function Word({
  word,
  range,
  progress,
  color,
}: {
  word: string
  range: [number, number]
  progress: MotionValue<number>
  color: string
}) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity, color, display: 'inline-block', marginRight: '0.26em' }}>
      {word}
    </motion.span>
  )
}

type ScrollWordRevealProps = {
  segments:   WordSegment[]
  baseColor:  string
  as?:        ElementType
  className?: string
  style?:     React.CSSProperties
}

export default function ScrollWordReveal({
  segments,
  baseColor,
  as: Tag = 'p',
  className,
  style,
}: ScrollWordRevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'end 0.6'],
  })

  // Flatten segments → words (carrying colour)
  const words: { w: string; color: string }[] = []
  segments.forEach((seg) => {
    seg.text.split(' ').filter(Boolean).forEach((w) => words.push({ w, color: seg.color ?? baseColor }))
  })
  const n = words.length

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {segments.map((s, i) => (
          <span key={i} style={{ color: s.color ?? baseColor }}>
            {s.text}{i < segments.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className} style={style}>
      {words.map((item, i) => {
        const start = (i / n) * 0.92
        const end = Math.min(start + (1 / n) * 1.7, 1)
        return (
          <Word
            key={i}
            word={item.w}
            range={[start, end]}
            progress={scrollYProgress}
            color={item.color}
          />
        )
      })}
    </Tag>
  )
}

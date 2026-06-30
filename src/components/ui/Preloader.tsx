'use client'

import { useEffect, useState } from 'react'

// ─── Preloader ────────────────────────────────────────────────────────────────
//
// First-visit branded intro: a dark cover with the HELO wordmark, a 000→100 counter
// and an accent progress bar, then a curtain that lifts away. Shown once per session
// (sessionStorage). Renders covering from first paint (no content flash); on repeat
// loads within the session it lifts away fast. Respects reduced-motion (instant).
export default function Preloader() {
  const [show, setShow] = useState(true)
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('helo-loaded')
    document.body.style.overflow = 'hidden'

    let raf = 0
    let done = false
    const finish = () => {
      if (done) return
      done = true
      sessionStorage.setItem('helo-loaded', '1')
      setLeaving(true)
      window.setTimeout(() => {
        setShow(false)
        document.body.style.overflow = ''
      }, 850)
    }
    // Safety: always clear even if rAF is throttled (e.g. tab backgrounded on load).
    const safety = window.setTimeout(finish, 2600)

    if (seen || reduced) {
      setCount(100)
      raf = requestAnimationFrame(() => requestAnimationFrame(finish)) // quick lift
    } else {
      const start = performance.now()
      const dur = 1150
      const tick = (t: number) => {
        const p = Math.min((t - start) / dur, 1)
        // ease-out so the count decelerates into 100
        setCount(Math.round((1 - Math.pow(1 - p, 2)) * 100))
        if (p < 1) raf = requestAnimationFrame(tick)
        else finish()
      }
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(safety)
      document.body.style.overflow = ''
    }
  }, [])

  if (!show) return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        background: '#141310',
        transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)',
        willChange: 'transform',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-singapore-sling)',
          fontSize: 'clamp(56px, 12vw, 140px)',
          lineHeight: 1,
          letterSpacing: '0.06em',
          color: 'var(--accent)',
          opacity: leaving ? 0 : 1,
          transform: leaving ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.5s ease',
        }}
      >
        HELO
      </span>
      <span
        className="font-mono"
        style={{
          fontSize: 13,
          letterSpacing: '0.28em',
          color: 'rgba(236,233,226,0.55)',
          marginTop: 18,
        }}
      >
        {String(count).padStart(3, '0')}
      </span>
      <div
        style={{
          width: 'min(42vw, 280px)',
          height: 2,
          marginTop: 22,
          background: 'rgba(236,233,226,0.12)',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: `${count}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.12s linear' }} />
      </div>
    </div>
  )
}

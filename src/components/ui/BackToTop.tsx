'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'

// ─── BackToTop ──────────────────────────────────────────────────────────────────
// Appears after the first viewport of scroll; smooth-scrolls to the top.
// Modern hover: accent fill sweeps up + the arrow swaps (exits the top, a new one
// rises from below). Bottom-right so it never collides with the bottom-left badge.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.85 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-7 right-7 z-40 w-14 h-14 rounded-full bg-[#14130f] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
        >
          {/* Accent fill — sweeps up from the bottom on hover */}
          <span
            aria-hidden
            className="absolute inset-0 bg-[#f2d832] rounded-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-[400ms] ease-out"
          />
          {/* Arrow swap */}
          <span className="relative z-10 flex items-center justify-center w-full h-full">
            <span className="relative block w-[18px] h-[18px]">
              <ArrowUp
                className="absolute inset-0 w-[18px] h-[18px] text-[#ece9e2] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[160%] group-hover:opacity-0"
                strokeWidth={2}
              />
              <ArrowUp
                className="absolute inset-0 w-[18px] h-[18px] text-[#14130f] translate-y-[160%] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100"
                strokeWidth={2}
              />
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

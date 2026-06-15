'use client'

import { motion } from 'motion/react'
import { useI18n, type Lang } from '@/lib/i18n'

// ─── LanguageToggle — segmented EN / ES with a sliding accent pill ──────────────
// Bigger, tactile, and smooth: the accent indicator springs between the two
// options. Tone-aware so it reads on both the light navbar and the dark menu.
const BTN = 44 // px per option

export default function LanguageToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang } = useI18n()
  const langs: Lang[] = ['en', 'es']
  const activeIndex = langs.indexOf(lang)

  const trackBorder = tone === 'dark' ? 'border-white/20' : 'border-black/15'
  const idleText = tone === 'dark' ? 'text-[rgba(236,233,226,0.6)]' : 'text-[#6b6860]'

  return (
    <div
      className={`relative inline-flex items-center rounded-full border ${trackBorder} p-1 font-mono text-[13px] tracking-wide select-none`}
      role="group"
      aria-label="Language"
    >
      {/* Sliding accent pill */}
      <motion.span
        aria-hidden
        className="absolute top-1 bottom-1 rounded-full bg-[#f2d832]"
        style={{ width: BTN, left: 4 }}
        animate={{ x: activeIndex * BTN }}
        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.7 }}
      />
      {langs.map((l) => {
        const active = lang === l
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            style={{ width: BTN }}
            className={`relative z-10 py-1.5 rounded-full uppercase font-medium transition-colors duration-300 ${
              active ? 'text-[#16150f]' : `${idleText} hover:opacity-80`
            }`}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}

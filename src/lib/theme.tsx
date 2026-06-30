'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// ─── Page theme (light/dark) — single source of truth ─────────────────────────
//
// Context-based so chrome (Header, ScrollPath) recolours reliably in sync with the
// light/dark flood, with no DOM-attribute timing races. <ThemeBackground> (home,
// per scrolled section) and <ActiveTheme> (other pages) SET it; consumers READ it.
// Also mirrored onto <html data-active-theme> for any CSS hooks.

export type Theme = 'light' | 'dark'

const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: 'light',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  useEffect(() => {
    document.documentElement.dataset.activeTheme = theme
  }, [theme])
  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx).theme
export const useSetTheme = () => useContext(ThemeCtx).setTheme

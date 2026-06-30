'use client'

import { useEffect } from 'react'
import { useSetTheme, type Theme } from '@/lib/theme'

// Declares a single-theme page's theme so the global chrome (Header) recolours
// correctly. The home uses <ThemeBackground> instead (per-section). Renders nothing.
export default function ActiveTheme({ theme }: { theme: Theme }) {
  const setTheme = useSetTheme()
  useEffect(() => {
    setTheme(theme)
  }, [theme, setTheme])
  return null
}

'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

// ─── HELO i18n ──────────────────────────────────────────────────────────────────
//
// Lightweight, route-free internationalization: a context holds the active language,
// persists it to localStorage, and `t(key)` resolves a hand-written translation.
// No URL changes (links/animations stay intact). SSR + first client render are both
// 'en' (matches server → no hydration mismatch); a saved 'es' is applied after mount.
//
// Add copy by adding a key to DICT below with { en, es }. Use it via:
//   const { t } = useI18n();  t('nav.work')

export type Lang = 'en' | 'es'

type Entry = { en: string; es: string }

const DICT: Record<string, Entry> = {
  // ── Navigation / menu ──
  'nav.home':    { en: 'Home',    es: 'Inicio' },
  'nav.work':    { en: 'Work',    es: 'Proyectos' },
  'nav.about':   { en: 'About',   es: 'Sobre mí' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  'nav.sayHelo': { en: 'Say HELO', es: 'Escríbeme' },
  'nav.menu':    { en: 'Menu',    es: 'Menú' },
  'nav.close':   { en: 'Close',   es: 'Cerrar' },
  'nav.email':   { en: 'Email',   es: 'Correo' },

  // ── Hero ──
  'hero.greeting': { en: "Hi! I'm Hector", es: '¡Hola! Soy Hector' },
  'hero.role1':    { en: 'Designer &',     es: 'Diseñador &' },
  'hero.role2':    { en: 'Developer.',     es: 'Desarrollador.' },
  'hero.scroll':   { en: 'scroll down',    es: 'desliza' },

  // ── Shared discipline labels ──
  'disc.development': { en: 'Development',    es: 'Desarrollo' },
  'disc.design':      { en: 'Graphic Design', es: 'Diseño Gráfico' },

  // ── Home · Intro (01) ──
  'home.intro.label': { en: 'About', es: 'Sobre mí' },
  'home.intro.stmt1': {
    en: 'I blend visual design and frontend development to create work that feels',
    es: 'Combino diseño visual y desarrollo frontend para crear trabajo que se siente',
  },
  'home.intro.stmt2': { en: 'sharp, useful,', es: 'preciso, útil' },
  'home.intro.stmt3': { en: 'and memorable.', es: 'y memorable.' },
  'home.intro.cta':   { en: 'About Me', es: 'Sobre mí' },
  'home.intro.bio': {
    en: 'Hector Lopez — designer and developer based in San Diego, CA. Building digital products with intention and craft.',
    es: 'Hector Lopez — diseñador y desarrollador en San Diego, CA. Construyo productos digitales con intención y oficio.',
  },
  'home.intro.stat1': { en: 'Years of experience', es: 'Años de experiencia' },
  'home.intro.stat2': { en: 'Projects completed',  es: 'Proyectos completados' },
  'home.intro.stat3': { en: 'Core disciplines',    es: 'Disciplinas principales' },

  // ── Home · Services (02) ──
  'home.services.label': { en: 'What I Do', es: 'Lo que hago' },
  'services.dev.desc': {
    en: 'Websites, app interfaces, interactive frontend experiences, and digital products built with care and precision.',
    es: 'Sitios web, interfaces de apps, experiencias frontend interactivas y productos digitales construidos con cuidado y precisión.',
  },
  'services.design.desc': {
    en: 'Brand systems, campaign visuals, social graphics, logos, and visual assets with strong creative direction.',
    es: 'Sistemas de marca, visuales de campaña, gráficos para redes, logos y assets visuales con dirección creativa sólida.',
  },

  // ── Home · Selected Work (03) ──
  'home.work.label': { en: 'Selected Work', es: 'Trabajo seleccionado' },
  'home.work.title': { en: 'Projects',      es: 'Proyectos' },
  'home.work.all':   { en: 'All work',      es: 'Ver todo' },
  'home.work.view':  { en: 'View',          es: 'Ver' },

  // ── Home · About block ──
  'home.about.scroll':   { en: 'Scroll to Explore', es: 'Desliza para explorar' },
  'home.about.story':    { en: 'My Short Story',     es: 'Mi historia' },
  'marquee.designer':    { en: 'DESIGNER',  es: 'DISEÑADOR' },
  'marquee.developer':   { en: 'DEVELOPER', es: 'DESARROLLADOR' },

  // ── Home · Experience ──
  'home.exp.heading': {
    en: 'Explore my journey and the craft that shapes how I design and build.',
    es: 'Explora mi recorrido y el oficio que da forma a cómo diseño y construyo.',
  },

  // ── Footer ──
  'footer.links':       { en: 'Links',       es: 'Enlaces' },
  'footer.socials':     { en: 'Socials',     es: 'Redes' },
  'footer.localTime':   { en: 'Local time',  es: 'Hora local' },
  'footer.version':     { en: 'Version',     es: 'Versión' },
  'footer.startProject': { en: 'Start a project', es: 'Empecemos' },
  'footer.credit':      { en: 'HELO — Designed & Developed by Hector Lopez', es: 'HELO — Diseñado y desarrollado por Hector Lopez' },
  'footer.rights':      { en: '© 2026 All rights reserved', es: '© 2026 Todos los derechos reservados' },
  'footer.portfolio':   { en: 'Portfolio v1.0', es: 'Portafolio v1.0' },

  // ── Contact page ──
  'contact.label':  { en: 'Contact · 06', es: 'Contacto · 06' },
  'contact.title':  { en: "Let's make something good.", es: 'Hagamos algo bueno.' },
  'contact.lead':   {
    en: "Tell me what you're building — a site, a brand that needs to look sharp, an interface that needs to feel right, or just a hello. I read everything and write back within a day or two.",
    es: 'Cuéntame qué estás construyendo — un sitio, una marca que necesita verse afilada, una interfaz que tiene que sentirse bien, o un simple hola. Leo todo y respondo en un día o dos.',
  },
  'contact.basedIn':      { en: 'Based in', es: 'Ubicación' },
  'contact.availability': { en: 'Availability', es: 'Disponibilidad' },
  'contact.availabilityValue': { en: 'Freelance · select full-time', es: 'Freelance · full-time selectivo' },
  'contact.reply':        { en: 'Reply time', es: 'Tiempo de respuesta' },
  'contact.replyValue':   { en: 'Usually within 48h', es: 'Normalmente en 48h' },
  'contact.connect':      { en: 'Connect', es: 'Sígueme' },

  // ── 404 ──
  '404.label':   { en: 'Error 404', es: 'Error 404' },
  '404.title':   { en: 'This page took a wrong turn.', es: 'Esta página se perdió en el camino.' },
  '404.sub':     { en: "The link is broken or the page moved. No big deal — here's the way back.", es: 'El enlace está roto o la página se movió. Sin problema — por aquí es la vuelta.' },
  '404.back':    { en: 'Back home', es: 'Volver al inicio' },
  '404.browse':  { en: 'Browse the work', es: 'Ver los proyectos' },
}

const I18nContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}>({ lang: 'en', setLang: () => {}, t: (k) => k })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('helo-lang')
    if (saved === 'es' || saved === 'en') {
      setLangState(saved)
      document.documentElement.lang = saved
    }
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('helo-lang', l) } catch {}
    document.documentElement.lang = l
  }, [])

  const t = useCallback((key: string) => DICT[key]?.[lang] ?? key, [lang])

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)

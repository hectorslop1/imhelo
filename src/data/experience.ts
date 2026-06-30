export type Lang = 'en' | 'es'
type L = { en: string; es: string }

// Public shape — string fields (resolved for a language).
export type Experience = {
  company:     string
  role:        string
  period:      string
  description: string
  highlights?: string[]
  tags?:       string[]
}

// Bilingual source — role / period / description carry { en, es }. company is a
// proper noun (kept as-is); highlights/tags aren't rendered in the timeline.
type ExperienceSource = Omit<Experience, 'role' | 'period' | 'description'> & {
  role:        L
  period:      L
  description: L
}

// ── Most recent first ──────────────────────────────────────────────────────────
// A period containing "Present"/"Presente" marks the role as active (yellow accent).
const data: ExperienceSource[] = [
  {
    company: 'Padres Con Poder Foundation.',
    role:    { en: 'Web Developer', es: 'Desarrollador Web' },
    period:  { en: 'Jun 2026 — Present', es: 'Jun 2026 — Presente' },
    description: {
      en: 'Leading web development for Padres Con Poder Foundation, focusing on interface implementation, usability, and responsive performance.',
      es: 'Lidero el desarrollo web de Padres Con Poder Foundation, enfocado en la implementación de interfaces, la usabilidad y el rendimiento responsive.',
    },
    highlights: [
      'Web app development',
      'UI implementation',
      'Product-focused features',
      'Cross-platform collaboration',
      'Performance and usability improvements',
    ],
    tags: ['Web Dev', 'UI Implementation', 'Cross-Platform', 'Product'],
  },
  {
    company: 'CBLUNA',
    role:    { en: 'UI/UX Designer · Cross-platform Developer · Graphic Designer', es: 'Diseñador UI/UX · Desarrollador Multiplataforma · Diseñador Gráfico' },
    period:  { en: '2020 — 2026', es: '2020 — 2026' },
    description: {
      en: 'Designed user-friendly interfaces, built web and native mobile applications using low-code tools, and created visual assets for client-facing digital and social media experiences.',
      es: 'Diseñé interfaces fáciles de usar, construí aplicaciones web y móviles nativas con herramientas low-code, y creé recursos visuales para experiencias digitales y de redes sociales de clientes.',
    },
    highlights: [
      'UI/UX design',
      'Cross-platform app development',
      'Low-code development',
      'Databases and APIs',
      'Graphic design',
      'Social media visuals',
    ],
    tags: ['UI/UX', 'Frontend', 'Low-Code', 'Graphic Design'],
  },
  {
    company: 'Project One Inc.',
    role:    { en: 'Lead of Medical Records Team', es: 'Líder del Equipo de Expedientes Médicos' },
    period:  { en: '2017 — 2019', es: '2017 — 2019' },
    description: {
      en: 'Led medical records operations by organizing tasks, creating patient profiles, assigning doctors and medical studies, and ensuring accuracy in critical patient information.',
      es: 'Dirigí las operaciones de expedientes médicos: organicé tareas, creé perfiles de pacientes, asigné médicos y estudios, y aseguré la exactitud de información crítica de los pacientes.',
    },
    highlights: [
      'Team leadership',
      'Medical records organization',
      'Patient profile management',
      'Task coordination',
      'Data accuracy',
    ],
    tags: ['Leadership', 'Operations', 'Data Management'],
  },
]

// Resolve bilingual fields for a language (call with the active lang from useI18n).
export function getExperiences(lang: Lang): Experience[] {
  return data.map(({ role, period, description, ...rest }) => ({
    ...rest,
    role: role[lang],
    period: period[lang],
    description: description[lang],
  }))
}

// Backwards-compatible English export.
export const experiences: Experience[] = getExperiences('en')

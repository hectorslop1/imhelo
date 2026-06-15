export type Experience = {
  company: string
  role: string
  period: string
  description: string
  highlights?: string[]
  tags?: string[]
}

// ── Most recent first ──────────────────────────────────────────────────────────
// To add or edit a role: update this array.
// A period containing "Present" marks the role as active (yellow accent, pulsing dot).
// Array order = display order: index 0 is the primary / current role.
export const experiences: Experience[] = [
  {
    company: 'Padres Con Poder Foundation.',
    role: 'Web Developer',
    period: 'Jun 2026 — Present',
    description:
      'Leading web development for Padres Con Poder Foundation, focusing on interface implementation, usability, and responsive performance.',
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
    role: 'UI/UX Designer · Cross-platform Developer · Graphic Designer',
    period: '2020 — 2026',
    description:
      'Designed user-friendly interfaces, built web and native mobile applications using low-code tools, and created visual assets for client-facing digital and social media experiences.',
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
    role: 'Lead of Medical Records Team',
    period: '2017 — 2019',
    description:
      'Led medical records operations by organizing tasks, creating patient profiles, assigning doctors and medical studies, and ensuring accuracy in critical patient information.',
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

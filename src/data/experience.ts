export type Experience = {
  company: string
  role: string
  period: string
  description: string
  highlights?: string[]
  tags?: string[]
}

// ── Most recent first ──────────────────────────────────────────────────────────
// To add a new role: prepend a new object to this array.
// A period containing "Present" marks the role as active (yellow accent, pulsing dot).
export const experiences: Experience[] = [
  {
    company: 'U-wifi Inc.',
    role: 'Lead Mobile Developer',
    period: 'Jan 2025 — Present',
    description:
      'Leading mobile development initiatives for app experiences, interface implementation, and product-focused features across mobile platforms.',
    highlights: [
      'Mobile app development',
      'UI implementation',
      'Product-focused features',
      'Cross-platform collaboration',
      'Performance and usability improvements',
    ],
    tags: ['Mobile Dev', 'UI Implementation', 'Cross-Platform', 'Product'],
  },
  {
    company: 'Freelance / HELO',
    role: 'Designer & Developer',
    period: '2020 — Present',
    description:
      'Building digital products, brand systems, and interactive interfaces for clients across multiple industries.',
    highlights: ['UI/UX', 'Frontend', 'Branding', 'Graphic Design'],
  },
  {
    company: 'Various Clients',
    role: 'Graphic Designer',
    period: '2018 — 2020',
    description:
      'Campaign visuals, social graphics, logos, and print assets for brands in the US and Mexico.',
    highlights: ['Print', 'Brand Identity', 'Social Media', 'Illustration'],
  },
]

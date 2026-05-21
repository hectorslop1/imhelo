export type Experience = {
  company: string
  role: string
  period: string
  description: string
  highlights?: string[]   // optional bullet points — existing entries omit this field
  tags: string[]
}

export const experiences: Experience[] = [
  // ── Most recent first ─────────────────────────────────────────────────────
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
    tags: ['UI/UX', 'Frontend', 'Branding', 'Graphic Design'],
  },
  {
    company: 'Various Clients',
    role: 'Graphic Designer',
    period: '2018 — 2020',
    description:
      'Campaign visuals, social graphics, logos, and print assets for brands in the US and Mexico.',
    tags: ['Print', 'Brand Identity', 'Social Media', 'Illustration'],
  },
]

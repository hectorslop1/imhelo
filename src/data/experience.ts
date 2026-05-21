export type Experience = {
  company: string
  role: string
  period: string
  description: string
  highlights?: string[]
  tags: string[]
}

// ── Most recent first ──────────────────────────────────────────────────────────
// To add a new role: insert a new object at the top of this array.
// Set highlights to undefined or omit the field if not needed.
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
    company: 'HELO / Freelance',
    role: 'Designer & Developer',
    period: '2020 — Present',
    description:
      'Creating polished interfaces, visual systems, websites, and digital experiences for brands, products, and creative projects.',
    highlights: [
      'Web design and development',
      'Visual systems',
      'UI implementation',
      'Branding and graphic design',
    ],
    tags: ['UI/UX', 'Frontend', 'Branding', 'Graphic Design'],
  },
  {
    company: 'Various Clients',
    role: 'Graphic Designer',
    period: '2018 — 2020',
    description:
      'Created visual assets, campaign graphics, logos, and brand materials for digital and print use.',
    highlights: [
      'Graphic design',
      'Social media visuals',
      'Brand assets',
      'Digital campaigns',
    ],
    tags: ['Print', 'Brand Identity', 'Social Media', 'Illustration'],
  },
]

export type Experience = {
  company: string
  role: string
  period: string
  description: string
  tags: string[]
}

export const experiences: Experience[] = [
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

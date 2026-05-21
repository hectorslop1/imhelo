export type Project = {
  id: string
  title: string
  category: string
  description: string
  role: string
  year: string
  featured: boolean
  tags: string[]
}

export const projects: Project[] = [
  {
    id: 'gigfast-nascar',
    title: 'gigFAST NASCAR',
    category: 'Graphic Design / Branding',
    description:
      'A racing-focused visual identity and graphics system created for a NASCAR truck sponsorship.',
    role: 'Visual Design, Branding, Graphic System',
    year: '2024',
    featured: true,
    tags: ['branding', 'graphic design', 'identity'],
  },
  {
    id: 'mobile-app-showcase',
    title: 'Mobile App Showcase',
    category: 'Development / UI',
    description:
      'A collection of app interfaces presented through an interactive device showcase.',
    role: 'Frontend Development, UI Implementation, Motion',
    year: '2025',
    featured: true,
    tags: ['development', 'ui', 'motion'],
  },
  {
    id: 'interactive-elements',
    title: 'Interactive Elements',
    category: 'Frontend / Creative Coding',
    description:
      'Interactive web experiments built with modern frontend tools and motion-driven UI.',
    role: 'Frontend Development, Interaction Design',
    year: '2025',
    featured: true,
    tags: ['frontend', 'creative coding', 'interaction'],
  },
  {
    id: 'graphic-design-collection',
    title: 'Graphic Design Collection',
    category: 'Visual Design',
    description:
      'A curated collection of visual assets, campaign graphics, logos, and brand pieces.',
    role: 'Graphic Design, Art Direction, Visual Systems',
    year: '2023–2025',
    featured: false,
    tags: ['graphic design', 'branding', 'art direction'],
  },
]

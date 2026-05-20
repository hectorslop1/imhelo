export type SkillGroup = {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    label: 'Development',
    items: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Motion',
      'Node.js',
    ],
  },
  {
    label: 'Design',
    items: [
      'Figma',
      'Adobe Illustrator',
      'Adobe Photoshop',
      'After Effects',
      'Brand Identity',
      'Typography',
    ],
  },
  {
    label: 'Tools & Platforms',
    items: ['Git', 'Vercel', 'VS Code', 'Notion', 'Claude Code'],
  },
]

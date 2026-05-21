export type SkillGroup = {
  label: string
  items: string[]
}

// ── To add skills: append to an existing group's items array,
//    or add a new SkillGroup object. Order here = display order.
export const skills: SkillGroup[] = [
  {
    label: 'Development',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
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
    label: 'Motion / Interaction',
    items: ['GSAP', '@gsap/react', 'Motion', 'Lenis', 'Scroll Animation'],
  },
  {
    label: 'Tools',
    items: ['Git', 'Vercel', 'VS Code', 'Notion', 'Claude Code'],
  },
]

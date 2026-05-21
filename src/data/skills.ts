export type SkillGroup = {
  label: string
  items: string[]
}

// To add skills: append items to a group, or add a new SkillGroup object.
// Display order follows array order.
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
    label: 'Tools & Platforms',
    items: ['Git', 'Vercel', 'VS Code', 'Notion', 'Claude Code'],
  },
]

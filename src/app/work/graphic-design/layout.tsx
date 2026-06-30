import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Graphic Design',
  description:
    'Illustration, typography, badge design, and visual experiments by Hector Lopez (HELO).',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

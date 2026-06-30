import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apparel Graphics',
  description:
    'Apparel graphic concepts — hoodies and tees exploring how visual identity lives beyond the screen, by HELO.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

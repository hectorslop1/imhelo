import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'gigFAST NASCAR',
  description:
    'Visual identity and brand graphics for a NASCAR Craftsman Truck Series sponsorship — truck, suit, hauler, and the Gigometer digital experience, by Hector Lopez (HELO).',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

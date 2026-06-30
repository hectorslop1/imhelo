import type { Metadata } from 'next'

// Server layout — gives the client /work index a real title/description
// (a client page.tsx can't export metadata). Child segments override this.
// default = the /work index title (absolute); template re-declared here so it
// cascades to the case-study child segments (root template doesn't reach grandchildren).
export const metadata: Metadata = {
  title: { default: 'Work', template: '%s · HELO' },
  description:
    'Selected work by Hector Lopez (HELO) — graphic design, branding, frontend development, and interactive product work.',
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}

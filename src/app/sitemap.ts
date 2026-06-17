import type { MetadataRoute } from 'next'

const SITE_URL = 'https://imhelo.com'

// Generates /sitemap.xml. Mirrors the real route tree (excludes /motion-lab).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
    { path: '',                          priority: 1.0, changeFrequency: 'monthly' },
    { path: '/work',                     priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about',                    priority: 0.8, changeFrequency: 'yearly' },
    { path: '/contact',                  priority: 0.8, changeFrequency: 'yearly' },
    { path: '/work/gigfast-nascar',      priority: 0.7, changeFrequency: 'yearly' },
    { path: '/work/graphic-design',      priority: 0.7, changeFrequency: 'yearly' },
    { path: '/work/apparel-graphics',    priority: 0.7, changeFrequency: 'yearly' },
    { path: '/work/interactive-elements', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/work/mobile-app-showcase', priority: 0.7, changeFrequency: 'yearly' },
  ]
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}

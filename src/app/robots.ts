import type { MetadataRoute } from 'next'

const SITE_URL = 'https://imhelo.com'

// Generates /robots.txt. /motion-lab is an internal motion playground — keep it
// out of search indexes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/motion-lab',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

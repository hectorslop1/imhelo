export type Project = {
  id:          string
  title:       string
  category:    string
  description: string
  role:        string
  year:        string
  featured:    boolean
  tags:        string[]
  /**
   * Public path for the project cover image.
   * Used in the homepage hover thumbnail and the /work index row.
   * To update: change the path; drop the new asset in /public.
   * Projects without a cover fall back to a refined CSS visual.
   */
  cover?: string
}

// ── Project list — ordered by display priority ─────────────────────────────
// id is the URL slug: /work/${id}
// To add a project: append here and create src/app/work/${id}/page.tsx

export const projects: Project[] = [
  {
    id:          'gigfast-nascar',
    title:       'gigFAST NASCAR',
    category:    'Graphic Design · Branding · Digital Product',
    description: 'Visual identity and graphic design work for a NASCAR Craftsman Truck Series sponsorship, applied across the #38 Ford F-150 truck, driver suit, event tent, team hauler, and the Gigometer digital experience.',
    role:        'Visual Design · Logo Application · Brand Graphics · Digital Product Design',
    year:        '2023',
    featured:    true,
    tags:        ['branding', 'graphic design', 'identity', 'digital product'],
    cover:       '/assetshelo/Nascar/ZaneSmith/TL_01108-2.jpg',
  },
  {
    id:          'graphic-design',
    title:       'Graphic Design',
    category:    'Visual Design · Illustration',
    description: 'A curated archive of illustrations, typographic works, badge designs, and visual experiments.',
    role:        'Illustration, Typography, Art Direction',
    year:        'Ongoing',
    featured:    true,
    tags:        ['illustration', 'typography', 'visual design'],
    cover:       '/assetshelo/GraphicDesign/Gba26qPbwAAEM7t.jpeg',
  },
  {
    id:          'apparel-graphics',
    title:       'Apparel Graphics',
    category:    'Graphic Design · Print',
    description: 'Personal apparel graphic concepts for hoodies and t-shirts, exploring how visual identity can live beyond screens.',
    role:        'Graphic Design, Art Direction',
    year:        'Ongoing',
    featured:    true,
    tags:        ['graphic design', 'print', 'apparel'],
    cover:       '/assetshelo/ApparelDesign/MarioTshirt.png',
  },
  {
    id:          'mobile-app-showcase',
    title:       'Mobile App Showcase',
    category:    'Development · UI',
    description: 'App interface design and implementation presented through interactive device frames.',
    role:        'Frontend Development, UI Implementation, Motion',
    year:        '2025',
    featured:    true,
    tags:        ['development', 'ui', 'motion'],
    // No cover yet — CSS visual fallback used
  },
  {
    id:          'interactive-elements',
    title:       'Interactive Elements',
    category:    'Frontend · Creative Coding',
    description: 'Interactive UI experiments built with motion, frontend tools, and polished microinteractions.',
    role:        'Frontend Development, Interaction Design',
    year:        '2025',
    featured:    true,
    tags:        ['frontend', 'creative coding', 'interaction'],
    // No cover yet — CSS visual fallback used
  },
]

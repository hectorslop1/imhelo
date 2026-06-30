export type Lang = 'en' | 'es'
type L = { en: string; es: string }

// Public shape — string fields (resolved for a language). Consumers stay simple.
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
   */
  cover?: string
  /** Images that cross-fade like a carousel while the card is hovered. */
  gallery?: string[]
}

// Bilingual source. `title` + `category` are the fields rendered on the home +
// /work index, so they carry { en, es }. Resolve with getProjects(lang).
type ProjectSource = Omit<Project, 'title' | 'category'> & { title: L; category: L }

// ── Project list — ordered by display priority ─────────────────────────────
// id is the URL slug: /work/${id}
const data: ProjectSource[] = [
  {
    id:          'gigfast-nascar',
    title:       { en: 'gigFAST NASCAR', es: 'gigFAST NASCAR' },
    category:    { en: 'Graphic Design · Branding · Digital Product', es: 'Diseño Gráfico · Branding · Producto Digital' },
    description: 'Visual identity and graphic design work for a NASCAR Craftsman Truck Series sponsorship, applied across the #38 Ford F-150 truck, driver suit, event tent, team hauler, and the Gigometer digital experience.',
    role:        'Visual Design · Logo Application · Brand Graphics · Digital Product Design',
    year:        '2023',
    featured:    true,
    tags:        ['branding', 'graphic design', 'identity', 'digital product'],
    cover:       '/assetshelo/Nascar/ZaneSmith/TL_01108-2.jpg',
    gallery: [
      '/assetshelo/Nascar/ZaneSmith/TL_01108-2.jpg',   // dusk hero — driver walking, logos on the back
      '/assetshelo/Nascar/ZaneSmith/2328JN1808.jpg',   // #38 truck at night past SPEEDWAY signage, cinematic low-angle
      '/assetshelo/Nascar/ZaneSmith/2328TP1474.jpg',   // cockpit interior, helmet + roll cage
      '/assetshelo/Nascar/ZaneSmith/2328JN1547.jpg',   // dramatic overhead of the truck at the night race
    ],
  },
  {
    id:          'graphic-design',
    title:       { en: 'Graphic Design', es: 'Diseño Gráfico' },
    category:    { en: 'Visual Design · Illustration', es: 'Diseño Visual · Ilustración' },
    description: 'A curated archive of illustrations, typographic works, badge designs, and visual experiments.',
    role:        'Illustration, Typography, Art Direction',
    year:        'Ongoing',
    featured:    true,
    tags:        ['illustration', 'typography', 'visual design'],
    cover:       '/assetshelo/GraphicDesign/Gba26qPbwAAEM7t.jpeg',
    gallery: [
      '/assetshelo/GraphicDesign/Gba26qPbwAAEM7t.jpeg',  // Coco-style marigold-bridge illustration — painterly, narrative
      '/assetshelo/GraphicDesign/GXiuqEoaIAA96EQ.jpeg',  // LA LUCHA! lucha-libre poster — bold pink/green, papel picado
      '/assetshelo/GraphicDesign/GWvPwwdacAAElRs.jpeg',  // Beetlejuice "Say My Name!" — cinematic green/purple
      '/assetshelo/GraphicDesign/GRMHLmrbQAAVK9x.jpeg',  // "Friday" retro gradient typography
    ],
  },
  {
    id:          'apparel-graphics',
    title:       { en: 'Apparel Graphics', es: 'Gráficos para Ropa' },
    category:    { en: 'Graphic Design · Print', es: 'Diseño Gráfico · Impresión' },
    description: 'Personal apparel graphic concepts for hoodies and t-shirts, exploring how visual identity can live beyond screens.',
    role:        'Graphic Design, Art Direction',
    year:        'Ongoing',
    featured:    true,
    tags:        ['graphic design', 'print', 'apparel'],
    cover:       '/assetshelo/ApparelDesign/CharizardHoodie.jpeg',
    gallery: [
      '/assetshelo/ApparelDesign/CharizardHoodie.jpeg',  // bold yellow flat-lay + big CHARIZARD type + HELO mark
      '/assetshelo/ApparelDesign/EclipseTshirt.jpg',     // Fast & Furious green, blueprint back — art-directed
      '/assetshelo/ApparelDesign/MetalGearTshirt.jpg',   // moody concrete, Snake artwork, branded
      '/assetshelo/ApparelDesign/MarioTshirt.png',       // red neon worn tee — color + presentation variety
    ],
  },
  {
    id:          'mobile-app-showcase',
    title:       { en: 'Mobile App Showcase', es: 'Apps Móviles' },
    category:    { en: 'Development · UI', es: 'Desarrollo · UI' },
    description: 'App interface design and implementation presented through interactive device frames.',
    role:        'Frontend Development, UI Implementation, Motion',
    year:        '2025',
    featured:    true,
    tags:        ['development', 'ui', 'motion'],
    // No cover yet — CSS visual fallback used
  },
  {
    id:          'interactive-elements',
    title:       { en: 'Interactive Elements', es: 'Elementos Interactivos' },
    category:    { en: 'Frontend · Creative Coding', es: 'Frontend · Código Creativo' },
    description: 'Interactive UI experiments built with motion, frontend tools, and polished microinteractions.',
    role:        'Frontend Development, Interaction Design',
    year:        '2025',
    featured:    true,
    tags:        ['frontend', 'creative coding', 'interaction'],
    // No cover yet — CSS visual fallback used
  },
]

// Resolve the bilingual fields for a language. Components call this (with the
// active lang from useI18n) instead of importing the raw array.
export function getProjects(lang: Lang): Project[] {
  return data.map(({ title, category, ...rest }) => ({
    ...rest,
    title: title[lang],
    category: category[lang],
  }))
}

// Backwards-compatible English export for any non-localized consumer.
export const projects: Project[] = getProjects('en')

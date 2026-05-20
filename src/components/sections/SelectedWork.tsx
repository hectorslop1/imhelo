import Link from 'next/link'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionLabel from '@/components/ui/SectionLabel'

export default function SelectedWork() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section className="py-32 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2
              className="font-bold tracking-tighter text-white"
              style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontFamily: 'var(--font-syne)',
              }}
            >
              Projects
            </h2>
          </div>
          <Link
            href="/work"
            className="text-sm text-[#888880] hover:text-white transition-colors border-b border-[#888880]/30 hover:border-white pb-0.5"
          >
            View all
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

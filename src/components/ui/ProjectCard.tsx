import { type Project } from '@/data/projects'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProjectCardProps = {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isLarge = index === 0

  return (
    <div
      className={cn(
        'group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8',
        'hover:bg-white/[0.05] hover:border-white/[0.12]',
        'transition-all duration-300 cursor-pointer',
        isLarge && 'md:col-span-2'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-medium tracking-[0.15em] text-[#888880] uppercase mb-2">
            {project.category}
          </p>
          <h3 className="text-2xl font-bold text-white group-hover:text-[#f2d832] transition-colors duration-200">
            {project.title}
          </h3>
        </div>
        <div
          className={cn(
            'w-8 h-8 rounded-full border border-white/[0.12] flex items-center justify-center shrink-0',
            'group-hover:bg-[#f2d832] group-hover:border-[#f2d832] transition-all duration-200'
          )}
        >
          <ArrowUpRight
            size={14}
            className="text-white group-hover:text-[#0d0d0d] transition-colors duration-200"
          />
        </div>
      </div>

      {/* Thumbnail placeholder */}
      <div
        className={cn(
          'w-full bg-white/[0.02] rounded-xl mb-6 flex items-center justify-center border border-white/[0.04]',
          isLarge ? 'h-72' : 'h-52'
        )}
      >
        <span className="text-xs text-[#888880]/30 font-mono">{project.id}</span>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between gap-4">
        <p className="text-sm text-[#888880] leading-relaxed max-w-sm">
          {project.description}
        </p>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs text-[#888880]/50 font-mono">{project.year}</span>
          <div className="flex flex-wrap gap-1 justify-end">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.06] text-[#888880]/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

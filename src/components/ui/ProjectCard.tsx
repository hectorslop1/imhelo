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
        'group relative overflow-hidden rounded-xl border border-white/[0.07]',
        'bg-[#111111] cursor-pointer',
        'hover:border-white/[0.14] transition-all duration-500',
        isLarge && 'md:col-span-2'
      )}
    >
      {/* Thumbnail placeholder */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          isLarge ? 'h-80 lg:h-96' : 'h-60'
        )}
      >
        {/* Placeholder gradient */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
          style={{
            background: index % 2 === 0
              ? 'radial-gradient(ellipse at 30% 40%, rgba(242,216,50,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 80%)'
              : 'radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
        />
        {/* Grid lines effect */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Project index */}
        <span className="absolute top-5 left-5 text-[11px] font-mono text-white/20 tracking-widest">
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* Placeholder label */}
        <span className="absolute bottom-5 right-5 text-[10px] font-mono text-white/10 tracking-widest uppercase">
          {project.tags[0]}
        </span>
      </div>

      {/* Content */}
      <div className="p-7 border-t border-white/[0.06]">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase mb-2">
              {project.category}
            </p>
            <h3
              className="font-bold tracking-[-0.03em] text-white group-hover:text-[#f2d832] transition-colors duration-300 leading-tight"
              style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 shrink-0 pt-1">
            <span className="text-[11px] font-mono text-[#4a4a44]">{project.year}</span>
            <div className="w-7 h-7 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:bg-[#f2d832] group-hover:border-[#f2d832] transition-all duration-300">
              <ArrowUpRight size={12} className="text-[#7a7a72] group-hover:text-[#080808] transition-colors duration-300" />
            </div>
          </div>
        </div>

        <p className="text-[13px] text-[#7a7a72] leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  )
}

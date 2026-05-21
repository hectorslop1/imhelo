import { experiences } from '@/data/experience'
import { skills } from '@/data/skills'

export default function Experience() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-10">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">05</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">Experience &amp; Skills</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 pb-28">

          {/* Experience column */}
          <div>
            <p className="text-[11px] font-mono text-[#f2d832]/60 tracking-widest uppercase mb-8">
              Experience
            </p>
            <div>
              {experiences.map((exp, i) => (
                <div
                  key={exp.company}
                  className={`py-8 ${i < experiences.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
                >
                  <div className="flex items-start justify-between gap-6 mb-3">
                    <div>
                      <h3
                        className="font-bold text-white tracking-[-0.02em] mb-0.5"
                        style={{ fontFamily: 'var(--font-syne)', fontSize: '16px' }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-[13px] text-[#4a4a44] font-mono">{exp.company}</p>
                    </div>
                    <span className="text-[11px] text-[#4a4a44] font-mono shrink-0 tracking-wide pt-0.5">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#7a7a72] leading-relaxed mt-4 mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights — only rendered when present on an entry */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mb-5 space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5">
                          <span
                            className="w-[3px] h-[3px] rounded-full shrink-0"
                            style={{ background: 'rgba(242,216,50,0.45)' }}
                          />
                          <span className="text-[11px] font-mono text-[#4a4a44] tracking-wide">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 border border-white/[0.07] text-[#4a4a44] font-mono tracking-wide rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills column */}
          <div>
            <p className="text-[11px] font-mono text-[#f2d832]/60 tracking-widest uppercase mb-8">
              Skills
            </p>
            <div>
              {skills.map((group, i) => (
                <div
                  key={group.label}
                  className={`py-8 ${i < skills.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
                >
                  <h3
                    className="font-bold text-white tracking-[-0.02em] mb-5"
                    style={{ fontFamily: 'var(--font-syne)', fontSize: '16px' }}
                  >
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] px-2.5 py-1 border border-white/[0.07] text-[#7a7a72] font-mono tracking-wide rounded hover:text-white hover:border-white/[0.18] transition-colors duration-300 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

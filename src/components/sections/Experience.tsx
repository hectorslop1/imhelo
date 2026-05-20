import { experiences } from '@/data/experience'
import { skills } from '@/data/skills'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Experience() {
  return (
    <section className="py-32 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Experience */}
        <div>
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-0">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="border-t border-white/[0.06] py-8"
              >
                <div className="flex items-start justify-between mb-3 gap-4">
                  <div>
                    <h3
                      className="font-semibold text-white"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-sm text-[#888880]">{exp.company}</p>
                  </div>
                  <span className="text-xs text-[#888880]/50 font-mono shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-[#888880] leading-relaxed mb-5">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/[0.08] text-[#888880]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <SectionLabel>Skills</SectionLabel>
          <div className="space-y-0">
            {skills.map((group) => (
              <div key={group.label} className="border-t border-white/[0.06] py-8">
                <h3
                  className="font-semibold text-white mb-5"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#888880] hover:text-white hover:border-white/20 transition-colors duration-200 cursor-default"
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
    </section>
  )
}

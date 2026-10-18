import { skillGroups } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export default function Skills() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="skills" ref={ref} aria-labelledby="skills-heading" className="section-reveal py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold mb-12">
          Technical <span className="gradient-text">Skills</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.category} className="glass rounded-2xl p-6 glass-hover transition-all">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-400 mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/[0.05] border border-white/[0.06] text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

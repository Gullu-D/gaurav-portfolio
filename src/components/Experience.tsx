import { Briefcase, GraduationCap } from 'lucide-react'
import { timeline } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="experience" ref={ref} aria-labelledby="experience-heading" className="section-reveal py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 id="experience-heading" className="text-3xl sm:text-4xl font-bold mb-12">
          Experience & <span className="gradient-text">Education</span>
        </h2>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.06] hidden sm:block" />

          <div className="space-y-8">
            {timeline.map((item) => (
              <div key={item.title + item.period} className="relative flex gap-6">
                <div className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center rounded-full glass z-10">
                  {item.type === 'experience' ? (
                    <Briefcase size={16} className="text-violet-400" />
                  ) : (
                    <GraduationCap size={16} className="text-cyan-400" />
                  )}
                </div>

                <div className="glass rounded-2xl p-6 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-violet-400 mb-1">{item.subtitle}</p>
                  <p className="text-xs text-gray-400 mb-3">{item.location}</p>
                  {item.description.length > 0 && (
                    <ul className="space-y-1">
                      {item.description.map((d) => (
                        <li key={d} className="text-sm text-gray-400">
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

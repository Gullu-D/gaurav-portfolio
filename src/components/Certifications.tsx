import { Award } from 'lucide-react'
import { certifications } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export default function Certifications() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="certifications" ref={ref} aria-labelledby="certifications-heading" className="section-reveal py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 id="certifications-heading" className="text-3xl sm:text-4xl font-bold mb-12">
          <span className="gradient-text">Certifications</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="glass rounded-xl p-5 glass-hover transition-all group"
            >
              <div className="flex items-start gap-3">
                <Award
                  size={18}
                  className="mt-0.5 shrink-0 text-violet-400/60 group-hover:text-violet-400 transition-colors"
                />
                <div>
                  <p className="text-sm font-medium text-gray-200 leading-snug">{cert.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{cert.issuer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

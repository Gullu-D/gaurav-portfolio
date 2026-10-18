import { CheckCircle2, Github } from 'lucide-react'
import { projects, type Project } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export default function Projects() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="projects" ref={ref} aria-labelledby="projects-heading" className="section-reveal py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl">
          Real-world applications built from scratch — each with working code, tests, and documentation.
        </p>

        <div className="grid gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accentColors = [
    'from-violet-500/20 to-cyan-500/20',
    'from-cyan-500/20 to-emerald-500/20',
    'from-amber-500/20 to-rose-500/20',
    'from-emerald-500/20 to-violet-500/20',
  ]

  return (
    <div className="glass rounded-2xl gradient-border overflow-hidden transition-all group">
      <div className={`h-1.5 bg-gradient-to-r ${accentColors[index % accentColors.length]}`} />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">
                {project.title}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {project.longDescription}
            </p>
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-2.5 rounded-xl glass glass-hover text-gray-400 hover:text-white transition-all"
              aria-label={`${project.title} on GitHub`}
            >
              <Github size={18} />
            </a>
          )}
        </div>

        <ul className="grid sm:grid-cols-2 gap-2 mb-6">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-gray-400">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-violet-400/60" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const styles = {
    Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Prototype: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  }

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[status]}`}>
      {status}
    </span>
  )
}

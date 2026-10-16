import { MapPin, GraduationCap, Briefcase } from 'lucide-react'
import { profile } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" ref={ref} className="section-reveal py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="grid md:grid-cols-[1fr_auto] gap-10">
          <div className="space-y-5">
            {profile.about.map((p, i) => (
              <p key={i} className="text-gray-400 leading-relaxed text-base sm:text-lg">
                {p}
              </p>
            ))}
          </div>

          <div className="flex md:flex-col gap-4 flex-wrap">
            <InfoChip icon={<MapPin size={16} />} text={profile.location} />
            <InfoChip icon={<GraduationCap size={16} />} text="B.Tech CSE, 2027" />
            <InfoChip icon={<Briefcase size={16} />} text="DRDO Intern" />
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoChip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass text-sm text-gray-300 whitespace-nowrap">
      <span className="text-violet-400">{icon}</span>
      {text}
    </div>
  )
}

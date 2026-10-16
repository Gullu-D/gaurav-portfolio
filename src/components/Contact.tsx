import { Mail, Github, Linkedin, MapPin } from 'lucide-react'
import { profile } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="contact" ref={ref} className="section-reveal py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          I'm open to internship opportunities, collaborations, and interesting conversations.
          Feel free to reach out.
        </p>

        <a
          href={`mailto:${profile.social.email}`}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 font-medium transition-colors text-white text-lg"
        >
          <Mail size={20} />
          Say Hello
        </a>

        <div className="flex items-center justify-center gap-6 mt-10">
          <ContactLink href={`mailto:${profile.social.email}`} icon={<Mail size={20} />} label="Email" />
          <ContactLink href={profile.social.github} icon={<Github size={20} />} label="GitHub" />
          <ContactLink href={profile.social.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
          <MapPin size={14} />
          {profile.location}
        </div>
      </div>
    </section>
  )
}

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3.5 rounded-xl glass glass-hover text-gray-400 hover:text-white transition-all"
    >
      {icon}
    </a>
  )
}

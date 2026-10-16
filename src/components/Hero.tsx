import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/content'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      <div className="hero-glow bg-violet-600 -top-40 -left-40" />
      <div className="hero-glow bg-cyan-500 -bottom-40 -right-40" />

      <div className="relative z-10 max-w-3xl text-center">
        <p className="text-sm sm:text-base font-medium text-violet-400 tracking-widest uppercase mb-4">
          {profile.headline}
        </p>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text">{profile.name.split(' ')[0]}</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          {profile.tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-7 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 font-medium transition-colors text-white"
          >
            View Projects
          </a>
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-xl glass glass-hover font-medium transition-all text-gray-300 hover:text-white"
          >
            Download Resume
          </a>
        </div>

        <div className="flex items-center justify-center gap-5">
          <SocialLink href={profile.social.github} label="GitHub">
            <Github size={20} />
          </SocialLink>
          <SocialLink href={profile.social.linkedin} label="LinkedIn">
            <Linkedin size={20} />
          </SocialLink>
          <SocialLink href={`mailto:${profile.social.email}`} label="Email">
            <Mail size={20} />
          </SocialLink>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to about"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 rounded-xl glass glass-hover text-gray-400 hover:text-white transition-all"
    >
      {children}
    </a>
  )
}

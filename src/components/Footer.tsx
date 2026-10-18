import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <div className="flex gap-6">
          <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
          <a href="#projects" className="hover:text-gray-300 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

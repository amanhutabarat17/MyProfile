export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900 text-white z-50 shadow-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider text-cyan-400">MY.PORTFOLIO</h1>
        <div className="space-x-6 text-sm font-medium">
          <a href="#hero" className="hover:text-cyan-400 transition">Home</a>
          <a href="#experience" className="hover:text-cyan-400 transition">Experience</a>
          <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
          <a href="#certifications" className="hover:text-cyan-400 transition">Certifications</a>
          <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
        </div>
      </div>
    </nav>
  )
}
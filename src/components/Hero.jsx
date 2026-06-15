export default function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 pt-16 relative">
      <div className="text-center max-w-2xl flex flex-col items-center">

        <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-sm text-slate-400 mb-7">
          <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
          Open to Work
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
          Hi, I'm <span className="text-cyan-400">Aman Haggai</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-9">
          S1 Teknik Informatika · IPK 3.72 · Data Scientist & Web Developer
          yang berdedikasi membangun solusi digital yang berdampak.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#projects"
            className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold py-3 px-7 rounded-lg transition"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 font-medium py-3 px-7 rounded-lg transition"
          >
            Hire Me
          </a>
        </div>

        <div className="flex flex-wrap gap-10 justify-center mt-14 pt-10 border-t border-slate-800 w-full">
          {[
            { num: "3.72", label: "IPK" },
            { num: "3.5yr", label: "Selesai Kuliah" },
            { num: "1", label: "Sertifikasi BNSP" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{s.num}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
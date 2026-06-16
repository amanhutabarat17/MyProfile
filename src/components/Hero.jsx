import { useState } from "react";

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu mobile

  return (
    <section
      id="hero"
      className="min-h-screen bg-[#060C18] text-white flex flex-col overflow-hidden relative font-sans"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-50 px-6 lg:px-10 py-5 border-b border-white/[0.04] bg-[#060C18]/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-[0.15em] text-cyan-400 uppercase">
            MY.PORTFOLIO
          </span>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {["Home", "Experience", "Projects", "Certifications", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[12.5px] font-medium text-white/40 hover:text-white tracking-[0.06em] transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 mt-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 pb-4">
            {["Home", "Experience", "Projects", "Certifications", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[13px] font-medium text-white/60 hover:text-cyan-400 tracking-[0.06em] transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Body: split layout (Column on mobile, Row on Laptop) */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1 min-h-0">
        
        {/* ── LEFT: Photo panel ── */}
        <div className="relative w-full lg:w-[42%] h-[400px] sm:h-[450px] lg:h-auto flex-shrink-0 overflow-hidden">
          {/* Panel bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1929] to-[#091525]" />

          {/* Bottom glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
            style={{
              background:
                "linear-gradient(0deg, rgba(56,189,248,0.07) 0%, transparent 100%)",
            }}
          />

          {/* Photo */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="relative w-full flex flex-col items-center justify-end">
              {/* Ukuran foto disesuaikan untuk mobile dan laptop */}
              <div className="w-[260px] h-[340px] sm:w-[300px] sm:h-[380px] lg:w-[320px] lg:h-[420px] relative overflow-hidden">
                {!imgError ? (
                  <img
                    src="/assets/profile/amanhaggai.jpeg"
                    alt="Aman Haggai Hutabarat"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-[#0f2340] via-[#1a3a60] to-[#0d1f33] flex items-center justify-center">
                    <span className="text-[60px] lg:text-[80px] font-black text-cyan-400/25 tracking-[-4px]">
                      AH
                    </span>
                  </div>
                )}
                {/* Fade bottom of photo into bg */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 lg:h-28 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(0deg, #060C18 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* IPK floating badge */}
          <div className="absolute bottom-12 lg:bottom-28 right-4 lg:right-5 bg-cyan-400/10 border border-cyan-400/30 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-center">
          
            <div className="text-[7.5px] lg:text-[8.5px] font-bold text-cyan-400/60 uppercase tracking-[0.15em] mt-1">
              IPK
            </div>
          </div>

          {/* Side label - Sembunyikan di HP karena memakan tempat */}
          <div
            className="hidden md:block absolute left-4 lg:left-6 bottom-20 text-[9px] font-semibold tracking-[0.2em] text-white/20 uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Teknik Informatika · Universitas Methodist Indonesia
          </div>

          {/* Diagonal clip edge - Hanya tampil di laptop */}
          <div
            className="hidden lg:block absolute top-0 right-[-1px] bottom-0 w-14 bg-[#060C18]"
            style={{ clipPath: "polygon(56px 0, 56px 100%, 0 100%)" }}
          />
        </div>

        {/* ── RIGHT: Content ── */}
        <div className="flex-1 flex flex-col justify-center px-6 py-10 lg:px-14 lg:py-14 relative bg-[#060C18]">
          
          {/* BNSP badge - Relatif di HP, Absolute di Laptop */}
          <div className="mb-6 lg:mb-0 lg:absolute lg:top-0 lg:right-0 lg:p-5">
            <div className="inline-flex lg:flex items-center gap-2 bg-[#0f1728]/90 border border-white/[0.08] rounded-lg px-3 py-2">
              <div className="w-7 h-7 rounded-md bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-200 leading-none">
                  BNSP Certified
                </div>
                <div className="text-[9px] text-white/35 mt-0.5">
                  Sertifikasi Nasional
                </div>
              </div>
            </div>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-5 h-[1.5px] bg-cyan-400" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
              S1 Teknik Informatika
            </span>
          </div>

          {/* Open to Work */}
          <div className="inline-flex items-center gap-1.5 bg-cyan-400/[0.06] border border-cyan-400/25 rounded-full px-3.5 py-1.5 text-[10.5px] font-semibold text-cyan-300 tracking-[0.05em] w-fit mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
            Open to Work
          </div>

          {/* Name - text size responsive */}
          <h1 className="text-4xl md:text-[52px] font-black leading-none tracking-[-1.5px] md:tracking-[-2.5px] text-slate-100 mb-2">
            Aman Haggai
            <span className="block text-cyan-400">Hutabarat</span>
          </h1>

          {/* Role tags */}
          <div className="flex flex-wrap gap-1.5 mt-4 mb-6">
            {[
              "Data Scientist",
              "Web Developer",
              "Backend Developer",
              "Software Engineer",
            ].map((r) => (
              <span
                key={r}
                className="text-[9.5px] lg:text-[10.5px] font-semibold text-white/50 tracking-[0.06em] px-2.5 py-1.5 lg:px-3 border border-white/[0.08] rounded bg-white/[0.03]"
              >
                {r}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-[12.5px] lg:text-[13.5px] text-white/45 leading-relaxed max-w-sm mb-8">
            Membangun solusi digital yang berdampak — dari analitik data hingga
            aplikasi web modern. Berdedikasi pada kualitas, ketepatan, dan nilai
            nyata bagi pengguna.
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-1.5 mb-9">
            {[
              "Python",
              "Machine Learning",
              "React",
              "Data Visualization",
              "SQL",
              "Laravel",
              "Java",
              "PHP",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[10px] lg:text-[11px] font-semibold px-2.5 lg:px-3 py-1.5 bg-cyan-400/[0.07] border border-cyan-400/[0.18] text-sky-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#projects"
              className="bg-cyan-400 hover:bg-sky-300 text-[#060C18] text-[12px] lg:text-[13px] font-extrabold py-2.5 px-6 lg:px-7 rounded-md transition-colors text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-cyan-400/35 text-cyan-400 hover:bg-cyan-400/[0.08] text-[12px] lg:text-[13px] font-semibold py-2.5 px-6 lg:px-7 rounded-md transition-colors text-center"
            >
              Hire Me →
            </a>
          </div>

          {/* Stats - flex-wrap added for mobile */}
          <div className="flex flex-wrap gap-y-6 gap-x-0 border-t border-white/[0.07] pt-7">
            {[
              { num: "3.72", label: "IPK" },
              { num: "3.5yr", label: "Lulus" },
              { num: "1", label: "Sertifikasi BNSP" },
            ].map((s, i, arr) => (
              <div
                key={i}
                className={`pr-5 mr-5 lg:pr-7 lg:mr-7 ${
                  i < arr.length - 1 ? "border-r border-white/[0.07]" : ""
                }`}
              >
                <div className="text-[22px] lg:text-[26px] font-black text-cyan-400 leading-none tracking-tight">
                  {s.num}
                </div>
                <div className="text-[8.5px] lg:text-[9px] font-bold text-white/30 uppercase tracking-[0.18em] mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
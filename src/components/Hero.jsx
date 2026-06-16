import { useState } from "react";

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-screen bg-[#060C18] text-white flex items-center justify-center px-6 pt-16 relative overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-80px",
          right: "-80px",
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Floating BNSP Chip */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2">
        <div className="w-7 h-7 rounded-md bg-cyan-400/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-cyan-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-200 leading-none">
            BNSP Certified
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Sertifikasi Nasional
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 py-16">
        {/* --- LEFT: Photo --- */}
        <div className="flex flex-col items-center gap-4 flex-shrink-0">
          {/* Orbit ring + avatar */}
          <div className="relative w-44 h-44">
            {/* Orbit ring */}
            <div
              className="absolute rounded-full border border-cyan-400/25"
              style={{ inset: "-10px" }}
            >
              {/* Dot on top of ring */}
              <span
                className="absolute w-2 h-2 rounded-full bg-cyan-400 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ boxShadow: "0 0 8px #38BDF8" }}
              />
            </div>

            {/* Avatar */}
            <div className="w-44 h-44 rounded-full border-2 border-slate-800 bg-slate-800 overflow-hidden flex items-center justify-center relative z-10">
              {!imgError ? (
                <img
                  src="/assets/profile/amanhaggai.jpeg"
                  alt="Aman Haggai Hutabarat"
                  className="w-full h-full object-cover object-center"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-5xl font-bold text-cyan-400 tracking-tighter">
                  AH
                </span>
              )}
            </div>
          </div>

          {/* Open to Work badge */}
          <div className="inline-flex items-center gap-1.5 bg-cyan-400/8 border border-cyan-400/30 rounded-full px-3 py-1.5 text-[11.5px] text-cyan-300 font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
            Open to Work
          </div>
        </div>

        {/* --- RIGHT: Content --- */}
        <div className="flex-1 min-w-0 text-center md:text-left">
          <p className="text-[11px] font-semibold tracking-widest text-cyan-400 uppercase mb-3">
            S1 Teknik Informatika · IPK 3.72
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-100 mb-2">
            Aman Haggai
            <br />
            <span className="text-cyan-400">Hutabarat</span>
          </h1>

          {/* Typo diperbaiki dan spasi dirapikan */}
          <p className="text-sm font-medium text-slate-400 mb-5 tracking-wide">
            Data Scientist | Web Developer | Backend Developer | Software Engineer
          </p>

          {/* Divider accent */}
          <div className="w-10 h-0.5 bg-cyan-400 rounded mb-5 mx-auto md:mx-0" />

          <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
            Membangun solusi digital yang berdampak — dari analitik data hingga
            aplikasi web modern. Berdedikasi pada kualitas, ketepatan, dan nilai
            nyata bagi pengguna.
          </p>

          {/* Skill tags - spasi pada " Laravel" dihilangkan */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-7">
            {["Python", "Machine Learning", "React", "Data Visualization", "SQL", "Laravel", "Java", "PHP"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-slate-800/80 border border-slate-700 rounded-md px-2.5 py-1 text-[11.5px] text-slate-300 font-medium"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 flex-wrap justify-center md:justify-start mb-8">
            <a
              href="#projects"
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 text-sm font-bold py-2.5 px-6 rounded-lg transition"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 text-sm font-semibold py-2.5 px-6 rounded-lg transition"
            >
              Hire Me →
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-0 border-t border-slate-800 pt-6 justify-center md:justify-start">
            {[
              { num: "3.72", label: "IPK" },
              { num: "3.5yr", label: "Lulus Lebih Cepat" },
              { num: "1", label: "Sertifikasi BNSP" },
            ].map((s, i, arr) => (
              <div
                key={i}
                className={`pr-6 mr-6 ${
                  i < arr.length - 1
                    ? "border-r border-slate-800"
                    : "border-0 pr-0 mr-0"
                }`}
              >
                <div className="text-2xl font-extrabold text-cyan-400 tracking-tight leading-none">
                  {s.num}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-medium uppercase tracking-widest">
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
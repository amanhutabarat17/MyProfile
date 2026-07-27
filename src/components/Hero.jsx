import { useState, useEffect } from "react";

function useBackgroundRemoval(
  src,
  { localTolerance = 26, globalTolerance = 95, featherPasses = 3 } = {}
) {
  const [processedSrc, setProcessedSrc] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | done | error

  useEffect(() => {
    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const n = width * height;

        const idx = (x, y) => y * width + x;
        const colorAt = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];

        // Warna referensi global: rata-rata seluruh piksel di bingkai/tepi gambar
        let gr = 0, gg = 0, gb = 0, borderCount = 0;
        for (let x = 0; x < width; x++) {
          [0, height - 1].forEach((y) => {
            const i = idx(x, y);
            gr += data[i * 4]; gg += data[i * 4 + 1]; gb += data[i * 4 + 2];
            borderCount++;
          });
        }
        for (let y = 0; y < height; y++) {
          [0, width - 1].forEach((x) => {
            const i = idx(x, y);
            gr += data[i * 4]; gg += data[i * 4 + 1]; gb += data[i * 4 + 2];
            borderCount++;
          });
        }
        gr /= borderCount; gg /= borderCount; gb /= borderCount;

        const globalDist = (i) => {
          const [r, g, b] = colorAt(i);
          return Math.sqrt((r - gr) ** 2 + (g - gg) ** 2 + (b - gb) ** 2);
        };

        const visited = new Uint8Array(n); // 1 = sudah masuk antrian sebagai background
        const bg = new Uint8Array(n); // 1 = background
        const queue = new Int32Array(n);
        let qHead = 0, qTail = 0;

        const seed = (i) => {
          if (!visited[i] && globalDist(i) <= globalTolerance) {
            visited[i] = 1;
            bg[i] = 1;
            queue[qTail++] = i;
          }
        };

        // Mulai dari seluruh piksel di bingkai (tepi) gambar
        for (let x = 0; x < width; x++) {
          seed(idx(x, 0));
          seed(idx(x, height - 1));
        }
        for (let y = 0; y < height; y++) {
          seed(idx(0, y));
          seed(idx(width - 1, y));
        }

        // Flood-fill: menyusuri warna yang berdekatan (lokal) TAPI tetap dibatasi
        // jarak absolut ke warna referensi global — ini pengaman anti-"bocor"
        while (qHead < qTail) {
          const i = queue[qHead++];
          const x = i % width;
          const y = (i - x) / width;
          const [r, g, b] = colorAt(i);

          const neighbors = [];
          if (x > 0) neighbors.push(i - 1);
          if (x < width - 1) neighbors.push(i + 1);
          if (y > 0) neighbors.push(i - width);
          if (y < height - 1) neighbors.push(i + width);

          for (const ni of neighbors) {
            if (visited[ni]) continue;
            if (globalDist(ni) > globalTolerance) continue; // pengaman jarak global
            const [nr, ng, nb] = colorAt(ni);
            const localDist = Math.sqrt((nr - r) ** 2 + (ng - g) ** 2 + (nb - b) ** 2);
            if (localDist <= localTolerance) {
              visited[ni] = 1;
              bg[ni] = 1;
              queue[qTail++] = ni;
            }
          }
        }

        // Feather: haluskan tepi seleksi dengan beberapa pass box-blur ringan
        let bgVal = new Float32Array(n);
        for (let i = 0; i < n; i++) bgVal[i] = bg[i] ? 255 : 0;

        for (let pass = 0; pass < featherPasses; pass++) {
          const next = new Float32Array(n);
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const i = idx(x, y);
              let sum = 0, count = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const nx = x + dx, ny = y + dy;
                  if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    sum += bgVal[idx(nx, ny)];
                    count++;
                  }
                }
              }
              next[i] = sum / count;
            }
          }
          bgVal = next;
        }

        // Terapkan alpha final: background jadi transparan, tepi halus (feathered)
        for (let i = 0; i < n; i++) {
          const bgFactor = bgVal[i] / 255; // 0 = foreground penuh, 1 = background penuh
          data[i * 4 + 3] = Math.round(data[i * 4 + 3] * (1 - bgFactor));
        }

        ctx.putImageData(imageData, 0, 0);
        if (!cancelled) {
          setProcessedSrc(canvas.toDataURL("image/png"));
          setStatus("done");
        }
      } catch (e) {
        if (!cancelled) setStatus("error");
      }
    };

    img.onerror = () => {
      if (!cancelled) setStatus("error");
    };

    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, localTolerance, globalTolerance, featherPasses]);

  return { processedSrc, status };
}

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu mobile

  const PHOTO_SRC = "/assets/profile/amanhaggaihtb.png";
  const { processedSrc, status } = useBackgroundRemoval(PHOTO_SRC, {
    localTolerance: 26,  // naikkan sedikit kalau backdrop bergradasi masih tersisa
    globalTolerance: 95, // JANGAN dinaikkan terlalu tinggi — ini pengaman anti-"bocor" ke wajah/jas
    featherPasses: 3,
  });

  // Selama proses berlangsung, tampilkan foto asli agar tidak blank
  const displaySrc = status === "done" && processedSrc ? processedSrc : PHOTO_SRC;

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

      {/* Body: split layout */}
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

          {/* Ambient glow di belakang siluet foto, memberi kesan foto "menyatu" dengan panel */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 220px 320px at 50% 55%, rgba(56,189,248,0.10) 0%, transparent 70%)",
            }}
          />

          {/* Grounding shadow: bayangan lonjong halus di bawah foto agar terasa "berdiri", bukan melayang */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[220px] h-8 lg:w-[260px] lg:h-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 75%)",
            }}
          />

          {/* Photo */}
          <div className="absolute inset-0 flex items-end justify-center pb-6 lg:pb-8">
            <div className="relative w-full flex flex-col items-center justify-end">
              <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[380px] lg:w-[320px] lg:h-[420px]">

                {/* Corner brackets: aksen garis sudut khas UI teknis, menandakan panel ini "dibingkai" sengaja */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 pointer-events-none z-10" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40 pointer-events-none z-10" />

                <div className="relative w-full h-full overflow-hidden">
                  {!imgError ? (
                    <img
                      src={displaySrc}
                      alt="Aman Haggai Hutabarat"
                      className="w-full h-full object-cover object-top transition-opacity duration-500"
                      style={{
                        // Saturasi diturunkan + hue-rotate kecil untuk menetralkan sedikit
                        // "cast" warna hangat dari refleksi backdrop merah yang lama, tanpa
                        // memotong atau mempersempit bagian tubuh
                        filter:
                          "saturate(0.82) contrast(1.08) brightness(0.98) hue-rotate(-6deg) drop-shadow(0 18px 22px rgba(0,0,0,0.45))",
                      }}
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#0f2340] via-[#1a3a60] to-[#0d1f33] flex items-center justify-center">
                      <span className="text-[60px] lg:text-[80px] font-black text-cyan-400/25 tracking-[-4px]">
                        AH
                      </span>
                    </div>
                  )}
                  {/* Fade tunggal, hanya arah bawah — pendekatan sederhana ini stabil di semua browser,
                      tidak seperti kombinasi dua mask sebelumnya yang memotong bahu di beberapa renderer */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16 lg:h-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(0deg, #060C18 0%, transparent 100%)",
                      opacity: 0.85,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

        
          {/* Side label */}
          <div
            className="hidden md:block absolute left-4 lg:left-6 bottom-20 text-[9px] font-semibold tracking-[0.2em] text-white/20 uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Teknik Informatika · Universitas Methodist Indonesia
          </div>

          {/* Diagonal clip edge */}
          <div
            className="hidden lg:block absolute top-0 right-[-1px] bottom-0 w-14 bg-[#060C18]"
            style={{ clipPath: "polygon(56px 0, 56px 100%, 0 100%)" }}
          />
        </div>

        {/* ── RIGHT: Content ── */}
        {/* DITAMBAHKAN: items-center text-center untuk HP, lg:items-start lg:text-left untuk laptop */}
        <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left justify-center px-6 py-10 lg:px-14 lg:py-14 relative bg-[#060C18]">
          
          {/* BNSP badge */}
          <div className="mb-6 lg:mb-0 lg:absolute lg:top-0 lg:right-0 lg:p-5">
            <div className="inline-flex lg:flex items-center gap-2 bg-[#0f1728]/90 border border-white/[0.08] rounded-lg px-3 py-2 text-left">
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
          {/* DITAMBAHKAN: justify-center lg:justify-start */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-5 w-full">
            <div className="w-5 h-[1.5px] bg-cyan-400" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
              S1 Teknik Informatika
            </span>
          </div>

          {/* Open to Work */}
          <div className="inline-flex items-center gap-1.5 bg-cyan-400/[0.06] border border-cyan-400/25 rounded-full px-3.5 py-1.5 text-[10.5px] font-semibold text-cyan-300 tracking-[0.05em] w-fit mb-5">
            <span className="relative flex-shrink-0 w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-cyan-400" />
              <span
                className="absolute -inset-1 rounded-full bg-cyan-400/50"
                style={{ animation: "heroGlow 2.4s ease-in-out infinite" }}
              />
            </span>
            Open to Work
          </div>
          <style>{`
            @keyframes heroGlow {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 0; transform: scale(1.8); }
            }
          `}</style>

          {/* Name */}
          <h1 className="text-4xl md:text-[52px] font-black leading-none tracking-[-1.5px] md:tracking-[-2.5px] text-slate-100 mb-2">
            Aman Haggai
            <span className="block text-cyan-400">Hutabarat</span>
          </h1>

          {/* Role tags */}
          {/* DITAMBAHKAN: justify-center lg:justify-start */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 mt-4 mb-6">
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
          {/* DITAMBAHKAN: mx-auto lg:mx-0 */}
          <p className="text-[12.5px] lg:text-[13.5px] text-white/45 leading-relaxed max-w-sm mx-auto lg:mx-0 mb-8">
            Membangun solusi digital yang berdampak — dari analitik data hingga
            aplikasi web modern. Berdedikasi pada kualitas, ketepatan, dan nilai
            nyata bagi pengguna.
          </p>

          {/* Skill chips */}
          {/* DITAMBAHKAN: justify-center lg:justify-start */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 mb-9">
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
          {/* DITAMBAHKAN: justify-center lg:justify-start */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10 w-full">
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

          {/* Stats */}
          {/* DITAMBAHKAN: justify-center lg:justify-start w-full */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-y-6 gap-x-0 border-t border-white/[0.07] pt-7 w-full">
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
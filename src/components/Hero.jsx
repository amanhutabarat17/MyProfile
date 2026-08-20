import { useState, useEffect } from "react"; // Hapus useRef karena tidak dipakai

// Hook useBackgroundRemoval tetap dipertahankan persis seperti aslinya
function useBackgroundRemoval(
  src,
  { localTolerance = 26, globalTolerance = 95, featherPasses = 3 } = {},
) {
  const [processedSrc, setProcessedSrc] = useState(null);
  const [status, setStatus] = useState("loading");

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

        let gr = 0, gg = 0, gb = 0, borderCount = 0;

        for (let x = 0; x < width; x++) {
          const yTop = 0;
          const iTop = idx(x, yTop);
          gr += data[iTop * 4]; gg += data[iTop * 4 + 1]; gb += data[iTop * 4 + 2];
          borderCount++;

          const yBottom = height - 1;
          const iBottom = idx(x, yBottom);
          gr += data[iBottom * 4]; gg += data[iBottom * 4 + 1]; gb += data[iBottom * 4 + 2];
          borderCount++;
        }

        for (let y = 0; y < height; y++) {
          const xLeft = 0;
          const iLeft = idx(xLeft, y);
          gr += data[iLeft * 4]; gg += data[iLeft * 4 + 1]; gb += data[iLeft * 4 + 2];
          borderCount++;

          const xRight = width - 1;
          const iRight = idx(xRight, y);
          gr += data[iRight * 4]; gg += data[iRight * 4 + 1]; gb += data[iRight * 4 + 2];
          borderCount++;
        }

        gr /= borderCount; gg /= borderCount; gb /= borderCount;

        const globalDist = (i) => {
          const [r, g, b] = colorAt(i);
          return Math.sqrt((r - gr) ** 2 + (g - gg) ** 2 + (b - gb) ** 2);
        };

        const visited = new Uint8Array(n);
        const bg = new Uint8Array(n);
        const queue = new Int32Array(n);
        let qHead = 0, qTail = 0;

        const seed = (i) => {
          if (!visited[i] && globalDist(i) <= globalTolerance) {
            visited[i] = 1; bg[i] = 1; queue[qTail++] = i;
          }
        };

        for (let x = 0; x < width; x++) {
          seed(idx(x, 0)); seed(idx(x, height - 1));
        }
        for (let y = 0; y < height; y++) {
          seed(idx(0, y)); seed(idx(width - 1, y));
        }

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
            if (globalDist(ni) > globalTolerance) continue;
            const [nr, ng, nb] = colorAt(ni);
            const localDist = Math.sqrt((nr - r) ** 2 + (ng - g) ** 2 + (nb - b) ** 2);
            if (localDist <= localTolerance) {
              visited[ni] = 1; bg[ni] = 1; queue[qTail++] = ni;
            }
          }
        }

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
                    sum += bgVal[idx(nx, ny)]; count++;
                  }
                }
              }
              next[i] = sum / count;
            }
          }
          bgVal = next;
        }

        for (let i = 0; i < n; i++) {
          const bgFactor = bgVal[i] / 255;
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
    return () => { cancelled = true; };
  }, [src, localTolerance, globalTolerance, featherPasses]);

  return { processedSrc, status };
}

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -15; 
    const tiltY = ((x - centerX) / centerX) * 15;  

    setTilt({ x: tiltX, y: tiltY });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const roles = ["Data Scientist", "Web Developer", "Backend Developer", "Software Engineer"];
  const [currentRole, setCurrentRole] = useState(0);
  const [fadeRole, setFadeRole] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeRole(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setFadeRole(true);
      }, 300); 
    }, 2800); 
    return () => clearInterval(interval);
  }, [roles.length]);

  const PHOTO_SRC = "/assets/profile/amanhaggaihtb.png";
  const { processedSrc, status } = useBackgroundRemoval(PHOTO_SRC, {
    localTolerance: 10,
    globalTolerance: 15,
    featherPasses: 3,
  });

  const displaySrc = status === "done" && processedSrc ? processedSrc : PHOTO_SRC;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col overflow-hidden relative font-sans bg-[#040811]"
    >
      {/* Menggunakan dangerouslySetInnerHTML agar Vercel tidak rewel */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.8); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }

        .cyan-text-gradient {
          background-image: linear-gradient(135deg, #00ffff, #00aaaa, #008888);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        }

        .photo-frame-corner-gradient {
          border-image: linear-gradient(135deg, #00ffff, #00aaaa) 1;
        }

        .btn-primary-gradient {
          background: linear-gradient(135deg, #00ffff, #00aaaa);
          color: #040811;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
          transition: all 0.3s ease;
        }
        .btn-primary-gradient:hover {
          background: linear-gradient(135deg, #ccffff, #00ffff);
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.7);
        }

        .bg-deep-gradient {
          background: radial-gradient(ellipse 900px 750px at 30% 38%, rgba(13, 170, 170, 0.25) 0%, rgba(10, 60, 65, 0.15) 45%, transparent 75%);
        }
      `}} />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Orbs Background */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" style={{ animation: 'floatOrb 8s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0" style={{ animation: 'floatOrb 10s ease-in-out infinite 1s' }} />

      {/* Navbar */}
      <nav className="relative z-50 px-6 lg:px-12 py-5 border-b border-white/[0.04] bg-[#040811]/60 backdrop-blur-xl sticky top-0 w-full transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-[0.15em] text-cyan-400 uppercase hover:text-white transition-colors cursor-pointer">
            MY.PORTFOLIO
          </span>

          <div className="hidden md:flex gap-8">
            {["Home", "Experience", "Projects", "Certifications", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-[12.5px] font-medium text-white/50 hover:text-cyan-400 tracking-[0.06em] transition-all group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-cyan-400 focus:outline-none transition-transform hover:scale-110"
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

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-64 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col gap-4 pb-4">
            {["Home", "Experience", "Projects", "Certifications", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-[13px] font-medium text-white/60 hover:text-cyan-400 hover:pl-2 tracking-[0.06em] transition-all"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Body */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1 min-h-0 bg-deep-gradient">
        
        {/* === PEMISAH MERENG DIAGONAL (SLANTED SEPARATOR) === */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-[-10%] w-[55%] bg-[#08111e]/90 transform skewX(-12deg) border-r border-cyan-500/30 shadow-[15px_0_40px_rgba(0,255,255,0.08)] z-0 backdrop-blur-sm">
           <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-80" />
        </div>

        {/* Left Image Section */}
        <div className="relative z-10 w-full lg:w-[45%] h-[420px] sm:h-[480px] lg:h-auto flex-shrink-0 overflow-visible group perspective-[1000px] flex items-center justify-center">

          {/* Mouse Hover 3D Tilt Area */}
          <div className="absolute inset-0 flex items-center justify-center pt-8 lg:pt-0" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div
              className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[380px] lg:w-[340px] lg:h-[440px] transition-transform duration-200 ease-out animate-fade-up"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 photo-frame-corner-gradient transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 pointer-events-none z-10" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 photo-frame-corner-gradient transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1 pointer-events-none z-10" />

              <div className="relative w-full h-full overflow-hidden bg-[#060c18]/50 backdrop-blur-sm border border-white/5 rounded-sm shadow-2xl">
                {!imgError ? (
                  <img
                    src={displaySrc}
                    alt="Aman Haggai Hutabarat"
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                    style={{ filter: "saturate(0.9) contrast(1.15) brightness(0.95) drop-shadow(0 15px 20px rgba(0,0,0,0.5))" }}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0f2340] to-[#040811] flex items-center justify-center">
                    <span className="text-[70px] font-black cyan-text-gradient tracking-[-4px]">AH</span>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-[#040811] to-transparent opacity-90" />
              </div>
            </div>
          </div>

          <div className="hidden md:block absolute left-4 lg:left-8 bottom-24 text-[10px] font-bold tracking-[0.25em] text-cyan-400/20 uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Teknik Informatika · Universitas Methodist
          </div>
        </div>

        {/* Right Content Section */}
        <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left justify-center px-6 py-10 lg:pl-16 lg:pr-14 relative z-10">

          <div className="mb-6 lg:mb-0 lg:absolute lg:top-10 lg:right-10 animate-fade-up">
            <div className="inline-flex items-center gap-3 bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-2.5 text-left hover:bg-white/[0.05] hover:border-cyan-400/30 transition-all cursor-default hover:-translate-y-1 transform duration-300 backdrop-blur-md shadow-lg">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <div className="text-[12px] font-bold text-slate-100 leading-none">BNSP Certified</div>
                <div className="text-[10px] text-cyan-400/60 mt-1 font-medium tracking-wide">Sertifikasi Nasional</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5 w-full animate-fade-up delay-100">
            <div className="w-6 h-[2px] bg-cyan-400 rounded-full" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
              S1 Teknik Informatika
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-cyan-400/[0.08] border border-cyan-400/30 rounded-full px-4 py-1.5 text-[11px] font-semibold text-cyan-300 tracking-[0.05em] w-fit mb-6 animate-fade-up delay-100 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <span className="relative flex-shrink-0 w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-cyan-400" />
              <span className="absolute -inset-1 rounded-full bg-cyan-400/60" style={{ animation: "heroGlow 2s ease-in-out infinite" }} />
            </span>
            Open to Work
          </div>

          <h1 className="text-4xl md:text-[56px] font-black leading-[1.1] tracking-[-1.5px] md:tracking-[-2px] text-slate-100 mb-3 animate-fade-up delay-200">
            Aman Haggai
            <span className="block cyan-text-gradient mt-1">Hutabarat</span>
          </h1>

          <div className="h-8 mt-2 mb-6 animate-fade-up delay-200 flex items-center justify-center lg:justify-start">
             <span className="text-lg md:text-2xl font-semibold text-white/70">
               Saya seorang{' '}
               <span 
                  className={`text-cyan-300 border-b-2 border-cyan-400/50 transition-opacity duration-300 ease-in-out ${fadeRole ? 'opacity-100' : 'opacity-0'}`}
               >
                 {roles[currentRole]}
               </span>
             </span>
          </div>

          <p className="text-[13px] md:text-[14.5px] text-white/50 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 animate-fade-up delay-300 font-light">
            Membangun solusi digital yang berdampak — dari analitik data hingga aplikasi web modern. Berdedikasi pada kualitas, ketepatan, dan nilai nyata bagi pengguna.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10 animate-fade-up delay-300 max-w-lg">
            {["Python", "Machine Learning", "React", "Data Visualization", "SQL", "Laravel", "Java","JavaScript"].map((tag) => (
              <span key={tag} className="text-[11px] font-medium px-3 py-1.5 bg-white/[0.03] border border-white/10 text-slate-300 rounded-md hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:text-cyan-300 hover:-translate-y-0.5 transition-all cursor-default">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12 w-full animate-fade-up delay-400">
            <a href="#projects" className="btn-primary-gradient text-[13px] font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 text-center flex items-center gap-2">
              View My Work
            </a>
            <a href="#contact" className="border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 text-[13px] font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 text-center flex items-center gap-2">
              Hire Me 
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-y-6 gap-x-0 border-t border-white/10 pt-8 w-full animate-fade-up delay-400">
            {[ { num: "3.72", label: "IPK" }, { num: "3.5", label: "Tahun Lulus" }, { num: "1", label: "Sertifikasi BNSP" } ].map((s, i, arr) => (
              <div key={i} className={`pr-6 mr-6 lg:pr-10 lg:mr-10 ${ i < arr.length - 1 ? "border-r border-white/10" : "" } hover:-translate-y-1 transition-transform cursor-default group`}>
                <div className="text-[24px] lg:text-[30px] font-black text-white group-hover:text-cyan-400 transition-colors leading-none tracking-tight">
                  {s.num}
                  {s.label === "Tahun Lulus" && <span className="text-lg font-bold text-cyan-400/60 ml-1">yr</span>}
                </div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mt-2 group-hover:text-white/70 transition-colors">
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
import { useState, useEffect } from "react";

const projectData = [
  {
    eyebrow: "Proyek PKL — Laravel",
    title: "Sistem Penjadwalan Kunjungan BPJS",
    desc: "Aplikasi manajemen klaim JKM berbasis web untuk BPJS Ketenagakerjaan. Dashboard menampilkan status klaim dengan kode warna otomatis — merah untuk klaim lebih dari 6 bulan, kuning untuk kurang dari 6 bulan, dan hijau untuk yang sudah diterima. Dilengkapi fitur ekspor data ke Excel dan integrasi lokasi kunjungan petugas secara real-time.",
    tech: ["Laravel", "Export Excel", "Lokasi", "MySQL"],
    link: "https://github.com/amanhutabarat17/PKL.git",
    images: [
      "/assets/projekPKlLaravel.jpeg",
      "/assets/projekPKLLARAVEL1.jpeg",
    ],
  },
  {
    eyebrow: "Proyek Mandiri — PHP Native",
    title: "BRay.Store — Toko Sepatu Kasir & Admin",
    desc: "Platform penjualan sepatu dengan dua mode akses: panel kasir untuk transaksi harian dan panel admin untuk manajemen produk dan laporan. Terintegrasi dengan Midtrans untuk mendukung berbagai metode pembayaran termasuk QRIS, virtual account BCA/BNI/Mandiri, ShopeePay, dan kartu kredit.",
    tech: ["PHP Native", "Midtrans", "MySQL"],
    link: "https://github.com/amanhutabarat17/TokoSepatu.git",
    images: [
      "/assets/proyekphpnative.jpeg",
      "/assets/proyekphpnative1.jpeg",
    ],
  },
];

/* Lightbox: modal fullscreen untuk melihat gambar proyek dalam ukuran besar */
function Lightbox({ project, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setCurrent((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight") {
        setCurrent((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    // Kunci scroll body selagi modal terbuka
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, project.images.length]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* Tombol tutup */}
      <button
        onClick={onClose}
        aria-label="Tutup"
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-cyan-400 text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
      >
        ×
      </button>

      {/* Judul proyek di atas gambar */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 text-white/70 text-sm md:text-base">
        <span className="text-cyan-400 font-semibold">{project.title}</span>
        <span className="ml-2 text-white/40">
          {current + 1} / {project.images.length}
        </span>
      </div>

      {/* Gambar besar, klik gambar tidak menutup modal */}
      <img
        src={project.images[current]}
        alt={`${project.title} screenshot ${current + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
      />

      {project.images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
            }}
            aria-label="Gambar sebelumnya"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-cyan-500/80 text-white text-2xl px-3 py-2 rounded-full transition"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
            }}
            aria-label="Gambar berikutnya"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-cyan-500/80 text-white text-2xl px-3 py-2 rounded-full transition"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpenLightbox }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg hover:border-cyan-400 transition flex flex-col gap-4">

      {/* Kontainer gambar, sekarang bisa diklik untuk memperbesar */}
      <div className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center group">
        <img
          src={project.images[current]}
          alt={`${project.title} screenshot ${current + 1}`}
          onClick={() => onOpenLightbox(project, current)}
          className="w-full h-full object-contain transition-all duration-300 cursor-zoom-in"
        />

        {/* Indikator hover: memberi tahu gambar bisa diperbesar */}
        <div
          onClick={() => onOpenLightbox(project, current)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition cursor-zoom-in"
        >
          <span className="opacity-0 group-hover:opacity-100 transition text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">
            🔍 Perbesar
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white text-lg px-2 py-1 rounded-full transition z-10"
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white text-lg px-2 py-1 rounded-full transition z-10"
        >
          ›
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition ${i === current ? "bg-cyan-400" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">
          {project.eyebrow}
        </p>
        <h3 className="text-lg font-bold text-cyan-400">{project.title}</h3>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed">{project.desc}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t, idx) => (
          <span
            key={idx}
            className="bg-slate-800 text-cyan-400 text-xs px-3 py-1 rounded-full border border-slate-700"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-700 flex items-center justify-between">
        <span className="text-xs text-green-400 border border-green-800 bg-green-950 px-2 py-1 rounded-full">
          ✓ Selesai
        </span>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-cyan-400 hover:underline"
        >
          GitHub &rarr;
        </a>
      </div>

    </div>
  );
}

export default function Projects() {
  const [lightbox, setLightbox] = useState(null); // { project, startIndex } | null

  return (
    <section id="projects" className="py-20 bg-slate-800 text-white px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 border-b-2 border-cyan-500 w-fit mx-auto pb-2">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projectData.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onOpenLightbox={(proj, idx) => setLightbox({ project: proj, startIndex: idx })}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/amanhutabarat17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 border border-slate-600 rounded-lg px-5 py-2 hover:border-cyan-400 hover:text-cyan-400 transition"
          >
            ⭐ Lihat semua proyek di GitHub &rarr;
          </a>
        </div>

      </div>

      {lightbox && (
        <Lightbox
          project={lightbox.project}
          startIndex={lightbox.startIndex}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
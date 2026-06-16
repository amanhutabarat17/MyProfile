import { useState } from "react";

const projectData = [
  {
    eyebrow: "Proyek PKL — Laravel",
    title: "Sistem Penjadwalan Kunjungan BPJS",
    desc: "Aplikasi manajemen klaim JKM berbasis web untuk BPJS Ketenagakerjaan. Dashboard menampilkan status klaim dengan kode warna otomatis — merah untuk klaim lebih dari 6 bulan, kuning untuk kurang dari 6 bulan, dan hijau untuk yang sudah diterima. Dilengkapi fitur ekspor data ke Excel dan integrasi lokasi kunjungan petugas secara real-time.",
    tech: ["Laravel", "Export Excel", "Lokasi", "MySQL"],
    link: "https://github.com/amanhutabarat17",
    images: [
      "/assets/projekPKLLaravel.jpeg",
      "/assets/projekPKLLARAVEL1.jpeg",
    ],
  },
  {
    eyebrow: "Proyek Mandiri — PHP Native",
    title: "BRay.Store — Toko Sepatu Kasir & Admin",
    desc: "Platform penjualan sepatu dengan dua mode akses: panel kasir untuk transaksi harian dan panel admin untuk manajemen produk dan laporan. Terintegrasi dengan Midtrans untuk mendukung berbagai metode pembayaran termasuk QRIS, virtual account BCA/BNI/Mandiri, ShopeePay, dan kartu kredit.",
    tech: ["PHP Native", "Midtrans", "MySQL"],
    link: "https://github.com/amanhutabarat17",
    images: [
      "/assets/proyekphpnative.jpeg",
      "/assets/proyekphpnative1.jpeg",
    ],
  },
];

function ProjectCard({ project }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg hover:border-cyan-400 transition flex flex-col gap-4">

      {/* Kontainer gambar dengan penambahan bg-slate-800 */}
      <div className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
        <img
          src={project.images[current]}
          alt={`${project.title} screenshot ${current + 1}`}
          /* object-cover diubah menjadi object-contain agar gambar nampak semua */
          className="w-full h-full object-contain transition-all duration-300"
        />
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white text-lg px-2 py-1 rounded-full transition"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white text-lg px-2 py-1 rounded-full transition"
        >
          ›
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
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
        
        {/* Atribut href dan class dimasukkan ke dalam tag <a> */}
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
  return (
    <section id="projects" className="py-20 bg-slate-800 text-white px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 border-b-2 border-cyan-500 w-fit mx-auto pb-2">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projectData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          {/* Atribut href dan class dimasukkan ke dalam tag <a> */}
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
    </section>
  );
}
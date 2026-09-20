import { useState } from "react"

const certData = [
  {
    name: "Associate Data Scientist (SKKNI)",
    issuer: "BNSP — Badan Nasional Sertifikasi Profesi",
    year: "Januari 2026",
    badge: "Data Science",
    icon: "📊",
    type: "Sertifikat Kompetensi",
    image: "/assets/certs/bnsp.jpeg",
    description: "Sertifikasi kompetensi nasional bidang Data Science berdasarkan Standar Kompetensi Kerja Nasional Indonesia (SKKNI), mencakup pengolahan data, pemodelan statistik, dan machine learning.",
  },
  {
    name: "NextGen Finance: Financial Resilience & AI Masterclass",
    issuer: "dibimbing.id × LPS — Lembaga Penjamin Simpanan",
    year: "Mei 2026",
    badge: "Finance & AI",
    icon: "🤖",
    type: "Certificate of Participation",
    image: "/assets/certs/lps.jpg",
    description: "Masterclass kolaborasi dibimbing.id dan LPS yang membahas ketahanan finansial di era AI, termasuk manajemen risiko, literasi keuangan digital, dan penerapan AI dalam industri keuangan.",
  },
  {
    name: "Google I/O Extended Medan 2024",
    issuer: "Google Developer Groups Medan",
    year: "Juli 2024",
    badge: "Google",
    icon: "🌐",
    type: "Certificate of Participation",
    image: "/assets/certs/google-io.jpg",
    description: "Event tahunan Google Developer Groups Medan yang menghadirkan sesi teknis seputar teknologi terbaru Google, mulai dari AI/ML, Flutter, Firebase, hingga Google Cloud Platform.",
  },
  {
    name: "Workshop Full Stack Laravel",
    issuer: "Dunia Coding — Ahmad Darmawan Alfir D.",
    year: "Agustus 2024",
    badge: "Web Dev",
    icon: "💻",
    type: "E-Certificate",
    image: "/assets/certs/laravel.jpg",
    description: "Workshop intensif pengembangan web full stack menggunakan Laravel, mencakup arsitektur MVC, RESTful API, autentikasi, manajemen database, dan deployment aplikasi.",
  },
];

const badgeColor = {
  "Data Science": "bg-cyan-900/80 text-cyan-300 border-cyan-700",
  "Finance & AI": "bg-purple-900/80 text-purple-300 border-purple-700",
  "Google":       "bg-green-900/80 text-green-300 border-green-700",
  "Web Dev":      "bg-indigo-900/80 text-indigo-300 border-indigo-700",
};

const stampRing = {
  "Data Science": "ring-cyan-500/60",
  "Finance & AI": "ring-purple-500/60",
  "Google":       "ring-green-500/60",
  "Web Dev":      "ring-indigo-500/60",
};

export default function Certifications() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="certifications" className="py-20 bg-slate-900 text-white px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 border-b-2 border-cyan-500 w-fit mx-auto pb-2">
          Certifications
        </h2>
        <p className="text-center text-slate-500 text-sm mb-12">
          Klik kartu untuk melihat sertifikat dalam ukuran penuh
        </p>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-10">
          {certData.map((c, i) => (
            <div
              key={i}
              onClick={() => setSelected(c)}
              className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-400/70 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer"
            >
              {/* Foto sertifikat sebagai hero kartu */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient supaya badge & teks tetap terbaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/10 to-slate-950/30" />

                {/* Ribbon kategori pojok kanan atas */}
                <span
                  className={`absolute top-3 right-3 text-[11px] font-semibold border backdrop-blur-sm px-2.5 py-1 rounded-full ${badgeColor[c.badge]}`}
                >
                  {c.badge}
                </span>

                {/* Tahun pojok kiri atas */}
                <span className="absolute top-3 left-3 text-[11px] text-slate-300 bg-slate-950/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-700/60">
                  {c.year}
                </span>

                {/* Hint zoom saat hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition">
                  <span className="opacity-0 group-hover:opacity-100 transition text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">
                    🔍 Lihat sertifikat
                  </span>
                </div>
              </div>

              {/* Konten teks, dengan "stempel" icon menindih batas foto */}
              <div className="relative px-5 pb-5 pt-9">
                <div
                  className={`absolute -top-7 left-5 w-14 h-14 rounded-full bg-slate-900 ring-4 ${stampRing[c.badge]} flex items-center justify-center text-2xl shadow-lg rotate-[-8deg] group-hover:rotate-[4deg] group-hover:scale-105 transition-transform duration-300`}
                >
                  {c.icon}
                </div>

                <p className="text-xs text-slate-500 uppercase tracking-widest">{c.type}</p>
                <p className="font-semibold text-sm text-slate-100 leading-snug mt-1">{c.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{c.issuer}</p>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-slate-900 rounded-2xl border border-slate-700 max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-5 border-b border-slate-700">
              <div className="flex gap-3 items-center">
                <span
                  className={`w-11 h-11 rounded-full bg-slate-800 ring-4 ${stampRing[selected.badge]} flex items-center justify-center text-xl flex-shrink-0`}
                >
                  {selected.icon}
                </span>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{selected.type}</p>
                  <p className="font-semibold text-slate-100 text-sm leading-snug">{selected.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{selected.issuer} · {selected.year}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-500 hover:text-white transition text-xl leading-none flex-shrink-0 ml-4"
              >
                ✕
              </button>
            </div>

            {/* Gambar Sertifikat */}
            <div className="p-4 bg-slate-950">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full rounded-lg object-contain max-h-[70vh]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
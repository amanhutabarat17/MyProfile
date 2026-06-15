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
  "Data Science": "bg-cyan-900 text-cyan-300 border-cyan-700",
  "Finance & AI": "bg-purple-900 text-purple-300 border-purple-700",
  "Google":       "bg-green-900 text-green-300 border-green-700",
  "Web Dev":      "bg-indigo-900 text-indigo-300 border-indigo-700",
};

export default function Certifications() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="certifications" className="py-20 bg-slate-900 text-white px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 border-b-2 border-cyan-500 w-fit mx-auto pb-2">
          Certifications
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {certData.map((c, i) => (
            <div
              key={i}
              onClick={() => setSelected(c)}
              className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex gap-4 items-start hover:border-cyan-400 transition cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl flex-shrink-0">
                {c.icon}
              </div>
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <p className="text-xs text-slate-500 uppercase tracking-widest">{c.type}</p>
                <p className="font-semibold text-sm text-slate-100 leading-snug">{c.name}</p>
                <p className="text-xs text-slate-500">{c.issuer}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-xs border px-2 py-0.5 rounded-full ${badgeColor[c.badge]}`}>
                    {c.badge}
                  </span>
                  <span className="text-xs text-slate-600">{c.year}</span>
                </div>
                {/* Deskripsi */}
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {c.description}
                </p>
              </div>
              {/* Icon klik */}
              <div className="text-slate-600 group-hover:text-cyan-400 transition flex-shrink-0 mt-1 text-xs">
                🔍
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
            className="bg-slate-900 rounded-2xl border border-slate-700 max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-5 border-b border-slate-700">
              <div className="flex gap-3 items-center">
                <span className="text-2xl">{selected.icon}</span>
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
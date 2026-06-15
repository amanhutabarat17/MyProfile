const experienceData = [
  {
    role: "Asisten Laboratorium",
    company: "UMI Medan",
    period: "Mar 2024–Jul 2024 | Mar 2025–Jul 2025",
    desc: "Mengelola 6 kelas praktikum untuk mata kuliah Struktur Data, PBO, dan Pemrograman Web. Membimbing praktikan dalam implementasi algoritma efisien, struktur data kompleks, dan prinsip OOP. Melakukan code review dan evaluasi tugas mingguan.",
    tech: ["HTML/CSS", "JavaScript", "Laravel", "OOP", "Data Structures"],
  },
  {
    role: "Program Magang",
    company: "BPJS TK Medan Kota",
    period: "Agustus 2025 – September 2025",
    desc: "Melakukan verifikasi dan rekonsiliasi klaim medis pasien di rumah sakit mitra. Menyusun laporan pengeluaran biaya (itemized billing). Memproduksi konten visual melalui desain grafis dan pengeditan video untuk kebutuhan sosialisasi.",
    tech: ["Ms. Office", "Excel", "Desain Grafis", "Video Editing"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-slate-900 text-white px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 border-b-2 border-cyan-500 w-fit mx-auto pb-2">
          Work Experience
        </h2>
        <div className="flex flex-col">
          {experienceData.map((exp, i) => (
            <div key={i} className="flex gap-5 pb-10 last:pb-0">
              <div className="flex flex-col items-center pt-1 w-10 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-900 flex-shrink-0" />
                {i < experienceData.length - 1 && (
                  <div className="flex-1 w-px bg-slate-700 mt-1" />
                )}
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex-1 hover:border-cyan-400 transition">
                <div className="flex justify-between items-start gap-3 mb-1 flex-wrap">
                  <span className="text-cyan-400 font-semibold">{exp.role}</span>
                  <span className="text-xs text-slate-500 bg-slate-900 border border-slate-700 rounded px-2 py-1 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-3">{exp.company}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{exp.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((t, idx) => (
                    <span key={idx} className="text-xs bg-slate-900 text-cyan-400 border border-slate-700 px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
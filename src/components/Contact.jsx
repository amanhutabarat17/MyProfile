export default function Contact() {
  const contactInfo = [
    {
      icon: "✉️",
      label: "Email",
      value: "hutabarataman21@gmail.com",
      href: "mailto:hutabarataman21@gmail.com",
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: "github.com/amanhutabarat17",
      href: "https://github.com/amanhutabarat17",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "Aman Haggai Hutabarat",
      href: "https://www.linkedin.com/in/aman-haggai-hutabarat-2ab6b1298",
    },
    {
      icon: "📍",
      label: "Lokasi",
      value: "Tarutung, Sumatera Utara",
      href: null,
    },
    {
      icon: "📞",
      label: "WhatsApp",
      value: "082375448129",
      href: "https://wa.me/6282375448129",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 border-b-2 border-cyan-500 w-fit mx-auto pb-2">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <p className="text-slate-400 text-sm leading-relaxed">
              Saya terbuka untuk peluang baru, kolaborasi, maupun sekadar
              ngobrol soal teknologi. Jangan ragu untuk menghubungi saya!
            </p>

            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">
                    {item.label}
                  </p>

                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-300 hover:text-cyan-400 hover:underline transition"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-300">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Link Formspree dimasukkan langsung ke action */}
          <form
            action="https://formspree.io/f/mdavjnpk"
            method="POST"
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 uppercase tracking-widest">
                Nama
              </label>
              <input
                type="text"
                name="nama"
                required
                placeholder="Nama kamu"
                className="bg-slate-800 border border-slate-700 rounded-lg text-sm text-white px-4 py-2.5 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="email@kamu.com"
                className="bg-slate-800 border border-slate-700 rounded-lg text-sm text-white px-4 py-2.5 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 uppercase tracking-widest">
                Pesan
              </label>
              <textarea
                name="pesan"
                required
                rows={5}
                placeholder="Tulis pesanmu di sini..."
                className="bg-slate-800 border border-slate-700 rounded-lg text-sm text-white px-4 py-2.5 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-fit flex items-center gap-2 border border-cyan-400 text-cyan-400 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition"
            >
              ✈ Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

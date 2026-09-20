import { useState } from "react";

/* Ikon SVG inline — tidak perlu install package tambahan.
   Mail & MapPin: gaya outline (Feather icons, MIT license).
   GitHub, LinkedIn, WhatsApp: logo brand (Simple Icons, CC0). */

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function IconMapPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconGithub(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconLinkedin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconWhatsapp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const contactInfo = [
    {
      icon: IconMail,
      label: "Email",
      value: "hutabarataman21@gmail.com",
      href: "mailto:hutabarataman21@gmail.com",
      hoverColor: "group-hover:text-cyan-400",
    },
    {
      icon: IconGithub,
      label: "GitHub",
      value: "github.com/amanhutabarat17",
      href: "https://github.com/amanhutabarat17",
      hoverColor: "group-hover:text-white",
    },
    {
      icon: IconLinkedin,
      label: "LinkedIn",
      value: "Aman Haggai Hutabarat",
      href: "https://www.linkedin.com/in/aman-haggai-hutabarat-2ab6b1298",
      hoverColor: "group-hover:text-sky-400",
    },
    {
      icon: IconMapPin,
      label: "Lokasi",
      value: "Sumedang, Jawa Barat ",
      href: null,
      hoverColor: "group-hover:text-rose-400",
    },
    {
      icon: IconWhatsapp,
      label: "WhatsApp",
      value: "082375448129",
      href: "https://wa.me/6282375448129",
      hoverColor: "group-hover:text-green-400",
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mdavjnpk", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

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

            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-cyan-400/60 transition">
                    <Icon className={`w-5 h-5 text-slate-400 transition ${item.hoverColor}`} />
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
              );
            })}
          </div>

          {/* Form hilang setelah terkirim, diganti pesan sukses */}
          {status === "sent" ? (
            <div className="flex flex-col items-start gap-3 bg-slate-900 border border-cyan-500/40 rounded-lg p-6">
              <div className="text-3xl">✅</div>
              <p className="text-lg font-semibold text-cyan-400">
                Pesan terkirim!
              </p>
              <p className="text-sm text-slate-400">
                Terima kasih sudah menghubungi saya. Saya akan membalas
                secepatnya.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs text-slate-500 hover:text-cyan-400 underline transition"
              >
                Kirim pesan lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                disabled={status === "sending"}
                className="w-fit flex items-center gap-2 border border-cyan-400 text-cyan-400 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Mengirim..." : "✈ Kirim Pesan"}
              </button>

              {status === "error" && (
                <p className="text-xs text-red-400">
                  Gagal mengirim pesan. Coba lagi atau hubungi lewat email/WA.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
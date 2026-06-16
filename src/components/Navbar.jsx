import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Daftar menu untuk menghindari penulisan ulang kode
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900 text-white z-50 shadow-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wider text-cyan-400">
          MY.PORTFOLIO
        </h1>

        {/* Menu Desktop (Disembunyikan di layar HP, tampil di layar medium ke atas) */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-cyan-400 transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Tombol Hamburger untuk Layar HP */}
        <button
          className="md:hidden text-slate-300 hover:text-cyan-400 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            // Ikon Silang (Tutup)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Ikon Hamburger (Buka)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown Menu untuk Layar HP */}
      {/* Tampil hanya jika tombol diklik (isOpen = true) */}
      <div
        className={`md:hidden bg-slate-900 border-b border-slate-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-4 py-2 space-y-3 pb-4 text-sm font-medium">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)} // Tutup menu otomatis saat link diklik
              className="block hover:text-cyan-400 transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
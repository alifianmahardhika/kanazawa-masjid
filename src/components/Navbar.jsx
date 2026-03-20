import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";

const FLAG_SRCS = {
  en: 'https://flagcdn.com/w20/gb.png',
  id: 'https://flagcdn.com/w20/id.png',
  ja: 'https://flagcdn.com/w20/jp.png',
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'id', name: 'Indonesia' },
  { code: 'ja', name: '日本語' },
]

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/news", label: t("nav.news") },
    { to: "/events", label: t("nav.events") },
    { to: "/contact", label: t("nav.contact") },
    { to: "/donate", label: t("nav.donate") },
  ];

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
    }`;

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e) => {
      if (!e.target.closest('[data-lang-dropdown]')) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="font-bold text-gray-900 text-sm leading-tight">
              Kanazawa
              <br />
              Masjid
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Language dropdown */}
            <div className="relative" data-lang-dropdown>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
              >
                <img src={FLAG_SRCS[currentLang.code]} alt={currentLang.name} className="w-5 h-auto rounded-sm" />
                <span>{currentLang.name}</span>
                <svg className="h-3 w-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setDropdownOpen(false) }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                        lang === l.code ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <img src={FLAG_SRCS[l.code]} alt={l.name} className="w-5 h-auto rounded-sm" />
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: lang dropdown + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <div className="relative" data-lang-dropdown>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
              >
                <img src={FLAG_SRCS[currentLang.code]} alt={currentLang.name} className="w-4 h-auto rounded-sm" />
                <span>{currentLang.name}</span>
                <svg className="h-3 w-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setDropdownOpen(false) }}
                      className={`w-full flex items-center gap-2 px-2 py-2 text-xs text-left transition-colors ${
                        lang === l.code ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <img src={FLAG_SRCS[l.code]} alt={l.name} className="w-4 h-auto rounded-sm" />
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

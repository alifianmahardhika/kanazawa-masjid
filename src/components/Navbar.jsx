import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/news", label: t("nav.news") },
    { to: "/events", label: t("nav.events") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
    }`;

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

            {/* Language toggle */}
            <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs font-semibold transition-colors ${
                  lang === "en"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("id")}
                className={`px-3 py-1 text-xs font-semibold transition-colors ${
                  lang === "id"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                ID
              </button>
            </div>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === "en" ? "bg-primary-600 text-white" : "text-gray-600"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("id")}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === "id" ? "bg-primary-600 text-white" : "text-gray-600"
                }`}
              >
                ID
              </button>
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

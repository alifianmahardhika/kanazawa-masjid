import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { loadContentList, formatDate } from "../utils/markdown";
import { useSEO } from "../hooks/useSEO";

const items = loadContentList("events");

export default function Events() {
  const { t, lang } = useLang();
  useSEO(
    "Upcoming Events",
    "Browse upcoming events at Kanazawa Umar bin Al-Khattab Mosque.",
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="section-title">{t("events.allEvents")}</h1>

      {items.length === 0 && (
        <p className="text-gray-500">{t("events.noEvents")}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <article key={item.slug} className="card flex flex-col">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4 -mx-0"
              />
            ) : (
              <div className="w-full h-48 bg-primary-50 rounded-md mb-4 flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-primary-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <p className="text-xs text-gray-400 mb-1">
              {formatDate(item.date, lang)} &bull; {item.author}
            </p>
            <h2 className="font-bold text-gray-900 text-xl mb-2 flex-1">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-4">
              {item.excerpt}
            </p>
            <Link
              to={`/events/${item.slug}`}
              className="btn-primary text-center text-sm self-start"
            >
              {t("events.readMore")}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { loadContentList, formatDate } from "../utils/markdown";
import { useSEO } from "../hooks/useSEO";

const items = loadContentList("news");

export default function News() {
  const { t, lang } = useLang();
  useSEO(
    "News",
    "Latest news and updates from Kanazawa Umar bin Al-Khattab Mosque.",
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="section-title">{t("news.allNews")}</h1>

      {items.length === 0 && (
        <p className="text-gray-500">{t("news.noNews")}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <article key={item.slug} className="card flex flex-col">
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
              to={`/news/${item.slug}`}
              className="btn-primary text-center text-sm self-start"
            >
              {t("news.readMore")}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

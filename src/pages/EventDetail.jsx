import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { loadMarkdown, formatDate } from "../utils/markdown";
import { useSEO, stripHtml } from "../hooks/useSEO";
import MarkdownContent from "../components/MarkdownContent";

export default function EventDetail() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);
  useSEO(event?.frontmatter.title, event ? stripHtml(event.html) : null);

  useEffect(() => {
    try {
      setEvent(loadMarkdown("events", slug));
      setError(false);
    } catch {
      setError(true);
      setEvent(null);
    }
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        to="/events"
        className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium hover:underline mb-8"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t("events.backToEvents")}
      </Link>

      {error && (
        <div className="card text-center py-12">
          <p className="text-gray-500">{t("events.notFound")}</p>
          <Link to="/events" className="btn-primary mt-4 inline-block">
            {t("events.backToEvents")}
          </Link>
        </div>
      )}

      {event && (
        <article>
          {event.frontmatter.image && (
            <img
              src={event.frontmatter.image}
              alt={event.frontmatter.title}
              className="w-full h-64 object-cover rounded-xl mb-8"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {event.frontmatter.title}
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            {formatDate(event.frontmatter.date, lang)}
            {event.frontmatter.author && (
              <>
                {" "}
                &bull; {t("events.by")} {event.frontmatter.author}
              </>
            )}
          </p>
          <MarkdownContent html={event.html} />
        </article>
      )}
    </div>
  );
}

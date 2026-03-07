import { useEffect } from "react";

const SITE_NAME = "Kanazawa Masjid";

export function useSEO(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
}

export function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

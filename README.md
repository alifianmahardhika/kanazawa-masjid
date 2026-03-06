# Kanazawa Umar bin Al-Khattab Mosque

Website for the Kanazawa Umar bin Al-Khattab Mosque — a lightweight, fast SPA built with Vite + React, deployed on Netlify.

## Tech Stack

- **Vite** + **React 18** — build tool & UI
- **React Router DOM v6** — client-side routing
- **TailwindCSS 3** — styling
- **Marked.js** — Markdown rendering
- **Aladhan API** — live prayer times (Kanazawa coordinates)

## Features

- Bilingual UI (English / Indonesian) with language toggle
- Live prayer times from Aladhan API
- Markdown-based content system (news & events)
- Google Maps directions link
- Fully static — deployable to any CDN

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev
# → http://localhost:5173

# Production build
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
kanazawa-masjid/
├── public/
│   └── content/
│       ├── news/           # News articles (.md) + index.json
│       └── events/         # Event articles (.md) + index.json
├── src/
│   ├── components/         # Navbar, Footer, PrayerTimes
│   ├── contexts/           # LanguageContext (EN/ID i18n)
│   ├── i18n/               # translations.js
│   ├── pages/              # Home, News, NewsDetail, Contact
│   └── utils/              # markdown.js helpers
├── index.html
├── vite.config.js
├── tailwind.config.js
└── netlify.toml
```

## Adding News

1. Create `public/content/news/your-article.md` with frontmatter:

   ```markdown
   ---
   title: Your Article Title
   date: 2026-03-15
   author: Author Name
   ---

   Article content in Markdown...
   ```

2. Add an entry to `public/content/news/index.json`:

   ```json
   {
     "slug": "your-article",
     "title": "Your Article Title",
     "date": "2026-03-15",
     "author": "Author Name",
     "excerpt": "Short summary shown on the news list."
   }
   ```

3. Push to Git — Netlify auto-deploys.

## Routes

| Path | Page |
|------|------|
| `/` | Home (hero, latest news, prayer times) |
| `/berita` | News list |
| `/berita/:slug` | News article |
| `/kontak` | Contact & map |

## Deployment

The site is configured for Netlify with SPA redirect rules in `netlify.toml`. Connect the GitHub repo to Netlify and it will auto-deploy on every push to `main`.

## Location

Tsu-120 Wakamatsumachi, Kanazawa, Ishikawa 920-1165, Japan

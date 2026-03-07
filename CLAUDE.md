# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install        # Install dependencies
bun run dev        # Dev server at localhost:5173
bun run build      # Production build → /dist
bun run preview    # Preview production build
```

## Architecture

**SPA:** Vite + React 18, TailwindCSS 3, React Router v6 (data router API), Marked.js.

**Routing** uses `createBrowserRouter` + `RouterProvider` (not `BrowserRouter`). Routes are defined in `src/App.jsx`. The shared shell (Navbar + Footer) lives in `src/components/Layout.jsx` and uses `<Outlet />`.

**i18n** is a custom React Context (no library). `src/i18n/translations.js` holds all UI strings under `en` and `id` keys. `src/contexts/LanguageContext.jsx` exposes `useLang()` which returns `{ lang, setLang, t }`. The `t("dot.path")` helper resolves nested keys. Language is persisted to `localStorage` under `"kanazawa-lang"`, defaulting to `"en"`. All static content (news, events) is written in English only — i18n applies to UI chrome only.

**Content** is Markdown files in `public/content/{news,events}/`. Each section has an `index.json` listing items with `slug`, `title`, `date`, `author`, `excerpt`. The slug must match the `.md` filename. `src/utils/markdown.js` provides `loadMarkdown(path)`, `loadContentList(type)`, `parseFrontmatter()`, `formatDate(dateString, lang)`, and `slugify()`.

**Prayer times** are fetched live from the Aladhan API in `src/components/PrayerTimes.jsx` using Kanazawa coordinates (lat `36.5549`, lon `136.6956`).

**Styling** uses Tailwind with a custom `primary` green palette (defined in `tailwind.config.js`). Shared utility classes `.card`, `.btn-primary`, `.section-title`, and `.markdown-content` (with full heading/list/blockquote styles) are defined as `@layer components` in `src/index.css`.

## Git Workflow

- Active development branch is `dev` — always commit and push to `dev`
- `main` is protected; changes must go through a PR from `dev` (or a feature branch) before merging
- Never push directly to `main`

## Deployment

Netlify — configured in `netlify.toml` with `bun run build`, `BUN_VERSION = "latest"`, and a `/*` → `/index.html` SPA redirect rule.

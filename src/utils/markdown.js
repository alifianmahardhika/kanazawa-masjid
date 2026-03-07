import { marked } from 'marked'

// All content is bundled at build time — no runtime fetches
const markdownFiles = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default', eager: true })
const indexFiles = import.meta.glob('../content/**/index.json', { eager: true })

const EN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const ID_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

export function formatDate(dateString, lang = 'en') {
  const [year, month, day] = dateString.split('-').map(Number)
  if (lang === 'id') {
    return `${day} ${ID_MONTHS[month - 1]} ${year}`
  }
  return `${EN_MONTHS[month - 1]} ${day}, ${year}`
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { frontmatter: {}, content: raw }

  const frontmatter = {}
  match[1].split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) return
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim()
    frontmatter[key] = value
  })

  return { frontmatter, content: match[2].trim() }
}

export function loadContentList(type) {
  const key = `../content/${type}/index.json`
  const mod = indexFiles[key]
  if (!mod) return []
  return mod.default.items
}

export function loadMarkdown(type, slug) {
  const key = `../content/${type}/${slug}.md`
  const raw = markdownFiles[key]
  if (!raw) throw new Error(`Content not found: ${type}/${slug}`)
  const { frontmatter, content } = parseFrontmatter(raw)
  const html = marked.parse(content)
  return { frontmatter, content, html }
}

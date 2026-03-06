import { marked } from 'marked'

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

export async function loadMarkdown(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to load: ${path}`)
  const raw = await res.text()
  const { frontmatter, content } = parseFrontmatter(raw)
  const html = marked(content)
  return { frontmatter, content, html }
}

export async function loadContentList(type) {
  const res = await fetch(`/content/${type}/index.json`)
  if (!res.ok) throw new Error(`Failed to load content list: ${type}`)
  const data = await res.json()
  return data.items
}

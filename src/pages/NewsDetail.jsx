import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { loadMarkdown, formatDate } from '../utils/markdown'

export default function NewsDetail() {
  const { slug } = useParams()
  const { t, lang } = useLang()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    loadMarkdown(`/content/news/${slug}.md`)
      .then(setArticle)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        to="/berita"
        className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium hover:underline mb-8"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('news.backToNews')}
      </Link>

      {loading && <p className="text-gray-500">{t('loading')}</p>}

      {error && (
        <div className="card text-center py-12">
          <p className="text-gray-500">{t('news.notFound')}</p>
          <Link to="/berita" className="btn-primary mt-4 inline-block">
            {t('news.backToNews')}
          </Link>
        </div>
      )}

      {article && (
        <article>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {article.frontmatter.title}
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            {formatDate(article.frontmatter.date, lang)}
            {article.frontmatter.author && (
              <> &bull; {t('news.by')} {article.frontmatter.author}</>
            )}
          </p>
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </article>
      )}
    </div>
  )
}

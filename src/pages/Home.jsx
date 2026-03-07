import { Link } from 'react-router-dom'
import PrayerTimes from '../components/PrayerTimes'
import { useLang } from '../contexts/LanguageContext'
import { loadContentList, formatDate } from '../utils/markdown'

const newsItems = loadContentList('news').slice(0, 3)

export default function Home() {
  const { t, lang } = useLang()

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-primary-100 text-lg mb-8">{t('hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/kontak" className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors">
              {t('hero.learnMore')}
            </Link>
            <Link to="/berita" className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors">
              {t('hero.viewNews')}
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">{t('news.title')}</h2>
          <Link to="/berita" className="text-primary-600 text-sm font-medium hover:underline">
            {t('news.allNews')} &rarr;
          </Link>
        </div>

        {newsItems.length === 0 ? (
          <p className="text-gray-500">{t('news.noNews')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article key={item.slug} className="card flex flex-col">
                <p className="text-xs text-gray-400 mb-1">
                  {formatDate(item.date, lang)} &bull; {item.author}
                </p>
                <h3 className="font-bold text-gray-900 text-lg mb-2 flex-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                <Link to={`/berita/${item.slug}`} className="btn-primary text-center text-sm self-start">
                  {t('news.readMore')}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Prayer Times + Quick Info */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PrayerTimes />

          {/* Quick Info */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('home.quickInfo')}</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">{t('home.location')}</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=36.5549,136.6956"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 text-sm hover:underline"
                  >
                    Tsu-120 Wakamatsumachi, Kanazawa, Ishikawa 920-1165
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">{t('home.contactUs')}</p>
                  <a href="tel:09070863480" className="text-primary-600 text-sm hover:underline">
                    090-7086-3480
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

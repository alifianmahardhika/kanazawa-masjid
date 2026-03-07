import { useEffect, useState, useCallback } from 'react'
import { useLang } from '../contexts/LanguageContext'

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
const WA_LINK = 'https://chat.whatsapp.com/LdAkegfVEvGFnc5cNeiCBb?mode=gi_t'

function generateChallenge() {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  const ops = [
    { question: `${a} + ${b}`, answer: a + b },
    { question: `${a + b} - ${b}`, answer: a },
    { question: `${a} × ${b}`, answer: a * b },
  ]
  return ops[Math.floor(Math.random() * ops.length)]
}

function CaptchaModal({ onClose, t }) {
  const [challenge, setChallenge] = useState(generateChallenge)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (parseInt(input, 10) === challenge.answer) {
        window.open(WA_LINK, '_blank', 'noopener,noreferrer')
        onClose()
      } else {
        setError(true)
        setInput('')
        setChallenge(generateChallenge())
      }
    },
    [input, challenge, onClose]
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-4">
          <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h3 className="font-bold text-gray-900">{t('prayer.captchaTitle')}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-3">{t('prayer.captchaPrompt')}</p>

        <p className="text-2xl font-bold text-center text-primary-700 mb-4 py-3 bg-primary-50 rounded-lg">
          {challenge.question} = ?
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false) }}
            placeholder={t('prayer.captchaPlaceholder')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{t('prayer.captchaError')}</p>
          )}
          <button type="submit" className="btn-primary w-full text-center">
            {t('prayer.captchaSubmit')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-gray-500 hover:text-gray-700 py-1"
          >
            {t('prayer.captchaCancel')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function PrayerTimes() {
  const { t } = useLang()
  const [times, setTimes] = useState(null)
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showCaptcha, setShowCaptcha] = useState(false)

  useEffect(() => {
    async function fetchTimes() {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(
          'https://api.aladhan.com/v1/timings?latitude=36.5549&longitude=136.6956&method=2'
        )
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        setTimes(data.data.timings)
        setDate(data.data.date.readable)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchTimes()
  }, [])

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t('prayer.title')}</h2>
          {date && <span className="text-sm text-gray-500">{date}</span>}
        </div>

        {loading && (
          <p className="text-gray-500 text-sm py-4 text-center">{t('prayer.loading')}</p>
        )}

        {error && (
          <p className="text-red-500 text-sm py-4 text-center">{t('prayer.error')}</p>
        )}

        {times && (
          <ul className="divide-y divide-gray-100">
            {PRAYER_KEYS.map((key) => (
              <li key={key} className="flex justify-between items-center py-3">
                <span className="font-medium text-gray-700">{t(`prayer.names.${key}`)}</span>
                <span className="text-primary-700 font-semibold tabular-nums">{times[key]}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => setShowCaptcha(true)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t('prayer.whatsapp')}
        </button>
      </div>

      {showCaptcha && (
        <CaptchaModal onClose={() => setShowCaptcha(false)} t={t} />
      )}
    </>
  )
}

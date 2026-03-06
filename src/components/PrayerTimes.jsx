import { useEffect, useState } from 'react'
import { useLang } from '../contexts/LanguageContext'

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

export default function PrayerTimes() {
  const { t } = useLang()
  const [times, setTimes] = useState(null)
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

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
    </div>
  )
}

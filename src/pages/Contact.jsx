import { useLang } from '../contexts/LanguageContext'

const SCHEDULE = [
  { day: 'Friday', activity: "Jumu'ah Prayer", time: '12:30' },
  { day: 'Sunday', activity: 'Islamic Study Circle', time: '10:00' },
  { day: 'Daily', activity: 'Five Daily Prayers', time: 'See prayer times' },
]

export default function Contact() {
  const { t } = useLang()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="section-title">{t('contact.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          {/* Address & Contact */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('contact.address')}</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=36.5549,136.6956"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Tsu-120 Wakamatsumachi, Kanazawa, Ishikawa 920-1165
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 text-primary-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:09070863480" className="text-primary-600 hover:underline">
                  090-7086-3480
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('contact.schedule')}</h2>
            <ul className="space-y-3">
              {SCHEDULE.map((item) => (
                <li key={item.activity} className="text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">{item.activity}</span>
                    <span className="text-primary-600 font-semibold">{item.time}</span>
                  </div>
                  <span className="text-gray-400">{item.day}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="card p-0 overflow-hidden">
          <h2 className="text-lg font-bold text-gray-900 p-6 pb-3">{t('contact.mapTitle')}</h2>
          <iframe
            title="Kanazawa Masjid Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51811.27!2d136.6956!3d36.5549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8339b84a5b3e5%3A0x68b1e28bf5d5b2cf!2sKanazawa%2C%20Ishikawa!5e0!3m2!1sen!2sjp!4v1"
            className="w-full"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}

import { useState, useCallback } from 'react'
import { useLang } from '../contexts/LanguageContext'

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

export function CaptchaModal({ href, onClose, t }) {
  const [challenge, setChallenge] = useState(generateChallenge)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (parseInt(input, 10) === challenge.answer) {
        window.open(href, '_blank', 'noopener,noreferrer')
        onClose()
      } else {
        setError(true)
        setInput('')
        setChallenge(generateChallenge())
      }
    },
    [input, challenge, href, onClose]
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

export default function WhatsAppLink({ href, children, className }) {
  const { t } = useLang()
  const [showCaptcha, setShowCaptcha] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setShowCaptcha(true)} className={className}>
        {children}
      </button>
      {showCaptcha && (
        <CaptchaModal href={href} onClose={() => setShowCaptcha(false)} t={t} />
      )}
    </>
  )
}

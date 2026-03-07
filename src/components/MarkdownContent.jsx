import { useState } from 'react'
import { useLang } from '../contexts/LanguageContext'
import { CaptchaModal } from './WhatsAppLink'

const WA_PATTERNS = ['wa.me', 'whatsapp.com']

export default function MarkdownContent({ html }) {
  const { t } = useLang()
  const [captchaHref, setCaptchaHref] = useState(null)

  function handleClick(e) {
    const link = e.target.closest('a')
    if (!link) return
    const href = link.getAttribute('href') ?? ''
    if (WA_PATTERNS.some((p) => href.includes(p))) {
      e.preventDefault()
      setCaptchaHref(href)
    }
  }

  return (
    <>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={handleClick}
      />
      {captchaHref && (
        <CaptchaModal
          href={captchaHref}
          onClose={() => setCaptchaHref(null)}
          t={t}
        />
      )}
    </>
  )
}

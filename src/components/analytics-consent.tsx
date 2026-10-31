import { useEffect, useState } from 'react'
import type { Locale } from '#/lib/ggemu'
import { analyticsConsentEvent, getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from '#/lib/analytics'

const copies: Record<Locale, { title: string; body: string; allow: string; reject: string; policy: string }> = {
  en: { title: 'Analytics preferences', body: 'Allow Google Analytics cookies to help us understand visits and game usage? You can change your choice here anytime. This choice applies to Google Analytics only.', allow: 'Allow analytics', reject: 'Reject analytics', policy: 'Privacy policy' },
  'zh-CN': { title: '统计偏好设置', body: '是否允许 Google Analytics 使用统计 Cookie，帮助我们了解访问和游戏使用情况？你可以随时在此修改选择。此选择仅适用于 Google Analytics。', allow: '允许统计', reject: '拒绝统计', policy: '隐私政策' },
  'zh-TW': { title: '統計偏好設定', body: '是否允許 Google Analytics 使用統計 Cookie，協助我們了解造訪與遊戲使用情況？你可以隨時在此變更選擇。此選擇僅適用於 Google Analytics。', allow: '允許統計', reject: '拒絕統計', policy: '隱私權政策' },
  ja: { title: 'アクセス解析の設定', body: '訪問やゲームの利用状況を把握するため、Google Analytics の Cookie を許可しますか？設定はいつでも変更できます。この選択は Google Analytics のみに適用されます。', allow: '解析を許可', reject: '解析を拒否', policy: 'プライバシーポリシー' },
  ko: { title: '분석 설정', body: '방문 및 게임 이용을 파악하기 위해 Google Analytics 쿠키를 허용하시겠습니까? 언제든지 변경할 수 있습니다. 이 선택은 Google Analytics에만 적용됩니다.', allow: '분석 허용', reject: '분석 거부', policy: '개인정보 처리방침' },
  es: { title: 'Preferencias de análisis', body: '¿Permitir cookies de Google Analytics para entender las visitas y el uso de juegos? Puedes cambiar tu elección aquí cuando quieras. Solo se aplica a Google Analytics.', allow: 'Permitir análisis', reject: 'Rechazar análisis', policy: 'Política de privacidad' },
  pt: { title: 'Preferências de análise', body: 'Permitir cookies do Google Analytics para entender as visitas e o uso dos jogos? Você pode mudar sua escolha aqui a qualquer momento. Aplica-se apenas ao Google Analytics.', allow: 'Permitir análise', reject: 'Recusar análise', policy: 'Política de privacidade' },
  fr: { title: 'Préférences statistiques', body: 'Autoriser les cookies Google Analytics pour comprendre les visites et l’utilisation des jeux ? Vous pouvez modifier votre choix ici à tout moment. Ce choix concerne uniquement Google Analytics.', allow: 'Autoriser les statistiques', reject: 'Refuser les statistiques', policy: 'Politique de confidentialité' },
  de: { title: 'Analyseeinstellungen', body: 'Google-Analytics-Cookies erlauben, um Besuche und Spielnutzung zu verstehen? Du kannst deine Auswahl hier jederzeit ändern. Sie gilt nur für Google Analytics.', allow: 'Analyse erlauben', reject: 'Analyse ablehnen', policy: 'Datenschutzerklärung' },
  it: { title: 'Preferenze di analisi', body: 'Vuoi consentire i cookie di Google Analytics per aiutarci a comprendere le visite e l’uso dei giochi? Puoi cambiare questa scelta in qualsiasi momento.', allow: 'Consenti analisi', reject: 'Rifiuta analisi', policy: 'Informativa sulla privacy' },
}

export function AnalyticsConsentControls({ locale }: { locale: Locale }) {
  const copy = copies[locale]
  const [open, setOpen] = useState(false)
  const [choice, setChoice] = useState<AnalyticsConsent | null>(null)

  useEffect(() => {
    const stored = getAnalyticsConsent()
    setChoice(stored)
    setOpen(stored === null)
    const onChange = (event: Event) => setChoice((event as CustomEvent<AnalyticsConsent>).detail)
    window.addEventListener(analyticsConsentEvent, onChange)
    return () => window.removeEventListener(analyticsConsentEvent, onChange)
  }, [])

  function choose(value: AnalyticsConsent) {
    setAnalyticsConsent(value)
    setChoice(value)
    setOpen(false)
  }

  return (
    <div className="mt-4">
      <button aria-controls="analytics-consent-panel" aria-expanded={open} className="link link-primary text-sm" onClick={() => setOpen(true)} type="button">{copy.title}</button>
      {open ? <section aria-labelledby="analytics-consent-title" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-xl border border-base-300 bg-base-100 p-5 text-base-content shadow-2xl sm:inset-x-6 sm:bottom-6" id="analytics-consent-panel">
        <h2 className="text-lg font-bold" id="analytics-consent-title">{copy.title}</h2>
        <p className="mt-2 text-sm leading-6">{copy.body}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button aria-pressed={choice === 'granted'} className="btn btn-outline btn-sm" onClick={() => choose('granted')} type="button">{copy.allow}</button>
          <button aria-pressed={choice === 'denied'} className="btn btn-outline btn-sm" onClick={() => choose('denied')} type="button">{copy.reject}</button>
          <a className="link self-center text-sm" href={`/${locale}/privacy-policy`}>{copy.policy}</a>
        </div>
      </section> : null}
    </div>
  )
}

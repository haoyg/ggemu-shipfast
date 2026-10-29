import { useEffect, useState } from 'react'
import type { Locale } from '#/lib/ggemu'
import { analyticsConsentEvent, getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from '#/lib/analytics'

const copies: Record<Locale, { title: string; body: string; allow: string; reject: string; policy: string }> = {
  en: { title: 'Analytics preferences', body: 'Allow Google Analytics cookies to measure visits and game usage? You can change this anytime.', allow: 'Allow analytics', reject: 'Reject analytics', policy: 'Privacy policy' },
  'zh-CN': { title: '统计偏好设置', body: '是否允许 Google Analytics 使用统计 Cookie，帮助我们了解访问和游戏使用情况？你可以随时修改选择。', allow: '允许统计', reject: '拒绝统计', policy: '隐私政策' },
  'zh-TW': { title: '統計偏好設定', body: '是否允許 Google Analytics 使用統計 Cookie，協助我們了解造訪與遊戲使用情況？你可以隨時變更選擇。', allow: '允許統計', reject: '拒絕統計', policy: '隱私權政策' },
  ja: { title: 'アクセス解析の設定', body: '訪問やゲーム利用を測定する Google Analytics Cookie を許可しますか？設定はいつでも変更できます。', allow: '解析を許可', reject: '解析を拒否', policy: 'プライバシーポリシー' },
  ko: { title: '분석 설정', body: '방문 및 게임 이용을 측정하는 Google Analytics 쿠키를 허용하시겠습니까? 언제든지 변경할 수 있습니다.', allow: '분석 허용', reject: '분석 거부', policy: '개인정보 처리방침' },
  es: { title: 'Preferencias de análisis', body: '¿Permitir cookies de Google Analytics para medir visitas y uso de juegos? Puedes cambiarlo cuando quieras.', allow: 'Permitir análisis', reject: 'Rechazar análisis', policy: 'Política de privacidad' },
  pt: { title: 'Preferências de análise', body: 'Permitir cookies do Google Analytics para medir visitas e uso dos jogos? Você pode mudar quando quiser.', allow: 'Permitir análise', reject: 'Recusar análise', policy: 'Política de privacidade' },
  fr: { title: 'Préférences statistiques', body: 'Autoriser les cookies Google Analytics pour mesurer les visites et l’utilisation des jeux ? Ce choix reste modifiable.', allow: 'Autoriser les statistiques', reject: 'Refuser les statistiques', policy: 'Politique de confidentialité' },
  de: { title: 'Analyseeinstellungen', body: 'Google-Analytics-Cookies zur Messung von Besuchen und Spielnutzung erlauben? Die Auswahl bleibt änderbar.', allow: 'Analyse erlauben', reject: 'Analyse ablehnen', policy: 'Datenschutzerklärung' },
  it: { title: 'Preferenze di analisi', body: 'Consentire i cookie di Google Analytics per misurare visite e uso dei giochi? Puoi cambiare scelta in qualsiasi momento.', allow: 'Consenti analisi', reject: 'Rifiuta analisi', policy: 'Informativa sulla privacy' },
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
      {open ? <section aria-labelledby="analytics-consent-title" className="fixed inset-x-2 bottom-2 z-[100] mx-auto max-w-5xl rounded-xl border border-base-300 bg-base-100 p-3 text-base-content shadow-2xl sm:inset-x-6 sm:bottom-4 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:p-4" id="analytics-consent-panel">
        <div>
          <h2 className="text-base font-bold" id="analytics-consent-title">{copy.title}</h2>
          <p className="mt-1 text-xs leading-5 sm:text-sm">{copy.body}</p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-0 sm:flex-nowrap">
          <button aria-pressed={choice === 'granted'} className="btn btn-outline btn-xs sm:btn-sm" onClick={() => choose('granted')} type="button">{copy.allow}</button>
          <button aria-pressed={choice === 'denied'} className="btn btn-outline btn-xs sm:btn-sm" onClick={() => choose('denied')} type="button">{copy.reject}</button>
          <a className="link ml-1 whitespace-nowrap text-xs sm:text-sm" href={`/${locale}/privacy-policy`}>{copy.policy}</a>
        </div>
      </section> : null}
    </div>
  )
}

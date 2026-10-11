import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { SiteLayout } from '#/components/site-layout'
import type { Locale } from '#/lib/ggemu'
import { getI18n } from '#/lib/i18n'

const titles: Record<Locale, string> = {
  fr: 'Impossible de charger ce jeu pour le moment',
  de: 'Spiel kann derzeit nicht geladen werden',
  'zh-CN': '暂时无法加载游戏',
  'zh-TW': '暫時無法載入遊戲',
  en: 'Unable to load this game right now',
  ja: '現在ゲームを読み込めません',
  ko: '지금은 게임을 불러올 수 없습니다',
  es: 'No se puede cargar el juego ahora',
  pt: 'Não foi possível carregar o jogo agora',
}

export function getGameDetailLoadErrorCopy(locale: Locale) {
  return { title: titles[locale], description: getI18n(locale).home.loadError }
}

export function GameDetailLoadError({ locale }: { locale: Locale }) {
  return <TemporaryPageLoadError locale={locale} title={titles[locale]} />
}

export function TemporaryPageLoadError({ locale, title }: { locale: Locale; title: string }) {
  const [retrying, setRetrying] = useState(false)
  const t = getI18n(locale)

  return (
    <SiteLayout locale={locale}>
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
        <p className="mt-4 text-base leading-7 text-base-content/70">{t.home.loadError}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="btn btn-primary" disabled={retrying} onClick={() => {
            setRetrying(true)
            window.location.reload()
          }} type="button">
            {retrying ? t.home.loading : t.home.retry}
          </button>
          <Link className="btn btn-outline" params={{ locale }} to="/$locale">{t.layout.games}</Link>
        </div>
      </section>
    </SiteLayout>
  )
}

import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'

import { getGameDetail } from '#/lib/ggemu'
import { buildGameEmbedSrc, isPspGame } from '#/lib/game-embed'
import { normalizeLocale } from '#/lib/i18n'
import { siteConfig } from '#/lib/site-config'
import { useCurrentSiteTheme } from '#/lib/use-site-theme'

const pspCrossOriginIsolationHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Permissions-Policy': 'cross-origin-isolated=(self "https://ggemu.com")',
} as const

const noindexHeaders = {
  'X-Robots-Tag': 'noindex, nofollow',
} as const

const removedLegacyGameIds = new Set([
  's-c-a-t-nes-1991',
  'superman-the-new-superman-adventures-n64-1999',
])

export const Route = createFileRoute('/$locale/games/$gameId/play')({
  beforeLoad: ({ location, params }) => {
    if (isSimplifiedChineseLocaleAlias(params.locale)) {
      throw redirect({
        params: { gameId: params.gameId, locale: 'zh-CN' },
        replace: true,
        to: '/$locale/games/$gameId/play',
      })
    }

    if (!location.searchStr) {
      return
    }

    throw redirect({
      params,
      replace: true,
      to: '/$locale/games/$gameId/play',
    })
  },
  loader: async ({ params }) => {
    const game = await getGameDetail({ data: { id: params.gameId } }).catch(() => null)

    if (!game && removedLegacyGameIds.has(params.gameId)) {
      throw redirect({
        params: { locale: normalizeLocale(params.locale) },
        replace: true,
        to: '/$locale',
      })
    }

    if (!game) {
      throw redirect({
        params: { locale: normalizeLocale(params.locale) },
        replace: true,
        to: '/$locale',
      })
    }

    return game
  },
  headers: ({ loaderData }) => ({
    ...noindexHeaders,
    ...(loaderData && isPspGame(loaderData) ? pspCrossOriginIsolationHeaders : {}),
  }),
  component: LocalizedPlayGamePage,
})

function isSimplifiedChineseLocaleAlias(value: string) {
  if (value === 'zh-CN') {
    return false
  }

  const normalized = value.toLowerCase()

  return normalized === 'zh-cn' || normalized === 'zh'
}

function LocalizedPlayGamePage() {
  const game = Route.useLoaderData()
  const { gameId, locale } = Route.useParams()
  const lang = normalizeLocale(locale)
  const embedId = game._id || game.url_slug || gameId
  const isPsp = isPspGame(game)
  const theme = useCurrentSiteTheme()
  const embedSrc = buildGameEmbedSrc({
    embedId,
    isPsp,
    locale: lang,
    refcode: siteConfig.GGEMU_REFCODE,
    theme,
  })

  useEffect(() => {
    return () => {
      if (!isPsp || !window.crossOriginIsolated) {
        return
      }

      window.setTimeout(() => {
        const url = new URL(window.location.href)

        url.searchParams.delete('isolated')
        window.location.href = url.toString()
      }, 0)
    }
  }, [isPsp])

  return (
    <main className="min-h-[100svh] bg-black">
      <iframe
        allow={
          isPsp
            ? 'autoplay; gamepad; fullscreen; cross-origin-isolated'
            : 'autoplay; gamepad'
        }
        allowFullScreen
        className="h-[100svh] w-full border-0 bg-black"
        src={embedSrc}
        title={game.name ?? 'Retro game'}
      />
    </main>
  )
}

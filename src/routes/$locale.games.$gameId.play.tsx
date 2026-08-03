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

export const Route = createFileRoute('/$locale/games/$gameId/play')({
  beforeLoad: ({ location, params }) => {
    if (!location.searchStr) {
      return
    }

    throw redirect({
      params,
      replace: true,
      to: '/$locale/games/$gameId/play',
    })
  },
  loader: ({ params }) => getGameDetail({ data: { id: params.gameId } }),
  headers: ({ loaderData }) => ({
    ...noindexHeaders,
    ...(loaderData && isPspGame(loaderData) ? pspCrossOriginIsolationHeaders : {}),
  }),
  component: LocalizedPlayGamePage,
})

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

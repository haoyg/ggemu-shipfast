import { Link, createFileRoute } from '@tanstack/react-router'

import { getGameDetail } from '#/lib/ggemu'
import { buildGameEmbedSrc, isPspGame } from '#/lib/game-embed'
import { normalizeLocale } from '#/lib/i18n'
import { siteConfig } from '#/lib/site-config'
import { useCurrentSiteTheme } from '#/lib/use-site-theme'

const embedHeaders = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
} as const

export const Route = createFileRoute('/embed/$locale/games/$gameId')({
  loader: ({ params }) => getGameDetail({ data: { id: params.gameId } }),
  headers: () => embedHeaders,
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale)
    const title = loaderData?.name || 'POKOPIE'

    return {
      meta: [
        { title: `Embed ${title} | POKOPIE` },
        { name: 'robots', content: 'noindex,nofollow' },
        {
          name: 'description',
          content: `Embed ${title} from POKOPIE on your website.`,
        },
      ],
      links: [
        {
          rel: 'canonical',
          href: `/${locale}/games/${encodeURIComponent(params.gameId)}`,
        },
      ],
    }
  },
  component: EmbedGamePage,
})

function EmbedGamePage() {
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

  return (
    <main className="flex min-h-[100svh] flex-col bg-black text-white">
      <header className="flex min-h-12 items-center justify-between gap-3 border-b border-white/10 bg-neutral px-3 py-2 text-sm">
        <Link
          className="inline-flex min-w-0 items-center gap-2 font-semibold text-white"
          params={{ locale: lang }}
          target="_blank"
          to="/$locale"
        >
          <img
            alt={siteConfig.SITE_NAME}
            className="h-7 w-7 shrink-0 rounded object-contain"
            height="128"
            src="/logo-128.png"
            width="128"
          />
          <span className="truncate">{siteConfig.SITE_NAME}</span>
        </Link>
        <a
          className="btn btn-primary btn-xs shrink-0"
          href={`/${lang}/games/${encodeURIComponent(gameId)}?utm_source=embed&utm_medium=iframe`}
          rel="noopener"
          target="_blank"
        >
          Play on POKOPIE
        </a>
      </header>
      <iframe
        allow={
          isPsp
            ? 'autoplay; gamepad; fullscreen; cross-origin-isolated'
            : 'autoplay; gamepad; fullscreen'
        }
        allowFullScreen
        className="min-h-0 flex-1 border-0 bg-black"
        src={embedSrc}
        title={game.name ?? 'POKOPIE game'}
      />
    </main>
  )
}

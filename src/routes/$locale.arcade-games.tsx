import { TemporaryPageLoadError } from '#/components/game-detail-load-error'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { ArcadeGamesPage, getLocalizedArcadeCollection } from '#/components/arcade-games-page'
import { normalizeLocale } from '#/lib/i18n'
import { buildPlatformCollectionHead, loadPlatformCollection, getPlatformCollectionHeaders } from '#/lib/platform-collection-route'

export const Route = createFileRoute('/$locale/arcade-games')({
  loader: async ({ params }) => {
    if (!['zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'pt', 'fr', 'de'].includes(params.locale)) throw notFound()
    const locale = normalizeLocale(params.locale)
    const data = await loadPlatformCollection(getLocalizedArcadeCollection(locale), locale)
    return { ...data, locale }
  },
  head: ({ loaderData }) => loaderData ? buildPlatformCollectionHead(getLocalizedArcadeCollection(loaderData.locale), loaderData, loaderData.locale) : {},
  headers: ({ loaderData }) => getPlatformCollectionHeaders(loaderData),
  component: LocalizedArcadeGamesRoute,
})

function LocalizedArcadeGamesRoute() {
  const { games, locale, pagination, loadFailed } = Route.useLoaderData()
  if (loadFailed) return <TemporaryPageLoadError locale={locale} title={getLocalizedArcadeCollection(locale).page.heroTitle} />
  return <ArcadeGamesPage games={games} locale={locale} page={pagination.page} pages={pagination.pages} total={pagination.total} />
}

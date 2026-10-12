import { TemporaryPageLoadError } from '#/components/game-detail-load-error'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { getLocalizedPs1Collection, Ps1GamesPage } from '#/components/ps1-games-page'
import { normalizeLocale } from '#/lib/i18n'
import { buildPlatformCollectionHead, loadPlatformCollection, getPlatformCollectionHeaders } from '#/lib/platform-collection-route'

export const Route = createFileRoute('/$locale/ps1-games')({
  loader: async ({ params }) => {
    if (!['zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'pt', 'fr', 'de'].includes(params.locale)) throw notFound()
    const locale = normalizeLocale(params.locale)
    const data = await loadPlatformCollection(getLocalizedPs1Collection(locale), locale)
    return { ...data, locale }
  },
  head: ({ loaderData }) => loaderData ? buildPlatformCollectionHead(getLocalizedPs1Collection(loaderData.locale), loaderData, loaderData.locale) : {},
  headers: ({ loaderData }) => getPlatformCollectionHeaders(loaderData),
  component: LocalizedPs1GamesRoute,
})

function LocalizedPs1GamesRoute() {
  const { games, locale, pagination, loadFailed } = Route.useLoaderData()
  if (loadFailed) return <TemporaryPageLoadError locale={locale} title={getLocalizedPs1Collection(locale).page.heroTitle} />
  return <Ps1GamesPage games={games} locale={locale} total={pagination.total} />
}

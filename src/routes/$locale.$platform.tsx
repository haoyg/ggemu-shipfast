import { TemporaryPageLoadError } from '#/components/game-detail-load-error'
import { createFileRoute, notFound } from '@tanstack/react-router'

import {
  getLocalizedPlatformCollection,
  PlatformGamesPage,
} from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
  getPlatformCollectionHeaders,
} from '#/lib/platform-collection-route'
import { normalizeLocale } from '#/lib/i18n'
import { getPlatformCollectionKey } from '#/lib/platform-routes'

export const Route = createFileRoute('/$locale/$platform')({
  loader: async ({ params }) => {
    if (!['zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'pt', 'fr', 'de'].includes(params.locale)) {
      throw notFound()
    }

    const key = getPlatformCollectionKey(params.platform)

    if (!key) {
      throw notFound()
    }

    const locale = normalizeLocale(params.locale)
    const collection = getLocalizedPlatformCollection(key, locale)
    const data = await loadPlatformCollection(collection, locale)

    return { ...data, key, locale }
  },
  head: ({ loaderData }) =>
    loaderData
      ? buildPlatformCollectionHead(
          getLocalizedPlatformCollection(loaderData.key, loaderData.locale),
          loaderData,
          loaderData.locale,
        )
      : {},
  headers: ({ loaderData }) => getPlatformCollectionHeaders(loaderData),
  component: LocalizedPlatformGamesRoute,
})

function LocalizedPlatformGamesRoute() {
  const { games, key, locale, pagination, loadFailed } = Route.useLoaderData()
  const collection = getLocalizedPlatformCollection(key, locale)
  if (loadFailed) return <TemporaryPageLoadError locale={locale} title={collection.page.heroTitle} />

  return (
    <PlatformGamesPage
      collection={collection}
      games={games}
      locale={locale}
      page={pagination.page}
      pages={pagination.pages}
      total={pagination.total}
    />
  )
}

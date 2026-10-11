import { createFileRoute, notFound } from '@tanstack/react-router'

import {
  getLocalizedPlatformCollection,
  PlatformGamesPage,
} from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
} from '#/lib/platform-collection-route'
import { normalizeLocale } from '#/lib/i18n'
import { getPlatformCollectionKey } from '#/lib/platform-routes'

export const Route = createFileRoute('/$locale/$platform')({
  loader: async ({ params }) => {
    if (!['zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'pt'].includes(params.locale)) {
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
  component: LocalizedPlatformGamesRoute,
})

function LocalizedPlatformGamesRoute() {
  const { games, key, locale, pagination } = Route.useLoaderData()
  const collection = getLocalizedPlatformCollection(key, locale)

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

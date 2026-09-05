import { createFileRoute, notFound } from '@tanstack/react-router'

import {
  getLocalizedPlatformCollection,
  PlatformGamesPage,
  type PlatformCollectionKey,
} from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
} from '#/lib/platform-collection-route'
import { normalizeLocale } from '#/lib/i18n'

const platformKeys: Record<string, PlatformCollectionKey> = {
  'gba-games': 'gba',
  'n64-games': 'n64',
  'nes-games': 'nes',
  'sega-genesis-games': 'segaGenesis',
  'snes-games': 'snes',
}

export const Route = createFileRoute('/$locale/$platform')({
  loader: async ({ params }) => {
    if (params.locale !== 'zh-CN' && params.locale !== 'ja') {
      throw notFound()
    }

    const key = platformKeys[params.platform]

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
      total={pagination.total}
    />
  )
}

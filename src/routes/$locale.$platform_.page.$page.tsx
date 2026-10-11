import { TemporaryPageLoadError } from '#/components/game-detail-load-error'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { getLocalizedPlatformCollection } from '#/components/platform-games-page'
import { getLocalizedArcadeCollection } from '#/components/arcade-games-page'
import { GameCollectionPage } from '#/components/game-collection-page'
import type { Locale } from '#/lib/ggemu'
import { isSupportedLocale } from '#/lib/i18n'
import { buildPlatformCollectionHead, getPlatformCollectionHeaders, validatePlatformCollectionPage, loadPlatformCollection, parsePlatformCollectionPage } from '#/lib/platform-collection-route'
import { getPlatformCollectionKey } from '#/lib/platform-routes'

export const Route = createFileRoute('/$locale/$platform_/page/$page')({
  loader: async ({ params }) => {
    const locale = params.locale
    const page = parsePlatformCollectionPage(params.page)
    if (!isSupportedLocale(locale) || locale === 'en' || !page) {
      throw notFound()
    }
    const collection = getCollection(params.platform, locale)
    if (!collection) throw notFound()
    if (page === 1) {
      throw redirect({ href: collection.routePath, replace: true, statusCode: 301 })
    }
    const data = await loadPlatformCollection(collection, locale, page)
    validatePlatformCollectionPage(data, page)
    return { ...data, platform: params.platform, locale }
  },
  head: ({ loaderData }) => {
    const collection = loaderData && getCollection(loaderData.platform, loaderData.locale)
    return collection && loaderData
      ? buildPlatformCollectionHead(collection, loaderData, loaderData.locale, loaderData.pagination.page)
      : {}
  },
  headers: ({ loaderData }) => getPlatformCollectionHeaders(loaderData),
  component: LocalizedPaginatedPlatformGamesRoute,
})

function LocalizedPaginatedPlatformGamesRoute() {
  const { games, platform, locale, pagination, loadFailed } = Route.useLoaderData()
  const collection = getCollection(platform, locale)
  if (!collection) return null
  if (loadFailed) return <TemporaryPageLoadError locale={locale} title={collection.page.heroTitle} />
  return (
    <GameCollectionPage
      config={collection.page}
      games={games}
      locale={locale}
      page={pagination.page}
      pages={pagination.pages}
      total={pagination.total}
    />
  )
}

function getCollection(platform: string, locale: Locale) {
  if (platform === 'arcade-games') return getLocalizedArcadeCollection(locale)
  const key = getPlatformCollectionKey(platform)
  return key ? getLocalizedPlatformCollection(key, locale) : undefined
}

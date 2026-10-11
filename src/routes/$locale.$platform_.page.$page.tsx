import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { getLocalizedPlatformCollection, PlatformGamesPage } from '#/components/platform-games-page'
import { isSupportedLocale } from '#/lib/i18n'
import { buildPlatformCollectionHead, loadPlatformCollection, parsePlatformCollectionPage } from '#/lib/platform-collection-route'
import { getPlatformCollectionKey } from '#/lib/platform-routes'

export const Route = createFileRoute('/$locale/$platform_/page/$page')({
  loader: async ({ params }) => {
    const locale = params.locale
    const key = getPlatformCollectionKey(params.platform)
    const page = parsePlatformCollectionPage(params.page)
    if (!isSupportedLocale(locale) || locale === 'en' || !key || !page) {
      throw notFound()
    }
    const collection = getLocalizedPlatformCollection(key, locale)
    if (page === 1) {
      throw redirect({ href: collection.routePath, replace: true, statusCode: 301 })
    }
    const data = await loadPlatformCollection(collection, locale, page)
    if (data.loadFailed) throw new Error(`Unable to load ${collection.platform} games`)
    if (data.pagination.pages < page) throw notFound()
    return { ...data, key, locale }
  },
  head: ({ loaderData }) => loaderData
    ? buildPlatformCollectionHead(
        getLocalizedPlatformCollection(loaderData.key, loaderData.locale),
        loaderData,
        loaderData.locale,
        loaderData.pagination.page,
      )
    : {},
  component: LocalizedPaginatedPlatformGamesRoute,
})

function LocalizedPaginatedPlatformGamesRoute() {
  const { games, key, locale, pagination } = Route.useLoaderData()
  return (
    <PlatformGamesPage
      collection={getLocalizedPlatformCollection(key, locale)}
      games={games}
      locale={locale}
      page={pagination.page}
      pages={pagination.pages}
      total={pagination.total}
    />
  )
}

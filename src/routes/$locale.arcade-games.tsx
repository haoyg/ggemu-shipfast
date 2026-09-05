import { createFileRoute, notFound } from '@tanstack/react-router'

import { ArcadeGamesPage, getLocalizedArcadeCollection } from '#/components/arcade-games-page'
import { normalizeLocale } from '#/lib/i18n'
import { buildPlatformCollectionHead, loadPlatformCollection } from '#/lib/platform-collection-route'

export const Route = createFileRoute('/$locale/arcade-games')({
  loader: async ({ params }) => {
    if (params.locale !== 'zh-CN' && params.locale !== 'ja') throw notFound()
    const locale = normalizeLocale(params.locale)
    const data = await loadPlatformCollection(getLocalizedArcadeCollection(locale), locale)
    return { ...data, locale }
  },
  head: ({ loaderData }) => loaderData ? buildPlatformCollectionHead(getLocalizedArcadeCollection(loaderData.locale), loaderData, loaderData.locale) : {},
  component: LocalizedArcadeGamesRoute,
})

function LocalizedArcadeGamesRoute() {
  const { games, locale, pagination } = Route.useLoaderData()
  return <ArcadeGamesPage games={games} locale={locale} total={pagination.total} />
}

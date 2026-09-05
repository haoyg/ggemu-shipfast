import { createFileRoute, notFound } from '@tanstack/react-router'

import { getLocalizedPs1Collection, Ps1GamesPage } from '#/components/ps1-games-page'
import { normalizeLocale } from '#/lib/i18n'
import { buildPlatformCollectionHead, loadPlatformCollection } from '#/lib/platform-collection-route'

export const Route = createFileRoute('/$locale/ps1-games')({
  loader: async ({ params }) => {
    if (params.locale !== 'zh-CN' && params.locale !== 'ja') throw notFound()
    const locale = normalizeLocale(params.locale)
    const data = await loadPlatformCollection(getLocalizedPs1Collection(locale), locale)
    return { ...data, locale }
  },
  head: ({ loaderData }) => loaderData ? buildPlatformCollectionHead(getLocalizedPs1Collection(loaderData.locale), loaderData, loaderData.locale) : {},
  component: LocalizedPs1GamesRoute,
})

function LocalizedPs1GamesRoute() {
  const { games, locale, pagination } = Route.useLoaderData()
  return <Ps1GamesPage games={games} locale={locale} total={pagination.total} />
}

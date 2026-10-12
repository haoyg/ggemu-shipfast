import { TemporaryPageLoadError } from '#/components/game-detail-load-error'
import { createFileRoute } from '@tanstack/react-router'

import {
  getLocalizedPs1Collection,
  Ps1GamesPage,
} from '#/components/ps1-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
  getPlatformCollectionHeaders,
} from '#/lib/platform-collection-route'

const collection = getLocalizedPs1Collection('en')

export const Route = createFileRoute('/en/ps1-games')({
  loader: () => loadPlatformCollection(collection),
  head: ({ loaderData }) => buildPlatformCollectionHead(collection, loaderData),
  headers: ({ loaderData }) => getPlatformCollectionHeaders(loaderData),
  component: Ps1GamesRoute,
})

function Ps1GamesRoute() {
  const { games, pagination, loadFailed } = Route.useLoaderData()

  if (loadFailed) return <TemporaryPageLoadError locale="en" title={collection.page.heroTitle} />

  return (
    <Ps1GamesPage
      games={games}
      page={1}
      pages={pagination.pages}
      total={pagination.total}
    />
  )
}

import { TemporaryPageLoadError } from '#/components/game-detail-load-error'
import { createFileRoute } from '@tanstack/react-router'

import {
  ArcadeGamesPage,
  getLocalizedArcadeCollection,
} from '#/components/arcade-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
  getPlatformCollectionHeaders,
} from '#/lib/platform-collection-route'

const collection = getLocalizedArcadeCollection('en')

export const Route = createFileRoute('/en/arcade-games')({
  loader: () => loadPlatformCollection(collection),
  head: ({ loaderData }) => buildPlatformCollectionHead(collection, loaderData),
  headers: ({ loaderData }) => getPlatformCollectionHeaders(loaderData),
  component: ArcadeGamesRoute,
})

function ArcadeGamesRoute() {
  const { games, pagination, loadFailed } = Route.useLoaderData()

  if (loadFailed) return <TemporaryPageLoadError locale="en" title={collection.page.heroTitle} />

  return (
    <ArcadeGamesPage
      games={games}
      page={1}
      pages={pagination.pages}
      total={pagination.total}
    />
  )
}

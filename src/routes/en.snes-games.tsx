import { TemporaryPageLoadError } from '#/components/game-detail-load-error'
import { createFileRoute } from '@tanstack/react-router'

import {
  PlatformGamesPage,
  platformCollections,
} from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
  getPlatformCollectionHeaders,
} from '#/lib/platform-collection-route'

const collection = platformCollections.snes

export const Route = createFileRoute('/en/snes-games')({
  loader: () => loadPlatformCollection(collection),
  head: ({ loaderData }) => buildPlatformCollectionHead(collection, loaderData),
  headers: ({ loaderData }) => getPlatformCollectionHeaders(loaderData),
  component: SnesGamesRoute,
})

function SnesGamesRoute() {
  const { games, pagination, loadFailed } = Route.useLoaderData()

  if (loadFailed) return <TemporaryPageLoadError locale="en" title={collection.page.heroTitle} />

  return <PlatformGamesPage collection={collection} games={games} page={1} pages={pagination.pages} total={pagination.total} />
}

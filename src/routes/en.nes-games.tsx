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

const collection = platformCollections.nes

export const Route = createFileRoute('/en/nes-games')({
  loader: () => loadPlatformCollection(collection),
  head: ({ loaderData }) => buildPlatformCollectionHead(collection, loaderData),
  headers: ({ loaderData }) => getPlatformCollectionHeaders(loaderData),
  component: NesGamesRoute,
})

function NesGamesRoute() {
  const { games, pagination, loadFailed } = Route.useLoaderData()

  if (loadFailed) return <TemporaryPageLoadError locale="en" title={collection.page.heroTitle} />

  return <PlatformGamesPage collection={collection} games={games} page={1} pages={pagination.pages} total={pagination.total} />
}

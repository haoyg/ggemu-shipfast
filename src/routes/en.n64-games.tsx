import { createFileRoute } from '@tanstack/react-router'

import {
  PlatformGamesPage,
  platformCollections,
} from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
} from '#/lib/platform-collection-route'

const collection = platformCollections.n64

export const Route = createFileRoute('/en/n64-games')({
  loader: () => loadPlatformCollection(collection),
  head: ({ loaderData }) => buildPlatformCollectionHead(collection, loaderData),
  component: N64GamesRoute,
})

function N64GamesRoute() {
  const { games, pagination } = Route.useLoaderData()

  return <PlatformGamesPage collection={collection} games={games} total={pagination.total} />
}

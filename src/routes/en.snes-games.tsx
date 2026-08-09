import { createFileRoute } from '@tanstack/react-router'

import {
  PlatformGamesPage,
  platformCollections,
} from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
} from '#/lib/platform-collection-route'

const collection = platformCollections.snes

export const Route = createFileRoute('/en/snes-games')({
  loader: () => loadPlatformCollection(collection),
  head: ({ loaderData }) => buildPlatformCollectionHead(collection, loaderData),
  component: SnesGamesRoute,
})

function SnesGamesRoute() {
  const { games, pagination } = Route.useLoaderData()

  return <PlatformGamesPage collection={collection} games={games} total={pagination.total} />
}

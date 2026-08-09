import { createFileRoute } from '@tanstack/react-router'

import {
  PlatformGamesPage,
  platformCollections,
} from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
} from '#/lib/platform-collection-route'

const collection = platformCollections.segaGenesis

export const Route = createFileRoute('/en/sega-genesis-games')({
  loader: () => loadPlatformCollection(collection),
  head: ({ loaderData }) => buildPlatformCollectionHead(collection, loaderData),
  component: SegaGenesisGamesRoute,
})

function SegaGenesisGamesRoute() {
  const { games, pagination } = Route.useLoaderData()

  return <PlatformGamesPage collection={collection} games={games} total={pagination.total} />
}

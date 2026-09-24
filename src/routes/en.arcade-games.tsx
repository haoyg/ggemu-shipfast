import { createFileRoute } from '@tanstack/react-router'

import {
  ArcadeGamesPage,
  getLocalizedArcadeCollection,
} from '#/components/arcade-games-page'
import {
  buildPlatformCollectionHead,
  loadPlatformCollection,
} from '#/lib/platform-collection-route'

const collection = getLocalizedArcadeCollection('en')

export const Route = createFileRoute('/en/arcade-games')({
  loader: () => loadPlatformCollection(collection),
  head: ({ loaderData }) => buildPlatformCollectionHead(collection, loaderData),
  component: ArcadeGamesRoute,
})

function ArcadeGamesRoute() {
  const { games, pagination } = Route.useLoaderData()

  return (
    <ArcadeGamesPage
      games={games}
      page={1}
      pages={pagination.pages}
      total={pagination.total}
    />
  )
}

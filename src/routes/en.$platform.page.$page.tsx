import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { getLocalizedArcadeCollection } from '#/components/arcade-games-page'
import { GameCollectionPage } from '#/components/game-collection-page'
import {
  getRelatedGuide,
  platformCollections,
} from '#/components/platform-games-page'
import { getLocalizedPs1Collection } from '#/components/ps1-games-page'
import {
  buildPlatformCollectionHead,
  type CollectionRouteConfig,
  loadPlatformCollection,
  parsePlatformCollectionPage,
} from '#/lib/platform-collection-route'

const englishPlatformCollections = {
  'arcade-games': getLocalizedArcadeCollection('en'),
  'gba-games': platformCollections.gba,
  'n64-games': platformCollections.n64,
  'nes-games': platformCollections.nes,
  'ps1-games': getLocalizedPs1Collection('en'),
  'sega-genesis-games': platformCollections.segaGenesis,
  'snes-games': platformCollections.snes,
} satisfies Record<string, CollectionRouteConfig>

export const Route = createFileRoute('/en/$platform/page/$page')({
  loader: async ({ params }) => {
    const collection = getEnglishPlatformCollection(params.platform)
    const page = parsePlatformCollectionPage(params.page)

    if (!collection || !page) {
      throw notFound()
    }

    if (page === 1) {
      throw redirect({ href: collection.routePath, replace: true, statusCode: 301 })
    }

    const data = await loadPlatformCollection(collection, 'en', page)

    if (data.loadFailed) {
      throw new Error(`Unable to load ${collection.platform} games`)
    }

    if (data.pagination.pages < page) {
      throw notFound()
    }

    return data
  },
  head: ({ loaderData, params }) => {
    const collection = getEnglishPlatformCollection(params.platform)
    const page = parsePlatformCollectionPage(params.page)

    return collection && page && loaderData
      ? buildPlatformCollectionHead(collection, loaderData, 'en', page)
      : {}
  },
  component: PaginatedPlatformGamesRoute,
})

function PaginatedPlatformGamesRoute() {
  const { games, pagination } = Route.useLoaderData()
  const { page: pageParam, platform } = Route.useParams()
  const collection = getEnglishPlatformCollection(platform)
  const page = parsePlatformCollectionPage(pageParam)

  if (!collection || !page) {
    return null
  }

  return (
    <GameCollectionPage
      config={{
        ...collection.page,
        relatedGuide: getRelatedGuide(collection.platform),
      }}
      games={games}
      page={page}
      pages={pagination.pages}
      total={pagination.total}
    />
  )
}

function getEnglishPlatformCollection(platform: string) {
  return englishPlatformCollections[
    platform as keyof typeof englishPlatformCollections
  ]
}

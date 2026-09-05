import { searchGames } from '#/lib/ggemu'
import type { Locale, PublicGame } from '#/lib/ggemu'
import type { GameCollectionPageConfig } from '#/components/game-collection-page'
import { getSeoLinksFromCanonical, getSeoOrigin } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

export type PlatformCollectionLoaderData = {
  games: Array<PublicGame>
  origin: string
  pagination: {
    limit: number
    page: number
    pages: number
    total: number
  }
}

export type CollectionRouteConfig = {
  breadcrumbName: string
  description: string
  page: GameCollectionPageConfig
  platform: string
  routePath: string
  schemaName: string
  title: string
}

export async function loadPlatformCollection(
  collection: CollectionRouteConfig,
  locale: Locale = 'en',
): Promise<PlatformCollectionLoaderData> {
  const [origin, result] = await Promise.all([
    getSeoOrigin(),
    searchGames({
      data: {
        limit: 24,
        locale,
        page: 1,
        platform: collection.platform,
        sort: 'popular',
      },
    }).catch(() => ({
      games: [],
      pagination: { limit: 24, page: 1, pages: 0, total: 0 },
    })),
  ])

  return { origin, ...result }
}

export function buildPlatformCollectionHead(
  collection: CollectionRouteConfig,
  loaderData: PlatformCollectionLoaderData | undefined,
  locale: Locale = 'en',
) {
  const canonicalUrl = `${loaderData?.origin ?? ''}${collection.routePath}`

  return {
    links: loaderData?.origin
      ? getSeoLinksFromCanonical(canonicalUrl, ['zh-CN', 'en', 'ja'])
      : undefined,
    meta: [
      { title: collection.title },
      { name: 'description', content: collection.description },
      { property: 'og:title', content: collection.title },
      { property: 'og:description', content: collection.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: collection.title },
      { name: 'twitter:description', content: collection.description },
    ],
    scripts: loaderData?.origin
      ? buildStructuredDataScripts(collection, canonicalUrl, loaderData.games, locale)
      : undefined,
  }
}

function buildStructuredDataScripts(
  collection: CollectionRouteConfig,
  canonicalUrl: string,
  games: Array<PublicGame>,
  locale: Locale,
) {
  const origin = new URL(canonicalUrl).origin
  const itemList = games.slice(0, 18).map((game, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${origin}/${locale}/games/${encodeURIComponent(game.url_slug || game._id || '')}`,
    name: game.name,
  }))

  return [
    {
      type: 'application/ld+json',
      children: serializeJsonLd({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: collection.schemaName,
        description: collection.description,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: siteConfig.SITE_NAME,
          url: origin,
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: itemList.length,
          itemListElement: itemList,
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: serializeJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: collection.breadcrumbName,
            item: canonicalUrl,
          },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: serializeJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: collection.page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }),
    },
  ]
}

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

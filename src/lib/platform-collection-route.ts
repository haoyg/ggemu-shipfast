import { searchGames } from '#/lib/ggemu'
import type { Locale, PublicGame } from '#/lib/ggemu'
import type { GameCollectionPageConfig } from '#/components/game-collection-page'
import { getSeoLinksFromCanonical, getSeoOrigin } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

export const PLATFORM_COLLECTION_PAGE_SIZE = 48

export type PlatformCollectionLoaderData = {
  games: Array<PublicGame>
  loadFailed?: boolean
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
  page = 1,
): Promise<PlatformCollectionLoaderData> {
  const [origin, result] = await Promise.all([
    getSeoOrigin(),
    searchGames({
      data: {
        limit: PLATFORM_COLLECTION_PAGE_SIZE,
        locale,
        page,
        platform: collection.platform,
        sort: 'popular',
      },
    }).catch(() => null),
  ])

  return result
    ? { origin, ...result }
    : {
        games: [],
        loadFailed: true,
        origin,
        pagination: {
          limit: PLATFORM_COLLECTION_PAGE_SIZE,
          page,
          pages: 0,
          total: 0,
        },
      }
}

export function buildPlatformCollectionHead(
  collection: CollectionRouteConfig,
  loaderData: PlatformCollectionLoaderData | undefined,
  locale: Locale = 'en',
  page = 1,
) {
  const pagePath = getPlatformCollectionPagePath(collection.routePath, page)
  const canonicalUrl = `${loaderData?.origin ?? ''}${pagePath}`
  const title = page > 1
    ? `${collection.page.heroTitle} – Page ${page} | POKOPIE`
    : collection.title
  const description = page > 1
    ? `${collection.description} Page ${page} of ${loaderData?.pagination.pages ?? page}.`
    : collection.description
  const links = loaderData?.origin
    ? [
        ...getSeoLinksFromCanonical(canonicalUrl, page > 1 ? ['en'] : ['zh-CN', 'en', 'ja']),
        ...(locale === 'en' && page > 1
          ? [{ rel: 'prev', href: `${loaderData.origin}${getPlatformCollectionPagePath(collection.routePath, page - 1)}` }]
          : []),
        ...(locale === 'en' && loaderData.pagination.pages > page
          ? [{ rel: 'next', href: `${loaderData.origin}${getPlatformCollectionPagePath(collection.routePath, page + 1)}` }]
          : []),
      ]
    : undefined

  return {
    links,
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    scripts: loaderData?.origin
      ? buildStructuredDataScripts(collection, canonicalUrl, loaderData, locale, page)
      : undefined,
  }
}

export function getPlatformCollectionPagePath(routePath: string, page: number) {
  return page > 1 ? `${routePath}/page/${page}` : routePath
}

export function parsePlatformCollectionPage(value: string) {
  if (!/^[1-9]\d*$/.test(value)) {
    return null
  }

  const page = Number(value)
  return Number.isSafeInteger(page) ? page : null
}

function buildStructuredDataScripts(
  collection: CollectionRouteConfig,
  canonicalUrl: string,
  loaderData: PlatformCollectionLoaderData,
  locale: Locale,
  page: number,
) {
  const origin = new URL(canonicalUrl).origin
  const itemList = loaderData.games.map((game, index) => ({
    '@type': 'ListItem',
    position: (page - 1) * loaderData.pagination.limit + index + 1,
    url: `${origin}/${locale}/games/${encodeURIComponent(game.url_slug || game._id || '')}`,
    name: game.name,
  }))

  return [
    {
      type: 'application/ld+json',
      children: serializeJsonLd({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: page > 1 ? `${collection.schemaName} – Page ${page}` : collection.schemaName,
        description: page > 1 ? `${collection.description} Page ${page}.` : collection.description,
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
            name: page > 1 ? `${collection.breadcrumbName} – Page ${page}` : collection.breadcrumbName,
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

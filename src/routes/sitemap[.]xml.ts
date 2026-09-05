import { createFileRoute } from '@tanstack/react-router'

import type { BlogPost, Locale, PublicGame } from '#/lib/ggemu'
import { TimedAsyncCache } from '#/lib/timed-async-cache'
import { defaultSeoLocale } from '#/lib/seo'

const GGEMU_API_BASE_URL = 'https://ggemu.com'
const SITEMAP_PAGE_SIZE = 100
const SITEMAP_MAX_PAGES = 50
const SITEMAP_CACHE_TTL_MS = 1000 * 60 * 60 * 24
const SITEMAP_RETRY_TTL_MS = 60_000
const SITEMAP_SNAPSHOT_TTL_MS = 7 * SITEMAP_CACHE_TTL_MS
const SITEMAP_FETCH_CONCURRENCY = 6
const SITEMAP_REQUEST_TIMEOUT_MS = 5_000
const locales = ['zh-CN', 'en', 'ja'] as const satisfies ReadonlyArray<Locale>
const englishCollectionPaths = [
  '/arcade-games',
  '/gba-games',
  '/n64-games',
  '/nes-games',
  '/ps1-games',
  '/ps1-compatibility',
  '/sega-genesis-games',
  '/snes-games',
] as const

type SitemapSnapshot = { xml: string | null; createdAt: number; degraded: boolean }
const sitemapCache = new TimedAsyncCache(4)

type SitemapEntry = {
  alternateLocales?: ReadonlyArray<Locale>
  locale: Locale
  loc: string
  path: string
  changefreq?: 'daily' | 'weekly'
  lastmod?: string
  priority?: number
}

type GameSearchResponse = {
  success: true
  data: Array<PublicGame>
  pagination: {
    pages: number
  }
}

type BlogPostSearchResponse = {
  success: true
  blogPosts: Array<BlogPost>
  pagination: {
    pages: number
  }
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: ({ request }) => getSitemapResponse(request),
    },
  },
})

export async function getSitemapResponse(request: Request) {
  const url = new URL(request.url)
  const origin = ['pokopie.com', 'www.pokopie.com'].includes(url.hostname)
    ? 'https://pokopie.com'
    : url.origin
  const snapshot = await getSitemapSnapshot(origin)

  if (!snapshot.xml) {
    return new Response('Sitemap temporarily unavailable. Please retry later.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' },
    })
  }

  return new Response(snapshot.xml, {
    headers: {
      'Cache-Control': snapshot.degraded
        ? 'public, max-age=60, s-maxage=60'
        : 'public, max-age=3600, s-maxage=86400',
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

async function getSitemapSnapshot(origin: string): Promise<SitemapSnapshot> {
  const cached = sitemapCache.get<SitemapSnapshot>(origin)
  if (cached && cached.expiresAt > Date.now()) return cached.value

  return sitemapCache.run(origin, async () => {
    const previous = cached?.value.xml ? cached.value : await readSnapshot(origin)
    if (previous && previous.createdAt + SITEMAP_CACHE_TTL_MS > Date.now() && !previous.degraded) {
      rememberSnapshot(origin, previous)
      return previous
    }

    try {
      const [games, blogPosts] = await Promise.all([
        fetchSitemapGames(), fetchSitemapBlogPosts(),
      ])
      // An empty game catalog is suspicious; never replace a known good sitemap.
      if (!games.length) throw new Error('Empty game catalog')
      const snapshot = {
        xml: buildSitemapXml(buildSitemapEntries(origin, games, blogPosts)),
        createdAt: Date.now(),
        degraded: false,
      }
      rememberSnapshot(origin, snapshot)
      await writeSnapshot(origin, snapshot)
      return snapshot
    } catch {
      const snapshot = previous && previous.createdAt + SITEMAP_SNAPSHOT_TTL_MS > Date.now()
        ? { ...previous, degraded: true }
        : { xml: null, createdAt: Date.now(), degraded: true }
      rememberSnapshot(origin, snapshot)
      return snapshot
    }
  })
}

function rememberSnapshot(origin: string, snapshot: SitemapSnapshot) {
  sitemapCache.set(origin, {
    value: snapshot,
    expiresAt: snapshot.degraded ? Date.now() + SITEMAP_RETRY_TTL_MS : snapshot.createdAt + SITEMAP_CACHE_TTL_MS,
    staleUntil: snapshot.xml ? snapshot.createdAt + SITEMAP_SNAPSHOT_TTL_MS : Date.now() + SITEMAP_RETRY_TTL_MS,
  })
}

function getSnapshotStore() {
  return (globalThis.caches as (CacheStorage & { default?: Cache }) | undefined)?.default
}

function snapshotKey(origin: string) {
  return `${origin}/__cache/sitemap-last-success-v1`
}

async function readSnapshot(origin: string): Promise<SitemapSnapshot | undefined> {
  try {
    const response = await getSnapshotStore()?.match(snapshotKey(origin))
    if (!response) return
    const createdAt = Number(response.headers.get('X-Sitemap-Created-At'))
    if (!createdAt || createdAt + SITEMAP_SNAPSHOT_TTL_MS <= Date.now()) return
    return { xml: await response.text(), createdAt, degraded: false }
  } catch {
    // Edge cache eviction or unavailability must not prevent an upstream refresh.
    return undefined
  }
}

async function writeSnapshot(origin: string, snapshot: SitemapSnapshot) {
  try {
    await getSnapshotStore()?.put(snapshotKey(origin), new Response(snapshot.xml, {
      headers: {
        'Cache-Control': 'public, max-age=604800',
        'Content-Type': 'application/xml',
        'X-Sitemap-Created-At': String(snapshot.createdAt),
      },
    }))
  } catch {
    // Keep the successful in-memory result even if the edge cache cannot store it.
  }
}

async function fetchSitemapGames() {
  const firstPage = await fetchGamesPage(1)
  const pageCount = Math.min(firstPage.pagination.pages, SITEMAP_MAX_PAGES)
  const remainingPages = await fetchRemainingSitemapPages(pageCount, fetchGamesPage)
  const games = [
    ...firstPage.data,
    ...remainingPages.flatMap((result) => result.data),
  ]

  return dedupeGames(games)
}

async function fetchGamesPage(page: number) {
  const params = new URLSearchParams({
    limit: String(SITEMAP_PAGE_SIZE),
    page: String(page),
    play_online: '1',
    sort: 'newest',
  })

  const result = await fetchSitemapJson<GameSearchResponse>(
    `${GGEMU_API_BASE_URL}/api/games/search?${params}`,
  )
  validateSitemapPage(result, result.data)
  return result
}

async function fetchSitemapBlogPosts() {
  const firstPage = await fetchBlogPostsPage(1)
  const pageCount = Math.min(firstPage.pagination.pages, SITEMAP_MAX_PAGES)
  const remainingPages = await fetchRemainingSitemapPages(
    pageCount,
    fetchBlogPostsPage,
  )
  const blogPosts = [
    ...firstPage.blogPosts,
    ...remainingPages.flatMap((result) => result.blogPosts),
  ]

  return dedupeBlogPosts(blogPosts)
}

async function fetchRemainingSitemapPages<T>(
  pageCount: number,
  fetchPage: (page: number) => Promise<T>,
) {
  const pages = Array.from(
    { length: Math.max(pageCount - 1, 0) },
    (_, index) => index + 2,
  )
  const results: Array<T> = []
  let nextIndex = 0

  await Promise.all(
    Array.from(
      { length: Math.min(SITEMAP_FETCH_CONCURRENCY, pages.length) },
      async () => {
        while (nextIndex < pages.length) {
          const currentIndex = nextIndex
          const page = pages[currentIndex]

          nextIndex += 1
          results[currentIndex] = await fetchPage(page)
        }
      },
    ),
  )

  return results
}

async function fetchBlogPostsPage(page: number) {
  const params = new URLSearchParams({
    limit: String(SITEMAP_PAGE_SIZE),
    page: String(page),
  })

  const result = await fetchSitemapJson<BlogPostSearchResponse>(
    `${GGEMU_API_BASE_URL}/api/blog-posts?${params}`,
  )
  validateSitemapPage(result, result.blogPosts)
  return result
}

async function fetchSitemapJson<T>(url: string): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, SITEMAP_REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`GGEMU sitemap request failed with ${response.status}`)
    return await response.json() as T
  } finally {
    clearTimeout(timeoutId)
  }
}

function validateSitemapPage(result: { success: boolean; pagination?: { pages: number } }, items: unknown) {
  const pages = result.pagination?.pages
  if (!result.success || !Array.isArray(items) || !Number.isInteger(pages) || pages! < 0 || pages! > SITEMAP_MAX_PAGES) {
    throw new Error('Invalid or oversized sitemap page')
  }
  if (pages! > 0 && items.length === 0) throw new Error('Unexpected empty sitemap page')
}

function dedupeGames(games: Array<PublicGame>) {
  return dedupeByRouteId(games, getGameRouteId)
}

function dedupeBlogPosts(blogPosts: Array<BlogPost>) {
  return dedupeByRouteId(blogPosts, getBlogPostRouteId)
}

function dedupeByRouteId<T>(items: Array<T>, getRouteId: (item: T) => string) {
  const seen = new Set<string>()

  return items.filter((item) => {
    const id = getRouteId(item)

    if (!id || seen.has(id)) {
      return false
    }

    seen.add(id)
    return true
  })
}

function getGameRouteId(game: PublicGame) {
  return game.url_slug?.trim() || game._id?.trim() || ''
}

function getBlogPostRouteId(blogPost: BlogPost) {
  return blogPost.slug?.trim() || blogPost._id?.trim() || ''
}

function buildSitemapEntries(
  origin: string,
  games: Array<PublicGame>,
  blogPosts: Array<BlogPost>,
) {
  const entries: Array<SitemapEntry> = []

  for (const path of englishCollectionPaths) {
    entries.push({
      alternateLocales: ['en'],
      locale: 'en',
      loc: toAbsoluteLocalizedUrl(origin, 'en', path),
      path,
      changefreq: 'weekly',
      priority: 0.9,
    })
  }

  for (const locale of locales) {
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/'),
      path: '/',
      changefreq: 'daily',
      priority: 1,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/about'),
      path: '/about',
      changefreq: 'weekly',
      priority: 0.4,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/privacy-policy'),
      path: '/privacy-policy',
      changefreq: 'weekly',
      priority: 0.3,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/terms-of-service'),
      path: '/terms-of-service',
      changefreq: 'weekly',
      priority: 0.3,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/blog'),
      path: '/blog',
      changefreq: 'weekly',
      priority: 0.7,
    })

    for (const game of games) {
      const gameId = encodeURIComponent(getGameRouteId(game))
      const path = `/games/${gameId}`

      entries.push({
        locale,
        loc: toAbsoluteLocalizedUrl(origin, locale, path),
        path,
        changefreq: 'weekly',
        priority: 0.8,
      })
    }

    for (const blogPost of blogPosts) {
      const blogPostId = encodeURIComponent(getBlogPostRouteId(blogPost))
      const path = `/blog/${blogPostId}`

      entries.push({
        locale,
        loc: toAbsoluteLocalizedUrl(origin, locale, path),
        path,
        changefreq: 'weekly',
        lastmod: blogPost.updated_at || blogPost.created_at,
        priority: 0.6,
      })
    }
  }

  return entries
}

function toAbsoluteLocalizedUrl(origin: string, locale: Locale, path: string) {
  return path === '/' ? `${origin}/${locale}` : `${origin}/${locale}${path}`
}

function buildSitemapXml(entries: Array<SitemapEntry>) {
  const urls = entries.map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${formatSitemapAlternateLinks(entry)}${formatOptionalTag('lastmod', entry.lastmod)}${formatOptionalTag('changefreq', entry.changefreq)}${formatOptionalTag('priority', entry.priority)}
  </url>`,
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

function formatSitemapAlternateLinks(entry: SitemapEntry) {
  const origin = new URL(entry.loc).origin
  const alternateLocales = entry.alternateLocales ?? locales
  const links = [
    ...alternateLocales.map((locale) => ({
      href: toAbsoluteLocalizedUrl(origin, locale, entry.path),
      hrefLang: locale,
    })),
    {
      href: toAbsoluteLocalizedUrl(origin, defaultSeoLocale, entry.path),
      hrefLang: 'x-default',
    },
  ]

  return links
    .map(
      (link) => `
    <xhtml:link rel="alternate" hreflang="${escapeXml(link.hrefLang)}" href="${escapeXml(link.href)}" />`,
    )
    .join('')
}

function formatOptionalTag(name: string, value: string | number | undefined) {
  if (value === undefined) {
    return ''
  }

  return `
    <${name}>${escapeXml(String(value))}</${name}>`
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

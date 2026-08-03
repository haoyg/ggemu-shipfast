import { createFileRoute } from '@tanstack/react-router'

import type { BlogPost, Locale, PublicGame } from '#/lib/ggemu'
import { defaultSeoLocale } from '#/lib/seo'

const GGEMU_API_BASE_URL = 'https://ggemu.com'
const SITEMAP_PAGE_SIZE = 100
const SITEMAP_MAX_PAGES = 50
const SITEMAP_CACHE_TTL_MS = 1000 * 60 * 60 * 24
const SITEMAP_FETCH_CONCURRENCY = 6
const SITEMAP_REQUEST_TIMEOUT_MS = 5_000
const locales = ['zh-CN', 'en', 'ja'] as const satisfies ReadonlyArray<Locale>

let sitemapCache: {
  createdAt: number
  expiresAt: number
  xml: string
} | null = null

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
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin
        const xml = await getSitemapXml(origin)

        return new Response(xml, {
          headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'Content-Type': 'application/xml; charset=utf-8',
          },
        })
      },
    },
  },
})

async function getSitemapXml(origin: string) {
  if (sitemapCache && sitemapCache.expiresAt > Date.now()) {
    return sitemapCache.xml
  }

  const [gamesResult, blogPostsResult] = await Promise.allSettled([
    fetchSitemapGames(),
    fetchSitemapBlogPosts(),
  ])
  const games = gamesResult.status === 'fulfilled' ? gamesResult.value : []
  const blogPosts =
    blogPostsResult.status === 'fulfilled' ? blogPostsResult.value : []

  if ((games.length === 0 || blogPosts.length === 0) && sitemapCache) {
    return sitemapCache.xml
  }

  const entries = buildSitemapEntries(origin, games, blogPosts)
  const xml = buildSitemapXml(entries)

  sitemapCache = {
    createdAt: Date.now(),
    expiresAt: Date.now() + SITEMAP_CACHE_TTL_MS,
    xml,
  }

  return xml
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
    is_gcoin_game: '0',
    limit: String(SITEMAP_PAGE_SIZE),
    page: String(page),
    play_online: '1',
    sort: 'newest',
  })

  const response = await fetchSitemapJson(
    `${GGEMU_API_BASE_URL}/api/games/search?${params}`,
  )

  if (!response.ok) {
    throw new Error(`GGEMU sitemap request failed with ${response.status}`)
  }

  return response.json() as Promise<GameSearchResponse>
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

  const response = await fetchSitemapJson(
    `${GGEMU_API_BASE_URL}/api/blog-posts?${params}`,
  )

  if (!response.ok) {
    throw new Error(`GGEMU blog sitemap request failed with ${response.status}`)
  }

  return response.json() as Promise<BlogPostSearchResponse>
}

async function fetchSitemapJson(url: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, SITEMAP_REQUEST_TIMEOUT_MS)

  try {
    return await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }
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

  entries.push({
    alternateLocales: ['en'],
    locale: 'en',
    loc: toAbsoluteLocalizedUrl(origin, 'en', '/ps1-games'),
    path: '/ps1-games',
    changefreq: 'weekly',
    priority: 0.9,
  })

  entries.push({
    alternateLocales: ['en'],
    locale: 'en',
    loc: toAbsoluteLocalizedUrl(origin, 'en', '/arcade-games'),
    path: '/arcade-games',
    changefreq: 'weekly',
    priority: 0.9,
  })

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

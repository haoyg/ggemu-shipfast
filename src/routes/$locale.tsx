import {
  Link,
  Outlet,
  createFileRoute,
  notFound,
  redirect,
  useRouterState,
} from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import type { ComponentType, FormEvent, ReactNode } from 'react'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'

import { DefaultHomeTemplate } from '#/components/home/default-template'
import {
  FEATURE_NEW_ARRIVAL_LIMIT,
  FEATURE_PLATFORM_LIMIT,
  FEATURE_PLATFORMS,
  FEATURE_SECTION_LIMIT,
  getFeatureSections,
  POKI_REQUEST_SIZE,
  getPokiDailyLayoutSeed,
} from '#/components/home/template-config'
import { HOME_BLOG_POST_LIMIT } from '#/components/home/shared'
import type { Filters, HomeLoaderData } from '#/components/home/types'
import { SiteLayout } from '#/components/site-layout'
import {
  type GameSearchSort,
  type GameSearchResult,
  type Locale,
  getGameFilterOptions,
  searchBlogPosts,
  searchGames,
} from '#/lib/ggemu'
import { getI18n, isSupportedLocale, normalizeLocale } from '#/lib/i18n'
import { LatestRequestGuard } from '#/lib/latest-request-guard'
import {
  type SiteTemplate,
  getSiteTemplate,
  normalizeSiteTemplate,
  siteConfig,
} from '#/lib/site-config'
import { getLocalizedSeoLinks, getSeoOrigin } from '#/lib/seo'

const DEFAULT_HOME_REQUEST_SIZE = 24

const FeaturesHomeTemplate = lazyHomeTemplate(
  () => import('#/components/home/features-template'),
  'FeaturesHomeTemplate',
)
const PokiLikeHomeTemplate = lazyHomeTemplate(
  () => import('#/components/home/poki-like-template'),
  'PokiLikeHomeTemplate',
)
const SidenavHomeTemplate = lazyHomeTemplate(
  () => import('#/components/home/sidenav-template'),
  'SidenavHomeTemplate',
)
const TwoColumnHomeTemplate = lazyHomeTemplate(
  () => import('#/components/home/two-column-template'),
  'TwoColumnHomeTemplate',
)

type HomeSearch = {
  template?: SiteTemplate
}

function lazyHomeTemplate<
  Key extends string,
  Module extends Record<Key, ComponentType<HomeLoaderTemplateProps>>,
>(loadModule: () => Promise<Module>, exportName: Key) {
  return lazy(async () => ({
    default: (await loadModule())[exportName],
  }))
}

type HomeLoaderTemplateProps = Parameters<typeof DefaultHomeTemplate>[0]

function validateHomeSearch(search: Record<string, unknown>): HomeSearch {
  return {
    template: normalizeSiteTemplate(search.template),
  }
}

function getSearchTemplate(search: unknown) {
  if (!search || typeof search !== 'object') {
    return undefined
  }

  return normalizeSiteTemplate((search as Record<string, unknown>).template)
}

function parseHomeSearchStr(searchStr: string) {
  const searchParams = new URLSearchParams(searchStr)
  const template = normalizeSiteTemplate(searchParams.get('template'))

  return {
    hasTemplateOnly: Boolean(template) && Array.from(searchParams.keys()).length === 1,
    template,
  }
}

export const Route = createFileRoute('/$locale')({
  validateSearch: validateHomeSearch,
  headers: ({ match }) =>
    getSearchTemplate(match.search)
      ? {
          'X-Robots-Tag': 'noindex, nofollow',
        }
      : undefined,
  beforeLoad: ({ location, params }) => {
    if (!isSupportedLocale(params.locale)) {
      throw notFound({
        data: { locale: 'zh-CN' },
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
        },
      })
    }

    if (!location.searchStr || location.pathname !== `/${params.locale}`) {
      return undefined as never
    }

    const { hasTemplateOnly, template } = parseHomeSearchStr(location.searchStr)

    if (!hasTemplateOnly) {
      throw redirect({
        params: { locale: params.locale },
        replace: true,
        search: template ? { template } : {},
        to: '/$locale',
      })
    }

    return undefined as never
  },
  loaderDeps: ({ search }): HomeSearch => ({
    template: getSearchTemplate(search),
  }),
  loader: async ({ deps, params }): Promise<HomeLoaderData> => {
    const locale = normalizeLocale(params.locale)
    const template = getSiteTemplate(getSearchTemplate(deps))

    if (template === 'features') {
      const [
        seoOrigin,
        newArrival,
        platformResults,
        filterOptions,
        latestBlogPosts,
      ] = await Promise.all([
        getSeoOrigin(),
        loadFeatureGames(locale, 'newest', FEATURE_NEW_ARRIVAL_LIMIT),
        loadFeaturePlatformGames(locale),
        loadGameFilterOptions(),
        loadLatestBlogPosts(),
      ])

      return {
        ...newArrival,
        featureSections: getFeatureSections({
          newArrival: newArrival.games,
          platformGames: platformResults,
        }),
        filterOptions,
        layoutSeed: getPokiDailyLayoutSeed(),
        latestBlogPosts,
        seoOrigin,
      }
    }

    const [seoOrigin, result, filterOptions, latestBlogPosts] = await Promise.all([
      getSeoOrigin(),
      searchGames({
        data: {
          query: '',
          limit: getHomeRequestLimit(template),
          locale,
          page: 1,
          sort: getHomeSort(template),
        },
      }).catch(() => emptyGameSearchResult(1, getHomeRequestLimit(template))),
      loadGameFilterOptions(),
      loadLatestBlogPosts(),
    ])

    return {
      ...result,
      filterOptions,
      layoutSeed: getPokiDailyLayoutSeed(),
      latestBlogPosts,
      seoOrigin,
    }
  },
  head: ({ loaderData, params, match, matches }) => {
    const data = loaderData as unknown as HomeLoaderData | undefined
    const locale = normalizeLocale(params.locale)
    const meta = getI18n(locale).homeSeo
    const isTemplatePreview = Boolean(getSearchTemplate(match.search))
    const shouldRenderHomeSeo = isExactHomeHeadMatch(matches)

    return {
      links: shouldRenderHomeSeo && data?.seoOrigin
        ? getLocalizedSeoLinks({
            locale,
            origin: data.seoOrigin,
            path: '/',
          })
        : undefined,
      meta: shouldRenderHomeSeo
        ? [
            { title: meta.title },
            { name: 'description', content: meta.description },
            { name: 'keywords', content: meta.keywords },
            { property: 'og:title', content: meta.title },
            { property: 'og:description', content: meta.description },
            { property: 'og:type', content: 'website' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: meta.title },
            { name: 'twitter:description', content: meta.description },
            ...(isTemplatePreview
              ? [{ name: 'robots', content: 'noindex,nofollow' }]
              : []),
          ]
        : undefined,
    }
  },
  notFoundComponent: InvalidLocaleNotFound,
  component: LocalizedHomePage,
})

function InvalidLocaleNotFound() {
  return (
    <SiteLayout locale="zh-CN">
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <img
          alt="POKOPIE"
          className="h-16 w-16 rounded-2xl object-contain"
          src="/logo-128.png"
        />
        <h1 className="mt-6 text-3xl font-semibold leading-tight">
          页面不存在
        </h1>
        <p className="mt-4 text-base leading-7 text-base-content/70">
          这个地址不是 POKOPIE 的有效页面，你可以返回首页继续浏览复古游戏。
        </p>
        <Link className="btn btn-primary mt-8" params={{ locale: 'zh-CN' }} to="/$locale">
          <i className="ri-home-5-line" />
          返回首页
        </Link>
      </section>
    </SiteLayout>
  )
}

function isExactHomeHeadMatch(matches: Array<{ routeId: string }>) {
  return matches.at(-1)?.routeId === '/$locale'
}

function LocalizedHomePage() {
  const { locale } = Route.useParams()
  const template = getSearchTemplate(Route.useSearch())
  const initialResult = Route.useLoaderData() as HomeLoaderData
  const runSearch = useServerFn(searchGames)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const lang = normalizeLocale(locale)
  const currentTemplate = getSiteTemplate(template)
  const t = getI18n(lang).home
  const [result, setResult] = useState<GameSearchResult>(initialResult)
  const [filters, setFilters] = useState<Filters>({
    query: '',
    platform: '',
    category: '',
    sort: getHomeSort(currentTemplate),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoadError, setHasLoadError] = useState(false)
  const requestGuardRef = useRef<LatestRequestGuard | null>(null)
  const lastRequestRef = useRef({ filters, page: 1 })

  if (!requestGuardRef.current) {
    requestGuardRef.current = new LatestRequestGuard()
  }

  useEffect(() => {
    requestGuardRef.current?.invalidate()
    setResult(initialResult)
    setIsLoading(false)
    setHasLoadError(false)

    return () => requestGuardRef.current?.invalidate()
  }, [initialResult])

  const { games, pagination } = result
  const page = pagination.page
  const pages = Math.max(pagination.pages, 1)
  const isPokiLike = currentTemplate === 'poki-like'
  const isFeatures = currentTemplate === 'features'
  const templateProps = {
    filters,
    featureSections: initialResult.featureSections,
    filterOptions: initialResult.filterOptions,
    games,
    isLoading,
    lang,
    layoutSeed: initialResult.layoutSeed,
    latestBlogPosts: initialResult.latestBlogPosts,
    onFilterChange: updateFilter,
    onLoadPage: (nextPage: number) => loadGames(filters, nextPage),
    onQueryChange: (query: string) => {
      setFilters((current) => ({
        ...current,
        query,
      }))
    },
    onReset: resetFilters,
    onSearch: handleSearch,
    page,
    pages,
    pagination,
    t,
  }

  if (pathname !== `/${locale}`) {
    return <Outlet />
  }

  async function loadGames(nextFilters: Filters, nextPage: number) {
    const requestGuard = requestGuardRef.current

    if (!requestGuard) {
      return
    }

    const requestSequence = requestGuard.begin()
    lastRequestRef.current = { filters: nextFilters, page: nextPage }
    setIsLoading(true)
    setHasLoadError(false)

    try {
      const nextResult = await runSearch({
        data: {
          query: nextFilters.query,
          limit: getHomeRequestLimit(currentTemplate),
          locale: lang,
          page: nextPage,
          platform: nextFilters.platform,
          category: nextFilters.category,
          sort: nextFilters.sort,
        },
      })

      if (requestGuard.isLatest(requestSequence)) {
        setResult(nextResult)
      }
    } catch {
      if (requestGuard.isLatest(requestSequence)) {
        setHasLoadError(true)
      }
    } finally {
      if (requestGuard.isLatest(requestSequence)) {
        setIsLoading(false)
      }
    }
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    loadGames(filters, 1)
  }

  function updateFilter<Key extends keyof Filters>(key: Key, value: Filters[Key]) {
    const nextFilters = { ...filters, [key]: value }
    setFilters(nextFilters)
    loadGames(nextFilters, 1)
  }

  function resetFilters() {
    const nextFilters: Filters = {
      query: '',
      platform: '',
      category: '',
      sort: getHomeSort(currentTemplate),
    }

    setFilters(nextFilters)
    loadGames(nextFilters, 1)
  }

  let content: ReactNode

  if (isPokiLike) {
    content = (
      <Suspense fallback={null}>
        <PokiLikeHomeTemplate {...templateProps} />
      </Suspense>
    )
  } else if (isFeatures) {
    content = (
      <Suspense fallback={null}>
        <FeaturesHomeTemplate {...templateProps} />
      </Suspense>
    )
  } else if (currentTemplate === 'sidenav') {
    content = (
      <Suspense fallback={null}>
        <SidenavHomeTemplate {...templateProps} />
      </Suspense>
    )
  } else if (currentTemplate === 'two-column') {
    content = (
      <SiteLayout locale={lang}>
        <Suspense fallback={null}>
          <TwoColumnHomeTemplate {...templateProps} />
        </Suspense>
      </SiteLayout>
    )
  } else {
    content = (
      <SiteLayout locale={lang}>
        <DefaultHomeTemplate {...templateProps} />
      </SiteLayout>
    )
  }

  return (
    <>
      {content}
      {hasLoadError ? (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error max-w-md shadow-lg" role="alert">
            <i className="ri-error-warning-line text-xl" />
            <span>{t.loadError}</span>
            <button
              className="btn btn-sm"
              onClick={() => {
                const lastRequest = lastRequestRef.current
                loadGames(lastRequest.filters, lastRequest.page)
              }}
              type="button"
            >
              {t.retry}
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

async function loadLatestBlogPosts() {
  const result = await searchBlogPosts({
    data: {
      limit: HOME_BLOG_POST_LIMIT,
      page: 1,
    },
  }).catch(() => null)

  return result?.blogPosts ?? []
}

async function loadGameFilterOptions() {
  const result = await getGameFilterOptions().catch(() => null)

  return result ?? { platforms: [], categories: [] }
}

function getHomeRequestLimit(template = siteConfig.SITE_TEMPLATE) {
  if (template === 'poki-like') {
    return POKI_REQUEST_SIZE
  }

  if (template === 'features') {
    return FEATURE_SECTION_LIMIT
  }

  return DEFAULT_HOME_REQUEST_SIZE
}

function getHomeSort(template: SiteTemplate): GameSearchSort {
  return template === 'features' ? 'newest' : 'popular'
}

async function loadFeatureGames(
  locale: Locale,
  sort: GameSearchSort,
  limit = FEATURE_SECTION_LIMIT,
  platform = '',
) {
  return searchGames({
    data: {
      limit,
      locale,
      page: 1,
      platform,
      sort,
    },
  }).catch(() => emptyGameSearchResult(1, limit))
}

async function loadFeaturePlatformGames(locale: Locale) {
  return Promise.all(
    FEATURE_PLATFORMS.map(async (platform) => {
      const result = await loadFeatureGames(
        locale,
        'popular',
        FEATURE_PLATFORM_LIMIT,
        platform,
      )

      return {
        title: platform,
        games: result.games,
      }
    }),
  )
}

function emptyGameSearchResult(page: number, limit: number) {
  return {
    games: [],
    pagination: {
      total: 0,
      page,
      limit,
      pages: 0,
    },
  } satisfies GameSearchResult
}

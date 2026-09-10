import { Link, useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import type { FocusEvent, ReactNode } from 'react'
import { useEffect, useId, useState } from 'react'

import {
  GameCardPreviewVideo,
  gameCardPreviewHandlers,
} from '#/components/game-card-preview'
import type { Locale, PublicGame } from '#/lib/ggemu'
import { searchGames } from '#/lib/ggemu'
import {
  formatCopy,
  getI18n,
  getLocalizedCategoryLabel,
  getLocalizedPlatformLabel,
} from '#/lib/i18n'
import { getRetroCoverFallbackLabel } from '#/lib/locale-labels'
import { prioritizeClassicGames } from '#/lib/home-game-priority'
import { siteConfig } from '#/lib/site-config'
import { getPlatformCollectionPath } from '#/lib/platform-routes'

import {
  HomeFaqSection,
  HomeLatestBlogPostsSection,
  HomeSeoContentSection,
  getSearchPlaceholder,
} from './shared'
import { useRecentPlayedGames } from './recent-played-games'
import type { HomeTemplateProps } from './types'

const platformShortLabels: Record<string, string> = {
  F: 'NES',
  f: 'NES',
  ARCADE: 'Arcade',
  Arcade: 'Arcade',
  arcade: 'Arcade',
  'Game Boy Advance': 'GBA',
  'game-boy-advance': 'GBA',
  N64: 'N64',
  NES: 'NES',
  n64: 'N64',
  nes: 'NES',
  'Nintendo 64': 'N64',
  'PlayStation 1': 'PS1',
  'playstation-1': 'PS1',
  PS1: 'PS1',
  ps1: 'PS1',
  SNES: 'SNES',
  snes: 'SNES',
  'Super Famicom': 'SNES',
}

const localizedPlatformShortLabels: Partial<Record<Locale, Record<string, string>>> = {
  'zh-CN': {
    ARCADE: '\u8857\u673a',
    Arcade: '\u8857\u673a',
    arcade: '\u8857\u673a',
  },
  ja: {
    ARCADE: '\u30a2\u30fc\u30b1\u30fc\u30c9',
    Arcade: '\u30a2\u30fc\u30b1\u30fc\u30c9',
    arcade: '\u30a2\u30fc\u30b1\u30fc\u30c9',
  },
}

const preferredPlatforms = [
  'Game Boy Advance',
  'NES',
  'SNES',
  'PlayStation 1',
  'Nintendo 64',
  'ARCADE',
  'Sega Genesis',
]

const platformAliases: Record<string, Array<string>> = {
  ARCADE: ['ARCADE', 'Arcade'],
  'Game Boy Advance': ['Game Boy Advance', 'GBA'],
  NES: ['NES', 'Nintendo Entertainment System'],
  'Nintendo 64': ['Nintendo 64', 'N64'],
  'PlayStation 1': ['PlayStation 1', 'PS1', 'PlayStation'],
  'Sega Genesis': ['Sega Genesis', 'Genesis'],
  SNES: ['SNES', 'Super Nintendo', 'Super Famicom'],
}

const platformSeoPaths: Record<string, string> = {
  ARCADE: '/en/arcade-games',
  Arcade: '/en/arcade-games',
  'Game Boy Advance': '/en/gba-games',
  GBA: '/en/gba-games',
  Genesis: '/en/sega-genesis-games',
  NES: '/en/nes-games',
  N64: '/en/n64-games',
  'Nintendo Entertainment System': '/en/nes-games',
  'Nintendo 64': '/en/n64-games',
  'PlayStation 1': '/en/ps1-games',
  PlayStation: '/en/ps1-games',
  PS1: '/en/ps1-games',
  'Sega Genesis': '/en/sega-genesis-games',
  SNES: '/en/snes-games',
  'Super Famicom': '/en/snes-games',
  'Super Nintendo': '/en/snes-games',
}

export function DefaultHomeTemplate(props: HomeTemplateProps) {
  const {
    filterOptions,
    filters,
    games,
    featureSections = [],
    isLoading,
    lang,
    latestBlogPosts,
    latestGames,
    onFilterChange,
    onQueryChange,
    onSearch,
    pagination,
    onLoadPage,
    page,
    pages,
    t,
  } = props
  const layoutCopy = getI18n(lang).layout
  const { clear: clearRecentGames, games: recentGames } = useRecentPlayedGames()
  const platformChips = getPlatformChips(filterOptions.platforms, lang)
  const sidebarCategories = filterOptions.categories.slice(0, 6)
  const hasActiveFilters = Boolean(filters.query.trim() || filters.category || filters.platform)
  const [visibleCount, setVisibleCount] = useState(24)
  useEffect(() => setVisibleCount(24), [games])
  const rankedGames = hasActiveFilters ? games : prioritizeClassicGames(games)
  const topGames = rankedGames.slice(0, visibleCount)
  const recommendedIds = new Set(topGames.map(getGameRouteId))
  const platformSections = featureSections.map((section) => {
    const sectionGames = section.games.filter((game) => {
      const id = getGameRouteId(game)
      return id && !recommendedIds.has(id)
    }).slice(0, 8)
    sectionGames.forEach((game) => recommendedIds.add(getGameRouteId(game)))
    return { ...section, games: sectionGames }
  }).filter((section) => section.games.length > 0)
  const newGames = prioritizeClassicGames(latestGames)
    .filter((game) => !recommendedIds.has(getGameRouteId(game)))
    .slice(0, 8)
  const viewAllLabel = lang === 'zh-CN' ? '查看全部' : lang === 'ja' ? 'すべて見る' : 'View all'
  const loadMoreLabel = lang === 'zh-CN' ? '加载更多游戏' : lang === 'ja' ? 'ゲームをもっと見る' : 'Load more games'
  const recommendationLabel = lang === 'zh-CN' ? '经典游戏优先推荐' : lang === 'ja' ? 'クラシックゲームを優先表示' : 'Classic games first'
  const continueLabel = lang === 'zh-CN' ? '继续游玩' : lang === 'ja' ? '続けてプレイ' : 'Continue playing'
  const platformCards = platformChips.slice(0, 6)
  const activeCategoryLabel = filters.category
    ? getLocalizedCategoryLabel(filters.category, lang)
    : ''
  const activePlatformLabel = filters.platform
    ? getLocalizedPlatformLabel(filters.platform, lang)
    : ''

  function handleCategoryChange(categoryName: string) {
    onFilterChange('category', filters.category === categoryName ? '' : categoryName)
  }

  function handlePlatformChange(platformName: string) {
    onFilterChange('platform', filters.platform === platformName ? '' : platformName)
  }

  return (
    <div className="arcade-page overflow-x-hidden">
      <div className="mx-auto grid w-full max-w-[96rem] min-w-0 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/10 bg-[#090f20]/80 px-3 py-4 lg:block">
          <nav className="sticky top-20 flex flex-col gap-5">
            <Link
              className="flex items-center gap-3 rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-content"
              params={{ locale: lang }}
              to="/$locale"
            >
              <i aria-hidden="true" className="ri-home-5-line text-lg" />
              {layoutCopy.games}
            </Link>
            {recentGames.length > 0 ? (
              <SideNavAnchor href="#recent-games" icon="ri-history-line" label={t.recentlyPlayed} />
            ) : null}

            <section className="border-t border-white/10 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/45">
                {t.allCategories}
              </p>
              <div className="grid gap-1">
                {sidebarCategories.map((category) => (
                  <button
                    aria-pressed={filters.category === category.name}
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-left text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                    type="button"
                  >
                    <span>{getLocalizedCategoryLabel(category.name, lang)}</span>
                    <i
                      aria-hidden="true"
                      className={`text-base ${
                        filters.category === category.name
                          ? 'ri-check-line text-primary'
                          : 'ri-arrow-right-s-line'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </section>
          </nav>
        </aside>

        <main className="min-w-0 max-w-full overflow-x-hidden">
          <section className="arcade-section border-b px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div className="arcade-hero relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
              <div aria-hidden="true" className="absolute -right-24 -top-28 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
              <div aria-hidden="true" className="absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />
              <div className="relative">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="arcade-kicker">{siteConfig.SITE_NAME}</p>
                    <span className="badge badge-outline border-white/20 text-xs font-medium text-white/70">
                      {formatCopy(t.totalGames, { total: pagination.total })}
                    </span>
                  </div>
                  <h1 className="arcade-section-title mt-3 max-w-4xl text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                    {t.title}
                  </h1>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
                    {t.subtitle}
                  </p>
                  <div className="mt-4 max-w-3xl">
                    <form className="min-w-0" onSubmit={onSearch}>
                      <HomeSearchSuggest
                        gameTotal={pagination.total}
                        isLoading={isLoading}
                        lang={lang}
                        onQueryChange={onQueryChange}
                        query={filters.query}
                        t={t}
                      />
                    </form>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs leading-5 text-white/55">{t.heroSearchHint}</p>
                      <a className="btn btn-ghost btn-sm min-h-10 px-3 text-white hover:bg-white/10" href="#popular-games">
                        {t.browsePopular}
                        <i aria-hidden="true" className="ri-arrow-down-line" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
              <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-white/45">
                {t.allPlatforms}
              </p>
              <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {platformChips.map((platform) => (
                  <button
                    aria-pressed={filters.platform === platform.name}
                    className={`arcade-control btn btn-sm min-h-10 shrink-0 ${
                      filters.platform === platform.name
                        ? 'btn-primary'
                        : 'bg-white/8 text-white hover:bg-white/15'
                    }`}
                    key={platform.name}
                    onClick={() => handlePlatformChange(platform.name)}
                    type="button"
                  >
                    <i aria-hidden="true" className="ri-gamepad-line" />
                    {platform.shortLabel}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="arcade-section px-3 py-7 sm:px-6 sm:py-9 lg:px-8">
            {activeCategoryLabel || activePlatformLabel ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {activePlatformLabel ? (
                  <FilterBadge
                    label={activePlatformLabel}
                    onClear={() => onFilterChange('platform', '')}
                  />
                ) : null}
                {activeCategoryLabel ? (
                  <FilterBadge
                    label={activeCategoryLabel}
                    onClear={() => onFilterChange('category', '')}
                  />
                ) : null}
              </div>
            ) : null}

            {recentGames.length > 0 ? (
              <section className="arcade-card mb-8 scroll-mt-24 p-3 sm:p-4" id="recent-games">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="flex items-center gap-2 text-base font-bold text-white">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/8 text-sm text-white/65">
                      <i aria-hidden="true" className="ri-history-line" />
                    </span>
                    {t.recentlyPlayed}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/45">
                      {recentGames.length} {lang === 'zh-CN' ? '个游戏' : lang === 'ja' ? 'ゲーム' : 'games'}
                    </span>
                    <button className="text-xs font-semibold text-white/55 underline underline-offset-2 hover:text-white" onClick={clearRecentGames} type="button">
                      {lang === 'zh-CN' ? '清除记录' : lang === 'ja' ? '履歴を消去' : 'Clear history'}
                    </button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {recentGames.slice(0, 4).map((game) => (
                    <Link
                      className="arcade-card group grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] gap-3 p-2 transition"
                      key={game.id}
                      params={{ gameId: game.id, locale: lang }}
                      title={`Continue playing ${game.name}`}
                      to="/$locale/games/$gameId/play"
                    >
                      <ArcadeCover alt={game.name} className="aspect-square rounded-md" cover={game.cover} lang={lang} />
                      <div className="min-w-0 self-center">
                        <h3 className="line-clamp-2 text-sm font-semibold text-white">{game.name}</h3>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                          <i aria-hidden="true" className="ri-play-fill" />
                          {continueLabel}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            {topGames.length > 0 ? (
              <section className="scroll-mt-24" id="popular-games">
                <div className="mb-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      <i aria-hidden="true" className="ri-star-fill" />
                      {t.featured}
                    </p>
                  <h2 className="arcade-rule-title arcade-section-title mt-1 text-3xl font-black text-white sm:text-4xl">{t.popular}</h2>
                  </div>
                  {!hasActiveFilters ? (
                    <span className="badge badge-outline shrink-0 border-white/15 text-xs font-medium text-white/55">
                      {recommendationLabel}
                    </span>
                  ) : null}
                </div>
                <div
                  aria-busy={isLoading}
                  className={`grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 2xl:grid-cols-6 ${
                    isLoading ? 'opacity-60' : ''
                  }`}
                >
                  {topGames.map((game, index) => (
                    <ArcadeGameCard
                      game={game}
                      isPriority={index === 0}
                      key={getGameRouteId(game)}
                      lang={lang}
                    />
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {visibleCount < rankedGames.length ? (
                    <button className="btn btn-primary" disabled={isLoading} onClick={() => setVisibleCount((count) => count + 24)} type="button">
                      {loadMoreLabel}
                    </button>
                  ) : null}
                  {page > 1 ? (
                    <button className="btn btn-outline" disabled={isLoading} onClick={() => onLoadPage(page - 1)} type="button">{t.previous}</button>
                  ) : null}
                  {visibleCount >= rankedGames.length && page < pages ? (
                    <button className="btn btn-outline" disabled={isLoading} onClick={() => onLoadPage(page + 1)} type="button">{isLoading ? t.loading : t.next}</button>
                  ) : null}
                </div>
              </section>
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-center text-white/60">
                {t.empty}
              </div>
            )}
          </section>

          {!hasActiveFilters ? platformSections.map((section) => (
            <section className="arcade-section border-t px-4 py-6 sm:px-6 lg:px-8" key={section.title} aria-label={getLocalizedPlatformLabel(section.title, lang)}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-white">{getLocalizedPlatformLabel(section.title, lang)}</h2>
                <a className="btn btn-ghost btn-sm shrink-0 text-white/80" href={getPlatformSeoPath(section.title, lang)}>
                  {viewAllLabel}
                  <i aria-hidden="true" className="ri-arrow-right-line" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {section.games.map((game) => (
                  <ArcadeGameCard game={game} isPriority={false} key={getGameRouteId(game)} lang={lang} />
                ))}
              </div>
            </section>
          )) : null}

          <section className="arcade-section border-t px-4 py-7 sm:px-6 lg:px-8">
            <div className="arcade-card p-4 sm:p-6">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                {t.discovery}
              </p>
              <div className="grid gap-6">
                <HomeRail title={t.newest}>
                  {newGames.length > 0 ? (
                    newGames.map((game) => (
                      <ArcadeMiniCard game={game} key={getGameRouteId(game)} lang={lang} />
                    ))
                  ) : (
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/55">
                      {t.empty}
                    </div>
                  )}
                </HomeRail>
              </div>
            </div>
          </section>

          <section className="arcade-section border-t px-4 py-7 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-xl font-black text-white">{t.allPlatforms}</h2>
              {filters.platform ? (
                <button className="btn btn-ghost btn-sm text-white/70" onClick={() => onFilterChange('platform', '')} type="button">
                  {t.reset}
                </button>
              ) : null}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {platformCards.map((platform) => (
                <a
                  className={`arcade-card group flex items-center justify-between p-4 text-left transition ${
                    filters.platform === platform.name
                      ? 'border-primary/70 bg-primary/15'
                      : 'border-white/10 bg-white/5'
                  }`}
                  href={platform.seoPath}
                  key={platform.name}
                  title={`Play ${platform.shortLabel} games online`}
                >
                  <span>
                    <span className="block text-base font-bold text-white">
                      {platform.label}
                    </span>
                    <span className="mt-1 block text-sm text-white/50">
                      {platform.shortLabel}
                    </span>
                  </span>
                  <i aria-hidden="true" className="ri-arrow-right-s-line text-2xl text-white/40 transition group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              ))}
            </div>
          </section>

          <div className="home-content arcade-editorial text-neutral-content">
            <HomeSeoContentSection lang={lang} />
            <HomeLatestBlogPostsSection blogPosts={latestBlogPosts} compact lang={lang} />
            <HomeFaqSection lang={lang} />
          </div>
        </main>
      </div>
    </div>
  )
}

function HomeSearchSuggest({
  gameTotal,
  isLoading,
  lang,
  onQueryChange,
  query,
  t,
}: {
  gameTotal: number
  isLoading: boolean
  lang: Locale
  onQueryChange: (query: string) => void
  query: string
  t: HomeTemplateProps['t']
}) {
  const runSearch = useServerFn(searchGames)
  const navigate = useNavigate()
  const suggestionId = useId()
  const [suggestions, setSuggestions] = useState<Array<PublicGame>>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const normalizedQuery = query.trim()
  const shouldSuggest = normalizedQuery.length >= 2
  const showSuggestions = isFocused && shouldSuggest

  useEffect(() => {
    if (!shouldSuggest) {
      setSuggestions([])
      setIsSuggesting(false)
      return
    }

    let isCurrent = true
    setIsSuggesting(true)

    const timeoutId = window.setTimeout(() => {
      void runSearch({
        data: {
          query: normalizedQuery,
          limit: 6,
          locale: lang,
          page: 1,
          sort: 'popular',
        },
      })
        .then((result) => {
        if (isCurrent) {
          setSuggestions(result.games)
          setHighlightedIndex(-1)
          }
        })
        .catch(() => {
          if (isCurrent) {
      setSuggestions([])
      setHighlightedIndex(-1)
          }
        })
        .finally(() => {
          if (isCurrent) {
            setIsSuggesting(false)
          }
        })
    }, 220)

    return () => {
      isCurrent = false
      window.clearTimeout(timeoutId)
    }
  }, [lang, normalizedQuery, runSearch, shouldSuggest])

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false)
    }
  }

  function handleSuggestionKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsFocused(false)
      setHighlightedIndex(-1)
      return
    }
    if (!showSuggestions || suggestions.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((index) => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1))
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault()
      const game = suggestions[highlightedIndex]
      if (game) {
        void navigate({
          to: '/$locale/games/$gameId',
          params: { gameId: game.url_slug || game._id || '', locale: lang },
        })
      }
    }
  }

  return (
    <div className="relative" onBlur={handleBlur}>
      <label className="input input-md flex w-full min-w-0 max-w-full items-center gap-2 border-2 border-primary/70 bg-base-100 text-base-content shadow-[0_0_0_3px_rgba(236,72,153,0.14)] sm:input-lg sm:gap-3 sm:shadow-[0_0_0_4px_rgba(236,72,153,0.16)]">
        <i className="ri-search-line text-xl text-primary sm:text-2xl" />
        <input
          aria-autocomplete="list"
          aria-controls={suggestionId}
          aria-expanded={showSuggestions}
          aria-label={t.search}
          autoComplete="off"
          className="min-w-0 flex-1 text-sm sm:text-base"
          onChange={(event) => onQueryChange(event.currentTarget.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleSuggestionKeyDown}
          placeholder={getSearchPlaceholder(t, gameTotal)}
          type="search"
          value={query}
        />
        <button
          aria-label={t.search}
          className="btn btn-primary btn-sm min-h-11 shrink-0"
          disabled={isLoading}
          type="submit"
        >
          <i aria-hidden="true" className="ri-arrow-right-line sm:hidden" />
          <span className="hidden sm:inline">{t.search}</span>
        </button>
      </label>

      {showSuggestions ? (
        <div
          aria-label={t.search}
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-lg border border-white/10 bg-neutral/95 shadow-2xl backdrop-blur"
          id={suggestionId}
          role="listbox"
        >
          {isSuggesting ? (
            <div className="flex items-center gap-2 px-3 py-3 text-sm text-white/65">
              <span className="loading loading-spinner loading-xs" />
              {t.search}
            </div>
          ) : suggestions.length > 0 ? (
            <div className="max-h-[22rem] overflow-y-auto p-2">
              {suggestions.map((game) => (
                <SearchSuggestionItem
                  game={game}
                  isHighlighted={highlightedIndex === suggestions.indexOf(game)}
                  key={game._id ?? game.url_slug ?? game.name}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="px-3 py-3 text-sm text-white/60">{t.empty}</div>
          )}
        </div>
      ) : null}
    </div>
  )
}

function SearchSuggestionItem({
  game,
  isHighlighted,
  lang,
}: {
  game: PublicGame
  isHighlighted: boolean
  lang: Locale
}) {
  const gameId = game.url_slug || game._id || ''
  const platform = game.platform ? getLocalizedPlatformLabel(game.platform, lang) : ''
  const category = game.categories?.[0]
    ? getLocalizedCategoryLabel(game.categories[0], lang)
    : ''

  return (
    <Link
      aria-selected={isHighlighted}
      className={`flex min-w-0 items-center gap-3 rounded-md px-2 py-2 text-white transition hover:bg-white/10 ${isHighlighted ? 'bg-white/10' : ''}`}
      params={{ gameId, locale: lang }}
      search={{}}
      title={`Play ${game.name} online`}
      to="/$locale/games/$gameId"
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white/10">
        {game.game_cover ? (
          <img
            alt={game.name ?? 'Game cover'}
            className="h-full w-full object-cover"
            decoding="async"
            loading="lazy"
            src={game.game_cover}
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-[10px] text-white/45">
            {getRetroCoverFallbackLabel(lang)}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{game.name}</div>
        <div className="mt-1 flex min-w-0 gap-2 text-xs text-white/50">
          {platform ? <span className="truncate">{platform}</span> : null}
          {category ? <span className="truncate">{category}</span> : null}
        </div>
      </div>
      <i className="ri-arrow-right-s-line shrink-0 text-lg text-white/45" />
    </Link>
  )
}

function SideNavAnchor({
  href,
  icon,
  label,
}: {
  href: string
  icon: string
  label: string
}) {
  return (
    <a
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
      href={href}
    >
      <i aria-hidden="true" className={`${icon} text-lg`} />
      {label}
    </a>
  )
}

function HomeRail({
  children,
  id,
  title,
}: {
  children: ReactNode
  id?: string
  title: string
}) {
  return (
    <section className="min-w-0 scroll-mt-24" id={id}>
      <h2 className="mb-3 text-lg font-black text-white">{title}</h2>
      <div
        aria-label={title}
        className="flex snap-x gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        tabIndex={0}
      >
        {children}
      </div>
    </section>
  )
}

function FilterBadge({
  label,
  onClear,
}: {
  label: string
  onClear: () => void
}) {
  return (
    <button
      className="badge badge-primary gap-1 border-0 py-3 pr-2 text-primary-content"
      onClick={onClear}
      type="button"
    >
      {label}
      <i aria-hidden="true" className="ri-close-line text-sm" />
    </button>
  )
}

function ArcadeGameCard({
  game,
  isPriority,
  lang,
}: {
  game: PublicGame
  isPriority: boolean
  lang: Locale
}) {
  const gameId = getGameRouteId(game)
  const platformBadge = getPlatformBadge(game, lang)
  const gameName = game.name?.trim() || 'Game'

  return (
    <Link
      className="arcade-card arcade-game-card group relative min-w-0 overflow-hidden shadow-sm transition duration-200 hover:-translate-y-1"
      {...gameCardPreviewHandlers}
      params={{ gameId, locale: lang }}
      search={{}}
      title={`Play ${gameName} online`}
      to="/$locale/games/$gameId"
    >
      <ArcadeCover
        alt={gameName}
        className="aspect-[4/3]"
        cover={game.game_cover}
        isPriority={isPriority}
        lang={lang}
      >
        <GameCardPreviewVideo src={game.game_video} />
        <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-xl text-neutral shadow-xl">
            <i className="ri-play-fill" />
          </span>
        </span>
        {platformBadge ? (
          <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[10px] font-black uppercase text-primary-content">
            {platformBadge}
          </span>
        ) : null}
      </ArcadeCover>
      <div className="p-2.5">
        <h3 className="line-clamp-2 min-h-9 text-sm font-semibold leading-snug text-white">
          {gameName}
        </h3>
      </div>
    </Link>
  )
}

function ArcadeMiniCard({ game, lang }: { game: PublicGame; lang: Locale }) {
  const gameId = getGameRouteId(game)
  const gameName = game.name?.trim() || 'Game'

  return (
    <Link
      className="arcade-card arcade-game-card group w-48 min-w-0 shrink-0 overflow-hidden transition"
      params={{ gameId, locale: lang }}
      search={{}}
      title={`Play ${gameName} online`}
      to="/$locale/games/$gameId"
    >
      <ArcadeCover alt={gameName} className="aspect-[4/3]" cover={game.game_cover} lang={lang} />
      <h3 className="line-clamp-2 min-h-10 p-2 text-sm font-semibold leading-snug text-white">
        {gameName}
      </h3>
    </Link>
  )
}

function ArcadeCover({
  alt,
  children,
  className,
  cover,
  isPriority = false,
  lang,
}: {
  alt: string
  children?: ReactNode
  className: string
  cover?: string
  isPriority?: boolean
  lang: Locale
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[linear-gradient(135deg,rgba(244,63,94,0.22),rgba(34,211,238,0.14)),radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.16),transparent_32%)] ${className}`}
    >
      {cover?.trim() ? (
        <img
          alt={alt}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          decoding="async"
          fetchPriority={isPriority ? 'high' : 'auto'}
          loading={isPriority ? 'eager' : 'lazy'}
          src={cover}
        />
      ) : (
        <div className="grid h-full place-items-center px-3 text-center text-xs font-black uppercase tracking-wide text-white/45">
          {getRetroCoverFallbackLabel(lang)}
        </div>
      )}
      {children}
    </div>
  )
}

function getPlatformChips(
  platforms: HomeTemplateProps['filterOptions']['platforms'],
  lang: Locale,
) {
  return preferredPlatforms
    .map((preferredPlatform) => (
      platforms.find((platform) => platformMatches(platform.name, preferredPlatform))
    ))
    .filter((platform): platform is NonNullable<typeof platform> => Boolean(platform))
    .map((platform) => ({
      label: getLocalizedPlatformLabel(platform.name, lang),
      name: platform.name,
      seoPath: getPlatformSeoPath(platform.name, lang),
      shortLabel: getPlatformShortLabel(platform.name, lang),
    }))
    .filter((platform) => Boolean(platform.seoPath))
}

function platformMatches(platformName: string, preferredPlatform: string) {
  const aliases = platformAliases[preferredPlatform] ?? [preferredPlatform]
  const normalizedPlatformName = platformName.trim().toLowerCase()

  return aliases.some((alias) => alias.trim().toLowerCase() === normalizedPlatformName)
}

function getGameRouteId(game: PublicGame) {
  return game.url_slug?.trim() || game._id?.trim() || ''
}

function getPlatformBadge(game: PublicGame, lang: Locale) {
  const slug = game.platform_slug?.trim() || game.platformSlug?.trim()

  if (slug) {
    return getKnownPlatformShortLabel(slug, lang) ?? getLocalizedPlatformLabel(slug, lang)
  }

  const platform = game.platform?.trim()

  if (!platform) {
    return ''
  }

  return getKnownPlatformShortLabel(platform, lang) ?? getLocalizedPlatformLabel(platform, lang)
}

function getPlatformShortLabel(platform: string, lang: Locale) {
  return getKnownPlatformShortLabel(platform, lang) ?? platform
}

function getKnownPlatformShortLabel(platform: string, lang: Locale) {
  return (
    localizedPlatformShortLabels[lang]?.[platform] ??
    platformShortLabels[platform]
  )
}

function getPlatformSeoPath(platform: string, lang: Locale) {
  const path = platformSeoPaths[platform] ?? '/en'
  return getPlatformCollectionPath(path, lang)
}

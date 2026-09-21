import { Link, useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import type { FocusEvent, ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'

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
  Famicom: 'NES',
  ARCADE: 'Arcade',
  Arcade: 'Arcade',
  arcade: 'Arcade',
  'Game Boy Advance': 'GBA',
  'game-boy-advance': 'GBA',
  Genesis: 'Genesis',
  N64: 'N64',
  NES: 'NES',
  n64: 'N64',
  nes: 'NES',
  'Nintendo 64': 'N64',
  'PlayStation 1': 'PS1',
  'playstation-1': 'PS1',
  PS1: 'PS1',
  ps1: 'PS1',
  'Sega Genesis': 'Genesis',
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
  'NES',
  'SNES',
  'Game Boy Advance',
  'PlayStation 1',
  'Nintendo 64',
  'ARCADE',
  'Sega Genesis',
]

const platformAliases: Record<string, Array<string>> = {
  ARCADE: ['ARCADE', 'Arcade'],
  'Game Boy Advance': ['Game Boy Advance', 'GBA'],
  NES: ['NES', 'Nintendo Entertainment System', 'Famicom'],
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
    onReset,
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
  const [visibleCount, setVisibleCount] = useState(12)
  const [lobbyPlatform, setLobbyPlatform] = useState('')
  const [lobbyPlatformGames, setLobbyPlatformGames] = useState<Array<PublicGame>>([])
  const [isLobbyPlatformLoading, setIsLobbyPlatformLoading] = useState(false)
  const lobbyRequestRef = useRef(0)
  const runPlatformSearch = useServerFn(searchGames)
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null)
  const previousPageRef = useRef(page)
  useEffect(() => setVisibleCount(12), [games])
  useEffect(() => {
    if (previousPageRef.current !== page) {
      resultsHeadingRef.current?.focus({ preventScroll: true })
      resultsHeadingRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
      previousPageRef.current = page
    }
  }, [page])
  const rankedGames = hasActiveFilters ? games : prioritizeClassicGames(games)
  const topGames = rankedGames.slice(0, visibleCount)
  const recommendedIds = new Set(topGames.map(getGameRouteId))
  const newGames = latestGames
    .filter((game) => !recommendedIds.has(getGameRouteId(game)))
    .slice(0, 4)
  const resultsLabel = lang === 'zh-CN' ? '搜索结果' : lang === 'ja' ? '検索結果' : 'Search results'
  const viewAllLabel = lang === 'zh-CN' ? '查看全部' : lang === 'ja' ? 'すべて見る' : 'View all'
  const loadMoreLabel = lang === 'zh-CN' ? '加载更多游戏' : lang === 'ja' ? 'ゲームをもっと見る' : 'Load more games'
  const recommendationLabel = lang === 'zh-CN' ? '经典游戏优先推荐' : lang === 'ja' ? 'クラシックゲームを優先表示' : 'Classic games first'
  const continueLabel = lang === 'zh-CN' ? '继续游玩' : lang === 'ja' ? '続けてプレイ' : 'Continue playing'
  const platformCards = platformChips.slice(0, 7)
  const selectedPlatform = platformCards.find((platform) => platform.name === lobbyPlatform)
  const localPlatformGames = lobbyPlatform
    ? uniqueGames([
        ...topGames,
        ...featureSections.flatMap((section) => section.games),
        ...latestGames,
      ]).filter((game) => gameMatchesPlatform(game, lobbyPlatform))
    : []
  const lobbyGames = lobbyPlatform
    ? (lobbyPlatformGames.length > 0 ? lobbyPlatformGames : localPlatformGames)
    : topGames
  const featuredGame = lobbyGames[0]
  const trendingGames = lobbyGames.slice(1, 5)
  const lobbyCopy = getArcadeLobbyCopy(lang)
  const activeCategoryLabel = filters.category
    ? getLocalizedCategoryLabel(filters.category, lang)
    : ''
  const activePlatformLabel = filters.platform
    ? getLocalizedPlatformLabel(filters.platform, lang)
    : ''

  function handleCategoryChange(categoryName: string) {
    onFilterChange('category', filters.category === categoryName ? '' : categoryName)
  }

  function handleLobbyPlatformChange(platformName: string) {
    const nextPlatform = lobbyPlatform === platformName ? '' : platformName
    const requestId = lobbyRequestRef.current + 1
    lobbyRequestRef.current = requestId
    setLobbyPlatform(nextPlatform)
    setLobbyPlatformGames([])

    if (!nextPlatform) {
      setIsLobbyPlatformLoading(false)
      return
    }

    setIsLobbyPlatformLoading(true)
    void runPlatformSearch({
      data: { limit: 5, locale: lang, page: 1, platform: nextPlatform, sort: 'popular' },
    }).then((result) => {
      if (lobbyRequestRef.current === requestId) {
        setLobbyPlatformGames(result.games)
      }
    }).catch(() => undefined).finally(() => {
      if (lobbyRequestRef.current === requestId) {
        setIsLobbyPlatformLoading(false)
      }
    })
  }

  return (
    <div className="arcade-page overflow-x-hidden">
      <div className="mx-auto grid w-full max-w-[96rem] min-w-0">
        <aside className="hidden">
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

        <main className="min-w-0 max-w-full">
          <section className="arcade-lobby border-b border-white/10">
            <div aria-hidden="true" className="arcade-lobby-beam arcade-lobby-beam-left" />
            <div aria-hidden="true" className="arcade-lobby-beam arcade-lobby-beam-right" />
            <div className="arcade-lobby-content">
            <h1 className="arcade-page-title mb-4 max-w-4xl text-3xl font-black leading-tight text-white sm:text-5xl">
              {t.title}
            </h1>
            <div className="relative z-10 mb-3">
              <form className="min-w-0 flex-1" onSubmit={onSearch}>
                <HomeSearchSuggest
                  gameTotal={pagination.total}
                  isLoading={isLoading}
                  lang={lang}
                  onQueryChange={onQueryChange}
                  query={filters.query}
                  t={t}
                />
              </form>
            </div>

            {featuredGame ? (
              <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,2.2fr)_minmax(17rem,0.8fr)]">
                <article className="arcade-cabinet group relative min-h-[24rem] overflow-hidden sm:min-h-[31rem]">
                  <div className="absolute inset-0 grid place-items-center bg-[#071128] text-sm font-black uppercase tracking-widest text-white/45">
                    {getRetroCoverFallbackLabel(lang)}
                  </div>
                  {featuredGame.game_cover?.trim() ? (
                    <img
                      alt={featuredGame.name ?? 'Featured game'}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                      decoding="async"
                      fetchPriority="high"
                      onError={(event) => { event.currentTarget.hidden = true }}
                      src={featuredGame.game_cover}
                    />
                  ) : null}
                  <HeroPreviewVideo src={featuredGame.game_video} />
                  <div aria-hidden="true" className="arcade-cabinet-scan" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,20,0.94)_0%,rgba(2,7,20,0.74)_36%,rgba(2,7,20,0.08)_76%),linear-gradient(0deg,rgba(2,7,20,0.88),transparent_48%)]" />
                  <div className="relative z-10 flex h-full max-w-xl flex-col justify-end p-5 sm:p-8 lg:p-10">
                    <p className="arcade-kicker mb-2">{selectedPlatform ? `${selectedPlatform.shortLabel} · ${lobbyCopy.featured}` : lobbyCopy.featured}</p>
                    <h2 className="arcade-featured-title arcade-section-title break-words text-3xl font-black leading-[0.96] text-white sm:text-6xl">
                      {featuredGame.name}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {getPlatformBadge(featuredGame, lang) ? (
                        <span className="arcade-chip">{getPlatformBadge(featuredGame, lang)}</span>
                      ) : null}
                      {featuredGame.categories?.slice(0, 2).map((category) => (
                        <span className="arcade-chip" key={category}>{getLocalizedCategoryLabel(category, lang)}</span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        className="arcade-play-button"
                        params={{ gameId: getGameRouteId(featuredGame), locale: lang }}
                        to="/$locale/games/$gameId/play"
                      >
                        <i aria-hidden="true" className="ri-play-fill" />
                        {lobbyCopy.playNow}
                      </Link>
                      <span className="arcade-press-play"><span aria-hidden="true" />{lobbyCopy.pressPlay}</span>
                    </div>
                  </div>
                  <div className="arcade-cabinet-dots" aria-hidden="true"><span /><span /><span /><span /></div>
                </article>

                <aside className={`arcade-trending-panel p-3 sm:p-4 ${isLobbyPlatformLoading ? 'is-loading' : ''}`} aria-label={lobbyCopy.trending} aria-busy={isLobbyPlatformLoading}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="arcade-pixel-title text-lg text-white"><i aria-hidden="true" className="ri-fire-fill text-pink-400" /> {lobbyCopy.trending}</h2>
                    <a className="text-xs font-semibold text-cyan-300 hover:text-white" href={selectedPlatform?.seoPath ?? '#popular-games'}>{viewAllLabel} <i aria-hidden="true" className="ri-arrow-right-line" /></a>
                  </div>
                  <div className="grid gap-2">
                    {trendingGames.map((game) => (
                      <Link className="arcade-trending-game group" key={getGameRouteId(game)} params={{ gameId: getGameRouteId(game), locale: lang }} to="/$locale/games/$gameId">
                        <ArcadeCover alt={game.name ?? 'Game'} className="aspect-[16/9]" cover={game.game_cover} lang={lang} />
                        <span className="min-w-0">
                          <strong className="line-clamp-2 text-sm text-white">{game.name}</strong>
                          <small className="mt-1 block text-white/45">{getPlatformBadge(game, lang)}</small>
                        </span>
                        <i aria-hidden="true" className="ri-arrow-right-s-line text-white/30 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                      </Link>
                    ))}
                  </div>
                </aside>
              </div>
            ) : null}

            <section className="relative z-10 mt-3" aria-label={t.allPlatforms}>
              <h2 className="sr-only">{t.allPlatforms}</h2>
              <div className="arcade-platform-rail game-rail flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {platformCards.map((platform) => (
                  <button aria-pressed={lobbyPlatform === platform.name} className={`arcade-platform-tile group ${lobbyPlatform === platform.name ? 'is-active' : ''} ${isArcadePlatform(platform.shortLabel) ? 'is-arcade' : ''}`} key={platform.name} onClick={() => handleLobbyPlatformChange(platform.name)} title={`Show popular ${platform.shortLabel} games`} type="button">
                    <img
                      alt=""
                      aria-hidden="true"
                      decoding="async"
                      height="96"
                      loading="lazy"
                      src={getPlatformArtwork(platform.shortLabel)}
                      width="160"
                    />
                    <strong>{platform.shortLabel}</strong>
                  </button>
                ))}
              </div>
            </section>
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
                  <h2 ref={resultsHeadingRef} tabIndex={-1} className="arcade-rule-title arcade-section-title mt-1 scroll-mt-24 text-3xl font-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:text-4xl">{hasActiveFilters ? resultsLabel : t.popular}</h2>
                  </div>
                  {!hasActiveFilters ? (
                    <span className="badge badge-outline shrink-0 border-white/15 text-xs font-medium text-white/55">
                      {recommendationLabel}
                    </span>
                  ) : (
                    <span className="text-sm text-white/60" role="status">{formatCopy(t.totalGames, { total: pagination.total })}</span>
                  )}
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
                <p className="mt-4 text-center text-sm text-white/60" aria-live="polite">
                  {isLoading ? t.loading : formatCopy(t.page, { page, pages })}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-3">
                  {visibleCount < rankedGames.length ? (
                    <button className="btn btn-primary" disabled={isLoading} onClick={() => setVisibleCount((count) => count + 12)} type="button">
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
              <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-center text-white/60" role="status">
                <p>{isLoading ? t.loading : t.empty}</p>
                {hasActiveFilters && !isLoading ? (
                  <button className="btn btn-primary mt-4" onClick={onReset} type="button">{t.reset}</button>
                ) : null}
              </div>
            )}
          </section>

          {!hasActiveFilters && newGames.length > 0 ? (
            <section className="arcade-section border-t px-4 py-6 [content-visibility:auto] [contain-intrinsic-size:420px] sm:px-6 lg:px-8" aria-label={t.newest}>
              <h2 className="mb-4 text-xl font-black text-white">{t.newest}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {newGames.map((game) => (
                  <ArcadeGameCard game={game} isPriority={false} key={getGameRouteId(game)} lang={lang} />
                ))}
              </div>
            </section>
          ) : null}

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

function HeroPreviewVideo({ src }: { src?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current

    if (!video || !src?.trim()) {
      return
    }

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')

    if (reducedMotion?.matches) {
      return
    }

    setIsReady(false)
    video.play().catch(() => {})

    return () => {
      video.pause()
    }
  }, [src])

  if (!src?.trim()) {
    return null
  }

  return (
    <video
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 motion-reduce:hidden ${isReady ? 'opacity-100' : 'opacity-0'}`}
      loop
      muted
      onCanPlay={() => setIsReady(true)}
      playsInline
      preload="none"
      ref={videoRef}
      src={src}
    />
  )
}

function getArcadeLobbyCopy(lang: Locale) {
  if (lang === 'zh-CN') {
    return { featured: '今日主打', jumpBackIn: '继续探索', playNow: '立即开玩', pressPlay: '按下开始', trending: '正在热门' }
  }

  if (lang === 'ja') {
    return { featured: '本日のおすすめ', jumpBackIn: '探索を続ける', playNow: '今すぐプレイ', pressPlay: 'スタート', trending: 'トレンド' }
  }

  return { featured: 'Featured game', jumpBackIn: 'Jump Back In', playNow: 'Play Now', pressPlay: 'Press Play', trending: 'Trending Now' }
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
    setSuggestions([])
    setHighlightedIndex(-1)
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
    if (!showSuggestions || isSuggesting || suggestions.length === 0) return
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
          role="combobox"
          aria-autocomplete="list"
          aria-activedescendant={showSuggestions && !isSuggesting && highlightedIndex >= 0 ? `${suggestionId}-${highlightedIndex}` : undefined}
          aria-controls={showSuggestions ? suggestionId : undefined}
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
              {suggestions.map((game, index) => (
                <SearchSuggestionItem
                  game={game}
                  id={`${suggestionId}-${index}`}
                  isHighlighted={highlightedIndex === index}
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
  id,
  isHighlighted,
  lang,
}: {
  game: PublicGame
  id: string
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
      id={id}
      role="option"
      tabIndex={-1}
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
        <h3 className="arcade-game-title line-clamp-2 min-h-9 text-sm font-semibold leading-snug">
          {gameName}
        </h3>
      </div>
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
      <div className="absolute inset-0 grid place-items-center px-3 text-center text-xs font-black uppercase tracking-wide text-white/45">
        {getRetroCoverFallbackLabel(lang)}
      </div>
      {cover?.trim() ? (
        <img
          alt={alt}
          className="relative h-full w-full object-cover transition duration-300 group-hover:scale-105"
          decoding="async"
          fetchPriority={isPriority ? 'high' : 'auto'}
          loading={isPriority ? 'eager' : 'lazy'}
          onError={(event) => { event.currentTarget.hidden = true }}
          src={cover}
        />
      ) : null}
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

function uniqueGames(games: Array<PublicGame>) {
  const seen = new Set<string>()

  return games.filter((game) => {
    const id = getGameRouteId(game)

    if (!id || seen.has(id)) {
      return false
    }

    seen.add(id)
    return true
  })
}

function gameMatchesPlatform(game: PublicGame, platform: string) {
  const selectedGroup = getPlatformGroup(platform)
  const gamePlatform = game.platform_slug?.trim() || game.platformSlug?.trim() || game.platform?.trim() || ''

  return Boolean(selectedGroup && selectedGroup === getPlatformGroup(gamePlatform))
}

function getPlatformGroup(platform: string) {
  const normalized = platform.toLowerCase().replace(/[^a-z0-9]/g, '')

  if (normalized === 'f' || normalized === 'famicom' || normalized === 'nes' || normalized === 'nintendoentertainmentsystem') return 'nes'
  if (normalized === 'superfamicom' || normalized === 'snes') return 'snes'
  if (normalized === 'gameboyadvance' || normalized === 'gba') return 'gba'
  if (normalized === 'playstation' || normalized === 'playstation1' || normalized === 'ps1') return 'ps1'
  if (normalized === 'nintendo64' || normalized === 'n64') return 'n64'
  if (normalized === 'arcade') return 'arcade'
  if (normalized === 'segagenesis' || normalized === 'genesis' || normalized === 'megadrive') return 'genesis'

  return normalized
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

function getPlatformArtwork(platform: string) {
  const slug = isArcadePlatform(platform)
    ? 'arcade'
    : platform.toLowerCase() === 'sega genesis'
      ? 'genesis'
      : platform.toLowerCase()

  return `/platform-icons/${slug}.webp`
}

function isArcadePlatform(platform: string) {
  return ['arcade', '街机', 'アーケード'].includes(platform.toLowerCase())
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

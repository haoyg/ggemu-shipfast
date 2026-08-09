import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import {
  GameCardPreviewVideo,
  gameCardPreviewHandlers,
} from '#/components/game-card-preview'
import type { Locale, PublicGame } from '#/lib/ggemu'
import {
  formatCopy,
  getI18n,
  getLocalizedCategoryLabel,
  getLocalizedPlatformLabel,
} from '#/lib/i18n'
import { getRetroCoverFallbackLabel } from '#/lib/locale-labels'
import { siteConfig } from '#/lib/site-config'

import {
  HomeFaqSection,
  HomeLatestBlogPostsSection,
  getSearchPlaceholder,
} from './shared'
import { useRecentPlayedGames } from './recent-played-games'
import type { HomeTemplateProps } from './types'

const platformShortLabels: Record<string, string> = {
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
]

const platformAliases: Record<string, Array<string>> = {
  ARCADE: ['ARCADE', 'Arcade'],
  'Game Boy Advance': ['Game Boy Advance', 'GBA'],
  NES: ['NES', 'Nintendo Entertainment System'],
  'Nintendo 64': ['Nintendo 64', 'N64'],
  'PlayStation 1': ['PlayStation 1', 'PS1', 'PlayStation'],
  SNES: ['SNES', 'Super Nintendo', 'Super Famicom'],
}

export function DefaultHomeTemplate(props: HomeTemplateProps) {
  const {
    filterOptions,
    filters,
    games,
    isLoading,
    lang,
    latestBlogPosts,
    onFilterChange,
    onQueryChange,
    onSearch,
    pagination,
    t,
  } = props
  const layoutCopy = getI18n(lang).layout
  const recentGames = useRecentPlayedGames()
  const platformChips = getPlatformChips(filterOptions.platforms, lang)
  const sidebarCategories = filterOptions.categories.slice(0, 6)
  const topGames = games.slice(0, 12)
  const newGames = games.slice(12, 18)
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
    <div className="overflow-x-hidden bg-neutral text-neutral-content">
      <div className="mx-auto grid w-full max-w-[96rem] min-w-0 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/10 bg-neutral px-3 py-4 lg:block">
          <nav className="sticky top-20 flex flex-col gap-5">
            <Link
              className="flex items-center gap-3 rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-content"
              params={{ locale: lang }}
              to="/$locale"
            >
              <i className="ri-home-5-line text-lg" />
              {layoutCopy.games}
            </Link>
            <SideNavAnchor href="#recent-games" icon="ri-history-line" label={t.recentlyPlayed} />
            <SideNavRoute
              icon="ri-gamepad-line"
              label={layoutCopy.playMyRom}
              lang={lang}
              to="/$locale/play-my-rom"
            />
            <SideNavRoute
              icon="ri-live-line"
              label={layoutCopy.live}
              lang={lang}
              to="/$locale/live"
            />
            <SideNavRoute
              icon="ri-article-line"
              label={layoutCopy.blog}
              lang={lang}
              to="/$locale/blog"
            />
            <SideNavRoute
              icon="ri-information-line"
              label={layoutCopy.about}
              lang={lang}
              to="/$locale/about"
            />

            <section className="border-t border-white/10 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/45">
                {t.allCategories}
              </p>
              <div className="grid gap-1">
                {sidebarCategories.map((category) => (
                  <button
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-left text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                    type="button"
                  >
                    <span>{getLocalizedCategoryLabel(category.name, lang)}</span>
                    <i
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

        <main className="min-w-0 max-w-full overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.18),transparent_34rem),radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_30rem)]">
          <section className="border-b border-white/10 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-center">
              <form className="min-w-0 flex-1" onSubmit={onSearch}>
                <label className="input input-md flex w-full min-w-0 max-w-full items-center gap-2 border-2 border-primary/70 bg-base-100 text-base-content shadow-[0_0_0_3px_rgba(236,72,153,0.14)] sm:input-lg sm:gap-3 sm:shadow-[0_0_0_4px_rgba(236,72,153,0.16)]">
                  <i className="ri-search-line text-xl text-primary sm:text-2xl" />
                  <input
                    aria-label={t.search}
                    className="min-w-0 flex-1 text-sm sm:text-base"
                    onChange={(event) => onQueryChange(event.currentTarget.value)}
                    placeholder={getSearchPlaceholder(t, pagination.total)}
                    type="search"
                    value={filters.query}
                  />
                  <button
                    className="btn btn-primary btn-sm hidden sm:inline-flex"
                    disabled={isLoading}
                    type="submit"
                  >
                    {t.search}
                  </button>
                </label>
              </form>

              <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] xl:pb-0 [&::-webkit-scrollbar]:hidden">
                {platformChips.map((platform) => (
                  <button
                    className={`btn btn-sm shrink-0 border-white/15 ${
                      filters.platform === platform.name
                        ? 'btn-primary'
                        : 'bg-white/8 text-white hover:bg-white/15'
                    }`}
                    key={platform.name}
                    onClick={() => handlePlatformChange(platform.name)}
                    type="button"
                  >
                    <i className="ri-gamepad-line" />
                    {platform.shortLabel}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div className="mb-3 flex min-w-0 flex-col gap-3 sm:mb-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {siteConfig.SITE_NAME}
                </p>
                <h1 className="mt-1 text-xl font-black leading-tight text-white sm:text-3xl">
                  {t.title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65 sm:text-base">
                  {t.subtitle}
                </p>
              </div>
              <span className="badge badge-outline w-fit border-white/20 text-xs text-white/70 sm:shrink-0 sm:text-sm">
                {formatCopy(t.totalGames, { total: pagination.total })}
              </span>
            </div>
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

            {topGames.length > 0 ? (
              <>
                <h2 className="sr-only">{t.featured}</h2>
                <div
                  aria-busy={isLoading}
                  className={`grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 ${
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
              </>
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-center text-white/60">
                {t.empty}
              </div>
            )}
          </section>

          <section className="grid gap-5 border-t border-white/10 px-4 py-5 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)]">
            <HomeRail id="recent-games" title={t.recentlyPlayed}>
              {recentGames.length > 0 ? (
                recentGames.map((game) => (
                  <Link
                    className="group grid min-w-40 grid-cols-[4.5rem_minmax(0,1fr)] gap-3 rounded-lg border border-white/10 bg-white/5 p-2 transition hover:border-primary/60 hover:bg-white/10"
                    key={game.id}
                    params={{ gameId: game.id, locale: lang }}
                    search={{}}
                    to="/$locale/games/$gameId"
                  >
                    <ArcadeCover
                      alt={game.name}
                      className="aspect-square rounded-md"
                      cover={game.cover}
                      lang={lang}
                    />
                    <div className="min-w-0 self-center">
                      <h3 className="line-clamp-2 text-sm font-semibold text-white">
                        {game.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/45">{layoutCopy.games}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/55">
                  {t.subtitle}
                </div>
              )}
            </HomeRail>

            <HomeRail title={t.newest}>
              {newGames.map((game) => (
                <ArcadeMiniCard game={game} key={getGameRouteId(game)} lang={lang} />
              ))}
            </HomeRail>
          </section>

          <section className="border-t border-white/10 px-4 py-5 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-xl font-black text-white">{t.allPlatforms}</h2>
              <button
                className="btn btn-ghost btn-sm text-white/70"
                onClick={() => onFilterChange('platform', '')}
                type="button"
              >
                {t.reset}
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {platformCards.map((platform) => (
                <button
                  className={`group flex items-center justify-between rounded-lg border p-4 text-left transition hover:border-primary/60 hover:bg-white/10 ${
                    filters.platform === platform.name
                      ? 'border-primary/70 bg-primary/15'
                      : 'border-white/10 bg-white/5'
                  }`}
                  key={platform.name}
                  onClick={() => handlePlatformChange(platform.name)}
                  type="button"
                >
                  <span>
                    <span className="block text-base font-bold text-white">
                      {platform.label}
                    </span>
                    <span className="mt-1 block text-sm text-white/50">
                      {platform.shortLabel}
                    </span>
                  </span>
                  <i className="ri-arrow-right-s-line text-2xl text-white/40 transition group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </section>

          <div className="bg-base-100 text-base-content">
            <HomeLatestBlogPostsSection blogPosts={latestBlogPosts} lang={lang} />
            <HomeFaqSection lang={lang} />
          </div>
        </main>
      </div>
    </div>
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
      <i className={`${icon} text-lg`} />
      {label}
    </a>
  )
}

function SideNavRoute({
  icon,
  label,
  lang,
  to,
}: {
  icon: string
  label: string
  lang: Locale
  to:
    | '/$locale/about'
    | '/$locale/blog'
    | '/$locale/live'
    | '/$locale/play-my-rom'
}) {
  return (
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
      params={{ locale: lang }}
      to={to}
    >
      <i className={`${icon} text-lg`} />
      {label}
    </Link>
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
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
      <i className="ri-close-line text-sm" />
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
      className="group relative min-w-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-xl"
      {...gameCardPreviewHandlers}
      params={{ gameId, locale: lang }}
      search={{}}
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
      className="group w-48 min-w-0 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:border-primary/60 hover:bg-white/10"
      params={{ gameId, locale: lang }}
      search={{}}
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
      shortLabel: getPlatformShortLabel(platform.name, lang),
    }))
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
    return getKnownPlatformShortLabel(slug, lang) ?? slug.toUpperCase()
  }

  const platform = game.platform?.trim()

  if (!platform) {
    return ''
  }

  return getKnownPlatformShortLabel(platform, lang) ?? platform
    .split(/[\s-]+/)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
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

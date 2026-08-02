import { Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import type { FormEvent } from 'react'
import { useId, useRef, useState } from 'react'

import {
  GameCardPreviewVideo,
  gameCardPreviewHandlers,
} from '#/components/game-card-preview'
import type { GameFilterOptions, GameSearchResult, Locale, PublicGame } from '#/lib/ggemu'
import { searchGames } from '#/lib/ggemu'
import { getRetroCoverFallbackLabel } from '#/lib/locale-labels'
import { useModalAccessibility } from '#/lib/use-modal-accessibility'

import { FilterSelects, getSearchPlaceholder } from './shared'
import type { Filters, HomeCopy } from './types'

export function HomeSearchOverlay({
  filterOptions,
  gameTotal,
  isOpen,
  lang,
  onClose,
  t,
}: {
  filterOptions: GameFilterOptions
  gameTotal: number
  isOpen: boolean
  lang: Locale
  onClose: () => void
  t: HomeCopy
}) {
  const runSearch = useServerFn(searchGames)
  const titleId = useId()
  const panelRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [filters, setFilters] = useState<Filters>({
    query: '',
    platform: '',
    category: '',
    sort: 'newest',
  })
  const [result, setResult] = useState<GameSearchResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearchError, setHasSearchError] = useState(false)
  const searchGamesList = result?.games ?? []
  const searchPlaceholder = getSearchPlaceholder(t, gameTotal)

  useModalAccessibility({
    containerRef: panelRef,
    initialFocusRef: searchInputRef,
    isOpen,
    onClose,
  })

  async function searchOverlayGames(nextFilters: Filters) {
    setIsSearching(true)
    setHasSearchError(false)

    try {
      const nextResult = await runSearch({
        data: {
          query: nextFilters.query,
          limit: 24,
          locale: lang,
          page: 1,
          platform: nextFilters.platform,
          category: nextFilters.category,
          sort: nextFilters.sort,
        },
      })

      setResult(nextResult)
    } catch {
      setHasSearchError(true)
    } finally {
      setIsSearching(false)
    }
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void searchOverlayGames(filters)
  }

  function updateFilter<Key extends keyof Filters>(key: Key, value: Filters[Key]) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function resetSearch() {
    setFilters({
      query: '',
      platform: '',
      category: '',
      sort: 'newest',
    })
    setResult(null)
  }

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[110] bg-black/20 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onPointerDown={onClose}
      />
      <aside
        aria-hidden={!isOpen}
        aria-labelledby={titleId}
        aria-modal="true"
        className={`fixed bottom-0 left-0 top-0 z-[120] flex w-[min(28rem,calc(100vw-1rem))] flex-col bg-base-100 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-2xl transition-transform duration-200 ${isOpen ? 'translate-x-0' : 'pointer-events-none -translate-x-full'}`}
        inert={!isOpen}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="flex items-center justify-between border-b border-base-300 px-4 py-3">
          <h2 className="text-base font-semibold" id={titleId}>{t.search}</h2>
          <button
            aria-label={t.closeSearch}
            className="btn btn-ghost btn-sm btn-square"
            onClick={onClose}
            type="button"
          >
            <i aria-hidden="true" className="ri-close-line text-xl" />
          </button>
        </header>

        <form className="grid gap-3 border-b border-base-300 p-4" onSubmit={handleSearch}>
          <input
            aria-label={t.search}
            className="input input-bordered w-full"
            onChange={(event) => updateFilter('query', event.currentTarget.value)}
            placeholder={searchPlaceholder}
            ref={searchInputRef}
            type="search"
            value={filters.query}
          />

          <FilterSelects
            filterOptions={filterOptions}
            filters={filters}
            isLoading={isSearching}
            lang={lang}
            onFilterChange={updateFilter}
            onReset={resetSearch}
            t={t}
          />

          <button className="btn btn-primary w-full" disabled={isSearching} type="submit">
            <i aria-hidden="true" className={isSearching ? 'loading loading-spinner loading-sm' : 'ri-search-line'} />
            {t.search}
          </button>
        </form>

        <div aria-busy={isSearching} className="min-h-0 flex-1 overflow-y-auto p-4">
          {hasSearchError ? (
            <div className="alert alert-error" role="alert">
              <span>{t.loadError}</span>
              <button
                className="btn btn-sm"
                onClick={() => void searchOverlayGames(filters)}
                type="button"
              >
                {t.retry}
              </button>
            </div>
          ) : result ? (
            searchGamesList.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {searchGamesList.map((game) => (
                  <SearchResultCard
                    game={game}
                    key={game._id ?? game.url_slug ?? game.name}
                    lang={lang}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-box border border-base-300 p-8 text-center text-sm text-base-content/60">
                {t.empty}
              </div>
            )
          ) : (
            <div className="rounded-box border border-dashed border-base-300 p-8 text-center text-sm text-base-content/60">
              {t.search}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

function SearchResultCard({
  game,
  lang,
}: {
  game: PublicGame
  lang: Locale
}) {
  const gameId = game.url_slug || game._id || ''

  return (
    <Link
      className="group overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm transition hover:border-primary/40 hover:shadow-md"
      {...gameCardPreviewHandlers}
      params={{ gameId, locale: lang }}
      search={{}}
      to="/$locale/games/$gameId"
    >
      <div className="relative aspect-square overflow-hidden bg-base-200">
        {game.game_cover ? (
          <img
            alt={game.name ?? 'Game cover'}
            className="h-full w-full object-cover"
            decoding="async"
            loading="lazy"
            src={game.game_cover}
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-xs text-base-content/50">
            {getRetroCoverFallbackLabel(lang)}
          </div>
        )}
        <GameCardPreviewVideo src={game.game_video} />
      </div>
      <div className="p-2 text-[12px] font-medium leading-tight">
        <span className="line-clamp-2">{game.name}</span>
      </div>
    </Link>
  )
}

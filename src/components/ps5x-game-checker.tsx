import { useMemo, useState } from 'react'

import { trackEvent } from '#/lib/analytics'
import {
  filterPs5xGames,
  ps5xGames,
  ps5xStatusLabels,
  ps5xStatusOrder,
  type Ps5xGameStatus,
  type Ps5xStatusFilter,
} from '#/lib/ps5x'

const statusBadgeClass: Record<Ps5xGameStatus, string> = {
  'verified-running': 'badge-success',
  'reported-running': 'badge-info',
  'boots-only': 'badge-warning',
  'not-working': 'badge-error',
  'not-tested': 'badge-ghost',
}

const sourceTypeLabels: Record<string, string> = {
  'developer-demo': 'Developer demo',
  'independent-test': 'Independent test',
  'media-report': 'Media report',
}

function formatSourceType(sourceType: string) {
  return sourceTypeLabels[sourceType] ?? sourceType
}

export function Ps5xGameChecker() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Ps5xStatusFilter>('all')
  const games = useMemo(() => filterPs5xGames(query, status), [query, status])
  const hasFilters = query.trim() !== '' || status !== 'all'

  function resetFilters() {
    trackEvent('ps5x_checker_filter', { filter_name: 'reset', filter_value: 'all' })
    setQuery('')
    setStatus('all')
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <label className="grid gap-2 text-sm font-medium">
          Search a game
          <input
            className="input input-bordered w-full"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Quake II or Astro Bot"
            type="search"
            value={query}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Compatibility status
          <select
            className="select select-bordered w-full sm:w-56"
            onChange={(event) => {
              const next = event.target.value as Ps5xStatusFilter
              setStatus(next)
              trackEvent('ps5x_checker_filter', { filter_name: 'status', filter_value: next })
            }}
            value={status}
          >
            <option value="all">All statuses</option>
            {ps5xStatusOrder.map((value) => (
              <option key={value} value={value}>
                {ps5xStatusLabels[value]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-base-content/70" role="status">
          {games.length} of {ps5xGames.length} games shown
        </p>
        {hasFilters ? (
          <button className="btn btn-ghost btn-sm" onClick={resetFilters} type="button">
            Clear filters
          </button>
        ) : null}
      </div>

      {games.length ? (
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {games.map((game) => (
            <li key={game.id}>
              <article className="card h-full border border-base-300 bg-base-100">
                <div className="card-body gap-3 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold leading-snug">{game.name}</h3>
                    <span className={`badge ${statusBadgeClass[game.status]} shrink-0`}>
                      {ps5xStatusLabels[game.status]}
                    </span>
                  </div>

                  <dl className="grid gap-2 text-sm">
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <div>
                        <dt className="sr-only">Reported FPS</dt>
                        <dd>
                          <strong className="font-semibold text-base-content">Reported FPS:</strong>{' '}
                          {game.fps ?? 'Not reported'}
                        </dd>
                      </div>
                      <div>
                        <dt className="sr-only">Test date</dt>
                        <dd>
                          <strong className="font-semibold text-base-content">Demo reported:</strong>{' '}
                          {game.testDate}
                        </dd>
                      </div>
                    </div>
                  </dl>

                  <p className="text-sm leading-6 text-base-content/80">{game.notes}</p>

                  <a
                    className="link link-primary mt-auto inline-flex items-center gap-1 text-sm font-semibold"
                    href={game.sourceUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Source: {formatSourceType(game.sourceType)}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 rounded-xl border border-base-300 bg-base-100 p-6">
          <p>No matching games. Try another spelling or clear the filters.</p>
          <button className="btn btn-primary btn-sm mt-4" onClick={resetFilters} type="button">
            Show all games
          </button>
        </div>
      )}
    </div>
  )
}

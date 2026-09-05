import type { ReactNode } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { HomeSearchOverlay } from './search-overlay'
import { getI18n } from '#/lib/i18n'
import { trackEvent } from '#/lib/analytics'

const { runSearch } = vi.hoisted(() => ({ runSearch: vi.fn() }))
vi.mock('@tanstack/react-start', () => ({ useServerFn: () => runSearch }))
vi.mock('#/lib/ggemu', () => ({ searchGames: vi.fn() }))
vi.mock('#/lib/analytics', () => ({ trackEvent: vi.fn() }))
vi.mock('@tanstack/react-router', () => ({ Link: ({ children }: { children: ReactNode }) => <a href="#game">{children}</a> }))

function deferred() {
  let resolve!: (value: ReturnType<typeof result>) => void
  let reject!: (error: Error) => void
  const promise = new Promise<ReturnType<typeof result>>((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

function result(name: string) {
  return { games: [{ name, url_slug: name }], pagination: { total: 1, pages: 1, page: 1, limit: 24 } }
}

const t = getI18n('en').home
const props = { filterOptions: { platforms: [], categories: [] }, gameTotal: 100, isOpen: true, lang: 'en' as const, onClose: vi.fn(), t }

function search(query: string) {
  const input = screen.getByRole('searchbox')
  fireEvent.change(input, { target: { value: query } })
  fireEvent.submit(input.closest('form')!)
}

afterEach(() => { cleanup(); vi.clearAllMocks() })

describe('search request ownership', () => {
  it('keeps the latest result when an older request finishes later', async () => {
    const old = deferred()
    const latest = deferred()
    runSearch.mockReturnValueOnce(old.promise).mockReturnValueOnce(latest.promise)
    render(<HomeSearchOverlay {...props} />)
    search('old')
    search('latest')
    await act(async () => latest.resolve(result('Latest game')))
    await act(async () => old.resolve(result('Old game')))
    expect(screen.getByText('Latest game')).not.toBeNull()
    expect(screen.queryByText('Old game')).toBeNull()
    expect(vi.mocked(trackEvent).mock.calls.filter(([name]) => name === 'game_search_results')).toHaveLength(1)
  })

  it('allows reset during a request and ignores its late response', async () => {
    const pending = deferred()
    runSearch.mockReturnValueOnce(pending.promise)
    render(<HomeSearchOverlay {...props} />)
    search('old')
    fireEvent.click(screen.getByRole('button', { name: t.reset }))
    await act(async () => pending.resolve(result('Old game')))
    expect(screen.queryByText('Old game')).toBeNull()
    expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('')
    expect((screen.getByRole('button', { name: t.search }) as HTMLButtonElement).disabled).toBe(false)
  })

  it('ignores a failure from a closed panel after reopening', async () => {
    const pending = deferred()
    runSearch.mockReturnValueOnce(pending.promise)
    const { rerender } = render(<HomeSearchOverlay {...props} />)
    search('old')
    rerender(<HomeSearchOverlay {...props} isOpen={false} />)
    rerender(<HomeSearchOverlay {...props} />)
    await act(async () => pending.reject(new Error('Late failure')))
    expect(screen.queryByRole('alert')).toBeNull()
    expect(trackEvent).not.toHaveBeenCalledWith('game_search_error', expect.anything())
  })

  it('does not clear the current loading state when a stale request fails', async () => {
    const old = deferred()
    const latest = deferred()
    runSearch.mockReturnValueOnce(old.promise).mockReturnValueOnce(latest.promise)
    render(<HomeSearchOverlay {...props} />)
    search('old')
    search('latest')
    await act(async () => old.reject(new Error('Late failure')))
    expect((screen.getByRole('button', { name: t.search }) as HTMLButtonElement).disabled).toBe(true)
    expect(screen.queryByRole('alert')).toBeNull()
    await act(async () => latest.resolve(result('Latest game')))
  })
})

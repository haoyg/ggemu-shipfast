import type { ComponentProps } from 'react'
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { DefaultHomeTemplate } from './default-template'
import type { HomeTemplateProps } from './types'
import { getI18n, getLocalizedPlatformLabel } from '#/lib/i18n'

const { runSearch, navigate } = vi.hoisted(() => ({ runSearch: vi.fn(), navigate: vi.fn() }))
vi.mock('@tanstack/react-start', () => ({ useServerFn: () => runSearch }))
vi.mock('#/lib/ggemu', () => ({ searchGames: vi.fn() }))
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigate,
  Link: ({ children, className, id, role, tabIndex, 'aria-selected': selected }: ComponentProps<'a'>) => <a className={className} href="#game" id={id} role={role} tabIndex={tabIndex} aria-selected={selected}>{children}</a>,
}))
vi.mock('./recent-played-games', () => ({ useRecentPlayedGames: () => ({ games: [], clear: vi.fn() }) }))

const games = Array.from({ length: 60 }, (_, index) => ({ _id: `game-${index}`, name: `Game ${index}` }))
const props: HomeTemplateProps = {
  games, latestGames: [], latestBlogPosts: [], layoutSeed: 0,
  filterOptions: { platforms: [], categories: [] },
  filters: { query: '', platform: '', category: '', sort: 'popular' },
  isLoading: false, lang: 'en', page: 1, pages: 2,
  pagination: { total: 120, page: 1, pages: 2, limit: 60 },
  onFilterChange: vi.fn(), onQueryChange: vi.fn(), onSearch: vi.fn(), onReset: vi.fn(), onLoadPage: vi.fn(),
  t: getI18n('en').home,
}

beforeEach(() => vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true }))))
afterEach(() => { cleanup(); vi.clearAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers() })

it('reveals games in batches before offering the next page', () => {
  const { container } = render(<DefaultHomeTemplate {...props} />)
  const cards = () => container.querySelectorAll('#popular-games .arcade-game-card')
  expect(cards()).toHaveLength(24)
  expect(screen.queryByRole('button', { name: props.t.next })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Load more games' }))
  expect(cards()).toHaveLength(48)
  fireEvent.click(screen.getByRole('button', { name: 'Load more games' }))
  expect(cards()).toHaveLength(60)
  expect(screen.queryByRole('button', { name: 'Load more games' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: props.t.next }))
  expect(props.onLoadPage).toHaveBeenCalledWith(2)
})

it('resets the visible batch when results change', () => {
  const { container, rerender } = render(<DefaultHomeTemplate {...props} />)
  fireEvent.click(screen.getByRole('button', { name: 'Load more games' }))
  rerender(<DefaultHomeTemplate {...props} games={games.slice(0, 30)} />)
  expect(container.querySelectorAll('#popular-games .arcade-game-card')).toHaveLength(24)
})


it('shows distinct platform games with localized collection links', () => {
  const platformGames = Array.from({ length: 12 }, (_, index) => ({ _id: `ps1-${index}`, name: `PS1 game ${index}` }))
  render(<DefaultHomeTemplate {...props} lang="zh-CN" featureSections={[
    { title: 'PlayStation 1', games: [games[0], ...platformGames], hasHeroCard: false },
    { title: 'Arcade', games: [], hasHeroCard: false },
  ]} />)
  const heading = screen.getByRole('heading', { name: getLocalizedPlatformLabel('PlayStation 1', 'zh-CN') })
  const section = heading.closest('section')!
  expect(section.querySelectorAll('.arcade-game-card')).toHaveLength(8)
  expect(within(section).queryByText('Game 0')).toBeNull()
  expect(within(section).getByRole('link', { name: '查看全部' }).getAttribute('href')).toBe('/zh-CN/ps1-games')
  expect(screen.queryByRole('region', { name: 'Arcade' })).toBeNull()
})

it('hides platform discovery while filtering games', () => {
  render(<DefaultHomeTemplate {...props} filters={{ ...props.filters, query: 'Mario' }} featureSections={[
    { title: 'Arcade', games: [{ _id: 'other', name: 'Other platform game' }], hasHeroCard: false },
  ]} />)
  expect(screen.queryByText('Other platform game')).toBeNull()
})


it('offers a reset for empty search results and distinguishes loading', () => {
  const filteredProps = { ...props, games: [], filters: { ...props.filters, query: 'missing' } }
  const { rerender } = render(<DefaultHomeTemplate {...filteredProps} />)
  fireEvent.click(screen.getByRole('button', { name: props.t.reset }))
  expect(props.onReset).toHaveBeenCalledOnce()
  rerender(<DefaultHomeTemplate {...filteredProps} isLoading />)
  expect(screen.queryByText(props.t.empty)).toBeNull()
  expect(screen.getByRole('status').textContent).toBe(props.t.loading)
})

it('labels filtered results and hides unrelated newest games', () => {
  render(<DefaultHomeTemplate {...props} filters={{ ...props.filters, query: 'game' }} latestGames={[{ _id: 'unrelated', name: 'Unrelated new game' }]} />)
  expect(screen.getByRole('heading', { name: 'Search results' })).not.toBeNull()
  expect(screen.queryByRole('heading', { name: props.t.popular })).toBeNull()
  expect(screen.queryByText('Unrelated new game')).toBeNull()
})

it('preserves newest order and hides the section when every game was already shown', () => {
  const newest = [{ _id: 'new-html', name: 'Newest HTML5', platform: 'HTML5' }, { _id: 'older-nes', name: 'Older NES', platform: 'Famicom' }]
  const { rerender } = render(<DefaultHomeTemplate {...props} latestGames={newest} />)
  const section = screen.getByRole('region', { name: props.t.newest })
  expect(within(section).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual(['Newest HTML5', 'Older NES'])
  rerender(<DefaultHomeTemplate {...props} latestGames={[games[0]]} />)
  expect(screen.queryByRole('region', { name: props.t.newest })).toBeNull()
})


it('returns focus to the result heading only after a page change succeeds', () => {
  const scrollIntoView = vi.fn()
  const { rerender } = render(<DefaultHomeTemplate {...props} />)
  const heading = screen.getByRole('heading', { name: props.t.popular })
  heading.scrollIntoView = scrollIntoView
  rerender(<DefaultHomeTemplate {...props} isLoading />)
  expect(scrollIntoView).not.toHaveBeenCalled()
  rerender(<DefaultHomeTemplate {...props} page={2} />)
  expect(document.activeElement).toBe(heading)
  expect(scrollIntoView).toHaveBeenCalledOnce()
  expect(screen.getByText('Page 2 / 2')).not.toBeNull()
})

it('does not navigate to stale suggestions while the query is changing', async () => {
  vi.useFakeTimers()
  runSearch.mockResolvedValue({ games: [{ _id: 'old-game', name: 'Old suggestion' }] })
  const { rerender } = render(<DefaultHomeTemplate {...props} filters={{ ...props.filters, query: 'old' }} />)
  const input = screen.getByRole('combobox')
  fireEvent.focus(input)
  await act(async () => { await vi.advanceTimersByTimeAsync(220) })
  fireEvent.keyDown(input, { key: 'ArrowDown' })
  const option = screen.getByRole('option')
  expect(input.getAttribute('aria-activedescendant')).toBe(option.id)
  expect(option.getAttribute('aria-selected')).toBe('true')
  rerender(<DefaultHomeTemplate {...props} filters={{ ...props.filters, query: 'new' }} />)
  fireEvent.keyDown(input, { key: 'Enter' })
  expect(navigate).not.toHaveBeenCalled()
  expect(screen.queryByRole('option')).toBeNull()
  expect(input.getAttribute('aria-activedescendant')).toBeNull()
})

import type { ReactNode } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { DefaultHomeTemplate } from './default-template'
import type { HomeTemplateProps } from './types'
import { getI18n, getLocalizedPlatformLabel } from '#/lib/i18n'

const { runSearch, navigate } = vi.hoisted(() => ({ runSearch: vi.fn(), navigate: vi.fn() }))
vi.mock('@tanstack/react-start', () => ({ useServerFn: () => runSearch }))
vi.mock('#/lib/ggemu', () => ({ searchGames: vi.fn() }))
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigate,
  Link: ({ children, className }: { children: ReactNode; className?: string }) => <a className={className} href="#game">{children}</a>,
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
afterEach(() => { cleanup(); vi.clearAllMocks(); vi.unstubAllGlobals() })

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

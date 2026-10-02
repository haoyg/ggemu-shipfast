import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { HomeLoaderData } from '#/components/home/types'
import { Route } from './$locale'

const { searchGames } = vi.hoisted(() => ({ searchGames: vi.fn() }))
vi.mock('#/lib/ggemu', async (importOriginal) => ({
  ...await importOriginal<typeof import('#/lib/ggemu')>(),
  searchGames,
  getGameFilterOptions: vi.fn(async () => ({ platforms: [], categories: [] })),
  searchBlogPosts: vi.fn(async () => ({ blogPosts: [] })),
}))
vi.mock('#/lib/seo', async (importOriginal) => ({
  ...await importOriginal<typeof import('#/lib/seo')>(),
  getSeoOrigin: vi.fn(async () => 'https://pokopie.com'),
}))

const load = Route.options.loader as unknown as (options: {
  deps: object
  params: { locale: string }
  location: { pathname: string }
}) => Promise<HomeLoaderData>
const options = (pathname: string) => ({ deps: {}, params: { locale: 'en' }, location: { pathname } })

beforeEach(() => {
  vi.clearAllMocks()
  searchGames.mockResolvedValue({ games: [], pagination: { page: 1, pages: 1, total: 0, limit: 24 } })
})

describe('home data loading', () => {
  it('skips home catalog requests on nested game pages', async () => {
    const data = await load(options('/en/games/contra/play'))
    expect(searchGames).not.toHaveBeenCalled()
    expect(data.games).toEqual([])
    expect(data.seoOrigin).toBe('https://pokopie.com')
  })

  it('loads the home catalog when returning from a game page', async () => {
    await load(options('/en/games/contra'))
    await load(options('/en'))
    expect(searchGames).toHaveBeenCalled()
    expect(Route.options.shouldReload).toBe(true)
  })
})

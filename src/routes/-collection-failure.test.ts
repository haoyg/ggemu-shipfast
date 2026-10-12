import { afterEach, describe, expect, it, vi } from 'vitest'
import { applyResponseCachePolicy } from '#/lib/response-cache'

vi.mock('#/lib/ggemu', async importOriginal => {
  const actual = await importOriginal<typeof import('#/lib/ggemu')>()
  return { ...actual, searchGames: vi.fn(async () => { throw new Error('Upstream unavailable') }) }
})
vi.mock('#/lib/seo', async importOriginal => {
  const actual = await importOriginal<typeof import('#/lib/seo')>()
  return { ...actual, getSeoOrigin: vi.fn(async () => 'https://pokopie.com') }
})

afterEach(() => vi.clearAllMocks())

const routes = [
  ['en.gba-games', () => import('./en.gba-games'), {}],
  ['en.nes-games', () => import('./en.nes-games'), {}],
  ['en.snes-games', () => import('./en.snes-games'), {}],
  ['en.n64-games', () => import('./en.n64-games'), {}],
  ['en.sega-genesis-games', () => import('./en.sega-genesis-games'), {}],
  ['en.arcade-games', () => import('./en.arcade-games'), {}],
  ['en.ps1-games', () => import('./en.ps1-games'), {}],
  ['localized platform', () => import('./$locale.$platform'), { locale: 'de', platform: 'gba-games' }],
  ['localized arcade', () => import('./$locale.arcade-games'), { locale: 'fr' }],
  ['localized PS1', () => import('./$locale.ps1-games'), { locale: 'zh-CN' }],
] as const

describe('first collection page upstream failures', () => {
  it.each(routes)('%s preserves a retryable failure response', async (_name, load, params) => {
    const { Route } = await load()
    const { loader, headers, head } = Route.options
    expect(typeof loader).toBe('function')
    expect(typeof headers).toBe('function')
    if (typeof loader !== 'function' || !headers || !head) throw new Error('Missing failure handling')
    const data = await Reflect.apply(loader, undefined, [{ params }])
    expect(data.loadFailed).toBe(true)
    const response = applyResponseCachePolicy(new Response('Retry', {
      headers: Reflect.apply(headers, undefined, [{ loaderData: data }]),
    }))
    expect(response.status).toBe(503)
    expect(response.headers.get('Retry-After')).toBe('60')
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(response.headers.has('X-Robots-Tag')).toBe(false)
    const metadata = Reflect.apply(head, undefined, [{ loaderData: data }])
    expect(metadata.scripts).toBeUndefined()
  })
})

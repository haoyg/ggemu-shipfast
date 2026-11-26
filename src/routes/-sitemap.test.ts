import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getLocalGames } from '#/lib/local-game-catalog'

const request = (url = 'https://pokopie.com/sitemap.xml') => new Request(url)
let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.resetModules()
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('sitemap availability', () => {
  it('builds a focused sitemap without waiting for GGEMU', async () => {
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const response = await getSitemapResponse(request())
    const xml = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toContain('s-maxage=86400')
    expect(response.headers.get('Content-Type')).toContain('application/xml')
    expect(fetchMock).not.toHaveBeenCalled()
    expect(xml).toContain('/en/games/contra-nes-1988')
    expect(xml).toContain('/zh-CN/games/roadster-rush-html5-2020')
    expect(xml).toContain('<loc>https://pokopie.com/zh-CN/games/initial-d-ps1-1998</loc>')
    expect(xml).toContain('/en/games/xiangqi-traveler-html5-2026')
    expect(xml).toContain('<loc>https://pokopie.com/en/games/the-king-of-fighters-2002-arcade-2002</loc>')
    expect(xml).toContain('<loc>https://pokopie.com/zh-CN/games/the-killing-blade-arcade-1998</loc>')
    expect(xml).not.toContain('/games/the-king-of-fighters-2002-arcade-2002/play')
    expect(xml).toContain('<loc>https://pokopie.com/en/games/crash-bandicoot-ps1-1996</loc>')
    expect(xml).toContain('<loc>https://pokopie.com/fr/games/onet-master-html5</loc>')
    expect(xml).toContain('<loc>https://pokopie.com/zh-CN/games/cadillacs-and-dinosaurs-arcade-1993</loc>')
    expect(xml).toContain('<loc>https://pokopie.com/zh-CN/games/grand-theft-auto-2-ps1-1999</loc>')
    expect(xml).not.toContain('/en/games/roadster-rush-html5-2020')
    for (const game of getLocalGames()) {
      for (const locale of ['en', 'zh-CN']) {
        expect(xml.includes(`<loc>https://pokopie.com/${locale}/games/${game.url_slug}</loc>`), game.url_slug).toBe(true)
      }
    }
    expect(xml).toContain('/zh-CN/games/contra-nes-1988')
    expect(xml).toContain('/en/games/geometry-dash-advance-gba-2025')
    expect(xml).not.toContain('/games/naruto-rpg-gba-2003')
    expect(xml).not.toContain('/en/games/unreviewed-game-nes-1990')
    expect(xml).not.toMatch(/\/games\/[a-f0-9]{24}</)
  })

  it('submits original editorial blogs only in English', async () => {
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const xml = await (await getSitemapResponse(request())).text()

    expect(xml).toContain('/en/blog/how-to-play-roms-in-browser')
    expect(xml).toContain('/en/blog/murdoku-beginner-solving-guide')
    expect(xml).not.toContain('/zh-CN/blog/how-to-play-roms-in-browser')
  })

  it('keeps curated collection and guide routes', async () => {
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const xml = await (await getSitemapResponse(request())).text()

    expect(xml).toContain('/en/arcade-games')
    expect(xml).toContain('/zh-CN/nes-games')
    expect(xml).toContain('/en/guides/browser-retro-gaming-guide')
    expect(xml).toContain('/guides/brawl-stars/creator-codes')
    expect(xml).toContain('hreflang="zh-CN"')
  })

  it('isolates preview origins and canonicalizes production hosts', async () => {
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const canonical = await getSitemapResponse(request('http://www.pokopie.com/sitemap.xml'))
    expect(await canonical.text()).toContain('https://pokopie.com/en/games/contra-nes-1988')

    const preview = await getSitemapResponse(request('https://preview.example/sitemap.xml'))
    const xml = await preview.text()
    expect(xml).toContain('https://preview.example/en/games/contra-nes-1988')
    expect(xml).not.toContain('https://pokopie.com')
  })
})

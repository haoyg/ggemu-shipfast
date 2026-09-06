import { describe, expect, it } from 'vitest'

import { getRelatedGuide } from './platform-games-page'

describe('platform guide links', () => {
  it('connects each supported platform collection to a relevant guide', () => {
    expect(getRelatedGuide('Game Boy Advance')?.href).toBe('/en/guides/retro-platform-comparison')
    expect(getRelatedGuide('Nintendo 64')?.href).toBe('/en/guides/retro-game-controller-guide')
    expect(getRelatedGuide('Famicom')?.href).toBe('/en/guides/nes-vs-snes-games')
    expect(getRelatedGuide('Super Famicom')?.href).toBe('/en/guides/nes-vs-snes-games')
    expect(getRelatedGuide('Genesis')?.href).toBe('/en/guides/browser-retro-gaming-guide')
  })
})

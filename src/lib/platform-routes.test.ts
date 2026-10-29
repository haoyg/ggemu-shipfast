import { describe, expect, it } from 'vitest'

import { getGamePlatformCollectionPath } from './platform-routes'

describe('game platform collection links', () => {
  it.each([
    ['Famicom', '/en/nes-games'],
    ['NES', '/en/nes-games'],
    ['Super Famicom', '/en/snes-games'],
    ['Game Boy Advance', '/en/gba-games'],
    ['Nintendo 64', '/en/n64-games'],
    ['PlayStation 1', '/en/ps1-games'],
    ['Genesis', '/en/sega-genesis-games'],
    ['Arcade', '/en/arcade-games'],
  ])('maps %s to its English collection', (platform, expected) => {
    expect(getGamePlatformCollectionPath(platform, 'en')).toBe(expected)
  })

  it('keeps the game locale when the collection is localized', () => {
    expect(getGamePlatformCollectionPath('GBA', 'zh-CN')).toBe('/zh-CN/gba-games')
    expect(getGamePlatformCollectionPath('PS1', 'ja')).toBe('/ja/ps1-games')
  })

  it('does not invent a collection for unsupported platforms', () => {
    expect(getGamePlatformCollectionPath('Nintendo DS', 'en')).toBeUndefined()
    expect(getGamePlatformCollectionPath(undefined, 'en')).toBeUndefined()
  })
})

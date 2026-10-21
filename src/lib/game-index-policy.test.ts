import { describe, expect, it } from 'vitest'

import { getIndexableGameLocales, isIndexableGameDetail } from './game-index-policy'

describe('game index policy', () => {
  it('keeps manually improved English game pages indexable', () => {
    const game = { url_slug: 'geometry-dash-advance-gba-2025' }

    expect(isIndexableGameDetail(game, 'en')).toBe(true)
    expect(getIndexableGameLocales(game)).toContain('en')
  })

  it.each([
    'the-king-of-fighters-97-arcade-1997',
    'lilo-stitch-trouble-in-paradise-ps1-2002',
    'prince-of-persia-the-sands-of-time-java-2003',
  ])('keeps a historically valuable page indexable: %s', (url_slug) => {
    const game = { url_slug }

    expect(isIndexableGameDetail(game, 'en')).toBe(true)
    expect(getIndexableGameLocales(game)).toContain('en')
  })

  it('keeps generic and untranslated variants out of the index', () => {
    const genericGame = { url_slug: 'unreviewed-template-game' }
    const englishEditorial = { url_slug: 'geometry-dash-advance-gba-2025' }

    expect(getIndexableGameLocales(genericGame)).toEqual([])
    expect(isIndexableGameDetail(englishEditorial, 'it')).toBe(false)
  })

  it('allows localized pages only when they have localized editorial or search content', () => {
    const game = { url_slug: 'murdoku-html5-2026' }

    expect(isIndexableGameDetail(game, 'zh-CN')).toBe(true)
    expect(isIndexableGameDetail(game, 'it')).toBe(false)
  })
})

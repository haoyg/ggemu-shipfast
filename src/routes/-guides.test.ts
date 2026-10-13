import { describe, expect, it } from 'vitest'

import { guides } from './$locale.guides.$guideId'

describe('editorial guides', () => {
  it('keeps the WASM Arcade review independent and evidence-based', () => {
    const guide = guides['wasm-arcade-review']

    expect(guide.seoTitle).toContain('WASM Arcade Review')
    expect(guide.notice).toContain('not affiliated')
    expect(guide.externalLink?.href).toBe('https://wasmarcade.com/')
    expect(guide.sections.length).toBeGreaterThanOrEqual(6)
    expect(guide.faqs.length).toBeGreaterThanOrEqual(3)
    expect(guide.sources?.some((source) => source.href === 'https://wasmarcade.com/about')).toBe(true)
  })
})

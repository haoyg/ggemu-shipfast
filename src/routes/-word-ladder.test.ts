import { describe, expect, it } from 'vitest'

import { buildWordLadderHead } from './en.games.word-ladder'

describe('word ladder route SEO', () => {
  it('uses one stable English canonical without fake locale alternates', () => {
    const head = buildWordLadderHead('https://pokopie.com')
    expect(head.links).toEqual([{
      rel: 'canonical',
      href: 'https://pokopie.com/en/games/word-ladder',
    }])
    expect(head.meta).toContainEqual(expect.objectContaining({
      title: expect.stringContaining('Word Ladder Challenge'),
    }))
  })

  it('server-renders WebApplication and FAQ structured data', () => {
    const scripts = buildWordLadderHead('https://pokopie.com').scripts
    expect(scripts).toHaveLength(2)
    expect(scripts[0].children).toContain('WebApplication')
    expect(scripts[1].children).toContain('FAQPage')
  })
})

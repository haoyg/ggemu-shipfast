import { describe, expect, it } from 'vitest'

import { buildPickwickCardGameHead } from './en.pickwick-papers-card-game'

describe('Pickwick Papers card game answer page', () => {
  it('publishes an exact English canonical and a direct search description', () => {
    const head = buildPickwickCardGameHead('https://pokopie.com')

    expect(head.links).toContainEqual({ rel: 'canonical', href: 'https://pokopie.com/en/pickwick-papers-card-game' })
    expect(head.links).toContainEqual(expect.objectContaining({ rel: 'preload', href: '/guide-art/pickwick-whist-hero.webp' }))
    expect(head.meta).toContainEqual({
      name: 'description',
      content: expect.stringContaining('WHIST'),
    })
    expect(head.meta).toContainEqual({ property: 'og:image', content: 'https://pokopie.com/guide-art/pickwick-whist-hero.webp' })
  })

  it('describes the answer and literary source in structured data', () => {
    const head = buildPickwickCardGameHead('https://pokopie.com')
    const graph = JSON.parse(head.scripts[0].children)['@graph']
    const article = graph.find((item: { '@type': string }) => item['@type'] === 'Article')

    expect(article.about).toContainEqual({ '@type': 'Thing', name: 'Whist' })
    expect(article.about).toContainEqual(expect.objectContaining({ '@type': 'Book', name: 'The Pickwick Papers' }))
    expect(graph.some((item: { '@type': string }) => item['@type'] === 'BreadcrumbList')).toBe(true)
  })
})

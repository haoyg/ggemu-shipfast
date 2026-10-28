import { describe, expect, it } from 'vitest'

import { buildCreatorCodesHead } from './guides.brawl-stars.creator-codes'
import { buildCreatorCoffinsHead } from './guides.brawl-stars.creator-coffins'

describe('Brawl Stars guide SEO', () => {
  it('builds canonical, social and Article metadata for creator codes', () => {
    const head = buildCreatorCodesHead('https://pokopie.com')
    const schema = JSON.parse(head.scripts[0].children)

    expect(head.links).toContainEqual({ rel: 'canonical', href: 'https://pokopie.com/guides/brawl-stars/creator-codes' })
    expect(head.meta).toContainEqual({ property: 'og:type', content: 'article' })
    expect(schema['@graph'].map((item: { '@type': string }) => item['@type'])).toEqual(['Article', 'BreadcrumbList'])
  })

  it('publishes the official Creator Coffins date window in structured data', () => {
    const head = buildCreatorCoffinsHead('https://pokopie.com')
    const schema = JSON.parse(head.scripts[0].children)
    const event = schema['@graph'][0].about[1]

    expect(head.links[0].href).toBe('https://pokopie.com/guides/brawl-stars/creator-coffins')
    expect(head.meta).toContainEqual({ title: 'Brawl Stars Creator Coffins – Codes, Teams & Rewards (2026)' })
    expect(event).toMatchObject({ '@type': 'Event', startDate: '2026-10-26', endDate: '2026-10-29' })
  })
})

import { describe, expect, it } from 'vitest'

import { buildBrandedTitle, buildHomeStructuredData } from '#/lib/home-seo'

describe('home SEO', () => {
  it('adds the site name only when the title does not already include it', () => {
    expect(buildBrandedTitle('Play Retro Games', 'POKOPIE')).toBe(
      'Play Retro Games | POKOPIE',
    )
    expect(buildBrandedTitle('Play on POKOPIE', 'POKOPIE')).toBe(
      'Play on POKOPIE',
    )
  })

  it('builds a connected homepage graph from the rendered FAQ content', () => {
    const structuredData = buildHomeStructuredData({
      canonicalUrl: 'https://pokopie.com/en',
      description: 'Play retro games online.',
      faq: {
        items: [{ answer: 'Yes.', question: 'Can I play online?' }],
      },
      locale: 'en',
      origin: 'https://pokopie.com',
      siteEmail: 'contact@pokopie.com',
      siteName: 'POKOPIE',
      title: 'Play Retro Games | POKOPIE',
    })

    expect(structuredData['@graph'].map((item) => item['@type'])).toEqual([
      'Organization',
      'WebSite',
      'WebPage',
      'FAQPage',
    ])
    expect(structuredData['@graph'][3]).toMatchObject({
      '@id': 'https://pokopie.com/en#faq',
      mainEntity: [
        {
          acceptedAnswer: { text: 'Yes.' },
          name: 'Can I play online?',
        },
      ],
    })
  })
})

import { describe, expect, it } from 'vitest'

import {
  buildArticleStructuredData,
  getArticleMetaCopy,
  hasDistinctUpdatedDate,
} from '#/lib/article-seo'

describe('article SEO', () => {
  it('connects the article to its author, publisher, and canonical page', () => {
    const schema = buildArticleStructuredData({
      blogPost: {
        created_at: '2026-07-01T10:00:00.000Z',
        title: 'How to Play',
        updated_at: '2026-07-03T10:00:00.000Z',
      },
      canonicalUrl: 'https://pokopie.com/en/blog/how-to-play',
      description: 'A browser game guide.',
      locale: 'en',
      siteName: 'POKOPIE',
    })

    expect(schema).toMatchObject({
      '@id': 'https://pokopie.com/en/blog/how-to-play#article',
      author: {
        '@id': 'https://pokopie.com/#editorial-team',
        name: 'POKOPIE Editorial Team',
        parentOrganization: {
          '@id': 'https://pokopie.com/#organization',
        },
      },
      mainEntityOfPage: {
        '@id': 'https://pokopie.com/en/blog/how-to-play',
      },
      publisher: {
        '@id': 'https://pokopie.com/#organization',
        name: 'POKOPIE',
      },
    })
  })

  it('localizes visible byline copy without changing the brand name', () => {
    expect(getArticleMetaCopy('zh-CN', 'POKOPIE')).toEqual({
      author: 'POKOPIE \u7f16\u8f91\u56e2\u961f',
      published: '\u53d1\u5e03\u4e8e',
      updated: '\u66f4\u65b0\u4e8e',
    })
  })

  it('shows an updated date only when the calendar date changed', () => {
    expect(
      hasDistinctUpdatedDate(
        '2026-07-01T10:00:00.000Z',
        '2026-07-01T11:00:00.000Z',
      ),
    ).toBe(false)
    expect(
      hasDistinctUpdatedDate(
        '2026-07-01T10:00:00.000Z',
        '2026-07-02T10:00:00.000Z',
      ),
    ).toBe(true)
  })
})

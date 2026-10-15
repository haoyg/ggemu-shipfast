import { describe, expect, it } from 'vitest'
import { editorialBlogPosts, prependEditorialBlogPosts } from './editorial-blog-index'
import { getEditorialBlogPost } from './editorial-blog-posts'
import { getAvailableSeoLocales, getSeoLinksFromCanonical } from './seo'

describe('local English editorial posts', () => {
  it('keeps one copy of each local article while preserving upstream posts', () => {
    const upstream = { slug: 'existing-article', title: 'Existing article' }
    const merged = prependEditorialBlogPosts([editorialBlogPosts[0], upstream])
    expect(merged).toHaveLength(editorialBlogPosts.length + 1)
    expect(merged.at(-1)).toEqual(upstream)
  })

  it.each(editorialBlogPosts)('publishes $slug only with English alternate links', post => {
    const path = `/blog/${post.slug}`
    expect(getAvailableSeoLocales(path)).toEqual(['en'])
    const links = getSeoLinksFromCanonical(`https://pokopie.com/en${path}`)
    expect(links.filter(link => 'hrefLang' in link).map(link => link.hrefLang)).toEqual(['en', 'x-default'])
    const article = getEditorialBlogPost(post.slug!)!
    expect(article.content).toContain('## ')
    expect(article.content).toContain('https://')
    expect(article.created_at).toBe(post.created_at)
  })

  it('lets unknown article IDs fall through to the upstream loader', () => {
    expect(getEditorialBlogPost('not-a-local-article')).toBeUndefined()
  })
})
